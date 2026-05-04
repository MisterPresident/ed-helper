import type { ScoreDef } from '../../types';

const yesNo = (yesPoints: number) => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: yesPoints },
];

export const pesiScore: ScoreDef = {
  key: 'pesi',
  label: 'PESI (full Pulmonary Embolism Severity Index)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/1750/pulmonary-embolism-severity-index-pesi',
  reference: 'Aujesky D et al., Am J Respir Crit Care Med 2005',
  items: [
    {
      key: 'age',
      label: 'Alter (Punkte = Lebensjahre, in Dekaden)',
      options: [
        { label: '< 40', points: 35 },
        { label: '40–49', points: 45 },
        { label: '50–59', points: 55 },
        { label: '60–69', points: 65 },
        { label: '70–79', points: 75 },
        { label: '80–89', points: 85 },
        { label: '≥ 90', points: 95 },
      ],
    },
    { key: 'male', label: 'Männliches Geschlecht', options: yesNo(10) },
    { key: 'cancer', label: 'Malignom-Anamnese', options: yesNo(30) },
    { key: 'chf', label: 'Herzinsuffizienz', options: yesNo(10) },
    { key: 'lung', label: 'Chronische Lungenerkrankung', options: yesNo(10) },
    { key: 'hr', label: 'Herzfrequenz ≥ 110/min', options: yesNo(20) },
    { key: 'sbp', label: 'RR sys < 100 mmHg', options: yesNo(30) },
    { key: 'rr', label: 'Atemfrequenz ≥ 30/min', options: yesNo(20) },
    { key: 'temp', label: 'Temperatur < 36 °C', options: yesNo(20) },
    { key: 'mental', label: 'Vigilanzminderung', options: yesNo(60) },
    { key: 'sat', label: 'SaO₂ < 90 %', options: yesNo(20) },
  ],
  interpret: (total) => {
    if (total <= 65) return { band: 'Klasse I', meaning: 'sehr niedriges Risiko (~0–1,6 % Mortalität)' };
    if (total <= 85) return { band: 'Klasse II', meaning: 'niedriges Risiko (~1,7–3,5 %)' };
    if (total <= 105) return { band: 'Klasse III', meaning: 'intermediäres Risiko (~3,2–7,1 %)' };
    if (total <= 125) return { band: 'Klasse IV', meaning: 'hohes Risiko (~4,0–11,4 %)' };
    return { band: 'Klasse V', meaning: 'sehr hohes Risiko (~10–24,5 %)' };
  },
};
