/**
 * Sidebar titles + body copy — ordered for flow ids: 1–3.
 * Navbar tab labels stay in WaypointNavbar.tsx (Step One / Two / Three).
 */

export const STEP_TITLES = ['Anomaly', 'Incident', 'Monitor'] as const

export const STEP_DESCRIPTIONS = [
  'Network anomalies and cards — home view. Click Anomaly Detection to move forward',
  'Incident details, node relationship graph, issue overview - Click Host Telemetry to move forward',
  'Host monitoring, metrics, and task table.',
] as const
