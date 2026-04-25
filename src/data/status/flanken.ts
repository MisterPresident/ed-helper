import type { StatusPalette } from './index';

export const flankenPalette: StatusPalette = {
  system: 'flanken',
  label: 'Flanken',
  normSummary: 'klopfschmerzfrei bds',
  groups: [
    {
      label: 'Nierenlager-Klopfschmerz',
      chips: [
        { key: 'flanke_neg', label: 'kein klopfschmerz bds', isNormal: true },
        { key: 'flanke_re', label: 'Klopfschmerz rechts' },
        { key: 'flanke_li', label: 'Klopfschmerz links' },
        { key: 'flanke_bds', label: 'Klopfschmerz bds' },
      ],
    },
    {
      label: 'Inspektion',
      chips: [
        { key: 'flanke_inspekt_ob', label: 'Haut unauffällig', isNormal: true },
        { key: 'flanke_haematom', label: 'Hämatom / Prellmarken' },
        { key: 'flanke_zoster', label: 'Bläschen (V.a. Zoster)' },
      ],
    },
  ],
};
