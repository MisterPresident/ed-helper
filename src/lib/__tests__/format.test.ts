import { describe, it, expect } from 'vitest';
import { buildSummary } from '../format';
import type { Encounter } from '../../types';
import { computeResult } from '../score';
import { SCORES } from '../../data/scores';

const baseEnc = (overrides: Partial<Encounter> = {}): Encounter => ({
  id: 'test',
  label: 'Bett 3',
  createdAt: 0,
  pathway: 'symptom',
  step: 'summary',
  ...overrides,
});

describe('buildSummary — empty input', () => {
  it('returns empty string for an empty encounter', () => {
    expect(buildSummary(baseEnc())).toBe('');
  });
});

describe('buildSummary — SAP vs Plain headers', () => {
  const enc = baseEnc({
    leitsymptom: 'thoraxschmerz',
    opqrst: { quality: 'drückend', severity: '7/10' },
  });

  it('SAP format wraps headers in <u>...</> pseudo-tags', () => {
    const s = buildSummary(enc, { format: 'sap' });
    expect(s).toContain('<u>Anamnese:</>');
    expect(s).not.toContain('ANAMNESE:');
  });

  it('Plain format uses ALL-CAPS headers', () => {
    const s = buildSummary(enc, { format: 'plain' });
    expect(s).toContain('ANAMNESE:');
    expect(s).not.toContain('<u>');
  });
});

describe('buildSummary — Anamnese composition', () => {
  it('combines Leitsymptom + OPQRST + SAMPLER event/risiko/lastMeal', () => {
    const enc = baseEnc({
      leitsymptom: 'thoraxschmerz',
      opqrst: { quality: 'drückend', severity: '7/10', time: 'seit 30 min' },
      sampler: {
        event: 'beim Gehen aufgetreten',
        risiko: 'Raucher',
        lastMeal: '18:00',
      },
    });
    const s = buildSummary(enc);
    expect(s).toContain('Leitsymptom: Thoraxschmerz');
    expect(s).toContain('drückend');
    expect(s).toContain('Ereignis: beim Gehen aufgetreten');
    expect(s).toContain('Risikofaktoren: Raucher');
    expect(s).toContain('Letzte Mahlzeit: 18:00');
  });
});

describe('buildSummary — SAMPLER section split', () => {
  it('emits Allergien / Dauermedikation / Vordiagnosen / Voroperationen as separate sections', () => {
    const enc = baseEnc({
      sampler: {
        allergien: 'keine bekannt',
        medikation: 'ASS, Bisoprolol',
        vorerkrankungen: 'KHK, aHT',
        voroperationen: 'Appendektomie 2015',
      },
    });
    const s = buildSummary(enc);
    expect(s).toContain('<u>Allergien:</>\nkeine bekannt');
    expect(s).toContain('<u>Dauermedikation:</>\nASS, Bisoprolol');
    expect(s).toContain('<u>Vordiagnosen:</>\nKHK, aHT');
    expect(s).toContain('<u>Voroperationen:</>\nAppendektomie 2015');
  });
});

describe('buildSummary — Red Flags per-flag with negativ/positiv', () => {
  it('emits one line per excluded/positive flag, omits unknown', () => {
    const enc = baseEnc({
      leitsymptom: 'thoraxschmerz',
      redFlags: {
        rf_thx_dissektion: 'excluded',
        rf_thx_lae: 'excluded',
        rf_thx_acs: 'positive',
        // rf_thx_spannungspneu unset -> unknown
      },
    });
    const s = buildSummary(enc);
    expect(s).toContain('<u>Red Flags:</>');
    expect(s).toMatch(/Aortendissektion\): negativ/);
    expect(s).toMatch(/Lungenembolie\): negativ/);
    expect(s).toMatch(/Koronarsyndrom\): ⚠ positiv/);
    // unknown flag must NOT appear
    expect(s).not.toContain('Spannungspneumothorax');
  });
});

describe('buildSummary — Scores in detailed vs compact', () => {
  const heart = SCORES.heart;
  const result = computeResult(heart, {
    history: 1,
    ecg: 1,
    age: 2,
    risk: 1,
    troponin: 0,
  });
  const enc = baseEnc({
    leitsymptom: 'thoraxschmerz',
    scoreResults: { heart: result },
  });

  it('detailed includes every picked HEART item with points', () => {
    const s = buildSummary(enc, { detail: 'detailed' });
    expect(s).toContain('HEART-Score: 5');
    expect(s).toContain('Anamnese: mäßig verdächtig');
    expect(s).toContain('EKG: unspezifische Repolarisationsstörung');
    expect(s).toContain('Alter: ≥ 65 Jahre');
    expect(s).toContain('Risikofaktoren: 1–2 Risikofaktoren');
    expect(s).toContain('Troponin: ≤ Normgrenze');
  });

  it('compact collapses scores to one-liner', () => {
    const s = buildSummary(enc, { detail: 'compact' });
    expect(s).toContain('HEART-Score: 5');
    expect(s).not.toContain('Anamnese: mäßig verdächtig');
  });
});

describe('buildSummary — Status section', () => {
  it('emits per-system lines with picked chips + freetext', () => {
    const enc = baseEnc({
      status: {
        cor: {
          systemKey: 'cor',
          findings: ['cor_rhythmisch', 'cor_ht_rein'],
          free: 'kein Reiben',
        },
      },
    });
    const s = buildSummary(enc);
    expect(s).toContain('<u>Status:</>');
    expect(s).toContain('- Cor: ');
    expect(s).toContain('rhythmisch');
    expect(s).toContain('rein');
    expect(s).toContain('kein Reiben');
  });
});

describe('buildSummary — Diagnostik', () => {
  it('renders provided sections only', () => {
    const enc = baseEnc({
      diagnostik: { ekg: 'SR 78/min, keine ST-Dynamik', labor: 'Troponin neg' },
    });
    const s = buildSummary(enc);
    expect(s).toContain('<u>Diagnostik:</>');
    expect(s).toContain('- EKG: SR 78/min, keine ST-Dynamik');
    expect(s).toContain('- Labor: Troponin neg');
    expect(s).not.toContain('- vBGA');
    expect(s).not.toContain('- Bildgebung');
  });
});

describe('buildSummary — DDx', () => {
  it('lists structured DDx (excluded/positive) plus freetext', () => {
    const enc = baseEnc({
      leitsymptom: 'thoraxschmerz',
      differentials: {
        dd_thx_acs: 'positive',
        dd_thx_dissektion: 'excluded',
      },
      differentialsFree: 'Costochondritis',
    });
    const s = buildSummary(enc);
    expect(s).toContain('<u>Differentialdiagnose:</>');
    expect(s).toMatch(/Akutes Koronarsyndrom: wahrscheinlich/);
    expect(s).toMatch(/Aortendissektion: ausgeschlossen/);
    expect(s).toContain('- Weitere: Costochondritis');
  });
});

describe('buildSummary — Diagnose pathway', () => {
  it('renders Leitdiagnose, ROS positives, and Entlassungskriterien with checked state', () => {
    const enc = baseEnc({
      pathway: 'diagnosis',
      leitdiagnose: 'hypoglykaemie',
      rosChecked: { ros_0: true, ros_2: true },
      dischargeChecked: { dc_0: true, dc_1: true },
    });
    const s = buildSummary(enc);
    expect(s).toContain('Leitdiagnose: Hypoglykämie');
    expect(s).toContain('Vorhanden:');
    expect(s).toContain('Schwitzen');
    expect(s).toContain('<u>Entlassungskriterien:</>');
    expect(s).toContain('☑');
    expect(s).toContain('☐');
  });
});

describe('buildSummary — Prozedere', () => {
  it('emits chips and free text', () => {
    const enc = baseEnc({
      prozedereChips: ['stationäre Aufnahme', 'Monitor / Überwachung'],
      prozedere: 'Aufnahme Kardiologie 4-OG',
    });
    const s = buildSummary(enc);
    expect(s).toContain('<u>Prozedere:</>');
    expect(s).toContain('- stationäre Aufnahme');
    expect(s).toContain('- Monitor / Überwachung');
    expect(s).toContain('Aufnahme Kardiologie 4-OG');
  });
});

describe('buildSummary — section omission', () => {
  it('skips sections that have no content', () => {
    const enc = baseEnc({
      leitsymptom: 'thoraxschmerz',
    });
    const s = buildSummary(enc);
    expect(s).toContain('<u>Anamnese:</>');
    expect(s).not.toContain('<u>Allergien:</>');
    expect(s).not.toContain('<u>Status:</>');
    expect(s).not.toContain('<u>Diagnostik:</>');
    expect(s).not.toContain('<u>Red Flags:</>');
    expect(s).not.toContain('<u>Scores:</>');
    expect(s).not.toContain('<u>Differentialdiagnose:</>');
    expect(s).not.toContain('<u>Prozedere:</>');
  });
});
