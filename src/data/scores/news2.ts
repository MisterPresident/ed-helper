import type { ScoreDef } from '../../types';

export const news2Score: ScoreDef = {
  key: 'news2',
  label: 'NEWS2 (National Early Warning Score 2)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/10083/national-early-warning-score-news-2',
  reference: 'Royal College of Physicians 2017',
  items: [
    {
      key: 'rr',
      label: 'Atemfrequenz (/min)',
      options: [
        { label: '12–20', points: 0 },
        { label: '9–11', points: 1 },
        { label: '21–24', points: 2 },
        { label: '≤ 8', points: 3 },
        { label: '≥ 25', points: 3 },
      ],
    },
    {
      key: 'spo2',
      label: 'SpO₂ (Skala 1, alle außer COPD)',
      options: [
        { label: '≥ 96 %', points: 0 },
        { label: '94–95 %', points: 1 },
        { label: '92–93 %', points: 2 },
        { label: '≤ 91 %', points: 3 },
      ],
    },
    {
      key: 'o2_supp',
      label: 'O₂-Supplementation',
      options: [
        { label: 'Raumluft', points: 0 },
        { label: 'O₂-Supplement', points: 2 },
      ],
    },
    {
      key: 'temp',
      label: 'Temperatur (°C)',
      options: [
        { label: '36,1–38,0', points: 0 },
        { label: '35,1–36,0 oder 38,1–39,0', points: 1 },
        { label: '≥ 39,1', points: 2 },
        { label: '≤ 35,0', points: 3 },
      ],
    },
    {
      key: 'sbp',
      label: 'RR systolisch (mmHg)',
      options: [
        { label: '111–219', points: 0 },
        { label: '101–110', points: 1 },
        { label: '91–100', points: 2 },
        { label: '≤ 90', points: 3 },
        { label: '≥ 220', points: 3 },
      ],
    },
    {
      key: 'hr',
      label: 'Herzfrequenz (/min)',
      options: [
        { label: '51–90', points: 0 },
        { label: '41–50 oder 91–110', points: 1 },
        { label: '111–130', points: 2 },
        { label: '≤ 40 oder ≥ 131', points: 3 },
      ],
    },
    {
      key: 'consciousness',
      label: 'Bewusstsein',
      options: [
        { label: 'Alert', points: 0 },
        { label: 'Confusion / V / P / U', points: 3 },
      ],
    },
  ],
  interpret: (total) => {
    if (total <= 4) return { band: 'low', meaning: 'Routineüberwachung, Standard-Reaktion' };
    if (total <= 6) return { band: 'medium', meaning: 'dringende Reaktion, Arztkontakt; bei Einzelparameter ≥ 3 ebenfalls' };
    return { band: 'high', meaning: 'sofortige Reaktion / Eskalation, ICU erwägen' };
  },
};
