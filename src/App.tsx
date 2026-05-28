import { LunaChrome } from './luna/LunaChrome'
import { WaypointSidebar } from './luna/WaypointSidebar'
import WaypointStepsScreen from './steps/WaypointStepsScreen'
import { FLOW_SIDEBAR_ITEMS } from './flowSidebarItems'
import { useEffect } from 'react'
import { FLOW_STEPS, useFlowStep, useFlowStore } from './store/flowStore'
import './App.css'

const RAIL_LABEL = 'Waypoint guide'

function App() {
  const { step, stepIndex } = useFlowStep()
  const goToStepById = useFlowStore((s) => s.goToStepById)

  useEffect(() => {
    const { stepIndex } = useFlowStore.getState()
    const initial = FLOW_STEPS[stepIndex]
    if (initial) goToStepById(initial.id)
  }, [goToStepById])

  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem('atencium-step', String(stepIndex + 1))
    } catch {
      /* ignore */
    }
  }

  return (
    <LunaChrome
      footerBackgroundUrl="/news_bg.jpg"
      sidebar={({ expanded, onExpandedChange }) => (
        <div className="waypoint-sidebar">
          <WaypointSidebar
            items={FLOW_SIDEBAR_ITEMS}
            expanded={expanded}
            onExpandedChange={onExpandedChange}
            initialActiveId={step.id}
            onActiveItemChange={(id) => {
              const hit = FLOW_SIDEBAR_ITEMS.find((item) => item.id === id)
              if (hit) goToStepById(hit.id)
            }}
            railLabel={RAIL_LABEL}
          />
        </div>
      )}
    >
      <WaypointStepsScreen />
    </LunaChrome>
  )
}

export default App
