import { AnimatePresence, motion } from 'framer-motion'
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { LunaCanvasScaleContext } from 'waypoint-sidebar/src/luna-sidebar/index.js'
import { useFlowStep } from '../store/flowStore'
import {
  getCanvasContainScale,
  SIDEBAR_COLLAPSED_REM,
  SIDEBAR_EXPANDED_REM,
} from 'waypoint-sidebar/src/luna-sidebar/canvasScale.js'
import {
  applyLunaDocumentScale,
  getLunaScaleViewportSize,
  resetLunaDocumentScale,
} from './applyLunaDocumentScale'
import { WaypointNavbar } from './WaypointNavbar'
import './lunaChrome.css'

export type LunaChromeSidebarControls = {
  expanded: boolean
  onExpandedChange: (next: boolean) => void
}

type LunaChromeProps = {
  children?: ReactNode
  footerBackgroundUrl?: string
  sidebar: (controls: LunaChromeSidebarControls) => ReactNode
}

export function LunaChrome({
  children,
  footerBackgroundUrl,
  sidebar,
}: LunaChromeProps) {
  const layoutRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [viewport, setViewport] = useState({ width: 0, height: 0 })
  const [expanded, setExpanded] = useState(false)
  const { step } = useFlowStep()

  useLayoutEffect(() => {
    const update = () => {
      const size = getLunaScaleViewportSize()
      if (size.width <= 0 || size.height <= 0) {
        setScale(1)
        setViewport(size)
        return
      }
      const nextScale = getCanvasContainScale(size.width, size.height)
      setViewport(size)
      setScale(nextScale)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useLayoutEffect(() => {
    if (viewport.width <= 0 || viewport.height <= 0) return
    applyLunaDocumentScale(scale, viewport)
  }, [scale, viewport])

  useLayoutEffect(() => {
    return () => resetLunaDocumentScale()
  }, [])

  useLayoutEffect(() => {
    const layout = layoutRef.current
    if (!layout) return
    const shellRem = expanded ? SIDEBAR_EXPANDED_REM : SIDEBAR_COLLAPSED_REM
    layout.style.setProperty('--luna-shell-design-w', `${shellRem}rem`)
  }, [expanded])

  const footerSlotStyle =
    footerBackgroundUrl != null && footerBackgroundUrl !== ''
      ? { backgroundImage: `url(${footerBackgroundUrl})` }
      : undefined

  return (
    <div ref={layoutRef} className="luna-root">
      {expanded ? (
        <button
          type="button"
          className="luna-canvas-row-scrim"
          aria-label="Close panel"
          onClick={() => setExpanded(false)}
        />
      ) : null}
      <div
        className={`luna-canvas-row${expanded ? ' luna-canvas-row--drawer-open' : ''}`}
      >
        <WaypointNavbar />
        <div className="waypoint-horizontal">
          <div className="luna-space-left">
            <div className="content-pos">
              <div className="graphic">
                <div className="graphic-positioner">
                  <img
                    className="graphic-img"
                    src="/bg-img/story-graphic.svg"
                    alt=""
                    aria-hidden
                  />
                </div>
              </div>
              <div className="content">
              <div className="content-flex-strt">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.id}
                    className="content-story"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                  <div className="content-story-heading">
                    <span className="content-story-bar" aria-hidden="true" />
                    <h2 className="content-story-title">{step.title}</h2>
                  </div>
                  <div className="description">
                    <p className="description-text">{step.body}</p>
                  </div>
                  </motion.div>
                </AnimatePresence>
                <div className="content-buttons">
                  <button type="button" className="content-button content-button--fullscreen">
                    Full screen
                  </button>
                  <button type="button" className="content-button content-button--case-study">
                    Case study
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div className="luna-center-column">
            <div
              className={`luna-design-surface${expanded ? ' luna-design-surface--drawer-open' : ''}`}
            >
              {children}
            </div>
          </div>
          <div className="luna-space-right" aria-hidden="true" />
        </div>
        <LunaCanvasScaleContext.Provider value={scale}>
          {sidebar({ expanded, onExpandedChange: setExpanded })}
        </LunaCanvasScaleContext.Provider>
      </div>
      <div className="luna-footer-slot" style={footerSlotStyle}>
        <div className="luna-footer-artboard" aria-hidden="true" />
      </div>
    </div>
  )
}
