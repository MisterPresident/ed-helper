import type { StatusPalette } from './index';

export const corPalette: StatusPalette = {
  system: 'cor',
  label: 'Cor',
  normSummary: 'rein, rhythmisch, normokard, periphere Pulse seitengleich',
  groups: [
    {
      label: 'Herztöne',
      chips: [
        { key: 'cor_ht_rein', label: 'rein', isNormal: true },
        { key: 'cor_systolikum', label: 'Systolikum' },
        { key: 'cor_diastolikum', label: 'Diastolikum' },
        { key: 'cor_drittton', label: '3. Herzton' },
      ],
    },
    {
      label: 'Rhythmus',
      chips: [
        { key: 'cor_rhythmisch', label: 'rhythmisch', isNormal: true },
        { key: 'cor_arrhythmisch', label: 'arrhythmisch' },
      ],
    },
    {
      label: 'Frequenz',
      chips: [
        { key: 'cor_normokard', label: 'normokard', isNormal: true },
        { key: 'cor_tachykard', label: 'tachykard' },
        { key: 'cor_bradykard', label: 'bradykard' },
      ],
    },
    {
      label: 'Periphere Pulse',
      chips: [
        { key: 'cor_pulse_seitengleich', label: 'seitengleich tastbar', isNormal: true },
        { key: 'cor_pulse_abgeschwaecht', label: 'abgeschwächt' },
        { key: 'cor_pulse_seitendifferenz', label: 'Seitendifferenz' },
        { key: 'cor_pulse_fehlend', label: 'nicht tastbar' },
      ],
    },
    {
      label: 'Rekap / Volumen',
      chips: [
        { key: 'cor_rekap_normal', label: 'Rekap < 2 s', isNormal: true },
        { key: 'cor_rekap_verzoegert', label: 'Rekap verzögert' },
        { key: 'cor_halsvenen_gestaut', label: 'Halsvenen gestaut' },
      ],
    },
  ],
};
