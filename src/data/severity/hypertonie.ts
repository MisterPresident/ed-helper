import type { Encounter, SeverityResult } from '../../types';
import { num } from './_util';

const HYP_RED_FLAG_KEYS = [
  'rf_hyp_enzephalopathie',
  'rf_hyp_dissektion',
  'rf_hyp_lungenoedem',
  'rf_hyp_ischaemie',
  'rf_hyp_eklampsie',
];

export function classifyHypertonie(enc: Encounter): SeverityResult | null {
  const sys = num(enc.vitals?.rr_sys);
  const dia = num(enc.vitals?.rr_dia);
  const endOrgan = HYP_RED_FLAG_KEYS.some((k) => enc.redFlags?.[k] === 'positive');

  if (sys === null && dia === null && !endOrgan) return null;
  const basedOn: string[] = [];
  if (sys !== null && dia !== null) basedOn.push(`RR ${sys.toFixed(0)}/${dia.toFixed(0)} mmHg`);
  else if (sys !== null) basedOn.push(`RR sys ${sys.toFixed(0)} mmHg`);
  else if (dia !== null) basedOn.push(`RR dia ${dia.toFixed(0)} mmHg`);
  if (endOrgan) basedOn.push('Endorganschaden (Red Flag positiv)');

  if (endOrgan) {
    return {
      stage: 'Emergency',
      label: 'hypertensive Emergency mit Endorganschaden',
      basedOn,
      severity: 'critical',
    };
  }
  if ((sys !== null && sys >= 180) || (dia !== null && dia >= 110)) {
    return {
      stage: 'Urgency',
      label: 'hypertensive Urgency',
      basedOn,
      severity: 'moderate',
    };
  }
  return null;
}
