import type { Treatment, Encounter } from '../../types';
import { TREATMENT_SECTIONS } from '../../data/treatment';
import { useEncounters } from '../../store/encounters';

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

  const appendChip = (key: TreatmentKey, chip: string) => {
    const current = (enc.treatment?.[key] ?? '').trim();
    const next = current ? `${current}, ${chip}` : chip;
    patch(enc.id, { [key]: next });
  };

  return (
    <div className="space-y-3">
      <div className="card">
        <h3 className="text-base font-semibold mb-1">Therapie</h3>
        <p className="text-sm text-slate-500">
          Chips klicken, um Medikament mit Dosis anzuhängen. Freitext frei editierbar.
        </p>
      </div>
      {TREATMENT_SECTIONS.map((sec) => {
        const value = enc.treatment?.[sec.key] ?? '';
        return (
          <div key={sec.key} className="card">
            <h4 className="font-semibold mb-2">{sec.label}</h4>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {sec.chips.map((c) => (
                <button
                  key={c}
                  className="chip border-slate-300 hover:bg-slate-100"
                  onClick={() => appendChip(sec.key, c)}
                >
                  + {c}
                </button>
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
