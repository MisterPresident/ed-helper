import type { StatusPalette } from './index';

export const wsPalette: StatusPalette = {
  system: 'ws',
  label: 'WS',
  normSummary: 'klopfindolent, frei beweglich, kein Druckschmerz',
  groups: [
    {
      label: 'Klopfschmerz',
      chips: [
        { key: 'ws_klopf_neg', label: 'klopfindolent', isNormal: true },
        { key: 'ws_klopf_hws', label: 'Klopfschmerz HWS' },
        { key: 'ws_klopf_bws', label: 'Klopfschmerz BWS' },
        { key: 'ws_klopf_lws', label: 'Klopfschmerz LWS' },
      ],
    },
    {
      label: 'Beweglichkeit',
      chips: [
        { key: 'ws_frei', label: 'frei beweglich', isNormal: true },
        { key: 'ws_eingeschr', label: 'eingeschränkte Beweglichkeit' },
        { key: 'ws_schon', label: 'Schonhaltung' },
      ],
    },
    {
      label: 'Neurologie',
      chips: [
        { key: 'ws_neuro_ob', label: 'keine radikuläre Symptomatik', isNormal: true },
        { key: 'ws_neuro_radikulaer', label: 'radikuläre Symptomatik' },
        { key: 'ws_neuro_reithose', label: 'Reithosenhypästhesie' },
        { key: 'ws_blase_mastdarm', label: 'Blasen-/Mastdarmstörung' },
      ],
    },
  ],
};
