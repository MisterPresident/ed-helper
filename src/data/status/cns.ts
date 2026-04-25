import type { StatusPalette } from './index';

export const cnsPalette: StatusPalette = {
  system: 'cns',
  label: 'ZNS',
  normSummary: 'wach, allseits orientiert, keine fokalen Defizite, Pupillen isokor/lichtreagibel',
  groups: [
    {
      label: 'Bewusstsein',
      chips: [
        { key: 'cns_wach', label: 'wach', isNormal: true },
        { key: 'cns_somnolent', label: 'somnolent' },
        { key: 'cns_soporoes', label: 'soporös' },
        { key: 'cns_komatös', label: 'komatös' },
      ],
    },
    {
      label: 'Orientierung',
      chips: [
        { key: 'cns_allseits_orientiert', label: 'allseits orientiert', isNormal: true },
        { key: 'cns_zeitlich_desorientiert', label: 'zeitlich desorientiert' },
        { key: 'cns_situativ_desorientiert', label: 'situativ desorientiert' },
        { key: 'cns_personen_desorientiert', label: 'zur Person desorientiert' },
      ],
    },
    {
      label: 'Pupillen',
      chips: [
        { key: 'cns_pupillen_isokor', label: 'isokor, lichtreagibel', isNormal: true },
        { key: 'cns_pupillen_anisokor', label: 'anisokor' },
        { key: 'cns_pupillen_entrundet', label: 'entrundet' },
        { key: 'cns_pupillen_lichtstarr', label: 'lichtstarr' },
      ],
    },
    {
      label: 'Motorik / Kraft',
      chips: [
        { key: 'cns_motorik_seitengleich', label: 'seitengleich, kein Defizit', isNormal: true },
        { key: 'cns_hemiparese_re', label: 'Hemiparese rechts' },
        { key: 'cns_hemiparese_li', label: 'Hemiparese links' },
        { key: 'cns_armvorhalteversuch_pos', label: 'Armvorhalteversuch pathologisch' },
      ],
    },
    {
      label: 'Sprache',
      chips: [
        { key: 'cns_sprache_unauffaellig', label: 'flüssig, unauffällig', isNormal: true },
        { key: 'cns_dysarthrie', label: 'Dysarthrie' },
        { key: 'cns_aphasie', label: 'Aphasie' },
      ],
    },
    {
      label: 'Meningismus',
      chips: [
        { key: 'cns_meningismus_neg', label: 'Meningismus negativ', isNormal: true },
        { key: 'cns_meningismus_pos', label: 'Meningismus positiv' },
      ],
    },
  ],
};
