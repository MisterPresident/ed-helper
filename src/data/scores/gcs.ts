import type { ScoreDef } from '../../types';

export const gcsScore: ScoreDef = {
  key: 'gcs',
  label: 'Glasgow Coma Scale',
  mdcalcUrl: 'https://www.mdcalc.com/calc/64/glasgow-coma-scale-score',
  reference: 'Teasdale & Jennett, Lancet 1974',
  items: [
    {
      key: 'eye',
      label: 'Augen öffnen',
      options: [
        { label: 'kein Augenöffnen', points: 1 },
        { label: 'auf Schmerz', points: 2 },
        { label: 'auf Ansprache', points: 3 },
        { label: 'spontan', points: 4 },
      ],
    },
    {
      key: 'verbal',
      label: 'Verbale Antwort',
      options: [
        { label: 'keine', points: 1 },
        { label: 'unverständliche Laute', points: 2 },
        { label: 'unzusammenhängende Wörter', points: 3 },
        { label: 'verwirrt', points: 4 },
        { label: 'orientiert', points: 5 },
      ],
    },
    {
      key: 'motor',
      label: 'Motorische Antwort',
      options: [
        { label: 'keine', points: 1 },
        { label: 'Strecksynergismen', points: 2 },
        { label: 'Beugesynergismen', points: 3 },
        { label: 'ungezielte Abwehr', points: 4 },
        { label: 'gezielte Abwehr', points: 5 },
        { label: 'Befehle befolgen', points: 6 },
      ],
    },
  ],
  interpret: (total) => {
    if (total <= 8) return { band: 'schweres SHT', meaning: 'GCS ≤ 8 – Atemwegsschutz erwägen' };
    if (total <= 12) return { band: 'mittelschweres SHT', meaning: 'engmaschige Überwachung, CT' };
    if (total <= 14) return { band: 'leichtes SHT', meaning: 'Überwachung, CT-Indikation prüfen' };
    return { band: 'unauffällig', meaning: 'GCS 15 – wach, allseits orientiert' };
  },
};
