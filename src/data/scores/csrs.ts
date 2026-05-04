import type { ScoreDef } from '../../types';

export const csrsScore: ScoreDef = {
  key: 'csrs',
  label: 'Canadian Syncope Risk Score',
  mdcalcUrl: 'https://www.mdcalc.com/calc/10046/canadian-syncope-risk-score',
  reference: 'Thiruganasambandamoorthy V et al., CMAJ 2016',
  items: [
    {
      key: 'predisposition',
      label: 'Prädisposition zu Vasovagal',
      hint: 'Auslöser: heißer Raum, langes Stehen, Schmerz/Emotion',
      options: [
        { label: 'ja', points: -1 },
        { label: 'nein', points: 0 },
      ],
    },
    {
      key: 'cardiac_history',
      label: 'Kardiale Vorgeschichte',
      hint: 'KHK, VHF/Flattern, Herzinsuffizienz, Klappenerkrankung',
      options: [
        { label: 'nein', points: 0 },
        { label: 'ja', points: 1 },
      ],
    },
    {
      key: 'sbp',
      label: 'RR systolisch < 90 oder > 180 mmHg',
      options: [
        { label: 'nein', points: 0 },
        { label: 'ja', points: 2 },
      ],
    },
    {
      key: 'troponin',
      label: 'Troponin > 99. Perzentile',
      options: [
        { label: 'nein', points: 0 },
        { label: 'ja', points: 2 },
      ],
    },
    {
      key: 'qrs_axis',
      label: 'Abnorme QRS-Achse (< −30° oder > +100°)',
      options: [
        { label: 'nein', points: 0 },
        { label: 'ja', points: 1 },
      ],
    },
    {
      key: 'qrs_wide',
      label: 'QRS-Dauer > 130 ms',
      options: [
        { label: 'nein', points: 0 },
        { label: 'ja', points: 1 },
      ],
    },
    {
      key: 'qtc',
      label: 'Korrigiertes QT > 480 ms',
      options: [
        { label: 'nein', points: 0 },
        { label: 'ja', points: 2 },
      ],
    },
    {
      key: 'ed_dx',
      label: 'ED-Diagnose',
      options: [
        { label: 'Vasovagal', points: -2 },
        { label: 'Kardial', points: 2 },
        { label: 'andere', points: 0 },
      ],
    },
  ],
  interpret: (total) => {
    if (total <= -2) return { band: 'sehr niedriges Risiko', meaning: '~0,4 % 30-Tage SAE' };
    if (total <= 0) return { band: 'niedriges Risiko', meaning: '~1–1,9 % 30-Tage SAE – ambulant vertretbar' };
    if (total <= 3) return { band: 'mittleres Risiko', meaning: '~3–8 % 30-Tage SAE – Beobachtung/Monitor' };
    return { band: 'hohes Risiko', meaning: '> 14 % 30-Tage SAE – stationäre Abklärung' };
  },
};
