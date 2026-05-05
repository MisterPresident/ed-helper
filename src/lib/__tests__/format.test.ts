import { describe, it, expect } from 'vitest';
import { buildSummary } from '../format';
import type { Encounter } from '../../types';
import { computeResult } from '../score';
import { SCORES } from '../../data/scores';

const baseEnc = (overrides: Partial<Encounter> = {}): Encounter => ({
  id: 'test',
  label: 'Bett 3',
  createdAt: 0,
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
    expect(s).toContain('E: beim Gehen aufgetreten');
    expect(s).toContain('R: Raucher');
    expect(s).toContain('L: 18:00');
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
    expect(s).toContain('<u>A – Allergien:</>\nkeine bekannt');
    expect(s).toContain('<u>M – Dauermedikation:</>\nASS, Bisoprolol');
    expect(s).toContain('<u>P – Vordiagnosen:</>\nKHK, aHT');
    expect(s).toContain('<u>P – Voroperationen:</>\nAppendektomie 2015');
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

describe('buildSummary — confirmed diagnosis discharge', () => {
  it('renders Hypothesen and per-diagnosis Entlassungskriterien with checked state', () => {
    const enc = baseEnc({
      diagnoses: [
        { key: 'hypoglykaemie', status: 'confirmed', addedAt: 0 },
      ],
      dischargeChecked: { 'hypoglykaemie:0': true, 'hypoglykaemie:1': true },
    });
    const s = buildSummary(enc);
    expect(s).toContain('<u>Hypothesen:</>');
    expect(s).toContain('Hypoglykämie: bestätigt');
    expect(s).toContain('<u>Entlassungskriterien:</>');
    expect(s).toContain('☑');
    expect(s).toContain('☐');
  });

  it('lists multiple parallel hypotheses with statuses', () => {
    const enc = baseEnc({
      diagnoses: [
        { key: 'hypoglykaemie', status: 'confirmed', addedAt: 0 },
        { key: 'hypertonie', status: 'suspected', addedAt: 1 },
        { key: 'hyperglykaemie', status: 'excluded', addedAt: 2 },
      ],
    });
    const s = buildSummary(enc);
    expect(s).toContain('Hypoglykämie: bestätigt');
    expect(s).toContain('Hypertonie: V.a.');
    expect(s).toContain('Hyperglykämie: ausgeschlossen');
  });
});

describe('buildSummary — ROS by organ system', () => {
  it('groups positive/negative items by category, omits unknown', () => {
    const enc = baseEnc({
      ros: {
        ros_const_fieber: 'positive',
        ros_const_nachtschweiss: 'negative',
        ros_cv_thoraxschmerz: 'positive',
        ros_cv_palpitationen: 'negative',
        ros_neu_kopfschmerz: 'unknown',
      },
    });
    const s = buildSummary(enc);
    expect(s).toContain('<u>Anamnese (ROS):</>');
    expect(s).toContain('- Konstitutionell / Allgemein: Fieber positiv, Nachtschweiß negativ');
    expect(s).toContain('- Kardiovaskulär: Thoraxschmerz positiv, Palpitationen negativ');
    // unknown → omitted
    expect(s).not.toContain('Kopfschmerz');
  });
});

describe('buildSummary — structured BGA', () => {
  it('renders only filled BGA fields with units', () => {
    const enc = baseEnc({
      diagnostik: {
        bgaValues: { ph: '7.20', lac: '5.0', k: '4.0' },
      },
    });
    const s = buildSummary(enc);
    expect(s).toContain('<u>Diagnostik:</>');
    expect(s).toContain('pH 7.20');
    expect(s).toContain('Laktat 5.0 mmol/L');
    expect(s).toContain('K⁺ 4.0 mmol/L');
    // un-set fields omitted
    expect(s).not.toContain('pCO₂');
    expect(s).not.toContain('Hb');
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

describe('buildSummary — structured EKG groups', () => {
  it('renders Frequenz with number + chip without group prefix', () => {
    const enc = baseEnc({
      diagnostik: {
        ekgSel: {
          rate: { chips: ['Tachykardie'], number: '120' },
        },
      },
    });
    const s = buildSummary(enc);
    expect(s).toContain('- EKG:');
    expect(s).toContain('120 /min, Tachykardie');
  });

  it('emits group prefix for QRS multi-select with number', () => {
    const enc = baseEnc({
      diagnostik: {
        ekgSel: {
          qrs: { chips: ['schmal', 'RSB'], number: '92' },
        },
      },
    });
    const s = buildSummary(enc);
    expect(s).toContain('QRS 92 ms, schmal, RSB');
  });

  it('renders just the number when no chip is set', () => {
    const enc = baseEnc({
      diagnostik: {
        ekgSel: { pq: { chips: [], number: '160' } },
      },
    });
    const s = buildSummary(enc);
    expect(s).toContain('PQ 160 ms');
  });

  it('appends EKG free text after the structured composition', () => {
    const enc = baseEnc({
      diagnostik: {
        ekgSel: { rhythmus: { chips: ['SR'] } },
        ekg: 'V.a. Lateralinfarkt',
      },
    });
    const s = buildSummary(enc);
    expect(s).toContain('SR');
    expect(s).toContain('V.a. Lateralinfarkt');
  });
});

describe('buildSummary — Bildgebung with modality prefix', () => {
  it('groups modalities on separate lines with prefix', () => {
    const enc = baseEnc({
      diagnostik: {
        bildgebungSel: {
          roentgen: { chips: ['Rö-Thorax'] },
          ct: { chips: ['CT Abdomen'] },
        },
      },
    });
    const s = buildSummary(enc);
    expect(s).toContain('- Bildgebung:');
    expect(s).toContain('Röntgen Rö-Thorax');
    expect(s).toContain('CT CT Abdomen');
  });
});

describe('buildSummary — OPQRST + SAMPLER letter prefixes', () => {
  it('prefixes each OPQRST value with its mnemonic letter', () => {
    const enc = baseEnc({
      leitsymptom: 'thoraxschmerz',
      opqrst: {
        onset: 'akut',
        provocation: 'bei Belastung',
        quality: 'drückend',
        severity: '7/10',
      },
    });
    const s = buildSummary(enc);
    expect(s).toContain('Leitsymptom: Thoraxschmerz (O: akut, P: bei Belastung, Q: drückend, S: 7/10).');
  });

  it('inlines SAMPLER fields with S/E/R/L letter prefixes in Anamnese', () => {
    const enc = baseEnc({
      leitsymptom: 'thoraxschmerz',
      sampler: {
        symptoms: 'Husten seit 2 Tagen',
        event: 'beim Gehen aufgetreten',
        risiko: 'Raucher, KHK bekannt',
        lastMeal: '18:00',
      },
    });
    const s = buildSummary(enc);
    expect(s).toContain('S: Husten seit 2 Tagen');
    expect(s).toContain('E: beim Gehen aufgetreten');
    expect(s).toContain('R: Raucher, KHK bekannt');
    expect(s).toContain('L: 18:00');
  });
});

describe('buildSummary — freetext diagnoses', () => {
  it('renders freeText label in Hypothesen with (Freitext) tag', () => {
    const enc = baseEnc({
      diagnoses: [
        { key: 'free:abc', status: 'suspected', addedAt: 0, freeText: 'Akute Bronchitis' },
        { key: 'hypoglykaemie', status: 'confirmed', addedAt: 1 },
      ],
    });
    const s = buildSummary(enc);
    expect(s).toContain('- Akute Bronchitis (Freitext): V.a.');
    expect(s).toContain('- Hypoglykämie: bestätigt');
  });
});

describe('buildSummary — Labor plus-joined', () => {
  it('joins Labor chips across groups with " + "', () => {
    const enc = baseEnc({
      diagnostik: {
        laborSel: {
          blocks: { chips: ['IN1-Labor'] },
          werte: { chips: ['Troponin hs', 'D-Dimer'] },
          infekt: { chips: ['CRP'] },
        },
      },
    });
    const s = buildSummary(enc);
    expect(s).toContain('- Labor: IN1-Labor + Troponin hs + D-Dimer + CRP');
  });
});

describe('buildSummary — Weitere multiline with prefix', () => {
  it('renders Konsile/Sonstiges as separate prefixed lines', () => {
    const enc = baseEnc({
      diagnostik: {
        weitereSel: {
          konsile: { chips: ['Neurologisches Konsil'] },
          sonstiges: { chips: ['Liquorpunktion'] },
        },
      },
    });
    const s = buildSummary(enc);
    expect(s).toContain('- Weitere:');
    expect(s).toContain('Konsile Neurologisches Konsil');
    expect(s).toContain('Sonstiges Liquorpunktion');
  });
});

describe('buildSummary — Therapie counters', () => {
  it('renders chips with ×N when count ≥ 1', () => {
    const enc = baseEnc({
      treatmentCounts: {
        analgetika: { 'Metamizol 1g i.v.': 2, 'Paracetamol 1g i.v.': 1 },
        antibiotika: { 'Ceftriaxon 2g i.v.': 1 },
      },
    });
    const s = buildSummary(enc);
    expect(s).toContain('- Analgetika/Schmerzmittel'.replace('/', ' / ')); // accept either format
    expect(s).toContain('Metamizol 1g i.v. ×2');
    expect(s).toContain('Paracetamol 1g i.v. ×1');
    expect(s).toContain('Ceftriaxon 2g i.v. ×1');
  });

  it('combines counts with free-text via " · "', () => {
    const enc = baseEnc({
      treatment: { analgetika: 'nicht vertragen' },
      treatmentCounts: { analgetika: { 'Metamizol 1g i.v.': 1 } },
    });
    const s = buildSummary(enc);
    expect(s).toMatch(/Metamizol 1g i\.v\. ×1.*nicht vertragen|nicht vertragen.*Metamizol 1g i\.v\. ×1/);
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
