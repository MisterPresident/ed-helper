import type { Encounter } from '../../types';
import { DIAGNOSES_BY_KEY } from '../../data/diagnoses';
import { useEncounters } from '../../store/encounters';

export function RosStep({
  enc,
  onAdvance,
  onBack,
}: {
  enc: Encounter;
  onAdvance: () => void;
  onBack: () => void;
}) {
  const setROS = useEncounters((s) => s.setROS);
  const dx = enc.leitdiagnose ? DIAGNOSES_BY_KEY[enc.leitdiagnose] : undefined;

  if (!dx) {
    return (
      <div className="card">
        <p className="text-sm text-slate-500">Keine Leitdiagnose gewählt.</p>
        <div className="mt-4 flex justify-between">
          <button className="btn-outline" onClick={onBack}>
            ← Zurück
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-base font-semibold mb-1">Review of Symptoms – {dx.label}</h3>
      <p className="text-sm text-slate-500 mb-3">
        Was war vorhanden, was nicht? Gecheckt = Patient bejaht. (Nicht angeklickt = nicht
        erfragt / negativ.)
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {dx.reviewOfSymptoms.map((item, idx) => {
          const key = `ros_${idx}`;
          const checked = !!enc.rosChecked?.[key];
          return (
            <label
              key={key}
              className={`flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer ${
                checked
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-300 bg-white hover:bg-slate-100'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setROS(enc.id, key, e.target.checked)}
                className="accent-slate-900"
              />
              <span className="text-sm">{item}</span>
            </label>
          );
        })}
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
