import type { ScoreDef } from '../../types';

const yesNo = () => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: 1 },
];

export const curb65Score: ScoreDef = {
  key: 'curb65',
  label: 'CURB-65 (CAP)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/324/curb-65-score-pneumonia-severity',
  reference: 'Lim WS et al., Thorax 2003',
  items: [
    { key: 'confusion', label: 'C – Confusion (neu aufgetreten)', options: yesNo() },
    { key: 'urea', label: 'U – Harnstoff > 19 mg/dL (7 mmol/L)', options: yesNo() },
    { key: 'rr', label: 'R – Atemfrequenz ≥ 30/min', options: yesNo() },
    { key: 'bp', label: 'B – RR sys < 90 oder dia ≤ 60 mmHg', options: yesNo() },
    { key: 'age', label: '65 – Alter ≥ 65 Jahre', options: yesNo() },
  ],
  interpret: (total) => {
    if (total <= 1) return { band: 'niedriges Risiko', meaning: 'ambulante Behandlung empfohlen' };
    if (total === 2) return { band: 'mittleres Risiko', meaning: 'kurzer stationärer Aufenthalt / engmaschige Beobachtung' };
    return { band: 'hohes Risiko', meaning: 'stationäre Aufnahme – ggf. Intensivtherapie' };
  },
};
