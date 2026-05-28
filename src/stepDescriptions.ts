/**
 * Sidebar titles + body copy — ordered for flow ids: 1–3.
 * Navbar tab labels stay in WaypointNavbar.tsx (Step One / Two / Three).
 */

export const STEP_TITLES = ['Anomaly', 'Incident', 'Monitor'] as const

export const STEP_DESCRIPTIONS = [
  'The anomaly detection process begins in a centralized catalog where the Leo2.0Y engine surfaces high-priority threats, such as Case #8846 on db-core-02.internal.\n\n*Click DNS Loop Port Scan Corellation to continue*',
  'Once a case is selected, the system provides a dynamic Node Graph and detailed host insights to map the threat’s trajectory. This visual relationship map highlights lateral movement and correlation strength between internal and external nodes, while time-based graphs pinpoint exactly when activity escalated.\n\n*Click db internal node and then "view host telemetry" to move forward*',
  'Armed with this context, analysts can execute AI-generated remediation steps—such as isolating the host or replaying traffic—to quickly contain the intrusion and resolve the compromise. This is the end of the flow.',
] as const
