import type {
  Encounter,
  FlowEdge,
  FlowNode,
  FlowchartDef,
} from '../types';
import { FLOWCHARTS_BY_SYMPTOM } from '../data/flowcharts';
import { RED_FLAGS } from '../data/redFlags';
import { SCORES } from '../data/scores';
import { walkFlowchart, type FlowStep } from '../lib/flowchart';
import { useEncounters } from '../store/encounters';

const NODE_STYLE: Record<FlowNode['type'], string> = {
  decision: 'border-slate-300 bg-white',
  action: 'border-sky-300 bg-sky-50',
  diagnosis: 'border-amber-300 bg-amber-50',
  disposition: 'border-emerald-300 bg-emerald-50',
};

const NODE_BADGE: Record<FlowNode['type'], string> = {
  decision: 'Entscheidung',
  action: 'Maßnahme',
  diagnosis: 'Diagnose',
  disposition: 'Disposition',
};

const DRIVER_LABEL = {
  anamnese: 'Anamnese',
  redflag: 'Red Flag',
  manual: 'Auswahl',
} as const;

function ResolvedBadge({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-white">
      <span className="opacity-60">{label}:</span>
      <span>{value}</span>
    </span>
  );
}

function EdgePill({
  edge,
  selected,
  pickable,
  onPick,
  onClear,
}: {
  edge: FlowEdge;
  selected: boolean;
  pickable: boolean;
  onPick?: () => void;
  onClear?: () => void;
}) {
  const label = edge.label ?? edge.when;
  const base =
    'rounded-md border px-2 py-0.5 text-[11px] font-medium transition focus:outline-none';
  const className = selected
    ? `${base} border-slate-900 bg-slate-900 text-white`
    : pickable
      ? `${base} border-slate-300 bg-white text-slate-700 hover:border-slate-900`
      : `${base} border-slate-200 bg-slate-50 text-slate-400`;
  return (
    <button
      type="button"
      disabled={!pickable && !selected}
      onClick={selected ? onClear : onPick}
      className={className}
      title={selected ? 'Klick zum Zurücksetzen' : 'Klick um diese Option zu wählen'}
    >
      {label}
    </button>
  );
}

function CrossRefs({ node }: { node: FlowNode }) {
  if (!node.scoreKey && !node.redFlagKey) return null;
  return (
    <div className="mt-1.5 flex flex-wrap gap-1">
      {node.scoreKey && (
        <span className="rounded-full border border-violet-300 bg-violet-50 px-2 py-0.5 text-[10px] text-violet-700">
          Score: {SCORES[node.scoreKey]?.label ?? node.scoreKey}
        </span>
      )}
      {node.redFlagKey && (
        <span className="rounded-full border border-danger-300 bg-danger-50 px-2 py-0.5 text-[10px] text-danger-700">
          Red Flag: {RED_FLAGS[node.redFlagKey]?.suspects ?? node.redFlagKey}
        </span>
      )}
    </div>
  );
}

function StepCard({
  step,
  onManual,
  onClearManual,
}: {
  step: FlowStep;
  onManual: (nodeKey: string, value: string) => void;
  onClearManual: (nodeKey: string) => void;
}) {
  const { node, resolved, takenEdge } = step;
  const isDecision = node.type === 'decision';
  const isManual = isDecision && node.driver?.kind === 'manual';
  const driverKindLabel = node.driver ? DRIVER_LABEL[node.driver.kind] : undefined;

  return (
    <div className={`rounded-md border p-2 ${NODE_STYLE[node.type]}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            {NODE_BADGE[node.type]}
          </div>
          <div className="text-xs font-semibold leading-tight">{node.label}</div>
          {node.detail && (
            <div className="mt-1 text-[11px] text-slate-600 leading-snug">{node.detail}</div>
          )}
        </div>
        {resolved !== undefined && takenEdge && (
          <ResolvedBadge
            label={driverKindLabel ?? 'Wert'}
            value={takenEdge.label ?? takenEdge.when}
          />
        )}
      </div>

      <CrossRefs node={node} />

      {isDecision && node.edges && (
        <div className="mt-2 flex flex-wrap gap-1">
          {node.edges.map((e) => {
            const isSelected = takenEdge?.when === e.when;
            return (
              <EdgePill
                key={e.when}
                edge={e}
                selected={isSelected}
                pickable={isManual && !isSelected}
                onPick={isManual ? () => onManual(node.key, e.when) : undefined}
                onClear={isSelected && isManual ? () => onClearManual(node.key) : undefined}
              />
            );
          })}
        </div>
      )}

      {isDecision && !isManual && resolved === undefined && node.driver && (
        <p className="mt-1.5 text-[10px] text-slate-500 italic">
          Wartet auf Antwort{' '}
          {node.driver.kind === 'anamnese' &&
            `(Anamnesefrage „${node.driver.questionKey}" beantworten)`}
          {node.driver.kind === 'redflag' &&
            `(Red Flag „${RED_FLAGS[node.driver.key]?.suspects ?? node.driver.key}" bewerten)`}
        </p>
      )}
    </div>
  );
}

function FlowchartView({ enc, flow }: { enc: Encounter; flow: FlowchartDef }) {
  const setFlowDecision = useEncounters((s) => s.setFlowDecision);
  const clearFlowDecision = useEncounters((s) => s.clearFlowDecision);
  const resetFlow = useEncounters((s) => s.resetFlowDecisions);

  const path = walkFlowchart(flow, enc);
  const manualCount = Object.keys(enc.flowDecisions ?? {}).length;
  const total = Object.keys(flow.nodes).length;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[10px] text-slate-500">
        <span>
          {path.length} / {total} Knoten aktiv
        </span>
        {manualCount > 0 && (
          <button
            className="rounded border border-slate-300 px-1.5 py-0.5 text-[10px] hover:bg-slate-100"
            onClick={() => resetFlow(enc.id)}
          >
            Reset
          </button>
        )}
      </div>
      {path.map((step) => (
        <StepCard
          key={step.node.key}
          step={step}
          onManual={(nodeKey, value) => setFlowDecision(enc.id, nodeKey, value)}
          onClearManual={(nodeKey) => clearFlowDecision(enc.id, nodeKey)}
        />
      ))}
      {path.length === 0 && (
        <p className="text-[11px] text-slate-500 italic">Kein Startknoten gefunden.</p>
      )}
    </div>
  );
}

export function FlowchartPanel({ enc }: { enc: Encounter }) {
  if (!enc.leitsymptom) {
    return (
      <p className="text-xs text-slate-500">
        Erst Leitsymptom wählen — der zugehörige Algorithmus wird hier angezeigt.
      </p>
    );
  }
  const flow = FLOWCHARTS_BY_SYMPTOM[enc.leitsymptom];
  if (!flow) {
    return (
      <p className="text-xs text-slate-500">
        Für dieses Leitsymptom ist noch kein Algorithmus hinterlegt.
      </p>
    );
  }
  return <FlowchartView enc={enc} flow={flow} />;
}
