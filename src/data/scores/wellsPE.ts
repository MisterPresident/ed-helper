import type { ScoreDef } from '../../types';

const yesNo = (yesPoints: number) => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: yesPoints },
];

export const wellsPEScore: ScoreDef = {
  key: 'wellsPE',
  label: 'Wells-Score (LAE)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/115/wells-criteria-pulmonary-embolism',
  reference: 'Wells PS et al., Thromb Haemost 2000',
  items: [
    { key: 'tvt_signs', label: 'Klinische Zeichen einer TVT', options: yesNo(3) },
    { key: 'alt_dx', label: 'LAE wahrscheinlicher als alternative Diagnose', options: yesNo(3) },
    { key: 'hr', label: 'HF > 100/min', options: yesNo(1.5) },
    { key: 'immobil', label: 'Immobilisation/OP in den letzten 4 Wochen', options: yesNo(1.5) },
    { key: 'prior_vte', label: 'Frühere TVT oder LAE', options: yesNo(1.5) },
    { key: 'hemoptyse', label: 'Hämoptysen', options: yesNo(1) },
    { key: 'malignom', label: 'Aktives Malignom (≤ 6 Monate / Therapie)', options: yesNo(1) },
  ],
  interpret: (total) => {
    if (total <= 4) return { band: 'LAE unwahrscheinlich', meaning: 'D-Dimer sinnvoll; bei negativ ausgeschlossen' };
    return { band: 'LAE wahrscheinlich', meaning: 'CT-Angio Thorax (D-Dimer hier nicht ausreichend)' };
  },
};
