import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'

const INTRO_MS = 2600
const EXIT_MS = 900

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: center;
  justify-items: stretch;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.ink};
  isolation: isolate;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.025;
    pointer-events: none;
    z-index: 1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
    background-size: 180px 180px;
  }
`

const Frame = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: min(92vw, 1180px);
  margin: 0 auto;
  padding: clamp(24px, 5vw, 48px);
  display: grid;
  gap: clamp(20px, 4vw, 36px);
  justify-items: center;
  text-align: center;
`

const CornerMeta = styled.div`
  position: absolute;
  top: clamp(20px, 4vw, 40px);
  left: clamp(20px, 4vw, 40px);
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 3;
  font-size: 10px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray500};
  font-weight: 500;

  @media (max-width: 520px) {
    letter-spacing: 0.18em;
  }
`

const Eyebrow = styled(motion.p)`
  margin: 0;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.solutionsAccent};

  @media (max-width: 520px) {
    letter-spacing: 0.28em;
  }
`

const Wordmark = styled(motion.h1)`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(72px, 18vw, 200px);
  font-weight: 800;
  line-height: 0.82;
  letter-spacing: -0.06em;
  color: ${({ theme }) => theme.colors.ink};
`

const Tagline = styled(motion.p)`
  margin: 0;
  max-width: 28em;
  font-size: clamp(13px, 1.5vw, 15px);
  font-weight: 400;
  line-height: 1.55;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.gray700};
  opacity: 0.85;
`

const ProgressWrap = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 0 clamp(20px, 4vw, 40px) clamp(28px, 5vw, 52px);
`

const ProgressMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray500};
  font-variant-numeric: tabular-nums;
`

const ProgressTrack = styled.div`
  height: 2px;
  width: 100%;
  border-radius: 999px;
  background: rgba(19, 19, 26, 0.08);
  overflow: hidden;
`

const ProgressFill = styled(motion.div)`
  height: 100%;
  width: 100%;
  transform-origin: left center;
  border-radius: inherit;
  background: ${({ theme }) => theme.colors.solutionsAccent};
`

const overlayExit = {
  y: '-6%',
  opacity: 0,
  transition: { duration: EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1] as const },
}

const overlayExitReduced = {
  opacity: 0,
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
}

const contentIn = (i: number) => ({
  opacity: 1,
  y: 0,
  transition: { delay: 0.1 + 0.09 * i, duration: 0.88, ease: [0.22, 1, 0.36, 1] as const },
})

export const IntroOverlay = () => {
  const [visible, setVisible] = useState(true)
  const [pct, setPct] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    let cancelled = false
    const duration = reduceMotion ? 500 : INTRO_MS
    const start = Date.now()
    const tick = () => {
      if (cancelled) return
      const elapsed = Math.min(1, (Date.now() - start) / duration)
      setPct(Math.round(elapsed * 100))
      if (elapsed < 1) window.requestAnimationFrame(tick)
    }
    window.requestAnimationFrame(tick)

    const done = window.setTimeout(() => setVisible(false), duration + (reduceMotion ? 80 : 180))
    return () => {
      cancelled = true
      window.clearTimeout(done)
    }
  }, [reduceMotion])

  const exit = reduceMotion ? overlayExitReduced : overlayExit

  useLayoutEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = ''
      }}
    >
      {visible && (
        <Overlay
          key="intro"
          role="status"
          aria-live="polite"
          aria-label="Loading"
          initial={{ opacity: 1 }}
          exit={exit}
          style={{ willChange: 'transform, opacity' }}
        >
          <CornerMeta aria-hidden>
            <span>u1 studio</span>
          </CornerMeta>
          <Frame>
            <Eyebrow initial={{ opacity: 0, y: 12 }} animate={contentIn(0)}>
              Interior lighting
            </Eyebrow>
            <Wordmark initial={{ opacity: 0, y: 20 }} animate={contentIn(1)}>
              u1
            </Wordmark>
            <Tagline initial={{ opacity: 0, y: 16 }} animate={contentIn(2)}>
              Atmosphere, rhythm, and timeless spatial character.
            </Tagline>
          </Frame>
          <ProgressWrap initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.5 }}>
            <ProgressMeta>
              <span>Loading experience</span>
              <span>{pct}%</span>
            </ProgressMeta>
            <ProgressTrack aria-hidden>
              <ProgressFill
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: reduceMotion ? 0.25 : INTRO_MS / 1000,
                  ease: 'linear',
                }}
              />
            </ProgressTrack>
          </ProgressWrap>
        </Overlay>
      )}
    </AnimatePresence>
  )
}
