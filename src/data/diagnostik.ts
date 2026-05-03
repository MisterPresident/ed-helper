import type { BgaValues } from '../types';

// ───────── Free-text section meta (used by format.ts to render "- Label: text") ─────────
export type DiagnostikSection = {
  key: 'ekg' | 'bga' | 'labor' | 'bildgebung' | 'pocus' | 'weitere';
  label: string;
  placeholder: string;
};

export const DIAGNOSTIK_SECTIONS: DiagnostikSection[] = [
  {
    key: 'ekg',
    label: 'EKG',
    placeholder: 'SR, 78/min, PQ 160, QRS 90, QT normal, keine ST-Dynamik',
  },
  {
    key: 'bga',
    label: 'vBGA / aBGA',
    placeholder: 'Freitextkommentar zur BGA',
  },
  {
    key: 'labor',
    label: 'Labor',
    placeholder: 'Troponin hs, CRP, BB, Elyte, Kreatinin, Gerinnung, Lipase, D-Dimer …',
  },
  {
    key: 'bildgebung',
    label: 'Bildgebung',
    placeholder: 'Rö-Thorax, Sono Abdomen, CT-Angio Aorta, CCT, MRT …',
  },
  {
    key: 'pocus',
    label: 'POCUS',
    placeholder: 'Echo, Lunge, FAST, Abdomen …',
  },
  {
    key: 'weitere',
    label: 'Weitere',
    placeholder: 'Liquor, Mikrobiologie, Konsil, Spezialuntersuchungen …',
  },
];

// ───────── Grouped chip palettes (UI helpers; clicking appends to the section's free-text) ─────────
export type ChipGroup = { label: string; chips: string[] };

export const EKG_GROUPS: ChipGroup[] = [
  { label: 'Frequenz', chips: ['normokard', 'Tachykardie', 'Bradykardie', '/min'] },
  { label: 'Rhythmus', chips: ['rhythmisch', 'arrhythmisch', 'SR', 'VHF', 'Vorhofflattern', 'AV-junktional'] },
  { label: 'Achse', chips: ['Indifferenztyp', 'Linkstyp', 'Rechtstyp', 'überdrehter Linkstyp', 'überdrehter Rechtstyp'] },
  { label: 'P-Welle', chips: ['regelrecht', 'P pulmonale', 'P mitrale', 'fehlende P'] },
  { label: 'PQ-Zeit', chips: ['normal', 'AV-Block I°', 'AV-Block II° Mobitz I', 'AV-Block II° Mobitz II', 'AV-Block III°', 'kurz (WPW)'] },
  { label: 'Q-Welle', chips: ['keine pathol. Q', 'pathol. Q anterior', 'pathol. Q inferior', 'pathol. Q lateral'] },
  { label: 'QRS', chips: ['schmal', 'breit', 'RSB', 'LSB', 'LAHB', 'LPHB'] },
  { label: 'S-Zacke', chips: ['regelrecht', 'tiefe S in V5/V6', 'persistierende S V5–V6'] },
  { label: 'ST-Strecke', chips: ['isoelektrisch', 'ST-Hebung', 'ST-Senkung', 'J-Punkt-Hebung'] },
  { label: 'T-Welle', chips: ['positiv', 'T-Negativierung', 'hohe spitze T', 'biphasisch'] },
  { label: 'QTc', chips: ['normal', 'verlängert', 'kurz', 'ms'] },
];

export const LABOR_GROUPS: ChipGroup[] = [
  {
    label: 'Blocks',
    chips: ['NFA-Basis', 'NFA-Abdomen', 'IN1-Labor', 'IN2-Labor', 'IN3-Labor', 'IN4-Labor', 'CH2-Labor', 'Neuro-Labor'],
  },
  {
    label: 'Werte',
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
    label: 'Infekt',
    chips: ['CRP', 'PCT', 'Blutkulturen', 'Urin-Stix', 'Urinsediment', 'Diff-BB'],
  },
];

export const BILDGEBUNG_GROUPS: ChipGroup[] = [
  { label: 'Röntgen', chips: ['Rö-Thorax', 'Rö-Abdomen', 'Rö-HWS', 'Rö-BWS', 'Rö-LWS', 'Rö-Becken', 'Rö-Extremität'] },
  { label: 'Sonographie', chips: ['Sono Abdomen', 'FAST', 'Echo TTE', 'Echo TEE', 'KUS', 'Doppler venös', 'Doppler arteriell'] },
  { label: 'CT', chips: ['CCT nativ', 'CCT mit KM', 'CT-Angio Thorax (LAE)', 'CT-Angio Aorta', 'CT Abdomen', 'Polytrauma-CT'] },
  { label: 'MRT', chips: ['MRT Schädel', 'MRT HWS', 'MRT LWS', 'MRT Knie', 'MRT Hüfte'] },
  { label: 'Andere', chips: ['Endoskopie', 'Bronchoskopie', 'Angiographie'] },
];

export const POCUS_GROUPS: ChipGroup[] = [
  { label: 'Lunge', chips: ['B-Lines', 'Lung sliding +', 'Lung sliding -', 'Pleuraerguss', 'Konsolidierung'] },
  { label: 'Cor', chips: ['Perikarderguss', 'reduzierte LVEF', 'normale LV-Funktion', 'RV-Belastung', 'D-Sign', 'IVC kollabiert', 'IVC plethorisch'] },
  { label: 'Abdomen', chips: ['Leber o.B.', 'freie Flüssigkeit', 'Aorta < 3 cm', 'AAA', 'Hydronephrose', 'Gallenblase Steine', 'Gallenblasenwand verdickt'] },
  { label: 'FAST', chips: ['Morrison neg', 'Splenorenal neg', 'Douglas neg', 'Perikard neg', 'positiv'] },
  { label: 'MSK / Sonstiges', chips: ['Kompressions-Sono Bein', 'TVT-Sono', 'Pneumothorax-Sono'] },
];

export const WEITERE_CHIPS: string[] = [
  'Liquorpunktion',
  'Mikrobiologie',
  'Urin-Toxikologie',
  'Schwangerschaftstest',
  'Augen-Konsil',
  'HNO-Konsil',
  'Chirurgisches Konsil',
  'Neurologisches Konsil',
  'Kardiologisches Konsil',
];

// ───────── BGA structured fields ─────────
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
