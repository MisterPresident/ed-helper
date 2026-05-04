import type { ScoreDef } from '../../types';

const yesNo = (yesPoints: number) => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: yesPoints },
];

/**
 * Glasgow Admission Prediction Score (GAPS) — vereinfachte ED-Variante.
 * Original verwendet Alter, NEWS, Triage, Zuweisungsweg; wir buchen das in
 * Standardgrößen für eine schnelle Bedside-Abschätzung.
 */
export const gapsScore: ScoreDef = {
  key: 'gaps',
  label: 'GAPS (Glasgow Admission Prediction)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/10172/glasgow-admission-prediction-score-gaps',
  reference: 'Cameron A et al., Emerg Med J 2018',
  items: [
    {
      key: 'age',
      label: 'Alter (Jahre)',
      options: [
        { label: '< 50', points: 0 },
        { label: '50–69', points: 2 },
        { label: '70–79', points: 4 },
        { label: '≥ 80', points: 6 },
      ],
    },
    {
      key: 'news',
      label: 'NEWS-Wert bei Aufnahme',
      options: [
        { label: '0–4', points: 0 },
        { label: '5–6', points: 4 },
        { label: '≥ 7', points: 7 },
      ],
    },
    { key: 'ambulance', label: 'Anfahrt mit Rettungsdienst', options: yesNo(2) },
    {
      key: 'triage',
      label: 'Triage-Kategorie',
      options: [
        { label: '5/4 (niedrig)', points: 0 },
        { label: '3', points: 1 },
        { label: '2', points: 3 },
        { label: '1 (höchste)', points: 5 },
      ],
    },
    { key: 'gp_referral', label: 'Hausärztliche Zuweisung', options: yesNo(3) },
  ],
  interpret: (total) => {
    if (total <= 5) return { band: 'low', meaning: 'niedrige Aufnahmewahrscheinlichkeit' };
    if (total <= 12) return { band: 'medium', meaning: 'moderate Aufnahmewahrscheinlichkeit' };
    return { band: 'high', meaning: 'hohe Aufnahmewahrscheinlichkeit' };
  },
};
