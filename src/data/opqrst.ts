export type OpqrstField = {
  key: 'onset' | 'provocation' | 'quality' | 'radiation' | 'severity' | 'time';
  /** Single-letter mnemonic used as prefix in the report output. */
  mnemonic: 'O' | 'P' | 'Q' | 'R' | 'S' | 'T';
  label: string;
  placeholder: string;
  hint?: string;
};

export const OPQRST_FIELDS: OpqrstField[] = [
  {
    key: 'onset',
    mnemonic: 'O',
    label: 'Onset (Beginn)',
    placeholder: 'akut, schleichend, nach Belastung…',
    hint: 'Wann und wie aufgetreten?',
  },
  {
    key: 'provocation',
    mnemonic: 'P',
    label: 'Provocation / Palliation',
    placeholder: 'verstärkt durch…, gelindert durch…',
    hint: 'Was verschlimmert, was lindert?',
  },
  {
    key: 'quality',
    mnemonic: 'Q',
    label: 'Quality (Charakter)',
    placeholder: 'drückend, stechend, brennend, reißend…',
  },
  {
    key: 'radiation',
    mnemonic: 'R',
    label: 'Radiation (Ausstrahlung)',
    placeholder: 'in Arm, Rücken, Unterkiefer, o.A. …',
  },
  {
    key: 'severity',
    mnemonic: 'S',
    label: 'Severity (Stärke, NRS 0–10)',
    placeholder: '7/10',
  },
  {
    key: 'time',
    mnemonic: 'T',
    label: 'Time (Dauer / Verlauf)',
    placeholder: 'seit 30 min, intermittierend, progredient…',
  },
];
