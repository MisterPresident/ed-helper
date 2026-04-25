import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  BgaValues,
  DiagnosisKey,
  DifferentialState,
  Diagnostik,
  Treatment,
  Encounter,
  EncounterId,
  OPQRST,
  Pathway,
  RedFlagKey,
  RedFlagState,
  RosState,
  SAMPLER,
  ScoreKey,
  ScoreResult,
  StatusSystemKey,
  SymptomKey,
  WorkflowStep,
} from '../types';
import { newId } from '../lib/id';

type State = {
  encounters: Encounter[];
  activeId: EncounterId | null;
};

type Actions = {
  createEncounter: (opts?: { label?: string; pathway?: Pathway }) => EncounterId;
  removeEncounter: (id: EncounterId) => void;
  setActive: (id: EncounterId | null) => void;
  renameEncounter: (id: EncounterId, label: string) => void;
  setStep: (id: EncounterId, step: WorkflowStep) => void;
  setPathway: (id: EncounterId, pathway: Pathway) => void;
  setLeitsymptom: (id: EncounterId, key: SymptomKey) => void;
  setLeitdiagnose: (id: EncounterId, key: DiagnosisKey) => void;
  patchOpqrst: (id: EncounterId, patch: Partial<OPQRST>) => void;
  setRos: (id: EncounterId, key: string, state: RosState) => void;
  setRedFlag: (id: EncounterId, key: RedFlagKey, state: RedFlagState) => void;
  setDifferential: (id: EncounterId, key: string, state: DifferentialState) => void;
  setDifferentialsFree: (id: EncounterId, text: string) => void;
  setScoreResult: (id: EncounterId, key: ScoreKey, result: ScoreResult) => void;
  clearScoreResult: (id: EncounterId, key: ScoreKey) => void;
  patchSampler: (id: EncounterId, patch: Partial<SAMPLER>) => void;
  setStatusFindings: (
    id: EncounterId,
    system: StatusSystemKey,
    findings: string[],
    free?: string
  ) => void;
  patchDiagnostik: (id: EncounterId, patch: Partial<Diagnostik>) => void;
  setBgaValue: (id: EncounterId, key: keyof BgaValues, value: string) => void;
  patchTreatment: (id: EncounterId, patch: Partial<Treatment>) => void;
  setDischarge: (id: EncounterId, key: string, checked: boolean) => void;
  setProzedere: (id: EncounterId, text: string) => void;
  setProzedereChips: (id: EncounterId, chips: string[]) => void;
  setNotes: (id: EncounterId, notes: string) => void;
};

const nextLabel = (existing: Encounter[]): string => `Patient ${existing.length + 1}`;

const patchEncounter = (
  s: State,
  id: EncounterId,
  fn: (e: Encounter) => Encounter
): Pick<State, 'encounters'> => ({
  encounters: s.encounters.map((e) => (e.id === id ? fn(e) : e)),
});

export const useEncounters = create<State & Actions>()(
  persist(
    (set, get) => ({
      encounters: [],
      activeId: null,

      createEncounter: (opts) => {
        const id = newId();
        const pathway: Pathway = opts?.pathway ?? 'symptom';
        const enc: Encounter = {
          id,
          label: opts?.label?.trim() || nextLabel(get().encounters),
          createdAt: Date.now(),
          pathway,
          step: pathway === 'diagnosis' ? 'leitdiagnose' : 'leitsymptom',
        };
        set((s) => ({ encounters: [...s.encounters, enc], activeId: id }));
        return id;
      },

      removeEncounter: (id) =>
        set((s) => {
          const encounters = s.encounters.filter((e) => e.id !== id);
          const activeId =
            s.activeId === id ? (encounters[0]?.id ?? null) : s.activeId;
          return { encounters, activeId };
        }),

      setActive: (id) => set({ activeId: id }),

      renameEncounter: (id, label) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            label: label.trim() || e.label,
          }))
        ),

      setStep: (id, step) =>
        set((s) => patchEncounter(s, id, (e) => ({ ...e, step }))),

      setPathway: (id, pathway) =>
        set((s) => patchEncounter(s, id, (e) => ({ ...e, pathway }))),

      setLeitsymptom: (id, key) =>
        set((s) => patchEncounter(s, id, (e) => ({ ...e, leitsymptom: key })),
        ),

      setLeitdiagnose: (id, key) =>
        set((s) => patchEncounter(s, id, (e) => ({ ...e, leitdiagnose: key }))),

      patchOpqrst: (id, patch) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            opqrst: { ...(e.opqrst ?? {}), ...patch },
          }))
        ),

      setRos: (id, key, state) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            ros: { ...(e.ros ?? {}), [key]: state },
          }))
        ),

      setRedFlag: (id, key, state) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            redFlags: { ...(e.redFlags ?? {}), [key]: state },
          }))
        ),

      setDifferential: (id, key, state) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            differentials: { ...(e.differentials ?? {}), [key]: state },
          }))
        ),

      setDifferentialsFree: (id, text) =>
        set((s) => patchEncounter(s, id, (e) => ({ ...e, differentialsFree: text }))),

      setScoreResult: (id, key, result) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            scoreResults: { ...(e.scoreResults ?? {}), [key]: result },
          }))
        ),

      clearScoreResult: (id, key) =>
        set((s) =>
          patchEncounter(s, id, (e) => {
            const next = { ...(e.scoreResults ?? {}) };
            delete next[key];
            return { ...e, scoreResults: next };
          })
        ),

      patchSampler: (id, patch) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            sampler: { ...(e.sampler ?? {}), ...patch },
          }))
        ),

      setStatusFindings: (id, system, findings, free) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            status: {
              ...(e.status ?? {}),
              [system]: { systemKey: system, findings, free },
            },
          }))
        ),

      patchDiagnostik: (id, patch) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            diagnostik: { ...(e.diagnostik ?? {}), ...patch },
          }))
        ),

      setBgaValue: (id, key, value) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            diagnostik: {
              ...(e.diagnostik ?? {}),
              bgaValues: { ...(e.diagnostik?.bgaValues ?? {}), [key]: value },
            },
          }))
        ),

      patchTreatment: (id, patch) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            treatment: { ...(e.treatment ?? {}), ...patch },
          }))
        ),

      setDischarge: (id, key, checked) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            dischargeChecked: { ...(e.dischargeChecked ?? {}), [key]: checked },
          }))
        ),

      setProzedere: (id, text) =>
        set((s) => patchEncounter(s, id, (e) => ({ ...e, prozedere: text }))),

      setProzedereChips: (id, chips) =>
        set((s) => patchEncounter(s, id, (e) => ({ ...e, prozedereChips: chips }))),

      setNotes: (id, notes) =>
        set((s) => patchEncounter(s, id, (e) => ({ ...e, notes }))),
    }),
    {
      name: 'er-helper:encounters:v1',
      version: 3,
    }
  )
);

export const selectActive = (s: State): Encounter | null =>
  s.encounters.find((e) => e.id === s.activeId) ?? null;
