import type { Encounter } from '../../types';
import { SYMPTOMS } from '../../data/symptoms';
import { useEncounters } from '../../store/encounters';

export function LeitsymptomStep({ enc, onAdvance }: { enc: Encounter; onAdvance: () => void }) {
  const setLeitsymptom = useEncounters((s) => s.setLeitsymptom);

  return (
    <div className="card">
      <h3 className="text-base font-semibold mb-3">Leitsymptom wählen</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {SYMPTOMS.map((sym) => {
          const active = enc.leitsymptom === sym.key;
          return (
            <button
              key={sym.key}
              className={`rounded-md border px-3 py-3 md:py-2 text-sm text-left transition min-h-[2.75rem] ${
                active
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-300 bg-white hover:bg-slate-100'
              }`}
              onClick={() => {
                setLeitsymptom(enc.id, sym.key);
              }}
            >
              {sym.label}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className="btn-primary w-full md:w-auto"
          disabled={!enc.leitsymptom}
          onClick={onAdvance}
        >
          Weiter →
        </button>
      </div>
    </div>
  );
}
