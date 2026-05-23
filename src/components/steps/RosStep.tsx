import { useMemo, useState } from 'react';
import type { Encounter, RosState } from '../../types';
import { ROS_CATEGORIES } from '../../data/ros';
import { SYMPTOMS_BY_KEY } from '../../data/symptoms';
import { DIAGNOSES_BY_KEY } from '../../data/diagnoses';
import { useEncounters } from '../../store/encounters';

const cycle: Record<RosState, RosState> = {
  unknown: 'negative',
  negative: 'positive',
  positive: 'unknown',
};

const styles: Record<RosState, string> = {
  unknown: 'border-slate-300 bg-white text-slate-600 hover:bg-slate-100',
  negative: 'border-ok-600 bg-ok-50 text-ok-700',
  positive: 'border-danger-600 bg-danger-50 text-danger-700',
};

const labelFor: Record<RosState, string> = {
  unknown: '–',
  negative: 'neg',
  positive: 'pos',
};

export function RosStep({
  enc,
  onAdvance,
  onBack,
}: {
  enc: Encounter;
  onAdvance: () => void;
  onBack: () => void;
}) {
  const setRos = useEncounters((s) => s.setRos);

  const highlighted = useMemo<Set<string>>(() => {
    const keys: string[] = [];
    if (enc.leitsymptom) {
      keys.push(...(SYMPTOMS_BY_KEY[enc.leitsymptom]?.highlightedRosKeys ?? []));
    }
    for (const dx of enc.diagnoses ?? []) {
      keys.push(...(DIAGNOSES_BY_KEY[dx.key]?.highlightedRosKeys ?? []));
    }
    return new Set(keys);
  }, [enc.leitsymptom, enc.diagnoses]);

  const [onlyHighlighted, setOnlyHighlighted] = useState(false);

  const initialOpen = useMemo<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    for (const cat of ROS_CATEGORIES) {
      map[cat.key] = cat.items.some((i) => highlighted.has(i.key));
    }
    return map;
  }, [highlighted]);
  const [open, setOpen] = useState<Record<string, boolean>>(initialOpen);

  const totalCounts = useMemo(() => {
    let pos = 0;
    let neg = 0;
    for (const v of Object.values(enc.ros ?? {})) {
      if (v === 'positive') pos++;
      else if (v === 'negative') neg++;
    }
    return { pos, neg };
  }, [enc.ros]);

  return (
    <div className="space-y-3">
      <div className="card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold">Anamnese (ROS)</h3>
            <p className="text-sm text-slate-500">
              Click zyklisch: – (nicht erfragt) → neg → pos → –. Hervorgehoben =
              relevant für aktuelles Leitsymptom/Leitdiagnose.
            </p>
          </div>
          <div className="text-xs text-slate-500 whitespace-nowrap text-right">
            <div>{totalCounts.pos} positiv · {totalCounts.neg} negativ</div>
            <label className="inline-flex items-center gap-1 mt-1">
              <input
                type="checkbox"
                checked={onlyHighlighted}
                onChange={(e) => setOnlyHighlighted(e.target.checked)}
                className="accent-slate-900"
              />
              Nur empfohlene
            </label>
          </div>
        </div>
      </div>

      {ROS_CATEGORIES.map((cat) => {
        const items = onlyHighlighted
          ? cat.items.filter((i) => highlighted.has(i.key))
          : cat.items;
        if (items.length === 0) return null;
        const isOpen = open[cat.key] ?? false;
        const catHasHighlight = cat.items.some((i) => highlighted.has(i.key));
        return (
          <div key={cat.key} className="card">
            <button
              className="w-full flex items-center justify-between text-left"
              onClick={() => setOpen((m) => ({ ...m, [cat.key]: !isOpen }))}
            >
              <span className="font-semibold">
                {cat.label}
                {catHasHighlight && (
                  <span className="ml-2 text-xs font-normal text-amber-700 bg-amber-50 border border-amber-300 rounded px-1.5 py-0.5">
                    relevant
                  </span>
                )}
              </span>
              <span className="text-slate-400 text-sm">{isOpen ? '▾' : '▸'}</span>
            </button>
            {isOpen && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {items.map((item) => {
                  const state: RosState = enc.ros?.[item.key] ?? 'unknown';
                  const isHL = highlighted.has(item.key);
                  return (
                    <button
                      key={item.key}
                      onClick={() => setRos(enc.id, item.key, cycle[state])}
                      className={`chip ${styles[state]} ${
                        isHL ? 'ring-2 ring-amber-300' : ''
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="ml-1 text-[10px] uppercase tracking-wide opacity-70">
                        {labelFor[state]}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

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
