import { LunaChrome } from './luna/LunaChrome'
import WaypointStepsScreen from './steps/WaypointStepsScreen'
import { useEffect } from 'react'
import { FLOW_STEPS, useFlowStep, useFlowStore } from './store/flowStore'
import './App.css'

function App() {
  const { stepIndex } = useFlowStep()
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
    <LunaChrome footerBackgroundUrl="/news_bg.jpg">
      <WaypointStepsScreen />
    </LunaChrome>
  )
}

export default App
