import type { StatusPalette } from './index';

export const pulmoPalette: StatusPalette = {
  system: 'pulmo',
  label: 'Pulmo',
  normSummary: 'Atemgeräusch vesikulär bds seitengleich, keine Nebengeräusche',
  groups: [
    {
      label: 'Atemgeräusch',
      chips: [
        { key: 'pulmo_ag_vesik_bds', label: 'vesikulär bds seitengleich', isNormal: true },
        { key: 'pulmo_ag_abgeschwaecht_re', label: 'abgeschwächt rechts' },
        { key: 'pulmo_ag_abgeschwaecht_li', label: 'abgeschwächt links' },
        { key: 'pulmo_ag_fehlend_einseitig', label: 'einseitig fehlend' },
      ],
    },
    {
      label: 'Nebengeräusche',
      chips: [
        { key: 'pulmo_ng_keine', label: 'keine Nebengeräusche', isNormal: true },
        { key: 'pulmo_ng_rgs_feucht', label: 'feuchte RGs' },
        { key: 'pulmo_ng_rgs_trocken', label: 'trockene RGs' },
        { key: 'pulmo_ng_giemen', label: 'Giemen' },
        { key: 'pulmo_ng_brummen', label: 'Brummen' },
        { key: 'pulmo_ng_stridor', label: 'Stridor' },
      ],
    },
    {
      label: 'Klopfschall / Atemarbeit',
      chips: [
        { key: 'pulmo_ks_sonor', label: 'sonor, keine Dämpfung', isNormal: true },
        { key: 'pulmo_ks_gedaempft', label: 'gedämpft' },
        { key: 'pulmo_ks_hypersonor', label: 'hypersonor' },
        { key: 'pulmo_ateminsuffizienz', label: 'erhöhte Atemarbeit' },
      ],
    },
  ],
};
