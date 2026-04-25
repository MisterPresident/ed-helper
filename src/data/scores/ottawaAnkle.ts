import type { ScoreDef } from '../../types';

const yesNo = () => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: 1 },
];

// Ottawa Ankle & Foot Rules as decision rule: any positive item → Bildgebung indiziert.
export const ottawaAnkleScore: ScoreDef = {
  key: 'ottawaAnkle',
  label: 'Ottawa Ankle Rules',
  mdcalcUrl: 'https://www.mdcalc.com/calc/112/ottawa-ankle-rule',
  reference: 'Stiell IG et al., BMJ 1995',
  items: [
    {
      key: 'pain_malleolar',
      label: 'Schmerz im Malleolarbereich',
      options: yesNo(),
    },
    {
      key: 'tender_lateral',
      label: 'Druckschmerz Hinterkante oder Spitze Malleolus lateralis (distale 6 cm)',
      options: yesNo(),
    },
    {
      key: 'tender_medial',
      label: 'Druckschmerz Hinterkante oder Spitze Malleolus medialis (distale 6 cm)',
      options: yesNo(),
    },
    {
      key: 'pain_midfoot',
      label: 'Schmerz im Mittelfuß',
      options: yesNo(),
    },
    {
      key: 'tender_navicular',
      label: 'Druckschmerz Os naviculare',
      options: yesNo(),
    },
    {
      key: 'tender_mt5',
      label: 'Druckschmerz Basis Metatarsale V',
      options: yesNo(),
    },
    {
      key: 'bear_weight',
      label: 'Kann 4 Schritte nicht belasten (weder akut noch in ZNA)',
      options: yesNo(),
    },
  ],
  interpret: (total) => {
    if (total === 0) return { band: 'keine Bildgebung nach Regel', meaning: 'klinische Beobachtung' };
    return { band: 'Röntgen indiziert', meaning: 'siehe positive Kriterien' };
  },
};
