import { useMemo, useState } from 'react';
import type { ActiveDiagnosis, DxStatus, Encounter } from '../types';
import { DIAGNOSES, DIAGNOSES_BY_KEY } from '../data/diagnoses';
import { useEncounters } from '../store/encounters';

const cycle: Record<DxStatus, DxStatus> = {
  suspected: 'confirmed',
  confirmed: 'excluded',
  excluded: 'suspected',
};

const styles: Record<DxStatus, string> = {
  suspected: 'border-amber-500 bg-amber-50 text-amber-800',
  confirmed: 'border-danger-600 bg-danger-50 text-danger-700',
  excluded: 'border-ok-600 bg-ok-50 text-ok-700',
};

const labels: Record<DxStatus, string> = {
  suspected: 'V.a.',
  confirmed: 'bestätigt',
  excluded: 'ausgeschlossen',
};

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

function DxPill({ enc, dx }: { enc: Encounter; dx: ActiveDiagnosis }) {
  const setStatus = useEncounters((s) => s.setDiagnosisStatus);
  const remove = useEncounters((s) => s.removeDiagnosis);
  const isFreeText = !!dx.freeText;
  const def = isFreeText ? null : DIAGNOSES_BY_KEY[dx.key];
  if (!isFreeText && !def) return null;
  const sev = def?.severityClassifier?.(enc) ?? null;
  const labelText = dx.freeText ?? def?.label ?? dx.key;

  return (
    <div className={`rounded-md border px-2 py-1.5 text-xs ${styles[dx.status]}`}>
      <div className="flex items-start justify-between gap-1">
        <div className="min-w-0">
          <button
            className="font-medium text-left leading-tight"
            onClick={() => setStatus(enc.id, dx.key, cycle[dx.status])}
            title="Status wechseln"
          >
            {labelText}
            {isFreeText && <span className="ml-1 text-[10px] opacity-60">(Freitext)</span>}
          </button>
          <div className="mt-0.5 flex flex-wrap items-center gap-1">
            <span className="text-[10px] uppercase tracking-wide font-semibold opacity-80">
              {labels[dx.status]}
            </span>
            {sev && (
              <span
                className={`text-[10px] rounded px-1 py-0.5 font-medium ${severityBadgeClass(
                  sev.severity
                )}`}
                title={sev.basedOn.join(', ')}
              >
                {sev.stage}
              </span>
            )}
          </div>
        </div>
        <button
          className="opacity-50 hover:opacity-100 text-slate-500"
          onClick={() => remove(enc.id, dx.key)}
          title="Entfernen"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function DiagnosisPicker({ enc, onClose }: { enc: Encounter; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [freeText, setFreeText] = useState('');
  const add = useEncounters((s) => s.addDiagnosis);
  const addFree = useEncounters((s) => s.addFreeDiagnosis);
  const existing = new Set((enc.diagnoses ?? []).map((d) => d.key));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DIAGNOSES.filter((d) => !existing.has(d.key)).filter((d) =>
      q ? d.label.toLowerCase().includes(q) : true
    );
  }, [query, existing]);

  const submitFreeText = () => {
    const t = freeText.trim();
    if (!t) return;
    addFree(enc.id, t, 'suspected');
    onClose();
  };

  return (
    <div className="rounded-md border border-slate-300 bg-white p-2">
      <input
        autoFocus
        className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm outline-none focus:border-slate-900"
        placeholder="Katalog-Diagnose suchen …"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="mt-1.5 max-h-48 overflow-y-auto space-y-0.5">
        {filtered.length === 0 && (
          <p className="text-xs text-slate-500 px-1 py-1">Keine Treffer.</p>
        )}
        {filtered.map((d) => (
          <button
            key={d.key}
            className="block w-full text-left text-xs rounded px-2 py-1 hover:bg-slate-100"
            onClick={() => {
              add(enc.id, d.key, 'suspected');
              onClose();
            }}
          >
            {d.label}
          </button>
        ))}
      </div>
      <div className="mt-2 pt-2 border-t border-slate-200">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 mb-1">
          Freitext-Diagnose
        </div>
        <div className="flex gap-1">
          <input
            className="flex-1 rounded-md border border-slate-300 px-2 py-1 text-sm outline-none focus:border-slate-900"
            placeholder="z.B. Akute Bronchitis"
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submitFreeText();
            }}
          />
          <button
            className="btn-primary text-xs px-2"
            onClick={submitFreeText}
            disabled={!freeText.trim()}
          >
            Hinzufügen
          </button>
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <button className="text-xs text-slate-500 hover:text-slate-800" onClick={onClose}>
          Schließen
        </button>
      </div>
    </div>
  );
}

export function DiagnosesStrip({ enc }: { enc: Encounter }) {
  const [picking, setPicking] = useState(false);
  const dxs = enc.diagnoses ?? [];
  return (
    <div className="space-y-1.5">
      <p className="text-xs text-slate-500 leading-snug">
        Hypothesen werden durch Klick auf den Namen zyklisch gewechselt: V.a. → bestätigt
        → ausgeschlossen → V.a.
      </p>
      {dxs.length === 0 && !picking && (
        <p className="text-xs text-slate-500 italic">
          Noch keine Verdachts­diagnose. Über DDx-Schritt promovieren oder per „+
          Diagnose" ergänzen.
        </p>
      )}
      <div className="space-y-1">
        {dxs.map((dx) => (
          <DxPill key={dx.key} enc={enc} dx={dx} />
        ))}
      </div>
      {picking ? (
        <DiagnosisPicker enc={enc} onClose={() => setPicking(false)} />
      ) : (
        <button
          className="w-full text-xs rounded-md border border-dashed border-slate-300 px-2 py-1.5 text-slate-600 hover:bg-slate-100"
          onClick={() => setPicking(true)}
        >
          + Diagnose hinzufügen
        </button>
      )}
    </div>
  );
}
