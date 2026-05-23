import type { Encounter, Vitals } from '../types';
import { useEncounters } from '../store/encounters';

type FieldDef = {
  key: keyof Vitals;
  label: string;
  unit: string;
  placeholder: string;
};

const FIELDS: FieldDef[] = [
  { key: 'rr_sys', label: 'RR sys', unit: 'mmHg', placeholder: '120' },
  { key: 'rr_dia', label: 'RR dia', unit: 'mmHg', placeholder: '80' },
  { key: 'hr', label: 'HF', unit: '/min', placeholder: '78' },
  { key: 'spo2', label: 'SpO₂', unit: '%', placeholder: '97' },
  { key: 'rr', label: 'AF', unit: '/min', placeholder: '14' },
  { key: 'temp', label: 'Temp', unit: '°C', placeholder: '36.8' },
];

export function VitalsStrip({ enc }: { enc: Encounter }) {
  const setVital = useEncounters((s) => s.setVital);
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-1.5">
        {FIELDS.map((f) => (
          <label key={f.key} className="block">
            <span className="block text-[10px] uppercase tracking-wide text-slate-500">
              {f.label}
              <span className="ml-0.5 text-slate-400">({f.unit})</span>
            </span>
            <input
              inputMode="decimal"
              className="mt-0.5 w-full rounded-md border border-slate-300 px-2 py-2 md:py-1 text-base md:text-sm tabular-nums outline-none focus:border-slate-900"
              placeholder={f.placeholder}
              value={enc.vitals?.[f.key] ?? ''}
              onChange={(e) => setVital(enc.id, f.key, e.target.value)}
            />
          </label>
        ))}
      </div>
      <label className="block mt-2">
        <span className="block text-[10px] uppercase tracking-wide text-slate-500">
          O₂-Supplementation
        </span>
        <input
          className="mt-0.5 w-full rounded-md border border-slate-300 px-2 py-2 md:py-1 text-base md:text-sm outline-none focus:border-slate-900"
          placeholder="Raumluft / 2 L Brille / NIV …"
          value={enc.vitals?.o2_supp ?? ''}
          onChange={(e) => setVital(enc.id, 'o2_supp', e.target.value)}
        />
      </label>
    </div>
  );
}
