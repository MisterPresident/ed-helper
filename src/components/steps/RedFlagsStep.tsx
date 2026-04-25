import type { Encounter, RedFlagState } from '../../types';
import { SYMPTOMS_BY_KEY } from '../../data/symptoms';
import { RED_FLAGS } from '../../data/redFlags';
import { useEncounters } from '../../store/encounters';

const cycle: Record<RedFlagState, RedFlagState> = {
  unknown: 'excluded',
  excluded: 'positive',
  positive: 'unknown',
};

const labels: Record<RedFlagState, string> = {
  unknown: 'unklar',
  excluded: 'ausgeschlossen',
  positive: 'positiv',
};

const styles: Record<RedFlagState, string> = {
  unknown: 'border-slate-300 bg-white text-slate-600 hover:bg-slate-100',
  excluded: 'border-ok-600 bg-ok-50 text-ok-700',
  positive: 'border-danger-600 bg-danger-50 text-danger-700',
};

export function RedFlagsStep({
  enc,
  onAdvance,
  onBack,
}: {
  enc: Encounter;
  onAdvance: () => void;
  onBack: () => void;
}) {
  const setFlag = useEncounters((s) => s.setRedFlag);
  const sym = enc.leitsymptom ? SYMPTOMS_BY_KEY[enc.leitsymptom] : undefined;
  const keys = sym?.redFlagKeys ?? [];
  const flags = keys.map((k) => RED_FLAGS[k]).filter(Boolean);

  const unknownCount = keys.filter((k) => (enc.redFlags?.[k] ?? 'unknown') === 'unknown').length;

  if (flags.length === 0) {
    return (
      <div className="card">
        <h3 className="text-base font-semibold mb-1">Red Flags</h3>
        <p className="text-sm text-slate-500">
          Für dieses Leitsymptom sind keine Red Flags katalogisiert. Trotzdem klinisch an
          die gefährlichen Differenzialdiagnosen denken.
        </p>
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

  const markAll = (state: RedFlagState) => {
    for (const k of keys) setFlag(enc.id, k, state);
  };

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3 gap-3">
        <div>
          <h3 className="text-base font-semibold">Red Flags</h3>
          <p className="text-sm text-slate-500">
            Click: unklar → ausgeschlossen → positiv → unklar. Dokumentiert wird positiv
            und explizit ausgeschlossen.
          </p>
        </div>
        <button
          className="btn-outline text-xs whitespace-nowrap"
          onClick={() => markAll('excluded')}
          title="Alle als ausgeschlossen markieren"
        >
          alle ausgeschlossen
        </button>
      </div>

      <div className="space-y-2">
        {flags.map((f) => {
          const state: RedFlagState = enc.redFlags?.[f.key] ?? 'unknown';
          return (
            <button
              key={f.key}
              onClick={() => setFlag(enc.id, f.key, cycle[state])}
              className={`w-full text-left rounded-md border px-3 py-2 transition ${styles[state]}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-sm">{f.label}</div>
                  <div className="text-xs opacity-80">{f.suspects}</div>
                  {f.action && (
                    <div className="text-xs mt-0.5 italic opacity-75">→ {f.action}</div>
                  )}
                </div>
                <span className="shrink-0 text-xs font-semibold uppercase tracking-wide">
                  {labels[state]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {unknownCount > 0
            ? `${unknownCount} von ${keys.length} noch unklar`
            : 'alle beurteilt'}
        </span>
        <div className="flex gap-2">
          <button className="btn-outline" onClick={onBack}>
            ← Zurück
          </button>
          <button className="btn-primary" onClick={onAdvance}>
            Weiter →
          </button>
        </div>
      </div>
    </div>
  );
}
