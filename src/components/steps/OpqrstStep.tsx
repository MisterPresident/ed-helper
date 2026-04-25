import type { Encounter } from '../../types';
import { OPQRST_FIELDS } from '../../data/opqrst';
import { useEncounters } from '../../store/encounters';

export function OpqrstStep({
  enc,
  onAdvance,
  onBack,
}: {
  enc: Encounter;
  onAdvance: () => void;
  onBack: () => void;
}) {
  const patch = useEncounters((s) => s.patchOpqrst);

  return (
    <div className="card">
      <h3 className="text-base font-semibold mb-1">OPQRST</h3>
      <p className="text-sm text-slate-500 mb-3">
        Charakterisierung des Schmerzes / Beschwerdebildes. Felder können frei bleiben.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {OPQRST_FIELDS.map((f) => (
          <label key={f.key} className="block">
            <span className="text-sm font-medium">{f.label}</span>
            {f.hint && (
              <span className="block text-xs text-slate-500">{f.hint}</span>
            )}
            <input
              type="text"
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-900"
              placeholder={f.placeholder}
              value={enc.opqrst?.[f.key] ?? ''}
              onChange={(e) => patch(enc.id, { [f.key]: e.target.value })}
            />
          </label>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button className="btn-outline" onClick={onBack}>
          ← Zurück
        </button>
        <button className="btn-primary" onClick={onAdvance}>
          Weiter →
        </button>
      </div>
    </div>
  );
}
