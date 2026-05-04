import type { ScoreDef } from '../../types';

const yesNo = () => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: 1 },
];

export const hestiaScore: ScoreDef = {
  key: 'hestia',
  label: 'HESTIA (LAE – ambulante Therapie)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/3956/hestia-criteria-pulmonary-embolism',
  reference: 'Zondag W et al., J Thromb Haemost 2011',
  items: [
    { key: 'haemodynamic', label: 'Hämodynamisch instabil', options: yesNo() },
    { key: 'thrombolyse', label: 'Thrombolyse / Embolektomie nötig', options: yesNo() },
    { key: 'aktive_blutung', label: 'Aktive Blutung / hohes Blutungsrisiko', options: yesNo() },
    { key: 'o2_supp', label: 'O₂-Bedarf > 24 h zur Sättigung > 90 %', options: yesNo() },
    { key: 'lae_unter_antikoag', label: 'LAE während laufender Antikoagulation', options: yesNo() },
    { key: 'starke_schmerzen', label: 'Starke Schmerzen mit i.v.-Analgesie > 24 h', options: yesNo() },
    { key: 'med_soz_grund', label: 'Medizinischer/sozialer Grund für Aufnahme', options: yesNo() },
    { key: 'kreaclear', label: 'Kreatinin-Clearance < 30 mL/min', options: yesNo() },
    { key: 'leberinsuff', label: 'Schwere Leberinsuffizienz', options: yesNo() },
    { key: 'schwangerschaft', label: 'Schwangerschaft', options: yesNo() },
    { key: 'hit', label: 'HIT-Anamnese', options: yesNo() },
  ],
  interpret: (total) => {
    if (total === 0) return { band: 'ambulant möglich', meaning: 'alle HESTIA-Kriterien negativ – ambulante Behandlung sicher' };
    return { band: 'stationäre Behandlung', meaning: 'mindestens ein Kriterium positiv' };
  },
};
