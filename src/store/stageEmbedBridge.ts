import {
  FLOW_STEP_IDS,
  flowStepFromPolarRoute,
  getStageEmbedOrigin,
  polarRouteFromFlowStep,
  stageEmbedUrlForStep,
  type FlowStepId,
} from './stageEmbedConfig'

export const STAGE_EMBED_SET_STEP = 'atencium-set-step' as const
/** iframe → shell when user changes step inside the embed */
export const STAGE_EMBED_STEP_CHANGED = 'atencium-step-changed' as const
/** shell asks iframe for current step (polling fallback) */
export const STAGE_EMBED_REQUEST_STEP = 'atencium-request-step' as const

let stageIframe: HTMLIFrameElement | null = null

export function registerStageEmbedFrame(frame: HTMLIFrameElement | null) {
  stageIframe = frame
}

function embedTargetOrigin(): string {
  if (!stageIframe?.src) return getStageEmbedOrigin()
  try {
    return new URL(stageIframe.src, window.location.href).origin
  } catch {
    return getStageEmbedOrigin()
  }
}

/** Navigate the registered iframe to the polar-sys route for this step. */
export function navigateStageEmbedToStep(id: FlowStepId) {
  const frame = stageIframe
  if (!frame) return
  const target = stageEmbedUrlForStep(id)
  try {
    const next = new URL(target, window.location.href).href
    const current = new URL(frame.src, window.location.href)
    if (current.href !== next) frame.src = next
  } catch {
    frame.src = target
  }
}

/** Parse iframe → shell step message (`step` and/or polar `route`). */
export function flowStepIdFromEmbedMessage(data: unknown): FlowStepId | null {
  if (!data || typeof data !== 'object') return null
  const payload = data as { type?: string; step?: number; route?: string; hash?: string }
  if (payload.type !== STAGE_EMBED_STEP_CHANGED) return null

  if (typeof payload.route === 'string') {
    const fromRoute = flowStepFromPolarRoute(payload.route)
    if (fromRoute) return fromRoute
  }

  if (typeof payload.hash === 'string') {
    const m = payload.hash.match(/#\/([\w-]+)/)
    if (m?.[1]) {
      const fromHash = flowStepFromPolarRoute(m[1])
      if (fromHash) return fromHash
    }
  }

  const n = Number(payload.step)
  if (Number.isFinite(n) && n >= 1 && n <= FLOW_STEP_IDS.length) {
    const id = String(n) as FlowStepId
    if (FLOW_STEP_IDS.includes(id)) return id
  }

  return null
}

export function postStageEmbedStep(step: number) {
  const win = stageIframe?.contentWindow
  if (!win) return
  const id = String(step) as FlowStepId
  const route = FLOW_STEP_IDS.includes(id) ? polarRouteFromFlowStep(id) : undefined
  win.postMessage(
    { type: STAGE_EMBED_SET_STEP, step, ...(route ? { route } : {}) },
    embedTargetOrigin(),
  )
}

/** Ask the iframe to report its current step (requires updated steps-project-slot). */
export function requestStageEmbedStep() {
  const win = stageIframe?.contentWindow
  if (!win) return
  win.postMessage({ type: STAGE_EMBED_REQUEST_STEP }, embedTargetOrigin())
}
