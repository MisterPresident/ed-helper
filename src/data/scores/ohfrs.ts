import type { ScoreDef } from '../../types';

const yesNo = (yesPoints: number) => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: yesPoints },
];

export const ohfrsScore: ScoreDef = {
  key: 'ohfrs',
  label: 'Ottawa Heart Failure Risk Scale (OHFRS)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/10168/ottawa-heart-failure-risk-scale-ohfrs',
  reference: 'Stiell IG et al., CJEM 2017',
  items: [
    { key: 'cad_or_prior', label: 'KHK / VHF-Anamnese / Hospitalisierung wegen HI in letztem Jahr', options: yesNo(1) },
    { key: 'home_o2', label: 'Häusliches Sauerstofftherapie / chronische O₂-Abhängigkeit', options: yesNo(1) },
    { key: 'diuretic_loop', label: 'Schleifendiuretikum-Eskalation (vor ED-Aufnahme)', options: yesNo(1) },
    { key: 'rr_high', label: 'Atemfrequenz ≥ 30/min bei Triage', options: yesNo(2) },
    { key: 'spo2_low', label: 'SaO₂ < 90 % bei Raumluft', options: yesNo(1) },
    { key: 'walk_test', label: '3-Minuten-Gehtest mit SaO₂ < 90 %', options: yesNo(1) },
    { key: 'troponin', label: 'Troponin > 99. Perzentile', options: yesNo(2) },
    { key: 'co2_high', label: 'pCO₂ > 35 mmHg in vBGA / aBGA', options: yesNo(1) },
    { key: 'nt_probnp', label: 'NT-proBNP ≥ 5000 pg/mL', options: yesNo(1) },
    { key: 'urea', label: 'Harnstoff ≥ 12 mmol/L', options: yesNo(1) },
  ],
  interpret: (total) => {
    if (total === 0) return { band: 'sehr niedriges Risiko', meaning: '~2,8 % SAE in 14 Tagen' };
    if (total <= 1) return { band: 'niedriges Risiko', meaning: '~5,1 % SAE' };
    if (total <= 2) return { band: 'mittleres Risiko', meaning: '~9,2 % SAE – Beobachtung' };
    if (total <= 4) return { band: 'hohes Risiko', meaning: '~15–26 % SAE – stationär' };
    return { band: 'sehr hohes Risiko', meaning: '> 30 % SAE – aggressive Therapie' };
  },
};
