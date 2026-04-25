import type { ScoreDef } from '../../types';

export const abcd2Score: ScoreDef = {
  key: 'abcd2',
  label: 'ABCD²-Score (Schlaganfallrisiko nach TIA)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/357/abcd2-score-tia',
  reference: 'Johnston SC et al., Lancet 2007',
  items: [
    {
      key: 'age',
      label: 'A – Alter',
      options: [
        { label: '< 60 Jahre', points: 0 },
        { label: '≥ 60 Jahre', points: 1 },
      ],
    },
    {
      key: 'bp',
      label: 'B – Blutdruck (initial)',
      options: [
        { label: '< 140/90', points: 0 },
        { label: 'syst. ≥ 140 oder diast. ≥ 90', points: 1 },
      ],
    },
    {
      key: 'clinical',
      label: 'C – Klinik',
      options: [
        { label: 'keine Halbseitenschwäche, keine Sprachstörung', points: 0 },
        { label: 'Sprachstörung ohne Halbseitenschwäche', points: 1 },
        { label: 'einseitige Schwäche', points: 2 },
      ],
    },
    {
      key: 'duration',
      label: 'D – Dauer',
      options: [
        { label: '< 10 Minuten', points: 0 },
        { label: '10–59 Minuten', points: 1 },
        { label: '≥ 60 Minuten', points: 2 },
      ],
    },
    {
      key: 'diabetes',
      label: 'D – Diabetes mellitus',
      options: [
        { label: 'nein', points: 0 },
        { label: 'ja', points: 1 },
      ],
    },
  ],
  interpret: (total) => {
    if (total <= 3) return { band: 'niedriges Risiko', meaning: '~1 % 2-Tage-Schlaganfallrisiko' };
    if (total <= 5) return { band: 'mittleres Risiko', meaning: '~4 % 2-Tage-Schlaganfallrisiko' };
    return { band: 'hohes Risiko', meaning: '~8 % 2-Tage-Schlaganfallrisiko – stationär, rasche Abklärung' };
  },
};
