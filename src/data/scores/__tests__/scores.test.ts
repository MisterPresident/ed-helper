import { describe, it, expect } from 'vitest';
import type { ScoreDef } from '../../../types';
import { SCORES } from '../index';

// Helper: pick an option by matching its label exactly; returns its points.
const pick = (def: ScoreDef, itemKey: string, optionLabel: string): number => {
  const item = def.items.find((i) => i.key === itemKey);
  if (!item) throw new Error(`unknown item ${itemKey} for ${def.key}`);
  const opt = item.options.find((o) => o.label === optionLabel);
  if (!opt) throw new Error(`unknown option "${optionLabel}" for ${def.key}/${itemKey}`);
  return opt.points;
};

const minOf = (def: ScoreDef) =>
  def.items.reduce((acc, i) => acc + Math.min(...i.options.map((o) => o.points)), 0);
const maxOf = (def: ScoreDef) =>
  def.items.reduce((acc, i) => acc + Math.max(...i.options.map((o) => o.points)), 0);

describe('HEART', () => {
  const d = SCORES.heart;
  it('min = 0, max = 10', () => {
    expect(minOf(d)).toBe(0);
    expect(maxOf(d)).toBe(10);
  });
  it('interprets bands correctly', () => {
    expect(d.interpret(3).band).toBe('low risk');
    expect(d.interpret(4).band).toBe('intermediate risk');
    expect(d.interpret(6).band).toBe('intermediate risk');
    expect(d.interpret(7).band).toBe('high risk');
  });
  it('case: 65 J, mäßig verdächtig, unspezif. Repol, 1–2 RF, Troponin normal → 5', () => {
    const total =
      pick(d, 'history', 'mäßig verdächtig') +
      pick(d, 'ecg', 'unspezifische Repolarisationsstörung') +
      pick(d, 'age', '≥ 65 Jahre') +
      pick(d, 'risk', '1–2 Risikofaktoren') +
      pick(d, 'troponin', '≤ Normgrenze');
    expect(total).toBe(5);
    expect(d.interpret(total).band).toBe('intermediate risk');
  });
});

describe('Wells PE', () => {
  const d = SCORES.wellsPE;
  it('min = 0, max = 12.5', () => {
    expect(minOf(d)).toBe(0);
    expect(maxOf(d)).toBe(12.5);
  });
  it('2-tier cutoff at 4', () => {
    expect(d.interpret(4).band).toBe('LAE unwahrscheinlich');
    expect(d.interpret(4.5).band).toBe('LAE wahrscheinlich');
  });
  it('case: TVT-Zeichen + alt-dx unwahrscheinlich + HF > 100 → 7.5, likely', () => {
    const total =
      pick(d, 'tvt_signs', 'ja') +
      pick(d, 'alt_dx', 'ja') +
      pick(d, 'hr', 'ja') +
      pick(d, 'immobil', 'nein') +
      pick(d, 'prior_vte', 'nein') +
      pick(d, 'hemoptyse', 'nein') +
      pick(d, 'malignom', 'nein');
    expect(total).toBe(7.5);
    expect(d.interpret(total).band).toBe('LAE wahrscheinlich');
  });
});

describe('Geneva (simplified revised)', () => {
  const d = SCORES.geneva;
  it('min = 0, max = 9', () => {
    expect(minOf(d)).toBe(0);
    expect(maxOf(d)).toBe(9);
  });
  it('cutoff at 2 (two-tier)', () => {
    expect(d.interpret(2).band).toBe('LAE unwahrscheinlich');
    expect(d.interpret(3).band).toBe('LAE wahrscheinlich');
  });
});

describe('Wells DVT', () => {
  const d = SCORES.wellsDVT;
  it('min = -2, max = 9', () => {
    expect(minOf(d)).toBe(-2);
    expect(maxOf(d)).toBe(9);
  });
  it('cutoff at 2', () => {
    expect(d.interpret(1).band).toBe('TVT unwahrscheinlich');
    expect(d.interpret(2).band).toBe('TVT wahrscheinlich');
  });
  it('case: cancer + tenderness + entire-leg swelling → 3, likely', () => {
    const total =
      pick(d, 'cancer', 'ja') +
      pick(d, 'tenderness', 'ja') +
      pick(d, 'swelling_leg', 'ja');
    expect(total).toBe(3);
    expect(d.interpret(total).band).toBe('TVT wahrscheinlich');
  });
});

describe('qSOFA', () => {
  const d = SCORES.qsofa;
  it('min = 0, max = 3', () => {
    expect(minOf(d)).toBe(0);
    expect(maxOf(d)).toBe(3);
  });
  it('cutoff at 2', () => {
    expect(d.interpret(1).band).toBe('niedriges Risiko');
    expect(d.interpret(2).band).toBe('hohes Risiko');
  });
});

describe('GCS', () => {
  const d = SCORES.gcs;
  it('min = 3, max = 15', () => {
    expect(minOf(d)).toBe(3);
    expect(maxOf(d)).toBe(15);
  });
  it('bands', () => {
    expect(d.interpret(8).band).toBe('schweres SHT');
    expect(d.interpret(9).band).toBe('mittelschweres SHT');
    expect(d.interpret(13).band).toBe('leichtes SHT');
    expect(d.interpret(15).band).toBe('unauffällig');
  });
  it('E3 V4 M5 = 12', () => {
    const total =
      pick(d, 'eye', 'auf Ansprache') +
      pick(d, 'verbal', 'verwirrt') +
      pick(d, 'motor', 'gezielte Abwehr');
    expect(total).toBe(12);
  });
});

describe('NIHSS', () => {
  const d = SCORES.nihss;
  it('min = 0, max = 42', () => {
    expect(minOf(d)).toBe(0);
    expect(maxOf(d)).toBe(42);
  });
  it('bands', () => {
    expect(d.interpret(0).band).toContain('kein');
    expect(d.interpret(4).band).toBe('minor stroke');
    expect(d.interpret(10).band).toBe('moderate stroke');
    expect(d.interpret(18).band).toBe('moderate to severe');
    expect(d.interpret(25).band).toBe('severe stroke');
  });
});

describe('ABCD²', () => {
  const d = SCORES.abcd2;
  it('min = 0, max = 7', () => {
    expect(minOf(d)).toBe(0);
    expect(maxOf(d)).toBe(7);
  });
  it('bands 0-3/4-5/6-7', () => {
    expect(d.interpret(3).band).toBe('niedriges Risiko');
    expect(d.interpret(4).band).toBe('mittleres Risiko');
    expect(d.interpret(6).band).toBe('hohes Risiko');
  });
  it('case: 70 J, 150/95, unilat. Schwäche, 70 min, DM → 7', () => {
    const total =
      pick(d, 'age', '≥ 60 Jahre') +
      pick(d, 'bp', 'syst. ≥ 140 oder diast. ≥ 90') +
      pick(d, 'clinical', 'einseitige Schwäche') +
      pick(d, 'duration', '≥ 60 Minuten') +
      pick(d, 'diabetes', 'ja');
    expect(total).toBe(7);
  });
});

describe('Canadian CT Head Rule', () => {
  const d = SCORES.canadianCTHead;
  it('all negative = no CT', () => {
    expect(d.interpret(0).band).toBe('kein CT erforderlich');
  });
  it('any positive = CT indicated', () => {
    expect(d.interpret(1).band).toBe('CT-Schädel indiziert');
  });
});

describe('Ottawa Ankle Rules', () => {
  const d = SCORES.ottawaAnkle;
  it('all negative = no imaging', () => {
    expect(d.interpret(0).band).toContain('keine Bildgebung');
  });
  it('any positive = X-ray', () => {
    expect(d.interpret(1).band).toBe('Röntgen indiziert');
  });
});

describe('CURB-65', () => {
  const d = SCORES.curb65;
  it('min=0 max=5', () => {
    expect(minOf(d)).toBe(0);
    expect(maxOf(d)).toBe(5);
  });
  it('bands: 0-1 niedrig, 2 mittel, 3+ hoch', () => {
    expect(d.interpret(1).band).toBe('niedriges Risiko');
    expect(d.interpret(2).band).toBe('mittleres Risiko');
    expect(d.interpret(3).band).toBe('hohes Risiko');
  });
});

describe('sPESI', () => {
  const d = SCORES.spesi;
  it('min=0 max=6', () => {
    expect(minOf(d)).toBe(0);
    expect(maxOf(d)).toBe(6);
  });
  it('cutoff at 0', () => {
    expect(d.interpret(0).band).toBe('niedriges Risiko');
    expect(d.interpret(1).band).toBe('erhöhtes Risiko');
  });
});

describe('HESTIA', () => {
  const d = SCORES.hestia;
  it('all-no permits ambulant', () => {
    expect(d.interpret(0).band).toBe('ambulant möglich');
  });
  it('any positive forces stationär', () => {
    expect(d.interpret(1).band).toBe('stationäre Behandlung');
  });
});

describe('SFSR', () => {
  const d = SCORES.sfsr;
  it('min=0 max=5', () => {
    expect(minOf(d)).toBe(0);
    expect(maxOf(d)).toBe(5);
  });
  it('any positive flips band', () => {
    expect(d.interpret(0).band).toBe('niedriges Risiko');
    expect(d.interpret(1).band).toBe('erhöhtes Risiko');
  });
});

describe('Glasgow-Blatchford', () => {
  const d = SCORES.gbs;
  it('low at 0–1, intermediate, high ≥7', () => {
    expect(d.interpret(0).band).toBe('niedriges Risiko');
    expect(d.interpret(1).band).toBe('niedriges Risiko');
    expect(d.interpret(4).band).toBe('mittleres Risiko');
    expect(d.interpret(7).band).toBe('hohes Risiko');
  });
});

describe('NEWS2', () => {
  const d = SCORES.news2;
  it('low / medium / high cutoffs', () => {
    expect(d.interpret(4).band).toBe('low');
    expect(d.interpret(5).band).toBe('medium');
    expect(d.interpret(7).band).toBe('high');
  });
});

describe('Score registry sanity', () => {
  it('every score has a unique key matching its registry position', () => {
    for (const [regKey, def] of Object.entries(SCORES)) {
      expect(def.key).toBe(regKey);
    }
  });
  it('every item has ≥ 2 options', () => {
    for (const def of Object.values(SCORES)) {
      for (const item of def.items) {
        expect(item.options.length).toBeGreaterThanOrEqual(2);
      }
    }
  });
  it('every score has an mdcalcUrl', () => {
    for (const def of Object.values(SCORES)) {
      expect(def.mdcalcUrl).toMatch(/^https:\/\/www\.mdcalc\.com\//);
    }
  });
});
