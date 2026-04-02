import { type ReactNode, type RefObject, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

interface PremiumTiltTextProps {
  children: ReactNode
  className?: string
  interactionRef?: RefObject<HTMLElement | null>
  maxRotate?: number
  maxScale?: number
  lerpFactor?: number
  noiseWhenIdle?: boolean
}

const idleNoise = keyframes`
  0% {
    text-shadow:
      0.3px 0 rgba(255, 255, 255, 0.32),
      -0.3px 0 rgba(0, 0, 0, 0.24);
  }
  25% {
    text-shadow:
      -0.5px 0 rgba(255, 255, 255, 0.28),
      0.4px 0 rgba(0, 0, 0, 0.22);
  }
  50% {
    text-shadow:
      0.45px 0 rgba(255, 255, 255, 0.34),
      -0.35px 0 rgba(0, 0, 0, 0.2);
  }
  75% {
    text-shadow:
      -0.35px 0 rgba(255, 255, 255, 0.3),
      0.3px 0 rgba(0, 0, 0, 0.22);
  }
  100% {
    text-shadow:
      0.3px 0 rgba(255, 255, 255, 0.32),
      -0.3px 0 rgba(0, 0, 0, 0.24);
  }
`

const PerspectiveWrap = styled.div`
  perspective: 1000px;
`

const TiltSurface = styled.h1`
  position: relative;
  margin: 0;
  transform-style: preserve-3d;
  will-change: transform;

  &[data-noise='true'][data-interacting='false'] {
    animation: ${idleNoise} 1200ms steps(2, end) infinite;
    filter: contrast(1.04);
  }

  &[data-interacting='true'] {
    animation: none;
    text-shadow: none;
    filter: none;
  }
`

export const PremiumTiltText = ({
  children,
  className,
  interactionRef,
  maxRotate = 6,
  maxScale = 1.02,
  lerpFactor = 0.18,
  noiseWhenIdle = false,
}: PremiumTiltTextProps) => {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLHeadingElement | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const text = textRef.current
    const interactionArea = interactionRef?.current ?? wrap
    if (!wrap || !text || !interactionArea) return

    // Keep interaction subtle and desktop-focused.
    const isReduced = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 900
    if (isReduced) return

    let targetX = 0
    let targetY = 0
    let targetScale = 1
    let currentX = 0
    let currentY = 0
    let currentScale = 1
    let lastTime = performance.now()

    text.dataset.interacting = 'false'

    const startLoop = () => {
      if (frameRef.current === null) {
        lastTime = performance.now()
        frameRef.current = requestAnimationFrame(updateTransform)
      }
    }

    const updateTransform = (time: number) => {
      const dtMs = Math.min(64, time - lastTime)
      lastTime = time

      // Frame-rate independent smoothing so behavior feels consistent.
      const frameStep = dtMs / (1000 / 60)
      const alpha = 1 - Math.pow(1 - lerpFactor, frameStep)

      currentX += (targetX - currentX) * alpha
      currentY += (targetY - currentY) * alpha
      currentScale += (targetScale - currentScale) * alpha

      text.style.transform = `perspective(1000px) rotateX(${currentX.toFixed(3)}deg) rotateY(${currentY.toFixed(3)}deg) scale(${currentScale.toFixed(4)})`

      const settled =
        Math.abs(targetX - currentX) < 0.01 &&
        Math.abs(targetY - currentY) < 0.01 &&
        Math.abs(targetScale - currentScale) < 0.001

      if (settled) {
        frameRef.current = null
        return
      }

      frameRef.current = requestAnimationFrame(updateTransform)
    }

    const handleMove = (event: MouseEvent) => {
      const rect = interactionArea.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height

      const normalizedX = x * 2 - 1
      const normalizedY = y * 2 - 1

      // X movement drives Y rotation, Y movement drives X rotation (inverted).
      targetY = normalizedX * maxRotate
      targetX = -normalizedY * maxRotate
      targetScale = maxScale
      text.dataset.interacting = 'true'
      startLoop()
    }

    const handleLeave = () => {
      targetX = 0
      targetY = 0
      targetScale = 1
      text.dataset.interacting = 'false'
      startLoop()
    }

    interactionArea.addEventListener('mousemove', handleMove)
    interactionArea.addEventListener('mouseleave', handleLeave)

    return () => {
      interactionArea.removeEventListener('mousemove', handleMove)
      interactionArea.removeEventListener('mouseleave', handleLeave)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      text.style.transform = 'none'
    }
  }, [interactionRef, lerpFactor, maxRotate, maxScale])

  return (
    <PerspectiveWrap ref={wrapRef} className={className}>
      <TiltSurface ref={textRef} data-noise={noiseWhenIdle ? 'true' : 'false'} data-interacting="false">
        {children}
      </TiltSurface>
    </PerspectiveWrap>
  )
}
