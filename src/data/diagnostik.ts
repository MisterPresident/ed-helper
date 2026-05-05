import type { BgaValues, ChipGroup } from '../types';

// ───────── Section meta (free-text) ─────────
export type DiagnostikSection = {
  key: 'ekg' | 'bga' | 'labor' | 'bildgebung' | 'pocus' | 'weitere';
  label: string;
  placeholder: string;
};

export const DIAGNOSTIK_SECTIONS: DiagnostikSection[] = [
  {
    key: 'ekg',
    label: 'EKG',
    placeholder: 'Narrative / Lokalisation z.B. "ST-Hebung in I/aVL, V5/V6"',
  },
  {
    key: 'bga',
    label: 'vBGA / aBGA',
    placeholder: 'Freitextkommentar zur BGA',
  },
  {
    key: 'labor',
    label: 'Labor',
    placeholder: 'Troponin hs < 6, CRP 3, Lipase 28 …',
  },
  {
    key: 'bildgebung',
    label: 'Bildgebung',
    placeholder: 'Befund-Narrative z.B. "Rö-Thorax: keine Infiltrate, kein Pneu"',
  },
  {
    key: 'pocus',
    label: 'POCUS',
    placeholder: 'Echo: normale LV-Funktion, kein Perikarderguss …',
  },
  {
    key: 'weitere',
    label: 'Weitere',
    placeholder: 'Liquor, Mikrobiologie, Konsil, Spezialuntersuchungen …',
  },
];

// ───────── EKG groups (structured) ─────────
export const EKG_GROUPS: ChipGroup[] = [
  {
    key: 'rate',
    label: 'Frequenz',
    mode: 'single',
    prefixed: false,
    chips: ['normokard', 'Tachykardie', 'Bradykardie'],
    number: { unit: '/min', placeholder: '78', refLow: 50, refHigh: 100 },
  },
  {
    key: 'rhythmus',
    label: 'Rhythmus',
    mode: 'single',
    prefixed: false,
    chips: ['SR', 'arrhythmisch absolut', 'VHF', 'Vorhofflattern', 'AV-junktional'],
  },
  {
    key: 'axis',
    label: 'Achse',
    mode: 'single',
    prefixed: true,
    chips: [
      'Indifferenztyp',
      'Linkstyp',
      'überdrehter Linkstyp',
      'Rechtstyp',
      'überdrehter Rechtstyp',
    ],
  },
  {
    key: 'p',
    label: 'P-Welle',
    mode: 'single',
    prefixed: true,
    chips: ['regelrecht', 'P pulmonale', 'P mitrale', 'fehlend'],
  },
  {
    key: 'pq',
    label: 'PQ',
    mode: 'single',
    prefixed: true,
    chips: ['normal', 'AV-Block I°', 'II° Mobitz I', 'II° Mobitz II', 'III°', 'kurz (WPW)'],
    number: { unit: 'ms', placeholder: '160', refLow: 120, refHigh: 200 },
  },
  {
    key: 'q',
    label: 'Q-Welle',
    mode: 'multi',
    prefixed: true,
    chips: [
      'keine pathol. Q',
      'pathol. Q anterior',
      'pathol. Q inferior',
      'pathol. Q lateral',
    ],
  },
  {
    key: 'qrs',
    label: 'QRS',
    mode: 'multi',
    prefixed: true,
    chips: ['schmal', 'breit', 'RSB', 'LSB', 'LAHB', 'LPHB'],
    number: { unit: 'ms', placeholder: '90', refLow: 70, refHigh: 110 },
  },
  {
    key: 's',
    label: 'S-Zacke',
    mode: 'single',
    prefixed: true,
    chips: ['regelrecht', 'tiefe S in V5/V6', 'persistierende S V5–V6'],
  },
  {
    key: 'st',
    label: 'ST',
    mode: 'multi',
    prefixed: true,
    chips: ['isoelektrisch', 'ST-Hebung', 'ST-Senkung', 'J-Punkt-Hebung'],
  },
  {
    key: 't',
    label: 'T-Welle',
    mode: 'multi',
    prefixed: true,
    chips: ['positiv', 'T-Negativierung', 'hohe spitze T', 'biphasisch'],
  },
  {
    key: 'qtc',
    label: 'QTc',
    mode: 'single',
    prefixed: true,
    chips: ['normal', 'verlängert', 'kurz'],
    number: { unit: 'ms', placeholder: '420', refLow: 350, refHigh: 470 },
  },
];

// ───────── Bildgebung (multi, prefixed by modality) ─────────
export const BILDGEBUNG_GROUPS: ChipGroup[] = [
  {
    key: 'roentgen',
    label: 'Röntgen',
    mode: 'multi',
    prefixed: true,
    chips: ['Rö-Thorax', 'Rö-Abdomen', 'Rö-HWS', 'Rö-BWS', 'Rö-LWS', 'Rö-Becken', 'Rö-Extremität'],
  },
  {
    key: 'sono',
    label: 'Sonographie',
    mode: 'multi',
    prefixed: true,
    chips: ['Sono Abdomen', 'FAST', 'Echo TTE', 'Echo TEE', 'KUS', 'Doppler venös', 'Doppler arteriell'],
  },
  {
    key: 'ct',
    label: 'CT',
    mode: 'multi',
    prefixed: true,
    chips: ['CCT nativ', 'CCT mit KM', 'CT-Angio Thorax (LAE)', 'CT-Angio Aorta', 'CT Abdomen', 'Polytrauma-CT'],
  },
  {
    key: 'mrt',
    label: 'MRT',
    mode: 'multi',
    prefixed: true,
    chips: ['MRT Schädel', 'MRT HWS', 'MRT LWS', 'MRT Knie', 'MRT Hüfte'],
  },
  {
    key: 'andere',
    label: 'Andere',
    mode: 'multi',
    prefixed: true,
    chips: ['Endoskopie', 'Bronchoskopie', 'Angiographie'],
  },
];

// ───────── POCUS (multi, prefixed by region) ─────────
export const POCUS_GROUPS: ChipGroup[] = [
  {
    key: 'lunge',
    label: 'Lunge',
    mode: 'multi',
    prefixed: true,
    chips: ['B-Lines', 'Lung sliding +', 'Lung sliding -', 'Pleuraerguss', 'Konsolidierung'],
  },
  {
    key: 'cor',
    label: 'Cor',
    mode: 'multi',
    prefixed: true,
    chips: [
      'Perikarderguss',
      'reduzierte LVEF',
      'normale LV-Funktion',
      'RV-Belastung',
      'D-Sign',
      'IVC kollabiert',
      'IVC plethorisch',
    ],
  },
  {
    key: 'abdomen',
    label: 'Abdomen',
    mode: 'multi',
    prefixed: true,
    chips: [
      'Leber o.B.',
      'freie Flüssigkeit',
      'Aorta < 3 cm',
      'AAA',
      'Hydronephrose',
      'Gallenblase Steine',
      'Gallenblasenwand verdickt',
    ],
  },
  {
    key: 'fast',
    label: 'FAST',
    mode: 'multi',
    prefixed: true,
    chips: ['Morrison neg', 'Splenorenal neg', 'Douglas neg', 'Perikard neg', 'positiv'],
  },
  {
    key: 'msk',
    label: 'MSK / Sonstiges',
    mode: 'multi',
    prefixed: true,
    chips: ['Kompressions-Sono Bein', 'TVT-Sono', 'Pneumothorax-Sono'],
  },
];

// ───────── Labor (multi, NOT prefixed in output — output joins with " + ") ─────────
// Order in this array also defines the output sort order (Blocks → Werte → Infekt).
export const LABOR_GROUPS: ChipGroup[] = [
  {
    key: 'blocks',
    label: 'Blocks',
    mode: 'multi',
    prefixed: false,
    chips: [
      'NFA-Basis',
      'NFA-Abdomen',
      'IN1-Labor',
      'IN2-Labor',
      'IN3-Labor',
      'IN4-Labor',
      'CH2-Labor',
      'Neuro-Labor',
    ],
  },
  {
    key: 'werte',
    label: 'Werte',
    mode: 'multi',
    prefixed: false,
    chips: [
      'Troponin hs',
      'CK / CK-MB',
      'D-Dimer',
      'BNP/NT-proBNP',
      'Iono',
      'Phosphat',
      'LFP',
      'Lipase/Amylase',
      'Laktat',
      'Gerinnung (Quick/INR/PTT)',
      'β-HCG',
      'TSH',
      'BZ',
    ],
  },
  {
    key: 'infekt',
    label: 'Infekt',
    mode: 'multi',
    prefixed: false,
    chips: ['CRP', 'PCT', 'Blutkulturen', 'Urin-Stix', 'Urinsediment', 'Diff-BB'],
  },
];

// ───────── Weitere Diagnostik (multi, prefixed) ─────────
export const WEITERE_GROUPS: ChipGroup[] = [
  {
    key: 'konsile',
    label: 'Konsile',
    mode: 'multi',
    prefixed: true,
    chips: [
      'Augen-Konsil',
      'HNO-Konsil',
      'Chirurgisches Konsil',
      'Neurologisches Konsil',
      'Kardiologisches Konsil',
    ],
  },
  {
    key: 'sonstiges',
    label: 'Sonstiges',
    mode: 'multi',
    prefixed: true,
    chips: [
      'Liquorpunktion',
      'Mikrobiologie',
      'Urin-Toxikologie',
      'Schwangerschaftstest',
    ],
  },
];

// ───────── BGA structured fields (unchanged) ─────────
export type BgaFieldDef = {
  key: keyof BgaValues;
  label: string;
  unit: string;
  refLow: number;
  refHigh: number;
};

export const BGA_FIELDS: BgaFieldDef[] = [
  { key: 'ph', label: 'pH', unit: '', refLow: 7.35, refHigh: 7.45 },
  { key: 'pco2', label: 'pCO₂', unit: 'mmHg', refLow: 35, refHigh: 45 },
  { key: 'po2', label: 'pO₂', unit: 'mmHg', refLow: 75, refHigh: 100 },
  { key: 'hco3', label: 'HCO₃⁻', unit: 'mmol/L', refLow: 22, refHigh: 26 },
  { key: 'be', label: 'BE', unit: 'mmol/L', refLow: -2, refHigh: 2 },
  { key: 'lac', label: 'Laktat', unit: 'mmol/L', refLow: 0, refHigh: 2 },
  { key: 'na', label: 'Na⁺', unit: 'mmol/L', refLow: 135, refHigh: 145 },
  { key: 'k', label: 'K⁺', unit: 'mmol/L', refLow: 3.5, refHigh: 5.0 },
  { key: 'glc', label: 'Glc', unit: 'mg/dL', refLow: 70, refHigh: 110 },
  { key: 'hb', label: 'Hb', unit: 'g/dL', refLow: 12, refHigh: 18 },
  { key: 'creat', label: 'Kreatinin', unit: 'mg/dL', refLow: 0.7, refHigh: 1.2 },
];

export function isBgaAbnormal(field: BgaFieldDef, raw: string | undefined): boolean {
  if (!raw || !raw.trim()) return false;
  const n = Number(raw.replace(',', '.'));
  if (Number.isNaN(n)) return false;
  return n < field.refLow || n > field.refHigh;
}

export function formatBgaInline(values: Partial<BgaValues> | undefined): string {
  if (!values) return '';
  const parts: string[] = [];
  for (const f of BGA_FIELDS) {
    const v = values[f.key]?.trim();
    if (v) parts.push(`${f.label} ${v}${f.unit ? ' ' + f.unit : ''}`);
  }
  return parts.join('; ');
}
