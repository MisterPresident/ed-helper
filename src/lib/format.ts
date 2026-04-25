import type { Encounter, RedFlagState, ScoreResult } from '../types';
import { STATUS_SYSTEMS } from '../types';
import { SYMPTOMS_BY_KEY } from '../data/symptoms';
import { DIAGNOSES_BY_KEY } from '../data/diagnoses';
import { RED_FLAGS } from '../data/redFlags';
import { SCORES } from '../data/scores';
import { OPQRST_FIELDS } from '../data/opqrst';
import { STATUS_PALETTES } from '../data/status';
import { DIAGNOSTIK_SECTIONS } from '../data/diagnostik';
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
  const dx = enc.leitdiagnose ? DIAGNOSES_BY_KEY[enc.leitdiagnose] : undefined;

  if (sym) {
    const opq: string[] = [];
    for (const f of OPQRST_FIELDS) {
      const v = enc.opqrst?.[f.key]?.trim();
      if (v) opq.push(v);
    }
    lines.push(`Leitsymptom: ${sym.label}${opq.length ? ` (${opq.join(', ')})` : ''}.`);
  }
  if (dx) {
    lines.push(`Leitdiagnose: ${dx.label}.`);
    const pos = dx.reviewOfSymptoms.filter((_, idx) => enc.rosChecked?.[`ros_${idx}`]);
    if (pos.length) lines.push(`Vorhanden: ${pos.join(', ')}.`);
  }
  const sampler = enc.sampler;
  if (sampler?.symptoms?.trim()) lines.push(sampler.symptoms.trim());
  if (sampler?.event?.trim()) lines.push(`Ereignis: ${sampler.event.trim()}.`);
  if (sampler?.risiko?.trim()) lines.push(`Risikofaktoren: ${sampler.risiko.trim()}.`);
  if (sampler?.lastMeal?.trim()) lines.push(`Letzte Mahlzeit: ${sampler.lastMeal.trim()}.`);

  return lines.join(' ');
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
function buildDiagnostik(enc: Encounter): string | null {
  const lines: string[] = [];
  for (const sec of DIAGNOSTIK_SECTIONS) {
    const v = enc.diagnostik?.[sec.key]?.trim();
    if (v) lines.push(`- ${sec.label}: ${v}`);
  }
  return lines.length ? lines.join('\n') : null;
}

// ───────── Therapie ─────────
function buildTreatment(enc: Encounter): string | null {
  const lines: string[] = [];
  for (const sec of TREATMENT_SECTIONS) {
    const v = enc.treatment?.[sec.key]?.trim();
    if (v) lines.push(`- ${sec.label}: ${v}`);
  }
  return lines.length ? lines.join('\n') : null;
}

// ───────── Red Flags (per-flag negativ/positiv) ─────────
function flagKeysFor(enc: Encounter): string[] {
  if (enc.pathway === 'diagnosis' && enc.leitdiagnose) {
    return DIAGNOSES_BY_KEY[enc.leitdiagnose]?.redFlagKeys ?? [];
  }
  if (enc.pathway === 'symptom' && enc.leitsymptom) {
    return SYMPTOMS_BY_KEY[enc.leitsymptom]?.redFlagKeys ?? [];
  }
  return [];
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

// ───────── DDx ─────────
function buildDDx(enc: Encounter): string | null {
  if (enc.pathway !== 'symptom' || !enc.leitsymptom) {
    return enc.differentialsFree?.trim() || null;
  }
  const sym = SYMPTOMS_BY_KEY[enc.leitsymptom];
  if (!sym) return null;
  const lines: string[] = [];
  for (const d of sym.differentials) {
    const state = enc.differentials?.[d.key] ?? 'unknown';
    if (state === 'unknown') continue;
    const tag = state === 'positive' ? 'wahrscheinlich' : 'ausgeschlossen';
    lines.push(`- ${d.label}: ${tag}`);
  }
  if (enc.differentialsFree?.trim()) lines.push(`- Weitere: ${enc.differentialsFree.trim()}`);
  return lines.length ? lines.join('\n') : null;
}

// ───────── Entlassungskriterien (Diagnose-Pfad) ─────────
function buildDischarge(enc: Encounter): string | null {
  if (enc.pathway !== 'diagnosis' || !enc.leitdiagnose) return null;
  const dx = DIAGNOSES_BY_KEY[enc.leitdiagnose];
  if (!dx || dx.dischargeRules.length === 0) return null;
  const lines = dx.dischargeRules.map((rule, idx) => {
    const checked = !!enc.dischargeChecked?.[`dc_${idx}`];
    return `- ${checked ? '☑' : '☐'} ${rule}`;
  });
  return lines.join('\n');
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

  if (sampler?.allergien?.trim())
    sections.push({ title: 'Allergien', body: sampler.allergien.trim() });
  if (sampler?.medikation?.trim())
    sections.push({ title: 'Dauermedikation', body: sampler.medikation.trim() });
  if (sampler?.vorerkrankungen?.trim())
    sections.push({ title: 'Vordiagnosen', body: sampler.vorerkrankungen.trim() });
  if (sampler?.voroperationen?.trim())
    sections.push({ title: 'Voroperationen', body: sampler.voroperationen.trim() });

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

  const ddx = buildDDx(enc);
  if (ddx) sections.push({ title: 'Differentialdiagnose', body: ddx });

  const discharge = buildDischarge(enc);
  if (discharge) sections.push({ title: 'Entlassungskriterien', body: discharge });

  const prozedere = buildProzedere(enc);
  if (prozedere) sections.push({ title: 'Prozedere', body: prozedere });

  return joinSections(sections, format);
}
