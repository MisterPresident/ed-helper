import type { ScoreDef } from '../../types';

const yesNo = () => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: 1 },
];

export const roseScore: ScoreDef = {
  key: 'rose',
  label: 'ROSE-Score (Synkope ED)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/10221/rose-rule-syncope',
  reference: 'Reed MJ et al., JACC 2010',
  items: [
    { key: 'bnp', label: 'BNP ≥ 300 pg/mL', options: yesNo() },
    { key: 'bradykardie', label: 'Bradykardie ≤ 50/min (in ED oder prähospital)', options: yesNo() },
    { key: 'fobt', label: 'Positiver Stuhlbluttest (FOBT)', options: yesNo() },
    { key: 'hb', label: 'Hb ≤ 90 g/L (9 g/dL)', options: yesNo() },
    { key: 'thoraxschmerz', label: 'Brustschmerz mit Synkope', options: yesNo() },
    { key: 'q_wave', label: 'Q-Welle im EKG (außer Ableitung III)', options: yesNo() },
    { key: 'spo2', label: 'Sauerstoffsättigung ≤ 94 % (Raumluft)', options: yesNo() },
  ],
  interpret: (total) => {
    if (total === 0) return { band: 'niedriges Risiko', meaning: 'NPV 98,5 % für 1-Monats-Outcomes – ambulant vertretbar' };
    return { band: 'erhöhtes Risiko', meaning: 'Aufnahme empfohlen' };
  },
};
