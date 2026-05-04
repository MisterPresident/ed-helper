import type { ScoreDef } from '../../types';

const yesNo = (yesPoints: number) => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: yesPoints },
];

/**
 * Medical Admission Prediction Score (MAPS) — Zahid 2023.
 * Vereinfachte Punktevergabe zu den Originalfaktoren.
 */
export const mapsScore: ScoreDef = {
  key: 'maps',
  label: 'MAPS (Medical Admission Prediction)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/10391/medical-admission-prediction-score-maps',
  reference: 'Zahid M et al., PLoS ONE 2023',
  items: [
    { key: 'age60', label: 'Alter > 60 Jahre', options: yesNo(2) },
    { key: 'female', label: 'Weibliches Geschlecht', options: yesNo(1) },
    { key: 'recent_admit', label: 'Krankenhausentlassung in den letzten 30 Tagen', options: yesNo(2) },
    { key: 'abnormal_vitals', label: 'Abnorme Vitalparameter (≥ 1)', options: yesNo(3) },
    { key: 'comorbidity', label: '≥ 2 relevante Komorbiditäten', options: yesNo(2) },
  ],
  interpret: (total) => {
    if (total <= 2) return { band: 'low', meaning: 'niedrige Aufnahmewahrscheinlichkeit' };
    if (total <= 5) return { band: 'medium', meaning: 'moderate Aufnahmewahrscheinlichkeit' };
    return { band: 'high', meaning: 'hohe Aufnahmewahrscheinlichkeit' };
  },
};
