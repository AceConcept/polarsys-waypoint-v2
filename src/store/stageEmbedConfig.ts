/** Generic numbered step ids (1–6). */
export type FlowStepId = '1' | '2' | '3' | '4' | '5' | '6'

export const FLOW_STEP_IDS = ['1', '2', '3', '4', '5', '6'] as const satisfies readonly FlowStepId[]

/** Must match polar-sys hash routes on STAGE_EMBED_ORIGIN (e.g. `#/anomaly`). */
export const POLAR_SYS_HASH: Record<FlowStepId, string> = {
  '1': '#/anomaly',
  '2': '#/anomaly',
  '3': '#/anomaly',
  '4': '#/anomaly',
  '5': '#/anomaly',
  '6': '#/anomaly',
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
