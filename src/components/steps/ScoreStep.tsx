import { useState } from 'react';
import type { Encounter, ScoreKey } from '../../types';
import { SYMPTOMS_BY_KEY } from '../../data/symptoms';
import { SCORES } from '../../data/scores';
import { useEncounters } from '../../store/encounters';
import { ScoreCalculator } from '../ScoreCalculator';
import { formatTotal } from '../../lib/score';

export function ScoreStep({
  enc,
  onAdvance,
  onBack,
}: {
  enc: Encounter;
  onAdvance: () => void;
  onBack: () => void;
}) {
  const setResult = useEncounters((s) => s.setScoreResult);
  const clearResult = useEncounters((s) => s.clearScoreResult);

  const sym = enc.leitsymptom ? SYMPTOMS_BY_KEY[enc.leitsymptom] : undefined;
  const recommended = sym?.recommendedScores ?? [];
  const allKeys = new Set<ScoreKey>([
    ...recommended,
    ...Object.keys(enc.scoreResults ?? {}),
  ]);

  const [active, setActive] = useState<ScoreKey | null>(null);

  if (active) {
    const def = SCORES[active];
    if (!def) {
      setActive(null);
      return null;
    }
    return (
      <ScoreCalculator
        def={def}
        initial={enc.scoreResults?.[active]}
        onSave={(r) => setResult(enc.id, active, r)}
        onClear={() => clearResult(enc.id, active)}
        onClose={() => setActive(null)}
      />
    );
  }

  return (
    <div className="card">
      <h3 className="text-base font-semibold mb-1">Scores</h3>
      <p className="text-sm text-slate-500 mb-3">
        Empfohlene Scores für {sym?.label ?? 'dieses Leitsymptom'}. Klicken zum Ausfüllen,
        oder diesen Schritt überspringen.
      </p>
      {allKeys.size === 0 && (
        <p className="text-sm text-slate-500">
          Keine spezifischen Scores hinterlegt. Weiter mit SAMPLER.
        </p>
      )}
      <div className="space-y-2">
        {[...allKeys].map((key) => {
          const def = SCORES[key];
          if (!def) return null;
          const result = enc.scoreResults?.[key];
          return (
            <div
              key={key}
              className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2"
            >
              <div>
                <div className="font-medium text-sm">{def.label}</div>
                {result ? (
                  <div className="text-sm">
                    <span className="tabular-nums font-semibold">
                      {formatTotal(result.total)}
                    </span>{' '}
                    <span className="text-slate-600">{result.band}</span>
                    <span className="text-slate-400"> · {result.meaning}</span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500">noch nicht ausgefüllt</div>
                )}
              </div>
              <div className="flex gap-2">
                <a
                  href={def.mdcalcUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs"
                  title="Auf MDCalc öffnen"
                >
                  🔗
                </a>
                <button className="btn-outline text-xs" onClick={() => setActive(key)}>
                  {result ? 'Bearbeiten' : 'Ausfüllen'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

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
