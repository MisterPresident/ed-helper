/** Parse a German-or-English-formatted number string. Returns null if missing/invalid. */
export function num(raw: string | undefined): number | null {
  if (raw === undefined || raw === null) return null;
  const t = raw.trim();
  if (!t) return null;
  const n = Number(t.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
}
