import type { ScoreDef } from '../../types';

const yesNo = () => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: 1 },
];

export const sfsrScore: ScoreDef = {
  key: 'sfsr',
  label: 'San Francisco Syncope Rule (SFSR)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/1077/san-francisco-syncope-rule',
  reference: 'Quinn JV et al., Ann Emerg Med 2004',
  items: [
    { key: 'chf', label: 'Herzinsuffizienz-Anamnese', options: yesNo() },
    { key: 'hct', label: 'Hämatokrit < 30 %', options: yesNo() },
    { key: 'ekg', label: 'Abnormes EKG (oder neue Veränderungen)', options: yesNo() },
    { key: 'dyspnoe', label: 'Dyspnoe', options: yesNo() },
    { key: 'rr', label: 'Systolischer RR < 90 mmHg', options: yesNo() },
  ],
  interpret: (total) => {
    if (total === 0) return { band: 'niedriges Risiko', meaning: 'kurzfristig schwerwiegende Outcomes unwahrscheinlich – ambulante Abklärung möglich' };
    return { band: 'erhöhtes Risiko', meaning: 'stationäre Aufnahme / Monitoring erwägen' };
  },
};
