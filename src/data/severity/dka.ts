import type { Encounter, SeverityResult } from '../../types';
import { num } from './_util';

/** DKA grading by pH/HCO₃ (Diabetes Care 2022). */
export function classifyDKA(enc: Encounter): SeverityResult | null {
  const ph = num(enc.diagnostik?.bgaValues?.ph);
  const hco3 = num(enc.diagnostik?.bgaValues?.hco3);
  const glc = num(enc.diagnostik?.bgaValues?.glc);
  if (ph === null && hco3 === null) return null;

  // Define worst grade across the two indicators.
  const phGrade = ph === null
    ? 0
    : ph < 7.0
      ? 3
      : ph < 7.25
        ? 2
        : ph <= 7.30
          ? 1
          : 0;
  const hcoGrade = hco3 === null
    ? 0
    : hco3 < 10
      ? 3
      : hco3 < 15
        ? 2
        : hco3 <= 18
          ? 1
          : 0;
  const grade = Math.max(phGrade, hcoGrade);
  if (grade === 0) return null;

  const basedOn: string[] = [];
  if (ph !== null) basedOn.push(`pH ${ph.toFixed(2)}`);
  if (hco3 !== null) basedOn.push(`HCO₃ ${hco3.toFixed(1)} mmol/L`);
  if (glc !== null) basedOn.push(`Glc ${glc.toFixed(0)} mg/dL`);

  if (grade === 3) {
    return { stage: 'Schwer', label: 'schwere Ketoazidose', basedOn, severity: 'severe' };
  }
  if (grade === 2) {
    return { stage: 'Moderat', label: 'moderate Ketoazidose', basedOn, severity: 'moderate' };
  }
  return { stage: 'Mild', label: 'milde Ketoazidose', basedOn, severity: 'mild' };
}
