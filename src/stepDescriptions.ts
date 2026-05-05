/**
 * Sidebar titles + body copy — ordered for flow IDs: anomaly, incident, monitor.
 * (IDs stay wired to URL hashes; labels here are generic for the shell.)
 */

export const STEP_TITLES = ['Step one', 'Step two', 'Step three'] as const

export const STEP_DESCRIPTIONS = [
  'Start here with a brief overview placeholder for this milestone.',
  'Continue through the guided section with sample content placeholders.',
  'Finish with a review-style placeholder before you ship real content.',
] as const
