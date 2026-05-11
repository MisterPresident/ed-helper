export type EncounterId = string;

export type WorkflowStep =
  | 'leitsymptom'
  | 'ros'
  | 'opqrst'
  | 'differentials'
  | 'score'
  | 'status'
  | 'diagnostik'
  | 'treatment'
  | 'discharge'
  | 'prozedere'
  | 'summary';

export type SymptomKey = string;
export type DiagnosisKey = string;
export type RedFlagKey = string;
export type ScoreKey = string;

export type StatusSystemKey =
  | 'cns'
  | 'cor'
  | 'pulmo'
  | 'ws'
  | 'flanken'
  | 'extremitaeten'
  | 'abdomen';

// Status order in the rendered report.
export const STATUS_SYSTEMS: StatusSystemKey[] = [
  'cns',
  'cor',
  'pulmo',
  'abdomen',
  'ws',
  'flanken',
  'extremitaeten',
];

export type OPQRST = {
  onset: string;
  provocation: string;
  quality: string;
  radiation: string;
  severity: string;
  time: string;
};

export type SAMPLER = {
  symptoms: string;
  allergien: string;
  medikation: string;
  vorerkrankungen: string;
  voroperationen: string;
  lastMeal: string;
  event: string;
  risiko: string;
};

export type Vitals = {
  rr_sys: string;
  rr_dia: string;
  hr: string;
  spo2: string;
  rr: string;
  temp: string;
  o2_supp: string;
};

export type RedFlagState = 'positive' | 'excluded' | 'unknown';

export type RedFlag = {
  key: RedFlagKey;
  label: string;
  suspects: string;
  action?: string;
};

export type ScoreItemOption = {
  label: string;
  points: number;
};

export type ScoreItem = {
  key: string;
  label: string;
  hint?: string;
  options: ScoreItemOption[];
};

export type ScoreInterpretation = {
  band: string;
  meaning: string;
};

export type ScoreDef = {
  key: ScoreKey;
  label: string;
  mdcalcUrl: string;
  reference?: string;
  items: ScoreItem[];
  interpret: (total: number) => ScoreInterpretation;
};

export type ScorePickedItem = {
  optionIndex: number;
  label: string;
  points: number;
};

export type ScoreResult = {
  picked: Record<string, ScorePickedItem>;
  total: number;
  band: string;
  meaning: string;
};

export type StatusSystemFinding = {
  systemKey: StatusSystemKey;
  findings: string[];
  free?: string;
};

export type StatusFindings = Partial<Record<StatusSystemKey, StatusSystemFinding>>;

export type DifferentialDx = {
  key: string;
  label: string;
  hint?: string;
  /** Optional link from a DDx item to a full DiagnosisDef so it can be
   * promoted into the active-diagnoses list with one click. */
  diagnosisKey?: DiagnosisKey;
};

export type DifferentialState = 'positive' | 'excluded' | 'unknown';

// ───────── ROS (organ-system review) ─────────
export type RosState = 'positive' | 'negative' | 'unknown';

export type RosCategoryKey =
  | 'konstitutionell'
  | 'augen'
  | 'hno'
  | 'cardiovaskulaer'
  | 'respiratorisch'
  | 'gastrointestinal'
  | 'urogenital'
  | 'muskuloskelettal'
  | 'haut'
  | 'neurologisch'
  | 'psychiatrisch'
  | 'endokrin'
  | 'haematologisch'
  | 'allergisch';

export type RosItem = {
  key: string;
  label: string;
  category: RosCategoryKey;
};

export type RosCategoryDef = {
  key: RosCategoryKey;
  label: string;
  items: RosItem[];
};

export type AnamneseQuestion = {
  key: string;
  label: string;
};

export type AnamneseAnswer = 'ja' | 'nein' | 'unknown';

export type SymptomDef = {
  key: SymptomKey;
  label: string;
  usesOPQRST: boolean;
  recommendedScores: ScoreKey[];
  redFlagKeys: RedFlagKey[];
  differentials: DifferentialDx[];
  algorithmUrl?: string;
  highlightedRosKeys?: string[];
  anamneseQuestions?: AnamneseQuestion[];
};

// ───────── Severity classifiers ─────────
export type SeverityTier = 'mild' | 'moderate' | 'severe' | 'critical';

export type SeverityResult = {
  stage: string;
  label: string;
  basedOn: string[];
  severity: SeverityTier;
};

export type DiagnosisDef = {
  key: DiagnosisKey;
  label: string;
  redFlagKeys: RedFlagKey[];
  recommendedScores: ScoreKey[];
  dischargeRules: string[];
  treatmentUrl?: string;
  highlightedRosKeys?: string[];
  /** Pure function: read encounter values, derive a clinical stage. */
  severityClassifier?: (enc: Encounter) => SeverityResult | null;
};

// ───────── Active diagnoses (parallel hypothesis workup) ─────────
export type DxStatus = 'suspected' | 'confirmed' | 'excluded';

export type ActiveDiagnosis = {
  key: DiagnosisKey;
  status: DxStatus;
  addedAt: number;
  note?: string;
  /** Wenn gesetzt → render `freeText` als Label statt DiagnosisDef-Lookup; key beginnt
   * dann mit `free:` und es gibt keine Severity / dischargeRules. */
  freeText?: string;
};

// ───────── Diagnostik (incl. structured BGA) ─────────
export type BgaValues = {
  ph: string;
  pco2: string;
  po2: string;
  hco3: string;
  be: string;
  lac: string;
  na: string;
  k: string;
  glc: string;
  hb: string;
  creat: string;
};

export type ChipGroupMode = 'single' | 'multi';

export type ChipGroupNumber = {
  unit: string;
  placeholder: string;
  refLow?: number;
  refHigh?: number;
};

export type ChipGroup = {
  key: string;
  label: string;
  mode: ChipGroupMode;
  /** prefix output with the group label: 'schmal' → 'QRS schmal'. default false */
  prefixed?: boolean;
  chips: string[];
  /** optional inline numeric input next to the chips */
  number?: ChipGroupNumber;
};

export type ChipGroupSelection = {
  chips: string[];
  number?: string;
};

/** keyed by ChipGroup.key */
export type ChipSelection = Record<string, ChipGroupSelection>;

export type Diagnostik = {
  ekg: string;
  ekgSel: ChipSelection;
  ekgChanges: boolean; // hyperkalemic ECG changes (drives Hyperkaliämie classifier)
  bga: string;
  bgaValues: Partial<BgaValues>;
  labor: string;
  laborSel: ChipSelection;
  bildgebung: string;
  bildgebungSel: ChipSelection;
  pocus: string;
  pocusSel: ChipSelection;
  weitere: string;
  weitereSel: ChipSelection;
};

export type Treatment = {
  analgetika: string;
  antibiotika: string;
  antiepileptika: string;
  antikoagulation: string;
  kardiovaskulaer: string;
  infusionen: string;
  weitere: string;
};

export type TreatmentCounts = Partial<Record<keyof Treatment, Record<string, number>>>;

export type Encounter = {
  id: EncounterId;
  label: string;
  createdAt: number;
  step: WorkflowStep;
  leitsymptom?: SymptomKey;
  /** active hypotheses, parallel to leitsymptom; user adds/removes during workup */
  diagnoses?: ActiveDiagnosis[];
  vitals?: Partial<Vitals>;
  opqrst?: Partial<OPQRST>;
  ros?: Record<string, RosState>;
  redFlags?: Record<RedFlagKey, RedFlagState>;
  differentials?: Record<string, DifferentialState>;
  differentialsFree?: string;
  scoreResults?: Record<ScoreKey, ScoreResult>;
  sampler?: Partial<SAMPLER>;
  status?: StatusFindings;
  diagnostik?: Partial<Diagnostik>;
  treatment?: Partial<Treatment>;
  treatmentCounts?: TreatmentCounts;
  /** discharge checks per diagnosis: keyed `${diagnosisKey}:${ruleIdx}` */
  dischargeChecked?: Record<string, boolean>;
  prozedere?: string;
  prozedereChips?: string[];
  notes?: string;
  anamneseAnswers?: Record<string, AnamneseAnswer>;
};
