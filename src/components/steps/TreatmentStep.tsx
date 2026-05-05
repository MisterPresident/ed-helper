import type { Encounter, Treatment } from '../../types';
import { TREATMENT_SECTIONS } from '../../data/treatment';
import { useEncounters } from '../../store/encounters';
import { TreatmentChip } from '../TreatmentChip';

type TreatmentKey = keyof Treatment;

export function TreatmentStep({
  enc,
  onAdvance,
  onBack,
}: {
  enc: Encounter;
  onAdvance: () => void;
  onBack: () => void;
}) {
  const patch = useEncounters((s) => s.patchTreatment);
  const setCount = useEncounters((s) => s.setTreatmentCount);

  return (
    <div className="space-y-3">
      <div className="card">
        <h3 className="text-base font-semibold mb-1">Therapie</h3>
        <p className="text-sm text-slate-500">
          Chip klicken zum Hinzufügen / Mehrfachgabe (Linksklick = +1, Rechtsklick =
          −1). Freitext für Besonderheiten.
        </p>
      </div>
      {TREATMENT_SECTIONS.map((sec) => {
        const value = enc.treatment?.[sec.key] ?? '';
        const counts = enc.treatmentCounts?.[sec.key as TreatmentKey] ?? {};
        return (
          <div key={sec.key} className="card">
            <h4 className="font-semibold mb-2">{sec.label}</h4>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {sec.chips.map((c) => (
                <TreatmentChip
                  key={c}
                  label={c}
                  count={counts[c] ?? 0}
                  onChange={(next) => setCount(enc.id, sec.key, c, next)}
                />
              ))}
            </div>
            <textarea
              rows={2}
              className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-900"
              placeholder={sec.placeholder}
              value={value}
              onChange={(e) => patch(enc.id, { [sec.key]: e.target.value })}
            />
          </div>
        );
      })}
      <div className="card flex justify-between">
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
