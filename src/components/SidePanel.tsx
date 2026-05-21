import { useState } from 'react';
import type { Encounter, RedFlagState } from '../types';
import { SAMPLER_FIELDS } from '../data/sampler';
import { RED_FLAGS } from '../data/redFlags';
import { SYMPTOMS_BY_KEY } from '../data/symptoms';
import { DIAGNOSES_BY_KEY } from '../data/diagnoses';
import { useEncounters } from '../store/encounters';
import { VitalsStrip } from './VitalsStrip';
import { DiagnosesStrip } from './DiagnosesStrip';
import { FlowchartPanel } from './FlowchartPanel';

const flagCycle: Record<RedFlagState, RedFlagState> = {
  unknown: 'excluded',
  excluded: 'positive',
  positive: 'unknown',
};

const flagStyles: Record<RedFlagState, string> = {
  unknown: 'border-slate-300 bg-white text-slate-600 hover:bg-slate-100',
  excluded: 'border-ok-600 bg-ok-50 text-ok-700',
  positive: 'border-danger-600 bg-danger-50 text-danger-700',
};

const flagLabel: Record<RedFlagState, string> = {
  unknown: '–',
  excluded: 'neg',
  positive: 'pos',
};

function SamplerPanel({ enc }: { enc: Encounter }) {
  const patch = useEncounters((s) => s.patchSampler);
  return (
    <div className="space-y-2">
      {SAMPLER_FIELDS.map((f) => (
        <label key={f.key} className="block">
          <span className="text-xs font-medium text-slate-600">{f.label}</span>
          <textarea
            rows={2}
            className="mt-0.5 w-full rounded-md border border-slate-300 px-2 py-1 text-sm outline-none focus:border-slate-900"
            placeholder={f.placeholder}
            value={enc.sampler?.[f.key] ?? ''}
            onChange={(e) => patch(enc.id, { [f.key]: e.target.value })}
          />
        </label>
      ))}
    </div>
  );
}

function RedFlagsPanel({ enc }: { enc: Encounter }) {
  const setFlag = useEncounters((s) => s.setRedFlag);

  // Union of red flags from the Leitsymptom + every active diagnosis (any status).
  const keySet = new Set<string>();
  if (enc.leitsymptom) {
    for (const k of SYMPTOMS_BY_KEY[enc.leitsymptom]?.redFlagKeys ?? []) keySet.add(k);
  }
  for (const dx of enc.diagnoses ?? []) {
    for (const k of DIAGNOSES_BY_KEY[dx.key]?.redFlagKeys ?? []) keySet.add(k);
  }
  const keys = Array.from(keySet);

  if (keys.length === 0) {
    return (
      <p className="text-xs text-slate-500">
        Erst Leitsymptom/Leitdiagnose wählen — dann erscheinen die Red Flags hier.
      </p>
    );
  }

  return (
    <div className="space-y-1.5">
      {keys.map((k) => {
        const flag = RED_FLAGS[k];
        if (!flag) return null;
        const state: RedFlagState = enc.redFlags?.[k] ?? 'unknown';
        return (
          <button
            key={k}
            onClick={() => setFlag(enc.id, k, flagCycle[state])}
            className={`w-full text-left rounded-md border px-2 py-1.5 text-xs transition ${flagStyles[state]}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="font-medium leading-tight">{flag.label}</div>
                <div className="opacity-75 truncate">{flag.suspects}</div>
              </div>
              <span className="shrink-0 font-semibold uppercase tracking-wide">
                {flagLabel[state]}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function Section({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="card">
      <button
        className="w-full flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-semibold">{title}</span>
        <span className="text-slate-400 text-xs">{open ? '▾' : '▸'}</span>
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

export function SidePanel({ enc }: { enc: Encounter }) {
  return (
    <aside className="hidden lg:flex w-80 shrink-0 border-l border-slate-200 bg-slate-50 flex-col gap-2 p-3 overflow-y-auto">
      <Section title="Vitalwerte">
        <VitalsStrip enc={enc} />
      </Section>
      <Section title="Hypothesen">
        <DiagnosesStrip enc={enc} />
      </Section>
      <Section title="Algorithmus">
        <FlowchartPanel enc={enc} />
      </Section>
      <Section title="SAMPLER" defaultOpen={false}>
        <SamplerPanel enc={enc} />
      </Section>
      <Section title="Red Flags" defaultOpen={false}>
        <RedFlagsPanel enc={enc} />
      </Section>
    </aside>
  );
}
