import type { ScoreDef } from '../../types';

const yesNo = () => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: 1 },
];

export const timiScore: ScoreDef = {
  key: 'timi',
  label: 'TIMI Risk Score (UA/NSTEMI)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/111/timi-risk-score-ua-nstemi',
  reference: 'Antman EM et al., JAMA 2000',
  items: [
    { key: 'age', label: 'Alter ≥ 65 Jahre', options: yesNo() },
    { key: 'risk_factors', label: '≥ 3 KHK-Risikofaktoren', options: yesNo() },
    { key: 'cad', label: 'Bekannte KHK (Stenose ≥ 50 %)', options: yesNo() },
    { key: 'asa', label: 'ASS in den letzten 7 Tagen', options: yesNo() },
    { key: 'severe_angina', label: '≥ 2 Anginaepisoden in den letzten 24 h', options: yesNo() },
    { key: 'st_changes', label: 'ST-Streckenveränderungen ≥ 0,5 mm', options: yesNo() },
    { key: 'troponin', label: 'Erhöhter kardialer Marker (Troponin)', options: yesNo() },
  ],
  interpret: (total) => {
    if (total <= 1) return { band: 'niedriges Risiko', meaning: '~5 % 14-Tage MACE' };
    if (total <= 4) return { band: 'mittleres Risiko', meaning: '~13–20 % 14-Tage MACE' };
    return { band: 'hohes Risiko', meaning: '~26–41 % 14-Tage MACE – aggressive Therapie' };
  },
};
