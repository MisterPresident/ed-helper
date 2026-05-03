import type { DiagnosisDef, Encounter } from '../../types';
import { DIAGNOSES_BY_KEY } from '../../data/diagnoses';
import { useEncounters } from '../../store/encounters';

function severityBadgeClass(tier: 'mild' | 'moderate' | 'severe' | 'critical'): string {
  switch (tier) {
    case 'mild':
      return 'bg-slate-200 text-slate-700';
    case 'moderate':
      return 'bg-amber-200 text-amber-900';
    case 'severe':
      return 'bg-danger-100 text-danger-700';
    case 'critical':
      return 'bg-danger-700 text-white';
  }
}

function DiagnosisDischargePanel({
  enc,
  dx,
}: {
  enc: Encounter;
  dx: DiagnosisDef;
}) {
  const setDischarge = useEncounters((s) => s.setDischarge);
  const sev = dx.severityClassifier?.(enc) ?? null;
  const rules = dx.dischargeRules;

  const allChecked = rules.every((_, idx) => enc.dischargeChecked?.[`${dx.key}:${idx}`]);

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h4 className="font-semibold">{dx.label} – Entlassungskriterien</h4>
          {sev && (
            <div className="mt-0.5 flex items-center gap-2 text-xs">
              <span
                className={`rounded px-1.5 py-0.5 font-medium ${severityBadgeClass(sev.severity)}`}
              >
                {sev.stage}
              </span>
              <span className="text-slate-600">{sev.label}</span>
              {sev.basedOn.length > 0 && (
                <span className="text-slate-400">— {sev.basedOn.join(', ')}</span>
              )}
            </div>
          )}
        </div>
        {dx.treatmentUrl && (
          <a
            href={dx.treatmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-xs whitespace-nowrap"
          >
            🔗 Therapie
          </a>
        )}
      </div>
      <div className="space-y-1.5">
        {rules.map((rule, idx) => {
          const ruleKey = `${dx.key}:${idx}`;
          const checked = !!enc.dischargeChecked?.[ruleKey];
          return (
            <label
              key={ruleKey}
              className={`flex items-start gap-2 rounded-md border px-3 py-2 cursor-pointer ${
                checked
                  ? 'border-ok-600 bg-ok-50 text-ok-700'
                  : 'border-slate-300 bg-white hover:bg-slate-100'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setDischarge(enc.id, ruleKey, e.target.checked)}
                className="mt-0.5 accent-ok-600"
              />
              <span className="text-sm">{rule}</span>
            </label>
          );
        })}
      </div>
      {allChecked && rules.length > 0 && (
        <div className="mt-2 rounded-md border border-ok-600 bg-ok-50 text-ok-700 px-3 py-1.5 text-xs">
          ✓ Alle Entlassungskriterien für {dx.label} erfüllt.
        </div>
      )}
    </div>
  );
}

export function DischargeStep({
  enc,
  onAdvance,
  onBack,
}: {
  enc: Encounter;
  onAdvance: () => void;
  onBack: () => void;
}) {
  const confirmed = (enc.diagnoses ?? []).filter((d) => d.status === 'confirmed');
  const confirmedDefs = confirmed
    .map((d) => DIAGNOSES_BY_KEY[d.key])
    .filter((d): d is DiagnosisDef => Boolean(d));

  return (
    <div className="space-y-3">
      <div className="card">
        <h3 className="text-base font-semibold">Entlassungskriterien</h3>
        <p className="text-sm text-slate-500">
          Pro bestätigter Diagnose werden die zugehörigen Entlassungskriterien angezeigt.
          Ohne bestätigte Diagnosen ist dieser Schritt leer — ggf. im Hypothesen-Strip
          rechts eine Diagnose auf „bestätigt" setzen.
        </p>
      </div>
      {confirmedDefs.length === 0 && (
        <div className="card">
          <p className="text-sm text-slate-500 italic">
            Noch keine Diagnose bestätigt. Entweder über den Hypothesen-Strip bestätigen
            oder als Symptomdiagnose im Prozedere dokumentieren.
          </p>
        </div>
      )}
      {confirmedDefs.map((dx) => (
        <DiagnosisDischargePanel key={dx.key} enc={enc} dx={dx} />
      ))}
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
