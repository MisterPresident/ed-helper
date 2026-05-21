import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ActiveDiagnosis,
  AnamneseAnswer,
  BgaValues,
  ChipSelection,
  DiagnosisKey,
  DifferentialState,
  Diagnostik,
  DxStatus,
  Encounter,
  EncounterId,
  OPQRST,
  RedFlagKey,
  RedFlagState,
  RosState,
  SAMPLER,
  ScoreKey,
  ScoreResult,
  StatusSystemKey,
  SymptomKey,
  Treatment,
  TreatmentCounts,
  Vitals,
  WorkflowStep,
} from '../types';
import { newId } from '../lib/id';

type State = {
  encounters: Encounter[];
  activeId: EncounterId | null;
};

type Actions = {
  createEncounter: (opts?: { label?: string }) => EncounterId;
  removeEncounter: (id: EncounterId) => void;
  setActive: (id: EncounterId | null) => void;
  renameEncounter: (id: EncounterId, label: string) => void;
  setStep: (id: EncounterId, step: WorkflowStep) => void;
  setLeitsymptom: (id: EncounterId, key: SymptomKey) => void;
  patchOpqrst: (id: EncounterId, patch: Partial<OPQRST>) => void;
  setVital: (id: EncounterId, key: keyof Vitals, value: string) => void;
  addDiagnosis: (id: EncounterId, key: DiagnosisKey, status?: DxStatus) => void;
  addFreeDiagnosis: (id: EncounterId, text: string, status?: DxStatus) => void;
  setDiagnosisStatus: (id: EncounterId, key: DiagnosisKey, status: DxStatus) => void;
  setDiagnosisNote: (id: EncounterId, key: DiagnosisKey, note: string) => void;
  removeDiagnosis: (id: EncounterId, key: DiagnosisKey) => void;
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
  setChipGroup: (
    id: EncounterId,
    section: 'ekgSel' | 'bildgebungSel' | 'pocusSel' | 'laborSel' | 'weitereSel',
    groupKey: string,
    chips: string[],
    number?: string,
  ) => void;
  patchTreatment: (id: EncounterId, patch: Partial<Treatment>) => void;
  setTreatmentCount: (
    id: EncounterId,
    section: keyof Treatment,
    chipLabel: string,
    count: number,
  ) => void;
  setDischarge: (id: EncounterId, key: string, checked: boolean) => void;
  setProzedere: (id: EncounterId, text: string) => void;
  setProzedereChips: (id: EncounterId, chips: string[]) => void;
  setNotes: (id: EncounterId, notes: string) => void;
  setAnamneseAnswer: (id: EncounterId, key: string, answer: AnamneseAnswer) => void;
  setFlowDecision: (id: EncounterId, nodeKey: string, value: string) => void;
  clearFlowDecision: (id: EncounterId, nodeKey: string) => void;
  resetFlowDecisions: (id: EncounterId) => void;
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
        const enc: Encounter = {
          id,
          label: opts?.label?.trim() || nextLabel(get().encounters),
          createdAt: Date.now(),
          step: 'leitsymptom',
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

      setLeitsymptom: (id, key) =>
        set((s) => patchEncounter(s, id, (e) => ({ ...e, leitsymptom: key }))),

      patchOpqrst: (id, patch) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            opqrst: { ...(e.opqrst ?? {}), ...patch },
          }))
        ),

      setVital: (id, key, value) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            vitals: { ...(e.vitals ?? {}), [key]: value },
          }))
        ),

      addDiagnosis: (id, key, status = 'suspected') =>
        set((s) =>
          patchEncounter(s, id, (e) => {
            const existing = e.diagnoses ?? [];
            if (existing.some((d) => d.key === key)) return e;
            const dx: ActiveDiagnosis = { key, status, addedAt: Date.now() };
            return { ...e, diagnoses: [...existing, dx] };
          })
        ),

      addFreeDiagnosis: (id, text, status = 'suspected') =>
        set((s) =>
          patchEncounter(s, id, (e) => {
            const trimmed = text.trim();
            if (!trimmed) return e;
            const existing = e.diagnoses ?? [];
            const dx: ActiveDiagnosis = {
              key: `free:${newId()}`,
              status,
              addedAt: Date.now(),
              freeText: trimmed,
            };
            return { ...e, diagnoses: [...existing, dx] };
          })
        ),

      setDiagnosisStatus: (id, key, status) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            diagnoses: (e.diagnoses ?? []).map((d) =>
              d.key === key ? { ...d, status } : d
            ),
          }))
        ),

      setDiagnosisNote: (id, key, note) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            diagnoses: (e.diagnoses ?? []).map((d) =>
              d.key === key ? { ...d, note } : d
            ),
          }))
        ),

      removeDiagnosis: (id, key) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            diagnoses: (e.diagnoses ?? []).filter((d) => d.key !== key),
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

      setChipGroup: (id, section, groupKey, chips, number) =>
        set((s) =>
          patchEncounter(s, id, (e) => {
            const existing: ChipSelection = e.diagnostik?.[section] ?? {};
            const isEmpty = chips.length === 0 && (number === undefined || !number.trim());
            const next: ChipSelection = { ...existing };
            if (isEmpty) {
              delete next[groupKey];
            } else {
              next[groupKey] = { chips, number };
            }
            return {
              ...e,
              diagnostik: { ...(e.diagnostik ?? {}), [section]: next },
            };
          })
        ),

      patchTreatment: (id, patch) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            treatment: { ...(e.treatment ?? {}), ...patch },
          }))
        ),

      setTreatmentCount: (id, section, chipLabel, count) =>
        set((s) =>
          patchEncounter(s, id, (e) => {
            const counts: TreatmentCounts = e.treatmentCounts ?? {};
            const sectionCounts = { ...(counts[section] ?? {}) };
            const next = Math.max(0, count | 0);
            if (next === 0) {
              delete sectionCounts[chipLabel];
            } else {
              sectionCounts[chipLabel] = next;
            }
            const nextCounts: TreatmentCounts = { ...counts };
            if (Object.keys(sectionCounts).length === 0) {
              delete nextCounts[section];
            } else {
              nextCounts[section] = sectionCounts;
            }
            return { ...e, treatmentCounts: nextCounts };
          })
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

      setAnamneseAnswer: (id, key, answer) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            anamneseAnswers: { ...(e.anamneseAnswers ?? {}), [key]: answer },
          }))
        ),

      setFlowDecision: (id, nodeKey, value) =>
        set((s) =>
          patchEncounter(s, id, (e) => ({
            ...e,
            flowDecisions: { ...(e.flowDecisions ?? {}), [nodeKey]: value },
          }))
        ),

      clearFlowDecision: (id, nodeKey) =>
        set((s) =>
          patchEncounter(s, id, (e) => {
            const next = { ...(e.flowDecisions ?? {}) };
            delete next[nodeKey];
            return { ...e, flowDecisions: next };
          })
        ),

      resetFlowDecisions: (id) =>
        set((s) => patchEncounter(s, id, (e) => ({ ...e, flowDecisions: {} }))),
    }),
    {
      name: 'er-helper:encounters:v1',
      version: 6,
    }
  )
);

export const selectActive = (s: State): Encounter | null =>
  s.encounters.find((e) => e.id === s.activeId) ?? null;
