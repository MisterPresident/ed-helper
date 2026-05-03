import type { Encounter, SeverityResult } from '../../types';
import { num } from './_util';

export function classifyHyponat(enc: Encounter): SeverityResult | null {
  const na = num(enc.diagnostik?.bgaValues?.na);
  if (na === null || na >= 135) return null;
  const basedOn = [`Na ${na.toFixed(0)} mmol/L`];
  if (na < 120) {
    return { stage: 'Extrem', label: 'extreme Hyponatriämie', basedOn, severity: 'critical' };
  }
  if (na < 125) {
    return { stage: 'Schwer', label: 'schwere Hyponatriämie', basedOn, severity: 'severe' };
  }
  if (na < 130) {
    return { stage: 'Moderat', label: 'moderate Hyponatriämie', basedOn, severity: 'moderate' };
  }
  return { stage: 'Mild', label: 'milde Hyponatriämie', basedOn, severity: 'mild' };
}
