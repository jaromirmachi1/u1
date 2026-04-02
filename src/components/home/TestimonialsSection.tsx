import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { testimonials } from '../../data/mockData'
import { Container } from '../layout/Container'
import { Reveal } from '../motion/Reveal'
import { Eyebrow, Section, SectionTitle } from '../ui/Section'

const Wrap = styled(Section)`
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid rgba(31, 31, 31, 0.06);
`

const HeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: clamp(28px, 5vw, 48px);
`

const Carousel = styled.div`
  position: relative;
  max-width: min(920px, 100%);
  margin-inline: auto;
`

const SlideCard = styled.figure`
  margin: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(200px, 280px);
  gap: clamp(28px, 5vw, 48px);
  align-items: center;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`

const TextCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
`

const Mark = styled.span`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: clamp(40px, 5vw, 52px);
  line-height: 0.7;
  color: rgba(31, 31, 31, 0.12);
  user-select: none;
`

const Quote = styled.blockquote`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: clamp(17px, 1.5vw, 20px);
  line-height: 1.65;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 500;
`

const Figcaption = styled.figcaption`
  padding-top: 16px;
  border-top: 1px solid rgba(31, 31, 31, 0.08);
`

const Name = styled.cite`
  display: block;
  font-style: normal;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 6px;
`

const Role = styled.span`
  display: block;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray500};
`

const PhotoFrame = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  background: ${({ theme }) => theme.colors.gray100};
  max-height: 380px;
  width: 100%;

  @media (max-width: 720px) {
    max-height: 320px;
    max-width: 280px;
    margin-inline: auto;
  }
`

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const ArrowBtn = styled.button`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid rgba(31, 31, 31, 0.18);
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  transition:
    border-color ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast};

  &:hover:not(:disabled) {
    border-color: rgba(31, 31, 31, 0.35);
    background: rgba(31, 31, 31, 0.04);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`

const IndexLabel = styled.span`
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray500};
  min-width: 5ch;
  text-align: center;
  font-variant-numeric: tabular-nums;
`

const slideMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export const TestimonialsSection = () => {
  const [index, setIndex] = useState(0)
  const total = testimonials.length
  const current = testimonials[index]

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total)
  }, [total])

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total)
  }, [total])

  return (
    <Wrap id="testimonials">
      <Container>
        <HeaderRow>
          <Reveal>
            <Eyebrow>Testimonials</Eyebrow>
            <SectionTitle style={{ marginBottom: 0 }}>What clients remember.</SectionTitle>
          </Reveal>
          <Controls>
            <ArrowBtn type="button" onClick={goPrev} aria-label="Previous testimonial">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </ArrowBtn>
            <IndexLabel aria-live="polite">
              {index + 1} / {total}
            </IndexLabel>
            <ArrowBtn type="button" onClick={goNext} aria-label="Next testimonial">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </ArrowBtn>
          </Controls>
        </HeaderRow>

        <Carousel>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              variants={slideMotion}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <SlideCard>
                <TextCol>
                  <Mark aria-hidden>“</Mark>
                  <Quote>{current.quote}</Quote>
                  <Figcaption>
                    <Name>{current.name}</Name>
                    <Role>{current.role}</Role>
                  </Figcaption>
                </TextCol>
                <PhotoFrame>
                  <Photo src={current.photo} alt={`Portrait of ${current.name}`} loading="lazy" />
                </PhotoFrame>
              </SlideCard>
            </motion.div>
          </AnimatePresence>
        </Carousel>
      </Container>
    </Wrap>
  )
}
