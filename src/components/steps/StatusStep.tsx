import type { Encounter, StatusSystemKey } from '../../types';
import { STATUS_SYSTEMS } from '../../types';
import { STATUS_PALETTES } from '../../data/status';
import { useEncounters } from '../../store/encounters';

export function StatusStep({
  enc,
  onAdvance,
  onBack,
}: {
  enc: Encounter;
  onAdvance: () => void;
  onBack: () => void;
}) {
  const setFindings = useEncounters((s) => s.setStatusFindings);

  const toggle = (system: StatusSystemKey, key: string) => {
    const current = enc.status?.[system]?.findings ?? [];
    const next = current.includes(key)
      ? current.filter((k) => k !== key)
      : [...current, key];
    setFindings(enc.id, system, next, enc.status?.[system]?.free);
  };

  const setFree = (system: StatusSystemKey, free: string) => {
    setFindings(enc.id, system, enc.status?.[system]?.findings ?? [], free);
  };

  return (
    <div className="space-y-3">
      <div className="card">
        <h3 className="text-base font-semibold mb-1">Klinischer Status</h3>
        <p className="text-sm text-slate-500">
          Pro System Normbefund-Chips oder Abweichungen anklicken. Mehrfachauswahl möglich.
          Freitextfeld für Besonderheiten.
        </p>
      </div>
      {STATUS_SYSTEMS.map((systemKey) => {
        const palette = STATUS_PALETTES[systemKey];
        const picked = enc.status?.[systemKey]?.findings ?? [];
        const free = enc.status?.[systemKey]?.free ?? '';
        return (
          <div key={systemKey} className="card">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">{palette.label}</h4>
              <span className="text-xs text-slate-400">
                Normbefund: {palette.normSummary}
              </span>
            </div>
            <div className="space-y-2">
              {palette.groups.map((g) => (
                <div key={g.label}>
                  <div className="text-xs text-slate-500 mb-1">{g.label}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.chips.map((c) => {
                      const active = picked.includes(c.key);
                      const base = 'chip';
                      const color = active
                        ? c.isNormal
                          ? 'bg-ok-600 text-white border-ok-600'
                          : 'bg-slate-900 text-white border-slate-900'
                        : c.isNormal
                          ? 'border-ok-500 text-ok-700 hover:bg-ok-50'
                          : 'border-slate-300 hover:bg-slate-100';
                      return (
                        <button
                          key={c.key}
                          className={`${base} ${color}`}
                          onClick={() => toggle(systemKey, c.key)}
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              <label className="block mt-2">
                <span className="text-xs text-slate-500">Freitext</span>
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-900"
                  placeholder="weitere Befunde…"
                  value={free}
                  onChange={(e) => setFree(systemKey, e.target.value)}
                />
              </label>
            </div>
          </div>
        );
      })}

      <div className="card flex flex-col-reverse md:flex-row justify-between gap-2 [&>button]:w-full md:[&>button]:w-auto">
        <button className="btn-outline" onClick={onBack}>
          ← Zurück
        </button>
        <button className="btn-primary" onClick={onAdvance}>
          Zusammenfassung →
        </button>
      </div>
    </div>
  );
}
