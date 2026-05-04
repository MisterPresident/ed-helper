import type { ScoreDef } from '../../types';

const yesNo = () => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: 1 },
];

export const spesiScore: ScoreDef = {
  key: 'spesi',
  label: 'sPESI (simplified PESI, LAE)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/1247/simplified-pesi-pulmonary-embolism-severity-index',
  reference: 'Jiménez D et al., Arch Intern Med 2010',
  items: [
    { key: 'age', label: 'Alter > 80 Jahre', options: yesNo() },
    { key: 'cancer', label: 'Aktives Malignom', options: yesNo() },
    { key: 'cv', label: 'Chronische kardiopulmonale Erkrankung', options: yesNo() },
    { key: 'hr', label: 'Herzfrequenz ≥ 110/min', options: yesNo() },
    { key: 'sbp', label: 'RR systolisch < 100 mmHg', options: yesNo() },
    { key: 'sat', label: 'SaO₂ < 90 %', options: yesNo() },
  ],
  interpret: (total) => {
    if (total === 0) return { band: 'niedriges Risiko', meaning: '30-Tage-Mortalität ~1 % – ambulante Behandlung erwägen' };
    return { band: 'erhöhtes Risiko', meaning: '30-Tage-Mortalität ~10 % – stationäre Behandlung' };
  },
};
