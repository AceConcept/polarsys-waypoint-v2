import {
  flowStepFromPolarRoute,
  stageEmbedUrlForStep,
  type FlowStepId
} from './stageEmbedConfig'

/** iframe → shell when user changes step inside the embed */
export const STAGE_EMBED_STEP_CHANGED = 'atencium-step-changed' as const

let stageIframe: HTMLIFrameElement | null = null

export function registerStageEmbedFrame(frame: HTMLIFrameElement | null) {
  stageIframe = frame
}

/** Ensure iframe sync only trusts messages from the active registered frame. */
export function isStageEmbedMessageSource(source: MessageEventSource | null): boolean {
  const win = stageIframe?.contentWindow
  return !!win && source === win
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

/** Parse iframe → shell step message from explicit route/hash only. */
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

  return null
}
