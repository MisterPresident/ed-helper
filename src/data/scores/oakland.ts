import type { ScoreDef } from '../../types';

const yesNo = (yesPoints: number) => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: yesPoints },
];

export const oaklandScore: ScoreDef = {
  key: 'oakland',
  label: 'Oakland Score (untere GIB)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/10193/oakland-score-safe-discharge-after-lower-gi-bleed',
  reference: 'Oakland K et al., Lancet Gastroenterol Hepatol 2017',
  items: [
    {
      key: 'age',
      label: 'Alter',
      options: [
        { label: '< 40', points: 0 },
        { label: '40–69', points: 1 },
        { label: '≥ 70', points: 2 },
      ],
    },
    { key: 'male', label: 'Männliches Geschlecht', options: yesNo(1) },
    { key: 'prior_lgib', label: 'Frühere untere GI-Blutung', options: yesNo(1) },
    {
      key: 'rectal',
      label: 'DRU mit Blut nachweisbar',
      options: yesNo(1),
    },
    {
      key: 'pulse',
      label: 'Herzfrequenz',
      options: [
        { label: '< 70', points: 0 },
        { label: '70–89', points: 1 },
        { label: '90–109', points: 2 },
        { label: '≥ 110', points: 3 },
      ],
    },
    {
      key: 'sbp',
      label: 'RR systolisch (mmHg)',
      options: [
        { label: '≥ 130', points: 0 },
        { label: '120–129', points: 1 },
        { label: '110–119', points: 2 },
        { label: '90–109', points: 3 },
        { label: '< 90', points: 4 },
      ],
    },
    {
      key: 'hb',
      label: 'Hb (g/dL)',
      options: [
        { label: '≥ 13', points: 0 },
        { label: '11–12,9', points: 6 },
        { label: '10–10,9', points: 13 },
        { label: '7–9,9', points: 17 },
        { label: '< 7', points: 22 },
      ],
    },
  ],
  interpret: (total) => {
    if (total <= 8) return { band: 'sehr niedriges Risiko', meaning: '~95 % sichere Entlassung' };
    if (total <= 10) return { band: 'niedriges Risiko', meaning: 'ambulante Beobachtung möglich' };
    return { band: 'erhöhtes Risiko', meaning: 'stationäre Aufnahme empfohlen' };
  },
};
