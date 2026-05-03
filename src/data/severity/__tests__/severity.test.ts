import { describe, it, expect } from 'vitest';
import type { Encounter } from '../../../types';
import {
  classifyAKI,
  classifyDKA,
  classifyHypoglyk,
  classifyHyponat,
  classifyHyperkal,
  classifyHypernat,
  classifyHypertonie,
} from '..';

const baseEnc = (overrides: Partial<Encounter> = {}): Encounter => ({
  id: 't',
  label: 'Bett 1',
  createdAt: 0,
  step: 'summary',
  ...overrides,
});

const withBga = (vals: Record<string, string>): Encounter =>
  baseEnc({ diagnostik: { bgaValues: vals } });

describe('AKI / KDIGO', () => {
  it('returns null when creatinine missing', () => {
    expect(classifyAKI(baseEnc())).toBeNull();
  });
  it('Stadium 1 at 1.4 mg/dL', () => {
    expect(classifyAKI(withBga({ creat: '1.4' }))?.stage).toBe('Stadium 1');
  });
  it('Stadium 2 at 2.5 mg/dL', () => {
    expect(classifyAKI(withBga({ creat: '2.5' }))?.stage).toBe('Stadium 2');
  });
  it('Stadium 3 at 4.2 mg/dL', () => {
    const r = classifyAKI(withBga({ creat: '4.2' }));
    expect(r?.stage).toBe('Stadium 3');
    expect(r?.severity).toBe('severe');
  });
});

describe('DKA', () => {
  it('null without acidosis', () => {
    expect(classifyDKA(withBga({ ph: '7.40', hco3: '24' }))).toBeNull();
  });
  it('Mild at pH 7.28', () => {
    expect(classifyDKA(withBga({ ph: '7.28' }))?.stage).toBe('Mild');
  });
  it('Moderat at pH 7.10', () => {
    expect(classifyDKA(withBga({ ph: '7.10' }))?.stage).toBe('Moderat');
  });
  it('Schwer at pH 6.99', () => {
    const r = classifyDKA(withBga({ ph: '6.99', hco3: '8' }));
    expect(r?.stage).toBe('Schwer');
    expect(r?.severity).toBe('severe');
  });
  it('uses worse of pH and HCO₃', () => {
    expect(classifyDKA(withBga({ ph: '7.30', hco3: '12' }))?.stage).toBe('Moderat');
  });
});

describe('Hypoglykämie', () => {
  it('Level 1 at 65 mg/dL', () => {
    expect(classifyHypoglyk(withBga({ glc: '65' }))?.stage).toBe('Level 1');
  });
  it('Level 2 at 45 mg/dL', () => {
    expect(classifyHypoglyk(withBga({ glc: '45' }))?.stage).toBe('Level 2');
  });
  it('Level 3 with positive Vigilanzminderung regardless of glc', () => {
    const enc = baseEnc({
      diagnostik: { bgaValues: { glc: '60' } },
      ros: { ros_neu_vigilanz: 'positive' },
    });
    const r = classifyHypoglyk(enc);
    expect(r?.stage).toBe('Level 3');
    expect(r?.severity).toBe('severe');
  });
});

describe('Hyponatriämie', () => {
  it('Mild 132', () => {
    expect(classifyHyponat(withBga({ na: '132' }))?.stage).toBe('Mild');
  });
  it('Moderat 127', () => {
    expect(classifyHyponat(withBga({ na: '127' }))?.stage).toBe('Moderat');
  });
  it('Schwer 122', () => {
    expect(classifyHyponat(withBga({ na: '122' }))?.stage).toBe('Schwer');
  });
  it('Extrem 119', () => {
    const r = classifyHyponat(withBga({ na: '119' }));
    expect(r?.stage).toBe('Extrem');
    expect(r?.severity).toBe('critical');
  });
  it('null at 138', () => {
    expect(classifyHyponat(withBga({ na: '138' }))).toBeNull();
  });
});

describe('Hyperkaliämie', () => {
  it('null at 4.5', () => {
    expect(classifyHyperkal(withBga({ k: '4.5' }))).toBeNull();
  });
  it('Mild at 5.5 ohne EKG', () => {
    expect(classifyHyperkal(withBga({ k: '5.5' }))?.stage).toBe('Mild');
  });
  it('Moderat at 5.5 mit EKG', () => {
    const enc = baseEnc({ diagnostik: { bgaValues: { k: '5.5' }, ekgChanges: true } });
    expect(classifyHyperkal(enc)?.stage).toBe('Moderat');
  });
  it('Moderat at 6.2 ohne EKG', () => {
    expect(classifyHyperkal(withBga({ k: '6.2' }))?.stage).toBe('Moderat');
  });
  it('Schwer at 6.7', () => {
    expect(classifyHyperkal(withBga({ k: '6.7' }))?.stage).toBe('Schwer');
  });
});

describe('Hypernatriämie', () => {
  it('Mild 148', () => {
    expect(classifyHypernat(withBga({ na: '148' }))?.stage).toBe('Mild');
  });
  it('Schwer 158', () => {
    expect(classifyHypernat(withBga({ na: '158' }))?.stage).toBe('Schwer');
  });
});

describe('Hypertonie', () => {
  it('null without RR + no end-organ', () => {
    expect(classifyHypertonie(baseEnc())).toBeNull();
  });
  it('Urgency at RR 185/95', () => {
    const enc = baseEnc({ vitals: { rr_sys: '185', rr_dia: '95' } });
    expect(classifyHypertonie(enc)?.stage).toBe('Urgency');
  });
  it('Emergency when red flag positive', () => {
    const enc = baseEnc({
      vitals: { rr_sys: '170', rr_dia: '100' },
      redFlags: { rf_hyp_lungenoedem: 'positive' },
    });
    const r = classifyHypertonie(enc);
    expect(r?.stage).toBe('Emergency');
    expect(r?.severity).toBe('critical');
  });
});
