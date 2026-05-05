import type { FlowStepId } from './store/flowStore'
import { STEP_DESCRIPTIONS, STEP_TITLES } from './stepDescriptions'

/**
 * Luna drawer + preview rail — titles, descriptions, optional **thumbUrl** / **heroImageUrl** (`public/` paths).
 */
export type FlowSidebarItem = {
  id: FlowStepId
  label: string
  step: string
  title: string
  description: string
  swatch: string
  thumbUrl?: string
  heroImageUrl?: string
}

function placeholderImagePath(n: 1 | 2 | 3): string {
  const base = `/step_imgs/placeholder-${n}.svg`
  const v = typeof __STEP_IMG_VER__ !== 'undefined' && __STEP_IMG_VER__
    ? __STEP_IMG_VER__
    : ''
  return v ? `${base}?v=${encodeURIComponent(v)}` : base
}

export const FLOW_SIDEBAR_ITEMS: FlowSidebarItem[] = [
  {
    id: 'anomaly',
    label: STEP_TITLES[0],
    step: STEP_TITLES[0],
    title: STEP_TITLES[0],
    description: STEP_DESCRIPTIONS[0],
    swatch: '#e8e4f0',
    thumbUrl: placeholderImagePath(1),
    heroImageUrl: placeholderImagePath(1),
  },
  {
    id: 'incident',
    label: STEP_TITLES[1],
    step: STEP_TITLES[1],
    title: STEP_TITLES[1],
    description: STEP_DESCRIPTIONS[1],
    swatch: '#cab6e0',
    thumbUrl: placeholderImagePath(2),
    heroImageUrl: placeholderImagePath(2),
  },
  {
    id: 'monitor',
    label: STEP_TITLES[2],
    step: STEP_TITLES[2],
    title: STEP_TITLES[2],
    description: STEP_DESCRIPTIONS[2],
    swatch: '#dcd4ec',
    thumbUrl: placeholderImagePath(3),
    heroImageUrl: placeholderImagePath(3),
  },
]
