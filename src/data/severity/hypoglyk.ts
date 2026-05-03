import type { Encounter, SeverityResult } from '../../types';
import { num } from './_util';

const ROS_VIGILANZ_KEYS = ['ros_neu_vigilanz', 'ros_neu_krampf', 'ros_neu_gedaechtnis'];

export function classifyHypoglyk(enc: Encounter): SeverityResult | null {
  const glcMg = num(enc.diagnostik?.bgaValues?.glc);
  const altered = ROS_VIGILANZ_KEYS.some((k) => enc.ros?.[k] === 'positive');
  const basedOn: string[] = [];
  if (glcMg !== null) basedOn.push(`BZ ${glcMg.toFixed(0)} mg/dL`);
  if (altered) basedOn.push('Vigilanzminderung / Krampf');

  if (altered) {
    return {
      stage: 'Level 3',
      label: 'schwere Hypoglykämie',
      basedOn,
      severity: 'severe',
    };
  }
  if (glcMg === null) return null;
  if (glcMg < 54) {
    return {
      stage: 'Level 2',
      label: 'klinisch relevante Hypoglykämie',
      basedOn,
      severity: 'moderate',
    };
  }
  if (glcMg < 70) {
    return {
      stage: 'Level 1',
      label: 'milde Hypoglykämie',
      basedOn,
      severity: 'mild',
    };
  }
  return null;
}
