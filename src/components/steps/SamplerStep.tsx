import type { Encounter } from '../../types';
import { SAMPLER_FIELDS } from '../../data/sampler';
import { useEncounters } from '../../store/encounters';

export function SamplerStep({
  enc,
  onAdvance,
  onBack,
}: {
  enc: Encounter;
  onAdvance: () => void;
  onBack: () => void;
}) {
  const patch = useEncounters((s) => s.patchSampler);

  return (
    <div className="card">
      <h3 className="text-base font-semibold mb-1">SAMPLER</h3>
      <p className="text-sm text-slate-500 mb-3">
        Symptome · Allergien · Medikation · Vorerkrankungen · letzte Mahlzeit · Ereignis ·
        Risikofaktoren.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {SAMPLER_FIELDS.map((f) => (
          <label key={f.key} className="block md:col-span-1">
            <span className="text-sm font-medium">{f.label}</span>
            <textarea
              rows={2}
              className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-900"
              placeholder={f.placeholder}
              value={enc.sampler?.[f.key] ?? ''}
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
