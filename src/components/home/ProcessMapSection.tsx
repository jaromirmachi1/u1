import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react'
import styled from 'styled-components'
import type { ProcessStep } from '../../types/content'
import { processSteps } from '../../data/mockData'
import { Container } from '../layout/Container'
import { Eyebrow, SectionTitle } from '../ui/Section'

const totalSteps = processSteps.length

const Shell = styled.section`
  position: relative;
  isolation: isolate;
  padding-block: clamp(96px, 13vw, 160px);
  background: ${({ theme }) => theme.colors.paperBlush};
  color: ${({ theme }) => theme.colors.ink};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    /* Pink / rose washes only — same family as solutionsAccent (#E91E63), no purple or mint */
    background:
      radial-gradient(
        ellipse 75% 58% at 12% 8%,
        ${({ theme }) => `${theme.colors.solutionsAccent}14`},
        transparent 54%
      ),
      radial-gradient(
        ellipse 60% 48% at 90% 14%,
        rgba(255, 125, 150, 0.1),
        transparent 50%
      ),
      radial-gradient(
        ellipse 48% 42% at 48% 96%,
        ${({ theme }) => `${theme.colors.solutionsAccent}0a`},
        transparent 56%
      );
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.14;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    mix-blend-mode: multiply;
  }
`

const Intro = styled(Container)`
  position: relative;
  z-index: 2;
  margin-bottom: clamp(36px, 5vw, 56px);
`

const IntroCopy = styled.div`
  max-width: min(720px, 100%);
`

const EyebrowLight = styled(Eyebrow)`
  color: ${({ theme }) => theme.colors.gray500};
  margin-bottom: 14px;
`

const TitleLight = styled(SectionTitle)`
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 16px;
`

const Lead = styled.p`
  margin: 0;
  font-size: clamp(15px, 1.2vw, 17px);
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.gray700};
`

const MapShell = styled.div`
  position: relative;
  z-index: 1;
  --track: 22px;
`

const DashedTrack = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 0;
  transform: translateX(-50%);
  border-left: 1px dashed rgba(31, 31, 31, 0.18);
  pointer-events: none;
  z-index: 0;

  @media (max-width: 768px) {
    left: 18px;
    transform: none;
  }
`

const StepsStack = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(40px, 7vw, 88px);
`

const StepRow = styled.div`
  scroll-margin-top: min(120px, 18vh);
  min-height: min(74vh, 680px);

  @media (max-width: 768px) {
    min-height: auto;
    padding-bottom: clamp(28px, 6vw, 48px);
  }
`

const ZigGrid = styled.div<{ $active: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--track) minmax(0, 1fr);
  gap: 0 clamp(16px, 3vw, 36px);
  align-items: center;
  min-height: min(70vh, 640px);
  opacity: ${({ $active }) => ($active ? 1 : 0.38)};
  transition: opacity ${({ theme }) => theme.motion.smooth};

  @media (max-width: 768px) {
    grid-template-columns: 36px minmax(0, 1fr);
    min-height: auto;
    gap: 0 18px;
  }
`

const TrackCell = styled.div`
  grid-column: 2;
  grid-row: 1;
  position: relative;
  width: var(--track);
  height: 100%;
  min-height: 160px;
  justify-self: center;

  @media (max-width: 768px) {
    grid-column: 1;
    width: 36px;
  }
`

const Node = styled.div<{ $active: boolean }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${({ $active }) => ($active ? 16 : 12)}px;
  height: ${({ $active }) => ($active ? 16 : 12)}px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.black};
  background: ${({ $active, theme }) => ($active ? theme.colors.black : theme.colors.white)};
  box-shadow: ${({ $active }) =>
    $active
      ? '0 0 0 4px rgba(31, 31, 31, 0.08), 0 0 24px rgba(140, 124, 255, 0.22)'
      : '0 0 0 1px rgba(31, 31, 31, 0.06)'};
  transition:
    width ${({ theme }) => theme.motion.fast},
    height ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast};
  z-index: 2;
`

const CardCell = styled.div<{ $side: 'left' | 'right' }>`
  grid-column: ${({ $side }) => ($side === 'left' ? '1' : '3')};
  grid-row: 1;
  justify-self: ${({ $side }) => ($side === 'left' ? 'end' : 'start')};
  width: min(100%, 520px);

  @media (max-width: 768px) {
    grid-column: 2;
    grid-row: 1;
    justify-self: stretch;
    width: 100%;
  }
`

const Card = styled(motion.article)<{ $active: boolean }>`
  border-radius: 6px;
  padding: clamp(20px, 3vw, 28px);
  background: ${({ theme }) => theme.colors.white};
  box-shadow:
    inset 0 0 0 1px
      ${({ $active }) =>
        $active ? 'rgba(31, 31, 31, 0.14)' : 'rgba(31, 31, 31, 0.08)'},
    0 ${({ $active }) => ($active ? '28px' : '16px')} 48px rgba(24, 25, 39, ${({ $active }) => ($active ? 0.12 : 0.06)});
  transition:
    box-shadow ${({ theme }) => theme.motion.smooth},
    transform ${({ theme }) => theme.motion.smooth};

  &:hover {
    box-shadow:
      inset 0 0 0 1px rgba(31, 31, 31, 0.12),
      0 22px 44px rgba(24, 25, 39, 0.1);
  }
`

const Visual = styled.div`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
  aspect-ratio: 16 / 10;
  background: ${({ theme }) => theme.colors.gray100};
  box-shadow: inset 0 0 0 1px rgba(31, 31, 31, 0.06);
`

const VisualImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.03);
  transition: transform ${({ theme }) => theme.motion.smooth};

  ${Card}:hover & {
    transform: scale(1);
  }
`

const VisualRim = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.35) 0%,
    transparent 48%
  );
`

const Watermark = styled.span`
  position: absolute;
  bottom: 10px;
  right: 12px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(40px, 7vw, 72px);
  font-weight: 700;
  line-height: 0.85;
  letter-spacing: -0.05em;
  color: rgba(31, 31, 31, 0.1);
  pointer-events: none;
  user-select: none;
`

const Phase = styled.span`
  display: block;
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray500};
  margin-bottom: 10px;
`

const StepTitle = styled.h3`
  margin: 0 0 12px;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(26px, 3.6vw, 40px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: ${({ theme }) => theme.colors.black};
`

const Brief = styled.p`
  margin: 0 0 12px;
  font-size: clamp(15px, 1.2vw, 17px);
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.gray700};
  font-weight: 500;
`

const Detail = styled.p`
  margin: 0 0 14px;
  font-size: 13px;
  line-height: 1.68;
  color: ${({ theme }) => theme.colors.gray500};
`

const TagRow = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Tag = styled.li`
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 7px 11px;
  border: 1px solid rgba(31, 31, 31, 0.12);
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.gray700};
  background: rgba(255, 255, 255, 0.7);
`

function useActiveStepByScroll(stepRefs: MutableRefObject<(HTMLElement | null)[]>) {
  const [activeIndex, setActiveIndex] = useState(0)

  const measure = useCallback(() => {
    const refs = stepRefs.current
    if (!refs?.length) return
    const center = window.innerHeight * 0.45
    let best = 0
    let bestDist = Number.POSITIVE_INFINITY
    refs.forEach((el, i) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      const mid = r.top + r.height * 0.42
      const d = Math.abs(mid - center)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    })
    setActiveIndex(best)
  }, [stepRefs])

  useEffect(() => {
    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  return activeIndex
}

const pad = (n: number) => String(n).padStart(2, '0')

type StepBlockProps = {
  step: ProcessStep
  index: number
  activeIndex: number
  setRef: (i: number) => (el: HTMLElement | null) => void
}

const StepBlock = ({ step, index, activeIndex, setRef }: StepBlockProps) => {
  const isActive = activeIndex === index
  const side: 'left' | 'right' = index % 2 === 0 ? 'left' : 'right'

  return (
    <StepRow ref={setRef(index)} id={`process-step-${step.id}`}>
      <ZigGrid $active={isActive}>
        <TrackCell aria-hidden>
          <Node $active={isActive} />
        </TrackCell>
        <CardCell $side={side}>
          <Card
            $active={isActive}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
          >
            <Visual>
              <VisualImg
                src={step.image}
                alt={`${step.title} — process reference`}
                loading={index < 2 ? 'eager' : 'lazy'}
              />
              <VisualRim aria-hidden />
              <Watermark aria-hidden>{pad(index + 1)}</Watermark>
            </Visual>
            <Phase>
              Phase {pad(index + 1)} · {totalSteps} steps
            </Phase>
            <StepTitle>{step.title}</StepTitle>
            <Brief>{step.brief}</Brief>
            <Detail>{step.detail}</Detail>
            <TagRow>
              {step.highlights.map((h) => (
                <Tag key={h}>{h}</Tag>
              ))}
            </TagRow>
          </Card>
        </CardCell>
      </ZigGrid>
    </StepRow>
  )
}

export const ProcessMapSection = () => {
  const stepRefs = useRef<(HTMLElement | null)[]>([])
  const setRef = (i: number) => (el: HTMLElement | null) => {
    stepRefs.current[i] = el
  }
  const activeIndex = useActiveStepByScroll(stepRefs)

  return (
    <Shell id="process">
      <Intro>
        <IntroCopy>
          <EyebrowLight>Process</EyebrowLight>
          <TitleLight>How we do it</TitleLight>
          <Lead>
            Five phases on one timeline—cards alternate left and right. Scroll to move through each
            step; the timeline node highlights what you&apos;re focused on.
          </Lead>
        </IntroCopy>
      </Intro>

      <Container>
        <MapShell>
          <DashedTrack aria-hidden />
          <StepsStack>
            {processSteps.map((step, index) => (
              <StepBlock
                key={step.id}
                step={step}
                index={index}
                activeIndex={activeIndex}
                setRef={setRef}
              />
            ))}
          </StepsStack>
        </MapShell>
      </Container>
    </Shell>
  )
}
