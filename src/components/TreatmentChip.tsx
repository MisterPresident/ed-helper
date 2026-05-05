type Props = {
  label: string;
  count: number;
  onChange: (next: number) => void;
};

/**
 * Counter chip: left-click → +1, right-click → −1 (clamped to 0).
 * Also exposes ± buttons for accessibility / touch.
 */
export function TreatmentChip({ label, count, onChange }: Props) {
  const active = count > 0;
  return (
    <span
      className={`inline-flex items-stretch rounded-full border overflow-hidden text-sm select-none ${
        active
          ? 'border-slate-900 bg-slate-900 text-white'
          : 'border-slate-300 bg-white hover:bg-slate-100'
      }`}
    >
      <button
        className="px-3 py-1"
        onClick={() => onChange(count + 1)}
        onContextMenu={(e) => {
          e.preventDefault();
          onChange(Math.max(0, count - 1));
        }}
        title="Klick: +1 · Rechtsklick: −1"
      >
        {label}
        {active && (
          <span
            className={`ml-1.5 text-xs font-semibold ${
              active ? 'text-slate-200' : 'text-slate-500'
            }`}
          >
            ×{count}
          </span>
        )}
      </button>
      {active && (
        <button
          className={`px-1.5 border-l ${
            active ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-300 hover:bg-slate-100'
          }`}
          onClick={() => onChange(Math.max(0, count - 1))}
          title="−1"
        >
          −
        </button>
      )}
    </span>
  );
}
