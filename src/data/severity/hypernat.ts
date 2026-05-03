import type { Encounter, SeverityResult } from '../../types';
import { num } from './_util';

export function classifyHypernat(enc: Encounter): SeverityResult | null {
  const na = num(enc.diagnostik?.bgaValues?.na);
  if (na === null || na <= 145) return null;
  const basedOn = [`Na ${na.toFixed(0)} mmol/L`];
  if (na >= 155) {
    return { stage: 'Schwer', label: 'schwere Hypernatriämie', basedOn, severity: 'severe' };
  }
  if (na >= 150) {
    return { stage: 'Moderat', label: 'moderate Hypernatriämie', basedOn, severity: 'moderate' };
  }
  return { stage: 'Mild', label: 'milde Hypernatriämie', basedOn, severity: 'mild' };
}
