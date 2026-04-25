import type { ScoreDef } from '../../types';

const yesNo = () => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: 1 },
];

export const qsofaScore: ScoreDef = {
  key: 'qsofa',
  label: 'qSOFA',
  mdcalcUrl: 'https://www.mdcalc.com/calc/3901/qsofa-quick-sofa-score-sepsis',
  reference: 'Sepsis-3, JAMA 2016',
  items: [
    { key: 'rr', label: 'Atemfrequenz ≥ 22/min', options: yesNo() },
    { key: 'mental', label: 'Vigilanzminderung (GCS < 15)', options: yesNo() },
    { key: 'sbp', label: 'Systolischer Blutdruck ≤ 100 mmHg', options: yesNo() },
  ],
  interpret: (total) => {
    if (total >= 2)
      return { band: 'hohes Risiko', meaning: 'erhöhte Mortalität – Sepsis-Algorithmus aktivieren' };
    return { band: 'niedriges Risiko', meaning: 'bei klinischem Verdacht trotzdem weiter evaluieren' };
  },
};
