import type {
  BgaValues,
  ChipGroup,
  ChipSelection,
  Encounter,
} from '../../types';
import {
  BGA_FIELDS,
  BILDGEBUNG_GROUPS,
  EKG_GROUPS,
  LABOR_GROUPS,
  POCUS_GROUPS,
  WEITERE_CHIPS,
  isBgaAbnormal,
} from '../../data/diagnostik';
import { useEncounters } from '../../store/encounters';
import { ChipGroupEditor } from '../ChipGroupEditor';

type SectionKey = 'ekgSel' | 'bildgebungSel' | 'pocusSel';

function ChipGroupsEditor({
  enc,
  groups,
  section,
  label,
  freeFieldKey,
  freePlaceholder,
}: {
  enc: Encounter;
  groups: ChipGroup[];
  section: SectionKey;
  label: string;
  freeFieldKey: 'ekg' | 'bildgebung' | 'pocus';
  freePlaceholder: string;
}) {
  const setChipGroup = useEncounters((s) => s.setChipGroup);
  const patch = useEncounters((s) => s.patchDiagnostik);
  const sel: ChipSelection = enc.diagnostik?.[section] ?? {};
  const free = (enc.diagnostik?.[freeFieldKey] as string | undefined) ?? '';

  return (
    <div className="card">
      <h4 className="font-semibold mb-2">{label}</h4>
      <div className="divide-y divide-slate-100">
        {groups.map((g) => (
          <ChipGroupEditor
            key={g.key}
            group={g}
            selection={sel[g.key]}
            onChange={(chips, number) =>
              setChipGroup(enc.id, section, g.key, chips, number)
            }
          />
        ))}
      </div>
      <textarea
        rows={2}
        className="mt-3 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-900"
        placeholder={freePlaceholder}
        value={free}
        onChange={(e) => patch(enc.id, { [freeFieldKey]: e.target.value })}
      />
    </div>
  );
}

function FlatChipsEditor({
  enc,
  chips,
  label,
  fieldKey,
  placeholder,
}: {
  enc: Encounter;
  chips: string[];
  label: string;
  fieldKey: 'labor' | 'weitere';
  placeholder: string;
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

function LaborEditor({ enc }: { enc: Encounter }) {
  const patch = useEncounters((s) => s.patchDiagnostik);
  const value = enc.diagnostik?.labor ?? '';
  const append = (chip: string) => {
    const cur = value.trim();
    const next = cur ? `${cur}, ${chip}` : chip;
    patch(enc.id, { labor: next });
  };
  return (
    <div className="card">
      <h4 className="font-semibold mb-2">Labor</h4>
      <div className="space-y-2 mb-2">
        {LABOR_GROUPS.map((g) => (
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
        placeholder="Troponin hs < 6, CRP 3, Lipase 28 …"
        value={value}
        onChange={(e) => patch(enc.id, { labor: e.target.value })}
      />
    </div>
  );
}

function EkgChangesToggle({ enc }: { enc: Encounter }) {
  const patch = useEncounters((s) => s.patchDiagnostik);
  const checked = !!enc.diagnostik?.ekgChanges;
  return (
    <label
      className={`card flex items-center gap-2 cursor-pointer text-sm ${
        checked ? 'border-danger-600 bg-danger-50 text-danger-700' : ''
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => patch(enc.id, { ekgChanges: e.target.checked })}
        className="accent-danger-600"
      />
      <span>
        Hyperkaliämie-typische EKG-Veränderungen
        <span className="text-xs text-slate-500 ml-1">
          (hohe spitze T, abgeflachte P, QRS-Verbreiterung, Sinuswelle)
        </span>
      </span>
    </label>
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
          Strukturierte Auswahl: in jeder Gruppe entweder Single-Select (z.B.
          Frequenz) oder Multi-Select (z.B. QRS-Charakter). Numerische Werte mit
          Einheit; auffällige Werte werden rot markiert.
        </p>
      </div>

      <ChipGroupsEditor
        enc={enc}
        groups={EKG_GROUPS}
        section="ekgSel"
        label="EKG"
        freeFieldKey="ekg"
        freePlaceholder='Narrative / Lokalisation z.B. "ST-Hebung in I/aVL, V5/V6"'
      />
      <EkgChangesToggle enc={enc} />

      <BgaEditor enc={enc} />

      <LaborEditor enc={enc} />

      <ChipGroupsEditor
        enc={enc}
        groups={BILDGEBUNG_GROUPS}
        section="bildgebungSel"
        label="Bildgebung"
        freeFieldKey="bildgebung"
        freePlaceholder='Befund-Narrative z.B. "Rö-Thorax: keine Infiltrate, kein Pneu"'
      />

      <ChipGroupsEditor
        enc={enc}
        groups={POCUS_GROUPS}
        section="pocusSel"
        label="POCUS"
        freeFieldKey="pocus"
        freePlaceholder="Echo: normale LV-Funktion, kein Perikarderguss …"
      />

      <FlatChipsEditor
        enc={enc}
        chips={WEITERE_CHIPS}
        label="Weitere"
        fieldKey="weitere"
        placeholder="Liquor, Mikrobiologie, Konsil, Spezialuntersuchungen …"
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
