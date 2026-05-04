import type { ScoreDef } from '../../types';

const yesNo = (yesPoints: number) => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: yesPoints },
];

/**
 * Pneumonia Severity Index (PSI / PORT). Step 1 (Klasse I) handled clinically:
 * Wenn jünger < 50 J ohne Komorbiditäten und ohne abnorme Vitals/Status → Klasse I.
 * Hier rechnen wir den Punktewert für Klassen II–V (Step 2). Alter wird in
 * Dekaden gebucht (≈ Alter in Jahren als Punkte) — siehe Optionen.
 */
export const psiScore: ScoreDef = {
  key: 'psi',
  label: 'PSI (Pneumonia Severity Index)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/33/psi-port-score-pneumonia-severity-index-cap',
  reference: 'Fine MJ et al., NEJM 1997',
  items: [
    {
      key: 'age',
      label: 'Alter (Punkte = Jahre; ♀ −10)',
      options: [
        { label: '< 50', points: 40 },
        { label: '50–59 (♀)', points: 45 },
        { label: '50–59 (♂)', points: 55 },
        { label: '60–69 (♀)', points: 55 },
        { label: '60–69 (♂)', points: 65 },
        { label: '70–79 (♀)', points: 65 },
        { label: '70–79 (♂)', points: 75 },
        { label: '80–89 (♀)', points: 75 },
        { label: '80–89 (♂)', points: 85 },
        { label: '≥ 90 (♀)', points: 85 },
        { label: '≥ 90 (♂)', points: 95 },
      ],
    },
    { key: 'pflege', label: 'Bewohner Pflegeheim', options: yesNo(10) },
    { key: 'malignom', label: 'Malignom-Anamnese', options: yesNo(30) },
    { key: 'leber', label: 'Lebererkrankung', options: yesNo(20) },
    { key: 'chf', label: 'Herzinsuffizienz', options: yesNo(10) },
    { key: 'ce_stroke', label: 'Zerebrovaskuläre Erkrankung', options: yesNo(10) },
    { key: 'niere', label: 'Nierenerkrankung', options: yesNo(10) },
    { key: 'mental', label: 'Vigilanzminderung', options: yesNo(20) },
    { key: 'rr_high', label: 'Atemfrequenz ≥ 30/min', options: yesNo(20) },
    { key: 'bp_low', label: 'RR sys < 90 mmHg', options: yesNo(20) },
    { key: 'temp', label: 'Temperatur < 35 °C oder ≥ 40 °C', options: yesNo(15) },
    { key: 'pulse', label: 'Puls ≥ 125/min', options: yesNo(10) },
    { key: 'ph', label: 'pH < 7,35', options: yesNo(30) },
    { key: 'urea', label: 'Harnstoff ≥ 30 mg/dL', options: yesNo(20) },
    { key: 'na', label: 'Natrium < 130 mmol/L', options: yesNo(20) },
    { key: 'glc', label: 'Glukose ≥ 250 mg/dL', options: yesNo(10) },
    { key: 'hkt', label: 'Hkt < 30 %', options: yesNo(10) },
    { key: 'po2', label: 'pO₂ < 60 mmHg (oder SaO₂ < 90 %)', options: yesNo(10) },
    { key: 'pleural', label: 'Pleuraerguss', options: yesNo(10) },
  ],
  interpret: (total) => {
    if (total <= 70) return { band: 'Klasse II', meaning: 'ambulant (30-Tage-Mortalität < 1 %)' };
    if (total <= 90) return { band: 'Klasse III', meaning: 'kurze Beobachtung erwägen (~1 % Mortalität)' };
    if (total <= 130) return { band: 'Klasse IV', meaning: 'stationär (~9 % Mortalität)' };
    return { band: 'Klasse V', meaning: 'stationär / ICU (~27 % Mortalität)' };
  },
};
