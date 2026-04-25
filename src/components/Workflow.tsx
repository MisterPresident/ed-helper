import type { Encounter, WorkflowStep } from '../types';
import { SYMPTOMS_BY_KEY } from '../data/symptoms';
import { useEncounters } from '../store/encounters';
import { LeitsymptomStep } from './steps/LeitsymptomStep';
import { LeitdiagnoseStep } from './steps/LeitdiagnoseStep';
import { RosStep } from './steps/RosStep';
import { OpqrstStep } from './steps/OpqrstStep';
import { RedFlagsStep } from './steps/RedFlagsStep';
import { DifferentialsStep } from './steps/DifferentialsStep';
import { ScoreStep } from './steps/ScoreStep';
import { SamplerStep } from './steps/SamplerStep';
import { StatusStep } from './steps/StatusStep';
import { DiagnostikStep } from './steps/DiagnostikStep';
import { DischargeStep } from './steps/DischargeStep';
import { ProzedereStep } from './steps/ProzedereStep';
import { SummaryBlock } from './SummaryBlock';

const STEP_LABELS: Record<WorkflowStep, string> = {
  leitsymptom: 'Leitsymptom',
  leitdiagnose: 'Leitdiagnose',
  ros: 'ROS',
  opqrst: 'OPQRST',
  redflags: 'Red Flags',
  differentials: 'DDx',
  score: 'Scores',
  sampler: 'SAMPLER',
  status: 'Status',
  diagnostik: 'Diagnostik',
  discharge: 'Entlassung',
  prozedere: 'Prozedere',
  summary: 'Summary',
};

const SYMPTOM_FLOW_WITH_OPQRST: WorkflowStep[] = [
  'leitsymptom',
  'opqrst',
  'redflags',
  'differentials',
  'score',
  'sampler',
  'status',
  'diagnostik',
  'prozedere',
  'summary',
];

const SYMPTOM_FLOW_NO_OPQRST: WorkflowStep[] = SYMPTOM_FLOW_WITH_OPQRST.filter(
  (s) => s !== 'opqrst'
);

const DIAGNOSIS_FLOW: WorkflowStep[] = [
  'leitdiagnose',
  'ros',
  'redflags',
  'score',
  'sampler',
  'status',
  'diagnostik',
  'discharge',
  'prozedere',
  'summary',
];

function stepsFor(enc: Encounter): WorkflowStep[] {
  if (enc.pathway === 'diagnosis') return DIAGNOSIS_FLOW;
  const sym = enc.leitsymptom ? SYMPTOMS_BY_KEY[enc.leitsymptom] : undefined;
  return sym?.usesOPQRST === false ? SYMPTOM_FLOW_NO_OPQRST : SYMPTOM_FLOW_WITH_OPQRST;
}

function nextStep(enc: Encounter, current: WorkflowStep): WorkflowStep {
  const seq = stepsFor(enc);
  const idx = seq.indexOf(current);
  return seq[Math.min(idx + 1, seq.length - 1)]!;
}

function prevStep(enc: Encounter, current: WorkflowStep): WorkflowStep {
  const seq = stepsFor(enc);
  const idx = seq.indexOf(current);
  return seq[Math.max(idx - 1, 0)]!;
}

export function Workflow({ encounter }: { encounter: Encounter }) {
  const setStep = useEncounters((s) => s.setStep);
  const step = encounter.step;
  const seq = stepsFor(encounter);

  const advance = () => setStep(encounter.id, nextStep(encounter, step));
  const back = () => setStep(encounter.id, prevStep(encounter, step));

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto">
        <Breadcrumb
          steps={seq}
          current={step}
          onJump={(s) => setStep(encounter.id, s)}
        />

        <div className="mt-4">
          {step === 'leitsymptom' && (
            <LeitsymptomStep enc={encounter} onAdvance={advance} />
          )}
          {step === 'leitdiagnose' && (
            <LeitdiagnoseStep enc={encounter} onAdvance={advance} />
          )}
          {step === 'ros' && <RosStep enc={encounter} onAdvance={advance} onBack={back} />}
          {step === 'opqrst' && (
            <OpqrstStep enc={encounter} onAdvance={advance} onBack={back} />
          )}
          {step === 'redflags' && (
            <RedFlagsStep enc={encounter} onAdvance={advance} onBack={back} />
          )}
          {step === 'differentials' && (
            <DifferentialsStep enc={encounter} onAdvance={advance} onBack={back} />
          )}
          {step === 'score' && (
            <ScoreStep enc={encounter} onAdvance={advance} onBack={back} />
          )}
          {step === 'sampler' && (
            <SamplerStep enc={encounter} onAdvance={advance} onBack={back} />
          )}
          {step === 'status' && (
            <StatusStep enc={encounter} onAdvance={advance} onBack={back} />
          )}
          {step === 'diagnostik' && (
            <DiagnostikStep enc={encounter} onAdvance={advance} onBack={back} />
          )}
          {step === 'discharge' && (
            <DischargeStep enc={encounter} onAdvance={advance} onBack={back} />
          )}
          {step === 'prozedere' && (
            <ProzedereStep enc={encounter} onAdvance={advance} onBack={back} />
          )}
          {step === 'summary' && <SummaryBlock enc={encounter} onBack={back} />}
        </div>
      </div>
    </div>
  );
}

function Breadcrumb({
  steps,
  current,
  onJump,
}: {
  steps: WorkflowStep[];
  current: WorkflowStep;
  onJump: (s: WorkflowStep) => void;
}) {
  const currentIdx = steps.indexOf(current);
  return (
    <div className="flex flex-wrap items-center gap-1 text-sm">
      {steps.map((s, idx) => {
        const active = s === current;
        const past = idx < currentIdx;
        return (
          <div key={s} className="flex items-center gap-1">
            <button
              className={`px-2 py-1 rounded-md transition text-xs ${
                active
                  ? 'bg-slate-900 text-white'
                  : past
                    ? 'text-slate-700 hover:bg-slate-200'
                    : 'text-slate-400 hover:bg-slate-100'
              }`}
              onClick={() => onJump(s)}
            >
              {STEP_LABELS[s]}
            </button>
            {idx < steps.length - 1 && (
              <span className="text-slate-300 text-xs">›</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
