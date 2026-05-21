import type { FlowchartDef, SymptomKey } from '../../types';
import { giFlows } from './gi';
import { cardioFlows } from './cardio';
import { neuroFlows } from './neuro';
import { otherFlows } from './other';

export const FLOWCHARTS: FlowchartDef[] = [
  ...giFlows,
  ...cardioFlows,
  ...neuroFlows,
  ...otherFlows,
];

export const FLOWCHARTS_BY_SYMPTOM: Record<SymptomKey, FlowchartDef> = Object.fromEntries(
  FLOWCHARTS.map((f) => [f.symptomKey, f]),
);
