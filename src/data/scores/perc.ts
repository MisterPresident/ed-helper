import type { ScoreDef } from '../../types';

export const percScore: ScoreDef = {
  key: 'perc',
  label: 'PERC Rule-out',
  mdcalcUrl: 'https://www.mdcalc.com/calc/347/perc-rule-pulmonary-embolism',
  reference: 'Kline JA et al., J Thromb Haemost 2008',
  items: [
    {
      key: 'age',
      label: 'Alter ≥ 50 Jahre',
      options: [
        { label: 'nein', points: 0 },
        { label: 'ja', points: 1 },
      ],
    },
    {
      key: 'hr',
      label: 'Herzfrequenz ≥ 100/min',
      options: [
        { label: 'nein', points: 0 },
        { label: 'ja', points: 1 },
      ],
    },
    {
      key: 'o2',
      label: 'SpO₂ < 95 %',
      options: [
        { label: 'nein', points: 0 },
        { label: 'ja', points: 1 },
      ],
    },
    {
      key: 'hemoptysis',
      label: 'Hämoptyse',
      options: [
        { label: 'nein', points: 0 },
        { label: 'ja', points: 1 },
      ],
    },
    {
      key: 'estrogen',
      label: 'Östrogen-Einnahme',
      options: [
        { label: 'nein', points: 0 },
        { label: 'ja', points: 1 },
      ],
    },
    {
      key: 'surgery',
      label: 'OP/Trauma (≤ 4 Wochen)',
      options: [
        { label: 'nein', points: 0 },
        { label: 'ja', points: 1 },
      ],
    },
    {
      key: 'vte',
      label: 'Frühere VTE',
      options: [
        { label: 'nein', points: 0 },
        { label: 'ja', points: 1 },
      ],
    },
    {
      key: 'dvt',
      label: 'Klinische Zeichen einer TVT',
      options: [
        { label: 'nein', points: 0 },
        { label: 'ja', points: 1 },
      ],
    },
  ],
  interpret: (total) => {
    if (total === 0) {
      return {
        band: 'PERC negativ',
        meaning: 'PE kann bei niedriger Vortestwahrscheinlichkeit ausgeschlossen werden – keine weitere Diagnostik erforderlich',
      };
    }
    return {
      band: 'PERC positiv',
      meaning: 'PE nicht ausgeschlossen – weitere Diagnostik (z. B. D-Dimer / Bildgebung)',
    };
  },
};
