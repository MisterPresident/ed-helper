import type { ScoreDef } from '../../types';

const yesNo = (yesPoints: number) => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: yesPoints },
];

/**
 * TRIAL-Score (Triage level + Age + Laboratory). Vereinfacht: jeder
 * pathologische Laborwert + Triage + Alter steuert Mortalitätsrisiko.
 */
export const trialScore: ScoreDef = {
  key: 'trial',
  label: 'TRIAL-Score',
  mdcalcUrl: 'https://www.mdcalc.com/calc/10367/trial-score',
  reference: 'Mueller OS et al., J Clin Med 2021',
  items: [
    {
      key: 'triage',
      label: 'Triage-Stufe',
      options: [
        { label: '5/4 (niedrig)', points: 0 },
        { label: '3', points: 1 },
        { label: '2', points: 2 },
        { label: '1 (höchste)', points: 4 },
      ],
    },
    {
      key: 'age',
      label: 'Alter (Jahre)',
      options: [
        { label: '< 60', points: 0 },
        { label: '60–74', points: 1 },
        { label: '≥ 75', points: 3 },
      ],
    },
    { key: 'ldh', label: 'LDH ↑', options: yesNo(1) },
    { key: 'creat', label: 'Kreatinin ↑', options: yesNo(1) },
    { key: 'albumin', label: 'Albumin ↓', options: yesNo(2) },
    { key: 'bilirubin', label: 'Bilirubin ↑', options: yesNo(1) },
    { key: 'leuco', label: 'Leukozyten abnormal (↑ oder ↓)', options: yesNo(1) },
  ],
  interpret: (total) => {
    if (total <= 2) return { band: 'niedriges Risiko', meaning: 'Mortalität < 1 % (~67 % der Patienten)' };
    if (total <= 6) return { band: 'intermediäres Risiko', meaning: 'Mortalität ~3,5 %' };
    return { band: 'hohes Risiko', meaning: 'Mortalität ~26 %' };
  },
};
