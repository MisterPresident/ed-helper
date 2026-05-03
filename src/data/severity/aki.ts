import type { Encounter, SeverityResult } from '../../types';
import { num } from './_util';

/** KDIGO AKI staging (absolute serum creatinine, no baseline tracked). */
export function classifyAKI(enc: Encounter): SeverityResult | null {
  const creat = num(enc.diagnostik?.bgaValues?.creat);
  if (creat === null) return null;
  if (creat >= 4.0) {
    return {
      stage: 'Stadium 3',
      label: 'schwere Nierenschädigung',
      basedOn: [`Kreatinin ${creat.toFixed(1)} mg/dL`],
      severity: 'severe',
    };
  }
  if (creat >= 2.0) {
    return {
      stage: 'Stadium 2',
      label: 'moderate Nierenschädigung',
      basedOn: [`Kreatinin ${creat.toFixed(1)} mg/dL`],
      severity: 'moderate',
    };
  }
  if (creat >= 1.3) {
    return {
      stage: 'Stadium 1',
      label: 'leichte Nierenschädigung',
      basedOn: [`Kreatinin ${creat.toFixed(1)} mg/dL`],
      severity: 'mild',
    };
  }
  return null;
}
