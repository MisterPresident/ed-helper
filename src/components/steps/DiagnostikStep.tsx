import type { BgaValues, Diagnostik, Encounter } from '../../types';
import {
  BGA_FIELDS,
  BILDGEBUNG_GROUPS,
  type ChipGroup,
  EKG_GROUPS,
  LABOR_GROUPS,
  POCUS_GROUPS,
  WEITERE_CHIPS,
  isBgaAbnormal,
} from '../../data/diagnostik';
import { useEncounters } from '../../store/encounters';

type FreeKey = Exclude<keyof Diagnostik, 'bgaValues'>;

function GroupedChipsEditor({
  fieldKey,
  enc,
  groups,
  placeholder,
  label,
}: {
  fieldKey: FreeKey;
  enc: Encounter;
  groups: ChipGroup[];
  placeholder: string;
  label: string;
}) {
  const patch = useEncounters((s) => s.patchDiagnostik);
  const value = (enc.diagnostik?.[fieldKey] as string | undefined) ?? '';

  const append = (chip: string) => {
    const cur = value.trim();
    const next = cur ? `${cur}, ${chip}` : chip;
    patch(enc.id, { [fieldKey]: next });
  };

  return (
    <div className="card">
      <h4 className="font-semibold mb-2">{label}</h4>
      <div className="space-y-2 mb-2">
        {groups.map((g) => (
          <div key={g.label}>
            <div className="text-xs text-slate-500 mb-1">{g.label}</div>
            <div className="flex flex-wrap gap-1.5">
              {g.chips.map((c) => (
                <button
                  key={c}
                  className="chip border-slate-300 hover:bg-slate-100"
                  onClick={() => append(c)}
                >
                  + {c}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <textarea
        rows={2}
        className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-900"
        placeholder={placeholder}
        value={value}
        onChange={(e) => patch(enc.id, { [fieldKey]: e.target.value })}
      />
    </div>
  );
}

function FlatChipsEditor({
  fieldKey,
  enc,
  chips,
  placeholder,
  label,
}: {
  fieldKey: FreeKey;
  enc: Encounter;
  chips: string[];
  placeholder: string;
  label: string;
}) {
  const patch = useEncounters((s) => s.patchDiagnostik);
  const value = (enc.diagnostik?.[fieldKey] as string | undefined) ?? '';

  const append = (chip: string) => {
    const cur = value.trim();
    const next = cur ? `${cur}, ${chip}` : chip;
    patch(enc.id, { [fieldKey]: next });
  };

  return (
    <div className="card">
      <h4 className="font-semibold mb-2">{label}</h4>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {chips.map((c) => (
          <button
            key={c}
            className="chip border-slate-300 hover:bg-slate-100"
            onClick={() => append(c)}
          >
            + {c}
          </button>
        ))}
      </div>
      <textarea
        rows={2}
        className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-900"
        placeholder={placeholder}
        value={value}
        onChange={(e) => patch(enc.id, { [fieldKey]: e.target.value })}
      />
    </div>
  );
}

function BgaEditor({ enc }: { enc: Encounter }) {
  const setBga = useEncounters((s) => s.setBgaValue);
  const patch = useEncounters((s) => s.patchDiagnostik);
  const values: Partial<BgaValues> = enc.diagnostik?.bgaValues ?? {};

  return (
    <div className="card">
      <h4 className="font-semibold mb-2">vBGA / aBGA</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {BGA_FIELDS.map((f) => {
          const raw = values[f.key];
          const abn = isBgaAbnormal(f, raw);
          return (
            <label key={f.key} className="text-xs">
              <span className="block text-slate-600">
                {f.label}
                {f.unit && <span className="text-slate-400"> ({f.unit})</span>}
              </span>
              <input
                inputMode="decimal"
                className={`mt-0.5 w-full rounded-md border px-2 py-1 text-sm outline-none tabular-nums ${
                  abn
                    ? 'border-danger-600 bg-danger-50 text-danger-700 focus:border-danger-700'
                    : 'border-slate-300 focus:border-slate-900'
                }`}
                placeholder={`${f.refLow}–${f.refHigh}`}
                value={raw ?? ''}
                onChange={(e) => setBga(enc.id, f.key, e.target.value)}
              />
            </label>
          );
        })}
      </div>
      <textarea
        rows={2}
        className="mt-2 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-900"
        placeholder="Freitextkommentar zur BGA"
        value={enc.diagnostik?.bga ?? ''}
        onChange={(e) => patch(enc.id, { bga: e.target.value })}
      />
    </div>
  );
}

export function DiagnostikStep({
  enc,
  onAdvance,
  onBack,
}: {
  enc: Encounter;
  onAdvance: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="card">
        <h3 className="text-base font-semibold">Diagnostik</h3>
        <p className="text-sm text-slate-500">
          Chips klicken zum Anhängen, Freitext jederzeit editierbar. BGA als
          strukturierte Werte (auffällige Werte werden rot markiert).
        </p>
      </div>

      <GroupedChipsEditor
        fieldKey="ekg"
        enc={enc}
        groups={EKG_GROUPS}
        label="EKG"
        placeholder="SR, 78/min, PQ 160, QRS 90, QT normal, keine ST-Dynamik"
      />

      <BgaEditor enc={enc} />

      <GroupedChipsEditor
        fieldKey="labor"
        enc={enc}
        groups={LABOR_GROUPS}
        label="Labor"
        placeholder="Troponin hs < 6, CRP 3, Lipase 28 …"
      />

      <GroupedChipsEditor
        fieldKey="bildgebung"
        enc={enc}
        groups={BILDGEBUNG_GROUPS}
        label="Bildgebung"
        placeholder="Rö-Thorax: keine Infiltrate, kein Pneu …"
      />

      <GroupedChipsEditor
        fieldKey="pocus"
        enc={enc}
        groups={POCUS_GROUPS}
        label="POCUS"
        placeholder="Echo: normale LV-Funktion, kein Perikarderguss; Lunge: A-Linien bds …"
      />

      <FlatChipsEditor
        fieldKey="weitere"
        enc={enc}
        chips={WEITERE_CHIPS}
        label="Weitere"
        placeholder="Liquor: …; Konsil HNO; Spezialuntersuchungen"
      />

      <div className="card flex justify-between">
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
