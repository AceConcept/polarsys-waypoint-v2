import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import {
  CANVAS_H,
  CANVAS_W,
  getCanvasContainScale,
  getOtfFooterDesignHeightPx,
  getSidebarShellDesignWidthPx,
  getViewportSize,
} from '../../luna-sidebar/src/luna-sidebar/canvasScale.js'
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
  const [expanded, setExpanded] = useState(false)

  useLayoutEffect(() => {
    const el = layoutRef.current
    if (!el) return
    const update = () => {
      const { width, height } = getViewportSize()
      if (width <= 0 || height <= 0) {
        setScale(1)
        return
      }
      setScale(getCanvasContainScale(width, height))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    const vv = window.visualViewport
    if (vv) vv.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
      if (vv) vv.removeEventListener('resize', update)
    }
  }, [])

  useLayoutEffect(() => {
    const layout = layoutRef.current
    if (!layout) return
    const scaledFooterH = getOtfFooterDesignHeightPx() * scale
    const shellW = getSidebarShellDesignWidthPx(expanded)
    const slotW = CANVAS_W * scale
    const rowMinH = CANVAS_H * scale
    layout.style.setProperty('--luna-scale', String(scale))
    layout.style.setProperty('--luna-scaled-footer-h', `${scaledFooterH}px`)
    layout.style.setProperty('--luna-shell-design-w', `${shellW}px`)
    layout.style.setProperty('--luna-center-column-width', `${slotW}px`)
    layout.style.setProperty('--luna-canvas-row-min-h', `${rowMinH}px`)
  }, [scale, expanded])

  const footerSlotStyle =
    footerBackgroundUrl != null && footerBackgroundUrl !== ''
      ? { backgroundImage: `url(${footerBackgroundUrl})` }
      : undefined

  const scaledFooterH = getOtfFooterDesignHeightPx() * scale

  return (
    <div ref={layoutRef} className="luna-root">
      <div className="luna-scale-stage">
        <div className="luna-chrome">
          <div className="luna-shell">
            <div className="luna-canvas-row">
              {expanded ? (
                <button
                  type="button"
                  className="luna-canvas-row-scrim"
                  aria-label="Close panel"
                  onClick={() => setExpanded(false)}
                />
              ) : null}
              <div className="luna-space-left" aria-hidden="true" />
              <div className="luna-center-column">
                <div
                  className={`luna-design-surface${expanded ? ' luna-design-surface--drawer-open' : ''}`}
                >
                  {children}
                </div>
              </div>
              <div className="luna-space-right" aria-hidden="true" />
              {sidebar({ expanded, onExpandedChange: setExpanded })}
            </div>
          </div>
        </div>
      </div>
      <div
        className="luna-footer-slot"
        style={{ height: scaledFooterH, ...footerSlotStyle }}
      >
        <div className="luna-footer-artboard" aria-hidden="true" />
      </div>
    </div>
  )
}
