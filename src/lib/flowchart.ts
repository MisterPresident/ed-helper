import type {
  Encounter,
  FlowEdge,
  FlowNode,
  FlowchartDef,
} from '../types';

/**
 * Returns the value of the driver for a node, looked up from the encounter.
 * Returns `undefined` if the node has no driver or no decision has been made
 * yet (anamnese 'unknown' counts as undefined so the user can still pick a
 * branch manually).
 */
export function resolveDriverValue(
  node: FlowNode,
  enc: Encounter,
): string | undefined {
  const driver = node.driver;
  if (!driver) return undefined;
  switch (driver.kind) {
    case 'anamnese': {
      const v = enc.anamneseAnswers?.[driver.questionKey];
      return v === 'unknown' ? undefined : v;
    }
    case 'redflag': {
      const v = enc.redFlags?.[driver.key];
      return v === 'unknown' ? undefined : v;
    }
    case 'manual':
      return enc.flowDecisions?.[node.key];
  }
}

export function pickEdge(node: FlowNode, when: string | undefined): FlowEdge | undefined {
  if (when === undefined) return undefined;
  return node.edges?.find((e) => e.when === when);
}

export type FlowStep = {
  node: FlowNode;
  resolved: string | undefined;
  takenEdge: FlowEdge | undefined;
};

/**
 * Walk the flowchart from its root following resolved driver values. Stops
 * at the first unresolved decision or terminal node. Returns the visited
 * sequence so the renderer can render the active path top-down. Includes
 * a cycle guard against malformed flowchart data.
 */
export function walkFlowchart(flow: FlowchartDef, enc: Encounter): FlowStep[] {
  const path: FlowStep[] = [];
  const seen = new Set<string>();
  let currentKey: string | undefined = flow.rootKey;

  while (currentKey) {
    if (seen.has(currentKey)) break;
    seen.add(currentKey);

    const node = flow.nodes[currentKey];
    if (!node) break;

    if (node.type === 'decision') {
      const resolved = resolveDriverValue(node, enc);
      const edge = pickEdge(node, resolved);
      path.push({ node, resolved, takenEdge: edge });
      currentKey = edge?.to;
    } else {
      path.push({ node, resolved: undefined, takenEdge: undefined });
      currentKey = node.next;
    }
  }

  return path;
}
