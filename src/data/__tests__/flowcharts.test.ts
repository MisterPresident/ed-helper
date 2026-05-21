import { describe, it, expect } from 'vitest';
import { FLOWCHARTS, FLOWCHARTS_BY_SYMPTOM } from '../flowcharts';
import { SYMPTOMS, SYMPTOMS_BY_KEY } from '../symptoms';
import { RED_FLAGS } from '../redFlags';
import { SCORES } from '../scores';
import { walkFlowchart } from '../../lib/flowchart';
import type { Encounter } from '../../types';

describe('Flowchart catalog integrity', () => {
  it('every symptom has exactly one flowchart', () => {
    for (const sym of SYMPTOMS) {
      expect(
        FLOWCHARTS_BY_SYMPTOM[sym.key],
        `missing flowchart for ${sym.key}`,
      ).toBeDefined();
    }
    expect(FLOWCHARTS.length).toBe(SYMPTOMS.length);
  });

  it('every flowchart references a registered symptom', () => {
    for (const flow of FLOWCHARTS) {
      expect(SYMPTOMS_BY_KEY[flow.symptomKey], flow.symptomKey).toBeDefined();
    }
  });

  it('every flowchart has its rootKey present in nodes', () => {
    for (const flow of FLOWCHARTS) {
      expect(flow.nodes[flow.rootKey], `${flow.symptomKey} root`).toBeDefined();
    }
  });

  it('every node key matches its containing record key', () => {
    for (const flow of FLOWCHARTS) {
      for (const [k, node] of Object.entries(flow.nodes)) {
        expect(node.key, `${flow.symptomKey}/${k}`).toBe(k);
      }
    }
  });

  it('every edge.to and node.next points to an existing node', () => {
    for (const flow of FLOWCHARTS) {
      for (const node of Object.values(flow.nodes)) {
        for (const edge of node.edges ?? []) {
          expect(flow.nodes[edge.to], `${flow.symptomKey}: ${node.key} → ${edge.to}`).toBeDefined();
        }
        if (node.next) {
          expect(flow.nodes[node.next], `${flow.symptomKey}: ${node.key} → next ${node.next}`).toBeDefined();
        }
      }
    }
  });

  it('every decision node has a driver and at least 2 edges with unique when-values', () => {
    for (const flow of FLOWCHARTS) {
      for (const node of Object.values(flow.nodes)) {
        if (node.type !== 'decision') continue;
        expect(node.driver, `${flow.symptomKey}/${node.key} driver`).toBeDefined();
        expect(node.edges?.length ?? 0).toBeGreaterThanOrEqual(2);
        const whens = (node.edges ?? []).map((e) => e.when);
        expect(new Set(whens).size, `${flow.symptomKey}/${node.key} duplicate edge when`).toBe(whens.length);
      }
    }
  });

  it('anamnese drivers reference a real question key on the symptom', () => {
    for (const flow of FLOWCHARTS) {
      const sym = SYMPTOMS_BY_KEY[flow.symptomKey];
      const questionKeys = new Set((sym.anamneseQuestions ?? []).map((q) => q.key));
      for (const node of Object.values(flow.nodes)) {
        if (node.driver?.kind !== 'anamnese') continue;
        expect(
          questionKeys.has(node.driver.questionKey),
          `${flow.symptomKey}/${node.key} → unknown anamnese key ${node.driver.questionKey}`,
        ).toBe(true);
      }
    }
  });

  it('redflag drivers and cross-refs point to a registered red flag', () => {
    for (const flow of FLOWCHARTS) {
      for (const node of Object.values(flow.nodes)) {
        if (node.driver?.kind === 'redflag') {
          expect(RED_FLAGS[node.driver.key], `${flow.symptomKey}/${node.key} driver redflag`).toBeDefined();
        }
        if (node.redFlagKey) {
          expect(RED_FLAGS[node.redFlagKey], `${flow.symptomKey}/${node.key} crossref redflag`).toBeDefined();
        }
      }
    }
  });

  it('scoreKey cross-refs point to a registered score', () => {
    for (const flow of FLOWCHARTS) {
      for (const node of Object.values(flow.nodes)) {
        if (!node.scoreKey) continue;
        expect(SCORES[node.scoreKey], `${flow.symptomKey}/${node.key} score`).toBeDefined();
      }
    }
  });

  it('every flowchart terminates (no cycles) from root with no manual decisions', () => {
    const emptyEnc: Encounter = {
      id: 'test',
      label: 'test',
      createdAt: 0,
      step: 'leitsymptom',
    };
    for (const flow of FLOWCHARTS) {
      const path = walkFlowchart(flow, emptyEnc);
      expect(path.length, `${flow.symptomKey}`).toBeGreaterThan(0);
      const visited = new Set(path.map((s) => s.node.key));
      expect(visited.size, `${flow.symptomKey} cycle detected`).toBe(path.length);
    }
  });
});

describe('walkFlowchart resolution', () => {
  const flow = FLOWCHARTS_BY_SYMPTOM.ogib;

  it('starts at root and stops at the first unresolved decision', () => {
    const enc: Encounter = { id: 't', label: 't', createdAt: 0, step: 'leitsymptom' };
    const path = walkFlowchart(flow, enc);
    expect(path[0].node.key).toBe(flow.rootKey);
    const last = path[path.length - 1];
    if (last.node.type === 'decision') {
      expect(last.takenEdge).toBeUndefined();
    }
  });

  it('follows manual flowDecisions through branches', () => {
    const enc: Encounter = {
      id: 't',
      label: 't',
      createdAt: 0,
      step: 'leitsymptom',
      flowDecisions: { ogib_stable: 'ja' },
    };
    const path = walkFlowchart(flow, enc);
    const keys = path.map((s) => s.node.key);
    expect(keys).toContain('ogib_aaa');
  });

  it('follows anamnese-driven branches when answered', () => {
    const enc: Encounter = {
      id: 't',
      label: 't',
      createdAt: 0,
      step: 'leitsymptom',
      flowDecisions: { ogib_stable: 'ja' },
      anamneseAnswers: { ogib_aaa_op: 'ja' },
    };
    const path = walkFlowchart(flow, enc);
    const keys = path.map((s) => s.node.key);
    expect(keys).toContain('ogib_aortoent');
  });

  it('treats anamnese "unknown" as unresolved', () => {
    const enc: Encounter = {
      id: 't',
      label: 't',
      createdAt: 0,
      step: 'leitsymptom',
      flowDecisions: { ogib_stable: 'ja' },
      anamneseAnswers: { ogib_aaa_op: 'unknown' },
    };
    const path = walkFlowchart(flow, enc);
    const last = path[path.length - 1];
    expect(last.node.key).toBe('ogib_aaa');
    expect(last.takenEdge).toBeUndefined();
  });
});
