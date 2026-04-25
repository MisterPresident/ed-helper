import { useEncounters } from '../store/encounters';

export function Home() {
  const create = useEncounters((s) => s.createEncounter);

  return (
    <div className="flex-1 grid place-items-center p-6">
      <div className="max-w-xl w-full text-center">
        <h2 className="text-xl font-semibold mb-2">Neuen Patienten anlegen</h2>
        <p className="text-sm text-slate-500 mb-6">
          Zwei Pfade: entweder über das Leitsymptom (Workup) oder direkt über die
          Verdachtsdiagnose (z.&nbsp;B. Hypoglykämie).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            className="card hover:border-slate-900 text-left transition"
            onClick={() => create({ pathway: 'symptom' })}
          >
            <div className="text-lg font-semibold">+ Leitsymptom</div>
            <p className="text-sm text-slate-500 mt-1">
              OPQRST → Red Flags → DDx → Score → SAMPLER → Status → Diagnostik → Prozedere.
            </p>
          </button>
          <button
            className="card hover:border-slate-900 text-left transition"
            onClick={() => create({ pathway: 'diagnosis' })}
          >
            <div className="text-lg font-semibold">+ Leitdiagnose</div>
            <p className="text-sm text-slate-500 mt-1">
              ROS → Red Flags → Score → SAMPLER → Status → Diagnostik →
              Entlassungskriterien → Prozedere.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
