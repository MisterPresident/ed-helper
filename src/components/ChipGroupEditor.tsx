import type { ChipGroup, ChipGroupSelection } from '../types';

function isAbnormal(g: ChipGroup, raw: string | undefined): boolean {
  if (!g.number || !raw || !raw.trim()) return false;
  const n = Number(raw.replace(',', '.'));
  if (Number.isNaN(n)) return false;
  if (g.number.refLow !== undefined && n < g.number.refLow) return true;
  if (g.number.refHigh !== undefined && n > g.number.refHigh) return true;
  return false;
}

export function ChipGroupEditor({
  group,
  selection,
  onChange,
}: {
  group: ChipGroup;
  selection: ChipGroupSelection | undefined;
  onChange: (chips: string[], number?: string) => void;
}) {
  const chips = selection?.chips ?? [];
  const number = selection?.number ?? '';
  const abnormal = isAbnormal(group, number);

  const toggle = (chip: string) => {
    if (group.mode === 'single') {
      const next = chips.includes(chip) ? [] : [chip];
      onChange(next, number);
      return;
    }
    const next = chips.includes(chip)
      ? chips.filter((c) => c !== chip)
      : [...chips, chip];
    onChange(next, number);
  };

  return (
    <div className="grid grid-cols-[7rem_1fr_auto] gap-2 items-start py-1.5">
      <div className="text-xs font-semibold text-slate-700 pt-1">{group.label}</div>
      <div className="flex flex-wrap gap-1">
        {group.chips.map((c) => {
          const active = chips.includes(c);
          return (
            <button
              key={c}
              onClick={() => toggle(c)}
              className={`chip ${
                active
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'border-slate-300 hover:bg-slate-100'
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
      {group.number ? (
        <div className="flex items-center gap-1">
          <input
            inputMode="decimal"
            className={`w-16 rounded-md border px-2 py-1 text-sm tabular-nums outline-none ${
              abnormal
                ? 'border-danger-600 bg-danger-50 text-danger-700 focus:border-danger-700'
                : 'border-slate-300 focus:border-slate-900'
            }`}
            placeholder={group.number.placeholder}
            value={number}
            onChange={(e) => onChange(chips, e.target.value)}
          />
          <span className="text-xs text-slate-500">{group.number.unit}</span>
        </div>
      ) : (
        <span />
      )}
    </div>
  );
}
