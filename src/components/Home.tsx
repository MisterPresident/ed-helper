import { useEncounters } from '../store/encounters';

export function Home() {
  const create = useEncounters((s) => s.createEncounter);

  return (
    <div className="flex-1 grid place-items-center p-4 md:p-6">
      <div className="max-w-xl w-full text-center">
        <h2 className="text-xl font-semibold mb-2">Neuen Patienten anlegen</h2>
        <p className="text-sm text-slate-500 mb-6">
          Workflow: Leitsymptom → OPQRST → ROS → DDx → Scores → Status → Diagnostik →
          Therapie → Entlassung → Prozedere. Verdachtsdiagnosen werden parallel im
          Hypothesen-Strip geführt.
        </p>
        <button className="btn-primary text-base px-6 py-3 w-full md:w-auto" onClick={() => create()}>
          + Patient anlegen
        </button>
      </div>
    </div>
  );
}
