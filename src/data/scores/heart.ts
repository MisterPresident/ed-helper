import type { ScoreDef } from '../../types';

export const heartScore: ScoreDef = {
  key: 'heart',
  label: 'HEART-Score',
  mdcalcUrl: 'https://www.mdcalc.com/calc/1752/heart-score-major-cardiac-events',
  reference: 'Six AJ et al., Neth Heart J 2008',
  items: [
    {
      key: 'history',
      label: 'H – Anamnese',
      options: [
        { label: 'wenig verdächtig', points: 0 },
        { label: 'mäßig verdächtig', points: 1 },
        { label: 'dringend verdächtig', points: 2 },
      ],
    },
    {
      key: 'ecg',
      label: 'E – EKG',
      options: [
        { label: 'unauffällig', points: 0 },
        { label: 'unspezifische Repolarisationsstörung', points: 1 },
        { label: 'signifikante ST-Senkung / LSB', points: 2 },
      ],
    },
    {
      key: 'age',
      label: 'A – Alter',
      options: [
        { label: '< 45 Jahre', points: 0 },
        { label: '45–64 Jahre', points: 1 },
        { label: '≥ 65 Jahre', points: 2 },
      ],
    },
    {
      key: 'risk',
      label: 'R – Risikofaktoren',
      hint: 'aHT, Dyslipidämie, DM, Nikotin, + FA, Adipositas; atherosklerotisches Ereignis = 2',
      options: [
        { label: 'keine Risikofaktoren', points: 0 },
        { label: '1–2 Risikofaktoren', points: 1 },
        { label: '≥ 3 RF oder Atherosklerose-Anamnese', points: 2 },
      ],
    },
    {
      key: 'troponin',
      label: 'T – Troponin',
      options: [
        { label: '≤ Normgrenze', points: 0 },
        { label: '1–3 × Normgrenze', points: 1 },
        { label: '> 3 × Normgrenze', points: 2 },
      ],
    },
  ],
  interpret: (total) => {
    if (total <= 3) return { band: 'low risk', meaning: 'MACE ~1,7 % (30 d) – ambulante Abklärung vertretbar' };
    if (total <= 6) return { band: 'intermediate risk', meaning: 'MACE ~17 % – stationäre Abklärung' };
    return { band: 'high risk', meaning: 'MACE ~50 % – aggressive Abklärung / Intervention' };
  },
};
