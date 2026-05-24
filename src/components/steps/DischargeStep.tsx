import type { DiagnosisDef, DxStatus, Encounter } from '../../types';
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

const STATUS_BADGE: Record<Exclude<DxStatus, 'excluded'>, { label: string; cls: string }> = {
  suspected: { label: 'V.a.', cls: 'bg-amber-100 text-amber-800' },
  confirmed: { label: 'bestätigt', cls: 'bg-danger-100 text-danger-700' },
};

function DiagnosisDischargePanel({
  enc,
  dx,
  status,
}: {
  enc: Encounter;
  dx: DiagnosisDef;
  status: Exclude<DxStatus, 'excluded'>;
}) {
  const setDischarge = useEncounters((s) => s.setDischarge);
  const sev = dx.severityClassifier?.(enc) ?? null;
  const rules = dx.dischargeRules;
  const statusBadge = STATUS_BADGE[status];

  const allChecked = rules.every((_, idx) => enc.dischargeChecked?.[`${dx.key}:${idx}`]);

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold">{dx.label} – Entlassungskriterien</h4>
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${statusBadge.cls}`}
              title="Status der Hypothese (im Hypothesen-Strip änderbar)"
            >
              {statusBadge.label}
            </span>
          </div>
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
  const active = (enc.diagnoses ?? []).filter((d) => d.status !== 'excluded');
  const panels = active
    .map((d) => {
      const def = DIAGNOSES_BY_KEY[d.key];
      if (!def || def.dischargeRules.length === 0) return null;
      return { def, status: d.status as Exclude<DxStatus, 'excluded'> };
    })
    .filter((x): x is { def: DiagnosisDef; status: Exclude<DxStatus, 'excluded'> } =>
      Boolean(x)
    );

  return (
    <div className="space-y-3">
      <div className="card">
        <h3 className="text-base font-semibold">Entlassungskriterien</h3>
        <p className="text-sm text-slate-500">
          Kriterien werden für jede nicht-ausgeschlossene Hypothese (V.a. oder bestätigt)
          angezeigt. Status im Hypothesen-Strip rechts wechseln.
        </p>
      </div>
      {panels.length === 0 && (
        <div className="card">
          <p className="text-sm text-slate-500 italic">
            Keine aktiven Hypothesen mit hinterlegten Entlassungskriterien. Über den
            DDx-Schritt „→ V.a." promovieren oder im Hypothesen-Strip ergänzen.
          </p>
        </div>
      )}
      {panels.map(({ def, status }) => (
        <DiagnosisDischargePanel key={def.key} enc={enc} dx={def} status={status} />
      ))}
      <div className="card flex flex-col-reverse md:flex-row justify-between gap-2 [&>button]:w-full md:[&>button]:w-auto">
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
