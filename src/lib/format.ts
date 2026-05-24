import type { Encounter, RedFlagState, RosState, ScoreResult } from '../types';
import { STATUS_SYSTEMS } from '../types';
import { SYMPTOMS_BY_KEY } from '../data/symptoms';
import { DIAGNOSES_BY_KEY } from '../data/diagnoses';
import { RED_FLAGS } from '../data/redFlags';
import { SCORES } from '../data/scores';
import { OPQRST_FIELDS } from '../data/opqrst';
import { STATUS_PALETTES } from '../data/status';
import {
  BILDGEBUNG_GROUPS,
  DIAGNOSTIK_SECTIONS,
  EKG_GROUPS,
  LABOR_GROUPS,
  POCUS_GROUPS,
  WEITERE_GROUPS,
  formatBgaInline,
} from '../data/diagnostik';
import type { ChipGroup, ChipSelection } from '../types';
import { ROS_CATEGORIES, ROS_BY_KEY } from '../data/ros';
import { TREATMENT_SECTIONS } from '../data/treatment';
import { formatTotal } from './score';

export type FormatMode = 'sap' | 'plain';
export type DetailMode = 'detailed' | 'compact';

export type SummaryOptions = {
  format?: FormatMode;
  detail?: DetailMode;
};

type Section = { title: string; body: string };

const renderSection = (s: Section, format: FormatMode): string => {
  const header = format === 'sap' ? `<u>${s.title}:</>` : `${s.title.toUpperCase()}:`;
  return `${header}\n${s.body}`;
};

const joinSections = (sections: Section[], format: FormatMode): string =>
  sections.map((s) => renderSection(s, format)).join('\n\n');

// ───────── Anamnese ─────────
function buildAnamnese(enc: Encounter): string {
  const lines: string[] = [];
  const sym = enc.leitsymptom ? SYMPTOMS_BY_KEY[enc.leitsymptom] : undefined;

  if (sym) {
    const opq: string[] = [];
    for (const f of OPQRST_FIELDS) {
      const v = enc.opqrst?.[f.key]?.trim();
      if (v) opq.push(`${f.mnemonic}: ${v}`);
    }
    lines.push(`Leitsymptom: ${sym.label}${opq.length ? ` (${opq.join(', ')})` : ''}.`);

    const answered = (sym.anamneseQuestions ?? [])
      .filter((q) => (enc.anamneseAnswers?.[q.key] ?? 'unknown') !== 'unknown')
      .map((q) => `${q.label.replace(/\?$/, '')}: ${enc.anamneseAnswers![q.key]}`);
    if (answered.length) lines.push(answered.join('. ') + '.');
  }
  const sampler = enc.sampler;
  if (sampler?.symptoms?.trim()) lines.push(`S: ${sampler.symptoms.trim()}.`);
  if (sampler?.event?.trim()) lines.push(`E: ${sampler.event.trim()}.`);
  if (sampler?.risiko?.trim()) lines.push(`R: ${sampler.risiko.trim()}.`);
  if (sampler?.lastMeal?.trim()) lines.push(`L: ${sampler.lastMeal.trim()}.`);

  const rosLine = buildRos(enc);
  if (rosLine) lines.push(rosLine);

  return lines.join(' ');
}

// ───────── Vitals ─────────
function buildVitals(enc: Encounter): string | null {
  const v = enc.vitals;
  if (!v) return null;
  const parts: string[] = [];
  const rrSys = v.rr_sys?.trim();
  const rrDia = v.rr_dia?.trim();
  if (rrSys || rrDia) parts.push(`RR ${rrSys ?? '?'}/${rrDia ?? '?'} mmHg`);
  if (v.hr?.trim()) parts.push(`HF ${v.hr.trim()}/min`);
  if (v.spo2?.trim()) parts.push(`SpO₂ ${v.spo2.trim()} %`);
  if (v.rr?.trim()) parts.push(`AF ${v.rr.trim()}/min`);
  if (v.temp?.trim()) parts.push(`Temp ${v.temp.trim()} °C`);
  if (v.o2_supp?.trim()) parts.push(`O₂: ${v.o2_supp.trim()}`);
  return parts.length ? parts.join('; ') : null;
}

// ───────── Status ─────────
function statusLine(enc: Encounter, sysKey: typeof STATUS_SYSTEMS[number]): string | null {
  const palette = STATUS_PALETTES[sysKey];
  const finding = enc.status?.[sysKey];
  const free = finding?.free?.trim();
  const picked = finding?.findings ?? [];
  if (picked.length === 0 && !free) return null;

  const labels: string[] = [];
  for (const g of palette.groups) {
    for (const c of g.chips) {
      if (picked.includes(c.key)) labels.push(c.label);
    }
  }
  const body = [labels.join(', '), free].filter(Boolean).join('; ');
  return `- ${palette.label}: ${body}`;
}

function buildStatus(enc: Encounter): string | null {
  const lines = STATUS_SYSTEMS.map((s) => statusLine(enc, s)).filter(
    (x): x is string => Boolean(x)
  );
  return lines.length ? lines.join('\n') : null;
}

// ───────── Diagnostik ─────────
/**
 * Render one ChipGroup's contribution.
 * Returns null when the group is empty.
 */
function renderChipGroup(g: ChipGroup, sel: ChipSelection | undefined): string | null {
  const s = sel?.[g.key];
  const chips = s?.chips ?? [];
  const num = s?.number?.trim();
  if (chips.length === 0 && !num) return null;

  const numPart = num && g.number ? `${num} ${g.number.unit}`.trim() : '';
  const chipPart = chips.join(', ');

  if (g.prefixed) {
    // group label comes first; number after label, chips after that
    const tail = [numPart, chipPart].filter(Boolean).join(', ');
    return `${g.label} ${tail}`.trim();
  }
  // no prefix — chips already self-explanatory ("SR", "normokard")
  // include number first so output reads "78/min, normokard"
  return [numPart, chipPart].filter(Boolean).join(', ');
}

function renderChipGroupsLine(groups: ChipGroup[], sel: ChipSelection | undefined): string {
  return groups
    .map((g) => renderChipGroup(g, sel))
    .filter((s): s is string => Boolean(s))
    .join('; ');
}

/** Bildgebung renders one line per group (so modalities stack visibly). */
function renderChipGroupsMultiline(
  groups: ChipGroup[],
  sel: ChipSelection | undefined
): string[] {
  const out: string[] = [];
  for (const g of groups) {
    const r = renderChipGroup(g, sel);
    if (r) out.push(`  · ${r}`);
  }
  return out;
}

/** Labor renders as a single plus-joined line in fixed group order. */
function renderLaborPlusJoined(sel: ChipSelection | undefined): string {
  if (!sel) return '';
  const parts: string[] = [];
  for (const g of LABOR_GROUPS) {
    const chips = sel[g.key]?.chips ?? [];
    for (const c of chips) parts.push(c);
  }
  return parts.join(' + ');
}

function buildDiagnostik(enc: Encounter): string | null {
  const d = enc.diagnostik;
  if (!d) return null;
  const lines: string[] = [];

  for (const sec of DIAGNOSTIK_SECTIONS) {
    if (sec.key === 'bga') {
      const inline = formatBgaInline(d.bgaValues);
      const free = d.bga?.trim();
      const combined = [inline, free].filter(Boolean).join('; ');
      if (combined) lines.push(`- ${sec.label}: ${combined}`);
      continue;
    }
    if (sec.key === 'ekg') {
      const struct = renderChipGroupsLine(EKG_GROUPS, d.ekgSel);
      const free = d.ekg?.trim();
      const combined = [struct, free].filter(Boolean).join('. ');
      if (combined) lines.push(`- ${sec.label}: ${combined}`);
      continue;
    }
    if (sec.key === 'labor') {
      const plus = renderLaborPlusJoined(d.laborSel);
      const free = d.labor?.trim();
      const combined = [plus, free].filter(Boolean).join(' · ');
      if (combined) lines.push(`- ${sec.label}: ${combined}`);
      continue;
    }
    if (sec.key === 'bildgebung') {
      const struct = renderChipGroupsMultiline(BILDGEBUNG_GROUPS, d.bildgebungSel);
      const free = d.bildgebung?.trim();
      if (struct.length === 0 && !free) continue;
      lines.push(`- ${sec.label}:`);
      for (const r of struct) lines.push(r);
      if (free) lines.push(`  ${free}`);
      continue;
    }
    if (sec.key === 'pocus') {
      const struct = renderChipGroupsMultiline(POCUS_GROUPS, d.pocusSel);
      const free = d.pocus?.trim();
      if (struct.length === 0 && !free) continue;
      lines.push(`- ${sec.label}:`);
      for (const r of struct) lines.push(r);
      if (free) lines.push(`  ${free}`);
      continue;
    }
    if (sec.key === 'weitere') {
      const struct = renderChipGroupsMultiline(WEITERE_GROUPS, d.weitereSel);
      const free = d.weitere?.trim();
      if (struct.length === 0 && !free) continue;
      lines.push(`- ${sec.label}:`);
      for (const r of struct) lines.push(r);
      if (free) lines.push(`  ${free}`);
      continue;
    }
  }
  return lines.length ? lines.join('\n') : null;
}

// ───────── ROS (organ-system review) ─────────
function buildRos(enc: Encounter): string | null {
  const ros = enc.ros;
  if (!ros) return null;
  const positive: string[] = [];
  const negative: string[] = [];
  for (const cat of ROS_CATEGORIES) {
    for (const item of cat.items) {
      const state: RosState = ros[item.key] ?? 'unknown';
      if (state === 'positive') positive.push(item.label);
      else if (state === 'negative') negative.push(item.label);
    }
  }
  const parts: string[] = [];
  if (positive.length) parts.push(`${positive.join(', ')}: positiv`);
  if (negative.length) parts.push(`${negative.join(', ')}: negativ`);
  return parts.length ? parts.join('. ') + '.' : null;
}

// silence unused import lint when ROS_BY_KEY only used in tests/integrity
void ROS_BY_KEY;

// ───────── Therapie ─────────
function buildTreatment(enc: Encounter): string | null {
  const lines: string[] = [];
  for (const sec of TREATMENT_SECTIONS) {
    const counts = enc.treatmentCounts?.[sec.key] ?? {};
    const countParts: string[] = [];
    for (const c of sec.chips) {
      const n = counts[c];
      if (n && n > 0) countParts.push(n === 1 ? `${c} ×1` : `${c} ×${n}`);
    }
    const free = enc.treatment?.[sec.key]?.trim();
    const combined = [countParts.join('; '), free].filter(Boolean).join(' · ');
    if (combined) lines.push(`- ${sec.label}: ${combined}`);
  }
  return lines.length ? lines.join('\n') : null;
}

// ───────── Red Flags (per-flag negativ/positiv) ─────────
function flagKeysFor(enc: Encounter): string[] {
  const set = new Set<string>();
  if (enc.leitsymptom) {
    for (const k of SYMPTOMS_BY_KEY[enc.leitsymptom]?.redFlagKeys ?? []) set.add(k);
  }
  for (const dx of enc.diagnoses ?? []) {
    for (const k of DIAGNOSES_BY_KEY[dx.key]?.redFlagKeys ?? []) set.add(k);
  }
  return Array.from(set);
}

function buildRedFlags(enc: Encounter): string | null {
  const keys = flagKeysFor(enc);
  if (keys.length === 0) return null;
  const lines: string[] = [];
  for (const k of keys) {
    const flag = RED_FLAGS[k];
    if (!flag) continue;
    const state: RedFlagState = enc.redFlags?.[k] ?? 'unknown';
    if (state === 'unknown') continue;
    const dx = flag.suspects.replace(/^V\.a\.\s*/i, '');
    const tag = state === 'positive' ? '⚠ positiv' : 'negativ';
    lines.push(`- ${flag.label} (${dx}): ${tag}`);
  }
  return lines.length ? lines.join('\n') : null;
}

// ───────── Scores ─────────
function buildScores(enc: Encounter, detail: DetailMode): string | null {
  const entries = Object.entries(enc.scoreResults ?? {});
  if (entries.length === 0) return null;
  const blocks: string[] = [];
  for (const [key, result] of entries as [string, ScoreResult][]) {
    const def = SCORES[key];
    if (!def) continue;
    const head = `- ${def.label}: ${formatTotal(result.total)} (${result.band} – ${result.meaning})`;
    if (detail === 'compact') {
      blocks.push(head);
      continue;
    }
    const items: string[] = [head];
    for (const item of def.items) {
      const p = result.picked[item.key];
      if (!p) continue;
      const pts = p.points >= 0 ? `+${p.points}` : `${p.points}`;
      items.push(`  • ${item.label}: ${p.label} (${pts})`);
    }
    blocks.push(items.join('\n'));
  }
  return blocks.join('\n');
}

// ───────── Differentialdiagnose (Hypothesen + DDx kombiniert) ─────────
function buildDifferentialdiagnose(enc: Encounter): string | null {
  const lines: string[] = [];

  // Active hypotheses first
  const activeDxKeys = new Set<string>();
  for (const dx of enc.diagnoses ?? []) {
    const isFreeText = !!dx.freeText;
    const def = isFreeText ? null : DIAGNOSES_BY_KEY[dx.key];
    if (!isFreeText && !def) continue;
    if (dx.key) activeDxKeys.add(dx.key);
    const label = dx.freeText ?? def!.label;
    const statusLabel =
      dx.status === 'confirmed'
        ? 'bestätigt'
        : dx.status === 'excluded'
          ? 'ausgeschlossen'
          : 'V.a.';
    const sev = def?.severityClassifier?.(enc) ?? null;
    const sevPart = sev
      ? ` (${sev.stage}${sev.basedOn.length ? ' — ' + sev.basedOn.join(', ') : ''})`
      : '';
    const tagPart = isFreeText ? ' (Freitext)' : '';
    const note = dx.note?.trim() ? ` — ${dx.note.trim()}` : '';
    lines.push(`- ${label}${tagPart}: ${statusLabel}${sevPart}${note}`);
  }

  // Structured DDx (skip if already covered by an active hypothesis)
  if (enc.leitsymptom) {
    const sym = SYMPTOMS_BY_KEY[enc.leitsymptom];
    if (sym) {
      for (const d of sym.differentials) {
        const state = enc.differentials?.[d.key] ?? 'unknown';
        if (state === 'unknown') continue;
        if (d.diagnosisKey && activeDxKeys.has(d.diagnosisKey)) continue;
        const tag = state === 'positive' ? 'wahrscheinlich' : 'ausgeschlossen';
        lines.push(`- ${d.label}: ${tag}`);
      }
    }
  }

  if (enc.differentialsFree?.trim()) lines.push(`- Weitere: ${enc.differentialsFree.trim()}`);
  return lines.length ? lines.join('\n') : null;
}

// ───────── Entlassungskriterien (per nicht-ausgeschlossener Diagnose) ─────────
function buildDischarge(enc: Encounter): string | null {
  const active = (enc.diagnoses ?? []).filter((d) => d.status !== 'excluded');
  if (active.length === 0) return null;
  const blocks: string[] = [];
  for (const dx of active) {
    const def = DIAGNOSES_BY_KEY[dx.key];
    if (!def || def.dischargeRules.length === 0) continue;
    const sev = def.severityClassifier?.(enc) ?? null;
    const statusTag = dx.status === 'confirmed' ? 'bestätigt' : 'V.a.';
    const sevPart = sev
      ? ` — ${sev.stage}${sev.basedOn.length ? ' (' + sev.basedOn.join(', ') + ')' : ''}`
      : '';
    const header = `${def.label} [${statusTag}]${sevPart}`;
    const lines = [header];
    def.dischargeRules.forEach((rule, idx) => {
      const checked = !!enc.dischargeChecked?.[`${dx.key}:${idx}`];
      lines.push(`- ${checked ? '☑' : '☐'} ${rule}`);
    });
    blocks.push(lines.join('\n'));
  }
  return blocks.length ? blocks.join('\n\n') : null;
}

// ───────── Prozedere ─────────
function buildProzedere(enc: Encounter): string | null {
  const chips = enc.prozedereChips ?? [];
  const text = enc.prozedere?.trim();
  if (chips.length === 0 && !text) return null;
  const lines: string[] = [];
  for (const c of chips) lines.push(`- ${c}`);
  if (text) lines.push(text);
  return lines.join('\n');
}

// ───────── Top-level ─────────
export function buildSummary(enc: Encounter, options: SummaryOptions = {}): string {
  const format: FormatMode = options.format ?? 'sap';
  const detail: DetailMode = options.detail ?? 'detailed';
  const sampler = enc.sampler;

  const sections: Section[] = [];

  const anamnese = buildAnamnese(enc);
  if (anamnese) sections.push({ title: 'Anamnese', body: anamnese });

  const vitals = buildVitals(enc);
  if (vitals) sections.push({ title: 'Vitalwerte', body: vitals });



  if (sampler?.allergien?.trim())
    sections.push({ title: 'A – Allergien', body: sampler.allergien.trim() });
  if (sampler?.medikation?.trim())
    sections.push({ title: 'M – Dauermedikation', body: sampler.medikation.trim() });
  if (sampler?.vorerkrankungen?.trim())
    sections.push({ title: 'P – Vordiagnosen', body: sampler.vorerkrankungen.trim() });
  if (sampler?.voroperationen?.trim())
    sections.push({ title: 'P – Voroperationen', body: sampler.voroperationen.trim() });

  const status = buildStatus(enc);
  if (status) sections.push({ title: 'Status', body: status });

  const diagnostik = buildDiagnostik(enc);
  if (diagnostik) sections.push({ title: 'Diagnostik', body: diagnostik });

  const treatment = buildTreatment(enc);
  if (treatment) sections.push({ title: 'Therapie', body: treatment });

  const redFlags = buildRedFlags(enc);
  if (redFlags) sections.push({ title: 'Red Flags', body: redFlags });

  const scores = buildScores(enc, detail);
  if (scores) sections.push({ title: 'Scores', body: scores });

  const ddx = buildDifferentialdiagnose(enc);
  if (ddx) sections.push({ title: 'Differentialdiagnose', body: ddx });

  const discharge = buildDischarge(enc);
  if (discharge) sections.push({ title: 'Entlassungskriterien', body: discharge });

  const prozedere = buildProzedere(enc);
  if (prozedere) sections.push({ title: 'Prozedere', body: prozedere });

  return joinSections(sections, format);
}
