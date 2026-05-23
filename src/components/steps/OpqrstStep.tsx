import type { AnamneseAnswer, Encounter } from '../../types';
import { OPQRST_FIELDS } from '../../data/opqrst';
import { SYMPTOMS_BY_KEY } from '../../data/symptoms';
import { useEncounters } from '../../store/encounters';

const ANSWER_CYCLE: AnamneseAnswer[] = ['unknown', 'ja', 'nein'];

const ANSWER_LABEL: Record<AnamneseAnswer, string> = {
  unknown: '?',
  ja: 'Ja',
  nein: 'Nein',
};

const ANSWER_CLASS: Record<AnamneseAnswer, string> = {
  unknown: 'bg-slate-100 text-slate-500',
  ja: 'bg-green-100 text-green-800',
  nein: 'bg-red-100 text-red-700',
};

export function OpqrstStep({
  enc,
  onAdvance,
  onBack,
}: {
  enc: Encounter;
  onAdvance: () => void;
  onBack: () => void;
}) {
  const patch = useEncounters((s) => s.patchOpqrst);
  const setAnswer = useEncounters((s) => s.setAnamneseAnswer);

  const sym = enc.leitsymptom ? SYMPTOMS_BY_KEY[enc.leitsymptom] : undefined;
  const questions = sym?.anamneseQuestions ?? [];

  function cycleAnswer(key: string) {
    const current: AnamneseAnswer = enc.anamneseAnswers?.[key] ?? 'unknown';
    const next = ANSWER_CYCLE[(ANSWER_CYCLE.indexOf(current) + 1) % ANSWER_CYCLE.length]!;
    setAnswer(enc.id, key, next);
  }

  return (
    <div className="card">
      {sym?.usesOPQRST && (
        <>
          <h3 className="text-base font-semibold mb-1">OPQRST</h3>
          <p className="text-sm text-slate-500 mb-3">
            Charakterisierung des Schmerzes / Beschwerdebildes. Felder können frei bleiben.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {OPQRST_FIELDS.map((f) => (
              <label key={f.key} className="block">
                <span className="text-sm font-medium">{f.label}</span>
                {f.hint && (
                  <span className="block text-xs text-slate-500">{f.hint}</span>
                )}
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 md:py-1.5 text-base md:text-sm outline-none focus:border-slate-900"
                  placeholder={f.placeholder}
                  value={enc.opqrst?.[f.key] ?? ''}
                  onChange={(e) => patch(enc.id, { [f.key]: e.target.value })}
                />
              </label>
            ))}
          </div>
        </>
      )}

      {questions.length > 0 && (
        <div className={sym?.usesOPQRST ? 'mt-5' : ''}>
          <h3 className="text-base font-semibold mb-1">Gezielte Anamnese</h3>
          <p className="text-sm text-slate-500 mb-3">
            Für {sym?.label} relevante Fragen. Klick zum Durchschalten: ? → Ja → Nein.
          </p>
          <div className="flex flex-col gap-2">
            {questions.map((q) => {
              const answer: AnamneseAnswer = enc.anamneseAnswers?.[q.key] ?? 'unknown';
              return (
                <button
                  key={q.key}
                  type="button"
                  onClick={() => cycleAnswer(q.key)}
                  className="flex items-center gap-3 rounded-md border border-slate-200 px-3 py-3 md:py-2 text-sm text-left hover:bg-slate-50 min-h-[3rem] md:min-h-0"
                >
                  <span
                    className={`shrink-0 rounded px-2 py-1 text-xs font-semibold min-w-[2.5rem] text-center ${ANSWER_CLASS[answer]}`}
                  >
                    {ANSWER_LABEL[answer]}
                  </span>
                  <span>{q.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-col-reverse md:flex-row justify-between gap-2">
        <button className="btn-outline w-full md:w-auto" onClick={onBack}>
          ← Zurück
        </button>
        <button className="btn-primary w-full md:w-auto" onClick={onAdvance}>
          Weiter →
        </button>
      </div>
    </div>
  );
}
