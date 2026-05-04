import type { ScoreDef } from '../../types';

const yesNo = () => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: 1 },
];

export const crb65Score: ScoreDef = {
  key: 'crb65',
  label: 'CRB-65 (ohne Harnstoff, Praxis/ED)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/3998/crb-65-score-pneumonia-severity',
  reference: 'Bauer T et al., J Intern Med 2006',
  items: [
    { key: 'confusion', label: 'C – Confusion (neu)', options: yesNo() },
    { key: 'rr', label: 'R – Atemfrequenz ≥ 30/min', options: yesNo() },
    { key: 'bp', label: 'B – RR sys < 90 oder dia ≤ 60 mmHg', options: yesNo() },
    { key: 'age', label: '65 – Alter ≥ 65 Jahre', options: yesNo() },
  ],
  interpret: (total) => {
    if (total === 0) return { band: 'niedriges Risiko', meaning: 'ambulant möglich' };
    if (total <= 2) return { band: 'mittleres Risiko', meaning: 'stationär erwägen' };
    return { band: 'hohes Risiko', meaning: 'stationär, ggf. ICU' };
  },
};
