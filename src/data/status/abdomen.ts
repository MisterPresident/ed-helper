import type { StatusPalette } from './index';

export const abdomenPalette: StatusPalette = {
  system: 'abdomen',
  label: 'Abdomen',
  normSummary: 'weich, indolent, Darmgeräusche lebhaft, keine Resistenzen, Nierenlager frei',
  groups: [
    {
      label: 'Palpation',
      chips: [
        { key: 'abd_weich_indolent', label: 'weich, indolent', isNormal: true },
        { key: 'abd_druckschmerz_diffus', label: 'diffuser Druckschmerz' },
        { key: 'abd_druckschmerz_loc', label: 'lokalisierter Druckschmerz' },
        { key: 'abd_abwehrspannung', label: 'Abwehrspannung' },
        { key: 'abd_resistenz', label: 'Resistenz tastbar' },
        { key: 'abd_nabelhernie', label: 'Nabelhernie weich' },
        { key: 'abd_nabelhernie_dolent', label: 'Nabelhernie dolent' },
      ],
    },
    {
      label: 'Darmgeräusche',
      chips: [
        { key: 'abd_dg_lebhaft', label: 'lebhaft', isNormal: true },
        { key: 'abd_dg_vermindert', label: 'vermindert' },
        { key: 'abd_dg_fehlend', label: 'fehlend' },
        { key: 'abd_dg_hochgestellt', label: 'hochgestellt/metallisch' },
      ],
    },
    {
      label: 'Leiste',
      chips: [
        { key: 'abd_leistenhernie', label: 'Leistenhernie weich' },
        { key: 'abd_leistenhernie_dolent', label: 'Leistenhernie dolent' },
      ],
    },
  ],
};
