import { useMemo, useState } from 'react';
import type { Encounter } from '../types';
import { buildSummary, type DetailMode, type FormatMode } from '../lib/format';

function ToggleGroup<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="flex rounded-md border border-slate-300 overflow-hidden text-xs">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`px-2 py-1 ${
            o.value === value ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-100'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function SummaryBlock({ enc, onBack }: { enc: Encounter; onBack: () => void }) {
  const [format, setFormat] = useState<FormatMode>('sap');
  const [detail, setDetail] = useState<DetailMode>('detailed');
  const [copied, setCopied] = useState(false);
  const text = useMemo(
    () => buildSummary(enc, { format, detail }),
    [enc, format, detail]
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
        <h3 className="text-base font-semibold">Zusammenfassung</h3>
        <div className="flex items-center gap-3 flex-wrap">
          <ToggleGroup
            value={format}
            onChange={setFormat}
            options={[
              { value: 'sap', label: 'SAP' },
              { value: 'plain', label: 'Plain' },
            ]}
          />
          <ToggleGroup
            value={detail}
            onChange={setDetail}
            options={[
              { value: 'detailed', label: 'Ausführlich' },
              { value: 'compact', label: 'Kompakt' },
            ]}
          />
          <button className="btn-primary text-sm" onClick={copy}>
            {copied ? '✓ Kopiert' : 'Kopieren'}
          </button>
        </div>
      </div>

      <pre className="whitespace-pre-wrap text-sm leading-relaxed bg-slate-50 border border-slate-200 rounded-md p-3 font-mono">
        {text || '(noch nichts dokumentiert)'}
      </pre>

      <div className="mt-4 flex justify-between">
        <button className="btn-outline" onClick={onBack}>
          ← Zurück
        </button>
      </div>
    </div>
  );
}
