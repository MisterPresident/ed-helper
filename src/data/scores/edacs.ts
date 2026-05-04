import type { ScoreDef } from '../../types';

const yesNo = (yesPoints: number) => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: yesPoints },
];

export const edacsScore: ScoreDef = {
  key: 'edacs',
  label: 'EDACS (ED Assessment of Chest Pain Score)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/3915/edacs-emergency-department-assessment-chest-pain-score',
  reference: 'Than M et al., Emerg Med Australas 2014',
  items: [
    {
      key: 'age',
      label: 'Alter (in Dekaden)',
      options: [
        { label: '18–45', points: 2 },
        { label: '46–50', points: 4 },
        { label: '51–55', points: 6 },
        { label: '56–60', points: 8 },
        { label: '61–65', points: 10 },
        { label: '66–70', points: 12 },
        { label: '71–75', points: 14 },
        { label: '76–80', points: 16 },
        { label: '81–85', points: 18 },
        { label: '≥ 86', points: 20 },
      ],
    },
    { key: 'male', label: 'Männliches Geschlecht', options: yesNo(6) },
    {
      key: 'cad_or_risk',
      label: 'Bekannte KHK ODER ≥ 3 Risikofaktoren (Alter 18–50)',
      options: yesNo(4),
    },
    { key: 'sweating', label: 'Diaphorese', options: yesNo(3) },
    { key: 'radiation', label: 'Schmerz-Ausstrahlung Arm/Schulter/Hals/Kiefer', options: yesNo(5) },
    { key: 'inspiratory', label: 'Schmerz atemabhängig', options: yesNo(-4) },
    { key: 'palpation', label: 'Schmerz bei Palpation reproduzierbar', options: yesNo(-6) },
  ],
  interpret: (total) => {
    if (total < 16) return { band: 'niedriges Risiko', meaning: 'in Kombination mit non-ischämischem EKG + neg. Troponin (0/2 h) ambulante Entlassung möglich' };
    return { band: 'erhöhtes Risiko', meaning: 'serielle Troponine, weitere Diagnostik' };
  },
};
