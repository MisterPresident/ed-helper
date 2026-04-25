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
      label: 'Nierenlager / Leiste',
      chips: [
        { key: 'abd_nierenlager_frei', label: 'Nierenlager frei', isNormal: true },
        { key: 'abd_nierenlager_klopfschmerz_re', label: 'Klopfschmerz rechts' },
        { key: 'abd_nierenlager_klopfschmerz_li', label: 'Klopfschmerz links' },
        { key: 'abd_leistenhernie', label: 'Leistenhernie' },
      ],
    },
  ],
};
