import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import type { TeamGroup } from '../../types/content'
import { teamGroupOrder, teamMembers } from '../../data/teamSection'
import { Container } from '../layout/Container'

const Shell = styled.section`
  position: relative;
  isolation: isolate;
  padding-block: clamp(88px, 12vw, 140px);
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.ink};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
      radial-gradient(
        ellipse 70% 50% at 8% 0%,
        ${({ theme }) => `${theme.colors.solutionsAccent}10`},
        transparent 55%
      ),
      radial-gradient(
        ellipse 55% 42% at 96% 92%,
        rgba(140, 124, 255, 0.06),
        transparent 52%
      );
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.11;
    pointer-events: none;
    z-index: 0;
    mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  }
`

const Inner = styled.div`
  position: relative;
  z-index: 1;
`

const Kicker = styled.p`
  margin: 0 0 clamp(10px, 2vw, 14px);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray500};
`

const Title = styled.h2`
  margin: 0 0 clamp(36px, 6vw, 56px);
  max-width: 14ch;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.02;
  color: ${({ theme }) => theme.colors.black};
`

const TopBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: clamp(20px, 4vw, 32px);
  margin-bottom: clamp(28px, 4vw, 40px);
`

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: clamp(8px, 2vw, 28px);
  align-items: baseline;
`

const Tab = styled.button<{ $active: boolean }>`
  position: relative;
  padding: 6px 0;
  border: 0;
  background: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(13px, 1.1vw, 15px);
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  letter-spacing: 0.02em;
  color: ${({ $active, theme }) => ($active ? theme.colors.black : theme.colors.gray500)};
  transition:
    color ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.solutionsAccent};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: left center;
    transition: transform ${({ theme }) => theme.motion.fast};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }

  &:hover::after {
    transform: scaleX(${({ $active }) => ($active ? 1 : 0.35)});
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.solutionsAccent};
    outline-offset: 6px;
  }
`

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: clamp(12px, 2vw, 20px);
`

const ArrowGroup = styled.div`
  display: flex;
  gap: 8px;
`

const ArrowBtn = styled.button`
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(31, 31, 31, 0.14);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.7);
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  transition:
    border-color ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.white};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    transform: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.solutionsAccent};
    outline-offset: 3px;
  }
`

const ViewAll = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  padding: 10px 0;
  transition: letter-spacing ${({ theme }) => theme.motion.fast};

  &:hover {
    letter-spacing: 0.22em;
    color: ${({ theme }) => theme.colors.solutionsAccent};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.solutionsAccent};
    outline-offset: 4px;
  }
`

const TrackWrap = styled.div`
  width: 100vw;
  margin-left: calc(50% - 50vw);
  position: relative;
`

const Mask = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.white} 0%,
    transparent 2.5%,
    transparent 97.5%,
    ${({ theme }) => theme.colors.white} 100%
  );
  opacity: 0.95;

  @media (max-width: 768px) {
    opacity: 0.7;
  }
`

const CardList = styled(motion.ul)`
  display: flex;
  gap: clamp(14px, 2vw, 22px);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: clamp(26px, 5vw, 80px);
  padding: 4px clamp(26px, 5vw, 80px) 8px;
  margin: 0;
  list-style: none;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: thin;
  scrollbar-color: rgba(31, 31, 31, 0.28) transparent;

  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(31, 31, 31, 0.06);
    border-radius: 99px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(31, 31, 31, 0.22);
    border-radius: 99px;
  }
`

const Card = styled(motion.li)`
  flex: 0 0 min(78vw, 360px);
  scroll-snap-align: start;
  min-width: 0;

  @media (min-width: 900px) {
    flex-basis: min(32vw, 400px);
  }

  @media (max-width: 520px) {
    flex-basis: 86vw;
  }
`

const CardInner = styled.article`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #0a0a0c;
  box-shadow:
    0 4px 0 rgba(233, 30, 99, 0.12),
    0 24px 48px rgba(24, 25, 39, 0.12);
  transition: box-shadow ${({ theme }) => theme.motion.fast};

  &:hover {
    box-shadow:
      0 4px 0 rgba(233, 30, 99, 0.35),
      0 32px 56px rgba(24, 25, 39, 0.16);
  }
`

const Photo = styled.div`
  position: relative;
  aspect-ratio: 3 / 4.1;
  overflow: hidden;
`

const PhotoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transform: scale(1.03);
  transition: transform ${({ theme }) => theme.motion.smooth};

  ${CardInner}:hover & {
    transform: scale(1);
  }
`

const PhotoVeil = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    transparent 48%,
    rgba(0, 0, 0, 0.15) 100%
  );
`

const Caption = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: clamp(16px, 3vw, 22px);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.88) 0%,
    rgba(0, 0, 0, 0.15) 72%,
    transparent 100%
  );
`

const Name = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(17px, 1.5vw, 20px);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: #fafafa;
`

const Role = styled.span`
  flex-shrink: 0;
  max-width: 46%;
  font-size: 11px;
  line-height: 1.45;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.58);
  text-align: right;
`

export const TeamSection = () => {
  const [group, setGroup] = useState<TeamGroup>('leadership')
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const filtered = useMemo(
    () => teamMembers.filter((m) => m.group === group),
    [group],
  )

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanPrev(scrollLeft > 8)
    setCanNext(scrollLeft + clientWidth < scrollWidth - 8)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ left: 0 })
    updateArrows()
  }, [group, filtered.length, updateArrows])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    updateArrows()
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [updateArrows, filtered])

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const step = Math.min(el.clientWidth * 0.72, 420)
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <Shell id="team">
      <Container>
        <Inner>
          <Kicker>People</Kicker>
          <Title>Our team</Title>

          <TopBar>
            <Tabs role="tablist" aria-label="Team group">
              {teamGroupOrder.map((g) => (
                <Tab
                  key={g.id}
                  type="button"
                  role="tab"
                  aria-selected={group === g.id}
                  $active={group === g.id}
                  onClick={() => setGroup(g.id)}
                >
                  {g.label}
                </Tab>
              ))}
            </Tabs>
            <Controls>
              <ArrowGroup aria-label="Scroll team">
                <ArrowBtn
                  type="button"
                  aria-label="Previous"
                  disabled={!canPrev}
                  onClick={() => scrollByDir(-1)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </ArrowBtn>
                <ArrowBtn
                  type="button"
                  aria-label="Next"
                  disabled={!canNext}
                  onClick={() => scrollByDir(1)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </ArrowBtn>
              </ArrowGroup>
              <ViewAll to="/about">
                <span aria-hidden>→</span>
                <span>View all</span>
              </ViewAll>
            </Controls>
          </TopBar>
        </Inner>
      </Container>

      <TrackWrap>
        <Mask aria-hidden />
        <AnimatePresence mode="wait">
          <CardList
            key={group}
            ref={scrollerRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {filtered.map((member, i) => (
              <Card
                key={member.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.05 * i,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                <CardInner>
                  <Photo>
                    <PhotoImg
                      src={member.image}
                      alt={`${member.name} — portrait`}
                      loading="lazy"
                      decoding="async"
                    />
                    <PhotoVeil aria-hidden />
                    <Caption>
                      <Name>{member.name}</Name>
                      <Role>{member.role}</Role>
                    </Caption>
                  </Photo>
                </CardInner>
              </Card>
            ))}
          </CardList>
        </AnimatePresence>
      </TrackWrap>
    </Shell>
  )
}
