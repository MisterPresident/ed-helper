import type { ScoreDef } from '../../types';

const yesNo = (yesPoints: number) => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: yesPoints },
];

export const gbsScore: ScoreDef = {
  key: 'gbs',
  label: 'Glasgow-Blatchford Score (obere GIB)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/518/glasgow-blatchford-bleeding-score-gbs',
  reference: 'Blatchford O et al., Lancet 2000',
  items: [
    {
      key: 'urea',
      label: 'Harnstoff (mg/dL)',
      options: [
        { label: '< 39', points: 0 },
        { label: '39–47,9', points: 2 },
        { label: '48–59,9', points: 3 },
        { label: '60–149,9', points: 4 },
        { label: '≥ 150', points: 6 },
      ],
    },
    {
      key: 'hb_male',
      label: 'Hb (g/dL) — wählen Sie passend zu Geschlecht',
      hint: 'Frauen: 12–9,9 = 1, < 9,9 = 6; Männer: 12–13 = 1, 10–11,9 = 3, < 10 = 6',
      options: [
        { label: '≥ 13 (♂) / ≥ 12 (♀)', points: 0 },
        { label: '12–12,9 (♂) / 10–11,9 (♀)', points: 1 },
        { label: '10–11,9 (♂)', points: 3 },
        { label: '< 10 (♂) / < 10 (♀)', points: 6 },
      ],
    },
    {
      key: 'sbp',
      label: 'RR systolisch (mmHg)',
      options: [
        { label: '≥ 110', points: 0 },
        { label: '100–109', points: 1 },
        { label: '90–99', points: 2 },
        { label: '< 90', points: 3 },
      ],
    },
    { key: 'pulse', label: 'Puls ≥ 100/min', options: yesNo(1) },
    { key: 'melena', label: 'Meläna', options: yesNo(1) },
    { key: 'syncope', label: 'Synkope', options: yesNo(2) },
    { key: 'liver', label: 'Lebererkrankung', options: yesNo(2) },
    { key: 'chf', label: 'Herzinsuffizienz', options: yesNo(2) },
  ],
  interpret: (total) => {
    if (total <= 1) return { band: 'niedriges Risiko', meaning: '98–99 % NPV für Intervention/Tod – ambulante Behandlung sicher' };
    if (total < 7) return { band: 'mittleres Risiko', meaning: 'stationäre Aufnahme, Verlaufslabor' };
    return { band: 'hohes Risiko', meaning: 'frühzeitige Endoskopie indiziert' };
  },
};
