import type { ScoreDef, ScoreResult } from '../types';

export function computeResult(
  def: ScoreDef,
  picked: Record<string, number>
): ScoreResult {
  const pickedMap: ScoreResult['picked'] = {};
  let total = 0;
  for (const item of def.items) {
    const idx = picked[item.key];
    if (idx === undefined) continue;
    const opt = item.options[idx];
    if (!opt) continue;
    pickedMap[item.key] = {
      optionIndex: idx,
      label: opt.label,
      points: opt.points,
    };
    total += opt.points;
  }
  const { band, meaning } = def.interpret(total);
  return { picked: pickedMap, total, band, meaning };
}

export function isComplete(def: ScoreDef, picked: Record<string, number>): boolean {
  return def.items.every((it) => picked[it.key] !== undefined);
}

export function formatTotal(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
}
