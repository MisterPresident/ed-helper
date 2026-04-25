import type { Encounter } from '../../types';
import { DIAGNOSES } from '../../data/diagnoses';
import { useEncounters } from '../../store/encounters';

export function LeitdiagnoseStep({
  enc,
  onAdvance,
}: {
  enc: Encounter;
  onAdvance: () => void;
}) {
  const setDx = useEncounters((s) => s.setLeitdiagnose);

  return (
    <div className="card">
      <h3 className="text-base font-semibold mb-3">Leitdiagnose wählen</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {DIAGNOSES.map((d) => {
          const active = enc.leitdiagnose === d.key;
          return (
            <button
              key={d.key}
              className={`rounded-md border px-3 py-2 text-sm text-left transition ${
                active
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-300 bg-white hover:bg-slate-100'
              }`}
              onClick={() => setDx(enc.id, d.key)}
            >
              <div className="font-medium">{d.label}</div>
              <div className={`text-xs mt-0.5 ${active ? 'text-slate-200' : 'text-slate-500'}`}>
                {d.reviewOfSymptoms.length} ROS-Items · {d.dischargeRules.length} Entlasskriterien
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex justify-end">
        <button className="btn-primary" disabled={!enc.leitdiagnose} onClick={onAdvance}>
          Weiter →
        </button>
      </div>
    </div>
  );
}
