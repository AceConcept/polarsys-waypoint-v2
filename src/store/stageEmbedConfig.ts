/** Generic numbered step ids (1–3). */
export type FlowStepId = '1' | '2' | '3'

export const FLOW_STEP_IDS = ['1', '2', '3'] as const satisfies readonly FlowStepId[]

/** Waypoint shell URL hashes (`#1` … `#3`) — not polar-sys routes. */
export const SHELL_STEP_HASH: Record<FlowStepId, string> = {
  '1': '#1',
  '2': '#2',
  '3': '#3',
}

/** polar-sys iframe hash routes on STAGE_EMBED_ORIGIN. */
export const POLAR_SYS_HASH: Record<FlowStepId, string> = {
  '1': '#/anomaly',
  '2': '#/incident',
  '3': '#/monitor',
}

export const POLAR_ROUTE_TO_STEP: Record<string, FlowStepId> = {
  anomaly: '1',
  incident: '2',
  monitor: '3',
}

export const FLOW_STEP_TO_POLAR_ROUTE: Record<FlowStepId, keyof typeof POLAR_ROUTE_TO_STEP> = {
  '1': 'anomaly',
  '2': 'incident',
  '3': 'monitor',
}

export function polarRouteFromFlowStep(id: FlowStepId): string {
  return FLOW_STEP_TO_POLAR_ROUTE[id]
}

export function flowStepFromPolarRoute(route: string): FlowStepId | null {
  return flowStepIdFromHashSegment(route)
}

/** Resolve a hash segment to a flow step (shell `#N` or polar `#/route`). */
export function flowStepIdFromHashSegment(segment: string): FlowStepId | null {
  const key = segment.trim()
  if (FLOW_STEP_IDS.includes(key as FlowStepId)) return key as FlowStepId
  return POLAR_ROUTE_TO_STEP[key] ?? null
}

/** iframe target — https://polar-sys.vercel.app */
export const STAGE_EMBED_ORIGIN = 'https://polar-sys.vercel.app'

export function getStageEmbedOrigin(): string {
  const envOrigin = import.meta.env.VITE_STAGE_EMBED_ORIGIN as string | undefined
  if (envOrigin?.trim()) return envOrigin.trim().replace(/\/$/, '')
  return STAGE_EMBED_ORIGIN
}

export function stageEmbedUrl(polarHash: string): string {
  const base = getStageEmbedOrigin().replace(/\/$/, '')
  return `${base}${polarHash}`
}

export function stageEmbedUrlForStep(id: FlowStepId): string {
  return stageEmbedUrl(POLAR_SYS_HASH[id])
}
