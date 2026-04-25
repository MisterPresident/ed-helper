import type { ScoreDef } from '../../types';

const yesNo = () => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: 1 },
];

// Decision rule: any High-risk OR Medium-risk criterion = CT indicated.
// Represented as 1-point items; total ≥ 1 => CT indicated.
export const canadianCTHeadScore: ScoreDef = {
  key: 'canadianCTHead',
  label: 'Canadian CT Head Rule',
  mdcalcUrl: 'https://www.mdcalc.com/calc/115/canadian-ct-head-injury-trauma-rule',
  reference: 'Stiell IG et al., Lancet 2001',
  items: [
    { key: 'gcs_lt15', label: 'High risk: GCS < 15 nach 2 h', options: yesNo() },
    { key: 'open_skull', label: 'High risk: V.a. offene/imprimierte Schädelfraktur', options: yesNo() },
    { key: 'basal_skull', label: 'High risk: Zeichen einer Schädelbasisfraktur', options: yesNo() },
    { key: 'vomit', label: 'High risk: ≥ 2 Erbrechensepisoden', options: yesNo() },
    { key: 'age65', label: 'High risk: Alter ≥ 65 Jahre', options: yesNo() },
    { key: 'amnesia30', label: 'Medium risk: Amnesie vor Unfall ≥ 30 min', options: yesNo() },
    {
      key: 'mechanism',
      label: 'Medium risk: gefährlicher Mechanismus (Fußgänger, Auswurf, Sturz > 3 Fuß / 5 Stufen)',
      options: yesNo(),
    },
  ],
  interpret: (total) => {
    if (total === 0) return { band: 'kein CT erforderlich', meaning: 'nach Regel, klinische Beobachtung' };
    return { band: 'CT-Schädel indiziert', meaning: 'mindestens ein Kriterium positiv' };
  },
};
