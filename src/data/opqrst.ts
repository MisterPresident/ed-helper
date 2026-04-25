export type OpqrstField = {
  key: 'onset' | 'provocation' | 'quality' | 'radiation' | 'severity' | 'time';
  label: string;
  placeholder: string;
  hint?: string;
};

export const OPQRST_FIELDS: OpqrstField[] = [
  {
    key: 'onset',
    label: 'Onset (Beginn)',
    placeholder: 'akut, schleichend, nach Belastung…',
    hint: 'Wann und wie aufgetreten?',
  },
  {
    key: 'provocation',
    label: 'Provocation / Palliation',
    placeholder: 'verstärkt durch…, gelindert durch…',
    hint: 'Was verschlimmert, was lindert?',
  },
  {
    key: 'quality',
    label: 'Quality (Charakter)',
    placeholder: 'drückend, stechend, brennend, reißend…',
  },
  {
    key: 'radiation',
    label: 'Radiation (Ausstrahlung)',
    placeholder: 'in Arm, Rücken, Unterkiefer, o.A. …',
  },
  {
    key: 'severity',
    label: 'Severity (Stärke, NRS 0–10)',
    placeholder: '7/10',
  },
  {
    key: 'time',
    label: 'Time (Dauer / Verlauf)',
    placeholder: 'seit 30 min, intermittierend, progredient…',
  },
];
