import type { Encounter } from '../../types';
import { DIAGNOSES_BY_KEY } from '../../data/diagnoses';
import { useEncounters } from '../../store/encounters';

export function DischargeStep({
  enc,
  onAdvance,
  onBack,
}: {
  enc: Encounter;
  onAdvance: () => void;
  onBack: () => void;
}) {
  const setDischarge = useEncounters((s) => s.setDischarge);
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

  const rules = dx.dischargeRules;
  const allChecked = rules.every((_, idx) => enc.dischargeChecked?.[`dc_${idx}`]);

  return (
    <div className="card">
      <h3 className="text-base font-semibold mb-1">Entlassungskriterien – {dx.label}</h3>
      <p className="text-sm text-slate-500 mb-3">
        Alle Punkte abchecken, die erfüllt sind. Die Liste ist orientierend und ersetzt keine
        klinische Einschätzung.
      </p>
      <div className="space-y-1.5">
        {rules.map((rule, idx) => {
          const key = `dc_${idx}`;
          const checked = !!enc.dischargeChecked?.[key];
          return (
            <label
              key={key}
              className={`flex items-start gap-2 rounded-md border px-3 py-2 cursor-pointer ${
                checked
                  ? 'border-ok-600 bg-ok-50 text-ok-700'
                  : 'border-slate-300 bg-white hover:bg-slate-100'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setDischarge(enc.id, key, e.target.checked)}
                className="mt-0.5 accent-ok-600"
              />
              <span className="text-sm">{rule}</span>
            </label>
          );
        })}
      </div>
      {allChecked && (
        <div className="mt-3 rounded-md border border-ok-600 bg-ok-50 text-ok-700 px-3 py-2 text-sm">
          ✓ Alle Entlassungskriterien erfüllt.
        </div>
      )}
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
