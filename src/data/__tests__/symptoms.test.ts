import { describe, it, expect } from 'vitest';
import { SYMPTOMS, SYMPTOMS_BY_KEY } from '../symptoms';
import { RED_FLAGS } from '../redFlags';
import { SCORES } from '../scores';

describe('Symptom catalog integrity', () => {
  it('every symptom key is unique', () => {
    const keys = SYMPTOMS.map((s) => s.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('every symptom redFlagKey points to a registered red flag', () => {
    for (const sym of SYMPTOMS) {
      for (const k of sym.redFlagKeys) {
        expect(RED_FLAGS[k], `${sym.key} → ${k}`).toBeDefined();
      }
    }
  });

  it('every symptom recommendedScore exists in score registry', () => {
    for (const sym of SYMPTOMS) {
      for (const k of sym.recommendedScores) {
        expect(SCORES[k], `${sym.key} → ${k}`).toBeDefined();
      }
    }
  });

  it('every symptom differential key is unique within its symptom', () => {
    for (const sym of SYMPTOMS) {
      const keys = sym.differentials.map((d) => d.key);
      expect(new Set(keys).size, `duplicates in ${sym.key}`).toBe(keys.length);
    }
  });
});

describe('Gastrointestinal Leitsymptome', () => {
  const GI_KEYS = [
    'abdomenschmerz',
    'ogib',
    'ugib',
    'uebelkeit_erbrechen',
    'diarrhoe',
    'obstipation',
    'ikterus',
  ];

  it.each(GI_KEYS)('symptom %s is registered', (key) => {
    expect(SYMPTOMS_BY_KEY[key], `missing GI symptom ${key}`).toBeDefined();
  });

  it('OGIB and UGIB use distinct dispo scores', () => {
    const ogib = SYMPTOMS_BY_KEY.ogib;
    const ugib = SYMPTOMS_BY_KEY.ugib;
    expect(ogib.recommendedScores).toContain('gbs');
    expect(ugib.recommendedScores).toContain('oakland');
    expect(ogib.recommendedScores).not.toContain('oakland');
    expect(ugib.recommendedScores).not.toContain('gbs');
  });

  it('every GI symptom carries killer diagnoses and red flags', () => {
    for (const key of GI_KEYS) {
      const sym = SYMPTOMS_BY_KEY[key];
      expect(sym.killerDiagnoses?.length ?? 0, `${key} killer`).toBeGreaterThan(0);
      expect(sym.redFlagKeys.length, `${key} red flags`).toBeGreaterThan(0);
      expect(sym.differentials.length, `${key} DDx`).toBeGreaterThan(0);
      expect(sym.anamneseQuestions?.length ?? 0, `${key} anamnese`).toBeGreaterThan(0);
    }
  });

  it('legacy gib key is no longer used (split into ogib/ugib)', () => {
    expect(SYMPTOMS_BY_KEY.gib).toBeUndefined();
  });
});

describe('Rheumatologische Leitsymptome', () => {
  const RHEUMA_KEYS = ['arthritis', 'arthralgien', 'myositis', 'myalgien'];

  it.each(RHEUMA_KEYS)('symptom %s is registered', (key) => {
    expect(SYMPTOMS_BY_KEY[key], `missing rheuma symptom ${key}`).toBeDefined();
  });

  it('every rheuma symptom carries killer diagnoses, red flags, DDx and anamnese', () => {
    for (const key of RHEUMA_KEYS) {
      const sym = SYMPTOMS_BY_KEY[key];
      expect(sym.killerDiagnoses?.length ?? 0, `${key} killer`).toBeGreaterThan(0);
      expect(sym.redFlagKeys.length, `${key} red flags`).toBeGreaterThan(0);
      expect(sym.differentials.length, `${key} DDx`).toBeGreaterThanOrEqual(5);
      expect(sym.anamneseQuestions?.length ?? 0, `${key} anamnese`).toBeGreaterThan(0);
    }
  });

  it('arthritis flowchart routes the septische-Arthritis pathway when fever answered', () => {
    const flow = SYMPTOMS_BY_KEY.arthritis;
    expect(flow.redFlagKeys).toContain('rf_arth_septisch');
    const fieberQ = flow.anamneseQuestions?.find((q) => q.key === 'art_fieber');
    expect(fieberQ, 'fever question for septic arthritis branch').toBeDefined();
  });
});
