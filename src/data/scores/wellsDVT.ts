import type { ScoreDef } from '../../types';

const yesNo = (yesPoints: number) => [
  { label: 'nein', points: 0 },
  { label: 'ja', points: yesPoints },
];

export const wellsDVTScore: ScoreDef = {
  key: 'wellsDVT',
  label: 'Wells-Score (TVT)',
  mdcalcUrl: 'https://www.mdcalc.com/calc/362/wells-criteria-dvt',
  reference: 'Wells PS et al., Lancet 1997',
  items: [
    { key: 'cancer', label: 'Aktives Malignom (Therapie letzte 6 Mon. oder palliativ)', options: yesNo(1) },
    { key: 'paralysis', label: 'Lähmung/Parese/kürzliche Gipsruhigstellung', options: yesNo(1) },
    { key: 'bed_op', label: 'Bettlägerigkeit ≥ 3 Tage oder OP letzte 12 Wochen', options: yesNo(1) },
    { key: 'tenderness', label: 'Lokaler Druckschmerz im Verlauf der tiefen Venen', options: yesNo(1) },
    { key: 'swelling_leg', label: 'Schwellung des gesamten Beins', options: yesNo(1) },
    { key: 'calf_swelling', label: 'Wadenumfang ≥ 3 cm größer als Gegenseite (10 cm distal Tuberositas)', options: yesNo(1) },
    { key: 'pitting', label: 'Pitting-Ödem (stärker symptomatisches Bein)', options: yesNo(1) },
    { key: 'collaterals', label: 'Sichtbare oberflächliche Kollateralvenen (keine Varizen)', options: yesNo(1) },
    { key: 'prior_dvt', label: 'Vorher dokumentierte TVT', options: yesNo(1) },
    { key: 'alt_dx', label: 'Alternative Diagnose mindestens ebenso wahrscheinlich wie TVT', options: yesNo(-2) },
  ],
  interpret: (total) => {
    if (total < 2) return { band: 'TVT unwahrscheinlich', meaning: 'D-Dimer; bei negativ ausgeschlossen' };
    return { band: 'TVT wahrscheinlich', meaning: 'Kompressionssonographie' };
  },
};
