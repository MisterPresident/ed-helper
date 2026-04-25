import type { ScoreDef } from '../../types';

const yesNo = (yesPoints: number) => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: yesPoints },
];

// Simplified revised Geneva Score (LAE) — each item 1 point; HF has 3 levels.
export const genevaScore: ScoreDef = {
  key: 'geneva',
  label: 'Geneva-Score (revidiert, vereinfacht)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/1750/geneva-score-revised-pulmonary-embolism',
  reference: 'Le Gal G et al., Ann Intern Med 2006 / Klok FA 2008',
  items: [
    { key: 'age65', label: 'Alter > 65 Jahre', options: yesNo(1) },
    { key: 'prior_vte', label: 'Frühere TVT oder LAE', options: yesNo(1) },
    { key: 'op_fraktur', label: 'OP oder Fraktur im letzten Monat', options: yesNo(1) },
    { key: 'malignom', label: 'Aktives Malignom', options: yesNo(1) },
    { key: 'beinschmerz', label: 'Einseitiger Beinschmerz', options: yesNo(1) },
    { key: 'hemoptyse', label: 'Hämoptysen', options: yesNo(1) },
    {
      key: 'hf',
      label: 'Herzfrequenz',
      options: [
        { label: '< 75/min', points: 0 },
        { label: '75–94/min', points: 1 },
        { label: '≥ 95/min', points: 2 },
      ],
    },
    {
      key: 'bein_palp',
      label: 'Druckschmerz tiefer Beinvene + einseitiges Ödem',
      options: yesNo(1),
    },
  ],
  interpret: (total) => {
    if (total <= 2) return { band: 'LAE unwahrscheinlich', meaning: 'D-Dimer sinnvoll' };
    return { band: 'LAE wahrscheinlich', meaning: 'Bildgebung (CT-Angio) erwägen' };
  },
};
