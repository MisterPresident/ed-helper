import { useMemo, useState } from 'react';
import type { ScoreDef, ScoreResult } from '../types';
import { computeResult, formatTotal, isComplete } from '../lib/score';

export function ScoreCalculator({
  def,
  initial,
  onSave,
  onClear,
  onClose,
}: {
  def: ScoreDef;
  initial?: ScoreResult;
  onSave: (result: ScoreResult) => void;
  onClear?: () => void;
  onClose: () => void;
}) {
  const [picked, setPicked] = useState<Record<string, number>>(() => {
    if (!initial) return {};
    const m: Record<string, number> = {};
    for (const [k, v] of Object.entries(initial.picked)) m[k] = v.optionIndex;
    return m;
  });

  const liveResult = useMemo(() => computeResult(def, picked), [def, picked]);
  const complete = isComplete(def, picked);

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-base font-semibold">{def.label}</h3>
          {def.reference && (
            <p className="text-xs text-slate-500 mt-0.5">{def.reference}</p>
          )}
        </div>
        <a
          href={def.mdcalcUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-xs whitespace-nowrap"
          title="Zum Gegencheck auf MDCalc öffnen"
        >
          🔗 MDCalc öffnen
        </a>
      </div>

      <div className="space-y-4">
        {def.items.map((item) => (
          <div key={item.key}>
            <div className="text-sm font-medium text-slate-800">{item.label}</div>
            {item.hint && (
              <div className="text-xs text-slate-500 mb-1">{item.hint}</div>
            )}
            <div className="flex flex-wrap gap-2 mt-1">
              {item.options.map((opt, idx) => {
                const active = picked[item.key] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() =>
                      setPicked((p) => ({ ...p, [item.key]: idx }))
                    }
                    className={`chip ${
                      active
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'border-slate-300 bg-white hover:bg-slate-100'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span
                      className={`ml-1 text-xs ${
                        active ? 'text-slate-200' : 'text-slate-500'
                      }`}
                    >
                      {opt.points >= 0 ? `+${opt.points}` : opt.points}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-3">
        <div>
          <div className="text-xs uppercase text-slate-500">Summe</div>
          <div className="text-2xl font-semibold tabular-nums">
            {complete ? formatTotal(liveResult.total) : '—'}
          </div>
          {complete && (
            <div className="text-sm">
              <span className="font-medium">{liveResult.band}</span>{' '}
              <span className="text-slate-500">· {liveResult.meaning}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {onClear && initial && (
            <button className="btn-outline" onClick={onClear}>
              Zurücksetzen
            </button>
          )}
          <button className="btn-outline" onClick={onClose}>
            Abbrechen
          </button>
          <button
            className="btn-primary"
            disabled={!complete}
            onClick={() => {
              onSave(liveResult);
              onClose();
            }}
          >
            Übernehmen
          </button>
        </div>
      </div>
    </div>
  );
}
