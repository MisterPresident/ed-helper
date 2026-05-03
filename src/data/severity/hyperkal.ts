import type { Encounter, SeverityResult } from '../../types';
import { num } from './_util';

export function classifyHyperkal(enc: Encounter): SeverityResult | null {
  const k = num(enc.diagnostik?.bgaValues?.k);
  if (k === null || k <= 5.0) return null;
  const ekgChanges = !!enc.diagnostik?.ekgChanges;
  const basedOn = [`K ${k.toFixed(1)} mmol/L${ekgChanges ? ', EKG-Veränderungen' : ''}`];

  if (k >= 6.5) {
    return { stage: 'Schwer', label: 'schwere Hyperkaliämie', basedOn, severity: 'severe' };
  }
  if (k >= 6.0) {
    return ekgChanges
      ? { stage: 'Schwer', label: 'schwere Hyperkaliämie (mit EKG-Veränderungen)', basedOn, severity: 'severe' }
      : { stage: 'Moderat', label: 'moderate Hyperkaliämie', basedOn, severity: 'moderate' };
  }
  // 5.0–5.9
  return ekgChanges
    ? { stage: 'Moderat', label: 'Hyperkaliämie mit EKG-Veränderungen', basedOn, severity: 'moderate' }
    : { stage: 'Mild', label: 'milde Hyperkaliämie', basedOn, severity: 'mild' };
}
