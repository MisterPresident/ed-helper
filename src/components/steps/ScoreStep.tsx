import { useMemo, useState } from 'react';
import type { Encounter, ScoreKey } from '../../types';
import { SYMPTOMS_BY_KEY } from '../../data/symptoms';
import { DIAGNOSES_BY_KEY } from '../../data/diagnoses';
import { SCORES } from '../../data/scores';
import { useEncounters } from '../../store/encounters';
import { ScoreCalculator } from '../ScoreCalculator';
import { formatTotal } from '../../lib/score';

function ScoreRow({
  scoreKey,
  enc,
  onOpen,
}: {
  scoreKey: ScoreKey;
  enc: Encounter;
  onOpen: (k: ScoreKey) => void;
}) {
  const def = SCORES[scoreKey];
  if (!def) return null;
  const result = enc.scoreResults?.[scoreKey];
  return (
    <div className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2">
      <div className="min-w-0">
        <div className="font-medium text-sm truncate">{def.label}</div>
        {result ? (
          <div className="text-sm">
            <span className="tabular-nums font-semibold">{formatTotal(result.total)}</span>{' '}
            <span className="text-slate-600">{result.band}</span>
            <span className="text-slate-400"> · {result.meaning}</span>
          </div>
        ) : (
          <div className="text-xs text-slate-500">noch nicht ausgefüllt</div>
        )}
      </div>
      <div className="flex gap-2 shrink-0">
        <a
          href={def.mdcalcUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-xs"
          title="Auf MDCalc öffnen"
        >
          🔗
        </a>
        <button className="btn-outline text-xs" onClick={() => onOpen(scoreKey)}>
          {result ? 'Bearbeiten' : 'Ausfüllen'}
        </button>
      </div>
    </div>
  );
}

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

  const [active, setActive] = useState<ScoreKey | null>(null);
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const recommended = useMemo<Set<ScoreKey>>(() => {
    const out = new Set<ScoreKey>();
    if (enc.leitsymptom) {
      for (const k of SYMPTOMS_BY_KEY[enc.leitsymptom]?.recommendedScores ?? []) out.add(k);
    }
    for (const dx of enc.diagnoses ?? []) {
      if (dx.status === 'excluded') continue;
      for (const k of DIAGNOSES_BY_KEY[dx.key]?.recommendedScores ?? []) out.add(k);
    }
    return out;
  }, [enc.leitsymptom, enc.diagnoses]);

  const filledKeys = new Set(Object.keys(enc.scoreResults ?? {}));
  const recommendedKeys = [...recommended];
  const filledOnlyKeys = [...filledKeys].filter((k) => !recommended.has(k));

  const allOtherKeys = useMemo<ScoreKey[]>(() => {
    return Object.keys(SCORES).filter(
      (k) => !recommended.has(k) && !filledKeys.has(k)
    );
  }, [recommended, filledKeys]);

  const filteredOthers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q && !showAll) return [];
    return allOtherKeys.filter((k) => {
      const def = SCORES[k];
      if (!def) return false;
      return q ? def.label.toLowerCase().includes(q) : true;
    });
  }, [allOtherKeys, query, showAll]);

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
    <div className="space-y-3">
      <div className="card">
        <h3 className="text-base font-semibold mb-1">Scores</h3>
        <p className="text-sm text-slate-500">
          Empfohlene Scores aus Leitsymptom + aktiven Hypothesen. Suche oder „alle Scores"
          öffnet die volle Bibliothek.
        </p>
      </div>

      <div className="card">
        <div className="text-xs uppercase text-slate-500 mb-2">Empfohlen</div>
        {recommendedKeys.length === 0 && (
          <p className="text-sm text-slate-500 italic">
            Keine empfohlenen Scores für die aktuelle Auswahl.
          </p>
        )}
        <div className="space-y-2">
          {recommendedKeys.map((k) => (
            <ScoreRow key={k} scoreKey={k} enc={enc} onOpen={setActive} />
          ))}
        </div>
        {filledOnlyKeys.length > 0 && (
          <>
            <div className="text-xs uppercase text-slate-500 mt-3 mb-2">Weitere ausgefüllt</div>
            <div className="space-y-2">
              {filledOnlyKeys.map((k) => (
                <ScoreRow key={k} scoreKey={k} enc={enc} onOpen={setActive} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="card">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="text-xs uppercase text-slate-500">Alle Scores</div>
          <button
            className="text-xs text-slate-500 hover:text-slate-800"
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? 'einklappen' : 'alle anzeigen'}
          </button>
        </div>
        <input
          className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm outline-none focus:border-slate-900"
          placeholder="Score suchen (z.B. CURB, Wells, NEWS) …"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {filteredOthers.length > 0 && (
          <div className="mt-2 space-y-2">
            {filteredOthers.map((k) => (
              <ScoreRow key={k} scoreKey={k} enc={enc} onOpen={setActive} />
            ))}
          </div>
        )}
        {!query && !showAll && (
          <p className="mt-2 text-xs text-slate-500 italic">
            Tippe oder klicke „alle anzeigen" um die {allOtherKeys.length} weiteren Scores
            zu sehen.
          </p>
        )}
      </div>

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
