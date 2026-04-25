import type { StatusPalette } from './index';

export const extremitaetenPalette: StatusPalette = {
  system: 'extremitaeten',
  label: 'Extremitäten',
  normSummary: 'keine Ödeme, Pulse seitengleich, warm und gut durchblutet, keine Zeichen einer TVT',
  groups: [
    {
      label: 'Ödeme',
      chips: [
        { key: 'extr_keine_oedeme', label: 'keine Ödeme', isNormal: true },
        { key: 'extr_oedeme_beidseits', label: 'Unterschenkelödeme bds' },
        { key: 'extr_oedem_einseitig', label: 'einseitiges Ödem' },
      ],
    },
    {
      label: 'Periphere Pulse',
      chips: [
        { key: 'extr_pulse_seitengleich', label: 'seitengleich tastbar', isNormal: true },
        { key: 'extr_pulse_abgeschwaecht', label: 'abgeschwächt' },
        { key: 'extr_pulse_fehlend', label: 'fehlend' },
      ],
    },
    {
      label: 'Durchblutung / Haut',
      chips: [
        { key: 'extr_warm_gut_durchblutet', label: 'warm, gut durchblutet', isNormal: true },
        { key: 'extr_kuehl_blass', label: 'kühl / blass' },
        { key: 'extr_livide', label: 'livide' },
        { key: 'extr_marmoriert', label: 'marmoriert' },
      ],
    },
    {
      label: 'TVT-Zeichen',
      chips: [
        { key: 'extr_tvt_neg', label: 'keine TVT-Zeichen', isNormal: true },
        { key: 'extr_tvt_schmerz', label: 'Wadendruckschmerz' },
        { key: 'extr_tvt_schwellung', label: 'einseitige Schwellung/Umfangsdifferenz' },
      ],
    },
  ],
};
