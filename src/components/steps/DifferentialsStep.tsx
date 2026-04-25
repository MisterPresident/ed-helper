import type { DifferentialState, Encounter } from '../../types';
import { SYMPTOMS_BY_KEY } from '../../data/symptoms';
import { useEncounters } from '../../store/encounters';

const cycle: Record<DifferentialState, DifferentialState> = {
  unknown: 'excluded',
  excluded: 'positive',
  positive: 'unknown',
};

const labels: Record<DifferentialState, string> = {
  unknown: 'offen',
  excluded: 'ausgeschlossen',
  positive: 'wahrscheinlich',
};

const styles: Record<DifferentialState, string> = {
  unknown: 'border-slate-300 bg-white text-slate-600 hover:bg-slate-100',
  excluded: 'border-ok-600 bg-ok-50 text-ok-700',
  positive: 'border-danger-600 bg-danger-50 text-danger-700',
};

export function DifferentialsStep({
  enc,
  onAdvance,
  onBack,
}: {
  enc: Encounter;
  onAdvance: () => void;
  onBack: () => void;
}) {
  const setDD = useEncounters((s) => s.setDifferential);
  const setFree = useEncounters((s) => s.setDifferentialsFree);

  const sym = enc.leitsymptom ? SYMPTOMS_BY_KEY[enc.leitsymptom] : undefined;
  const ddx = sym?.differentials ?? [];

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3 gap-3">
        <div>
          <h3 className="text-base font-semibold">Differentialdiagnose</h3>
          <p className="text-sm text-slate-500">
            Klick zyklisch: offen → ausgeschlossen → wahrscheinlich → offen.
          </p>
        </div>
        {sym?.algorithmUrl && (
          <a
            href={sym.algorithmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs whitespace-nowrap"
          >
            🔗 Algorithmus
          </a>
        )}
      </div>

      {ddx.length === 0 ? (
        <p className="text-sm text-slate-500">
          Für dieses Leitsymptom sind (noch) keine Standard-DDx hinterlegt.
        </p>
      ) : (
        <div className="space-y-1.5">
          {ddx.map((d) => {
            const state: DifferentialState = enc.differentials?.[d.key] ?? 'unknown';
            return (
              <button
                key={d.key}
                onClick={() => setDD(enc.id, d.key, cycle[state])}
                className={`w-full text-left rounded-md border px-3 py-2 transition ${styles[state]}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-medium text-sm">{d.label}</div>
                    {d.hint && <div className="text-xs opacity-75">{d.hint}</div>}
                  </div>
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-wide">
                    {labels[state]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <label className="block mt-4">
        <span className="text-sm font-medium">Weitere DDx (Freitext)</span>
        <textarea
          rows={2}
          className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-900"
          placeholder="z.B. Costochondritis, Herpes zoster…"
          value={enc.differentialsFree ?? ''}
          onChange={(e) => setFree(enc.id, e.target.value)}
        />
      </label>

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
