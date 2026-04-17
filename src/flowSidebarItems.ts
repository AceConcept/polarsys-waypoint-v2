import type { FlowStepId } from './store/flowStore'

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

const STEP_IMAGE = '/alphinaud.webp'
const STEP_DESC = 'Test Description'

export const FLOW_SIDEBAR_ITEMS: FlowSidebarItem[] = [
  {
    id: '1',
    label: 'Step 1',
    step: 'Step 1',
    title: 'Step 1',
    description: STEP_DESC,
    swatch: '#e8e4f0',
    thumbUrl: STEP_IMAGE,
    heroImageUrl: STEP_IMAGE,
  },
  {
    id: '2',
    label: 'Step 2',
    step: 'Step 2',
    title: 'Step 2',
    description: STEP_DESC,
    swatch: '#e2dcf0',
    thumbUrl: STEP_IMAGE,
    heroImageUrl: STEP_IMAGE,
  },
  {
    id: '3',
    label: 'Step 3',
    step: 'Step 3',
    title: 'Step 3',
    description: STEP_DESC,
    swatch: '#dcd4ec',
    thumbUrl: STEP_IMAGE,
    heroImageUrl: STEP_IMAGE,
  },
  {
    id: '4',
    label: 'Step 4',
    step: 'Step 4',
    title: 'Step 4',
    description: STEP_DESC,
    swatch: '#d6cae8',
    thumbUrl: STEP_IMAGE,
    heroImageUrl: STEP_IMAGE,
  },
  {
    id: '5',
    label: 'Step 5',
    step: 'Step 5',
    title: 'Step 5',
    description: STEP_DESC,
    swatch: '#d0c0e4',
    thumbUrl: STEP_IMAGE,
    heroImageUrl: STEP_IMAGE,
  },
  {
    id: '6',
    label: 'Step 6',
    step: 'Step 6',
    title: 'Step 6',
    description: STEP_DESC,
    swatch: '#cab6e0',
    thumbUrl: STEP_IMAGE,
    heroImageUrl: STEP_IMAGE,
  },
]
