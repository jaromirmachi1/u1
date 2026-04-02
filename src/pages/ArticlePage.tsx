import { motion } from 'framer-motion'
import styled from 'styled-components'
import { Container } from '../components/layout/Container'
import { Reveal } from '../components/motion/Reveal'
import { ButtonLink } from '../components/ui/Button'

const Hero = styled.section`
  min-height: 60vh;
  display: flex;
  align-items: end;
  color: ${({ theme }) => theme.colors.white};
  background: linear-gradient(rgba(0, 0, 0, 0.28), rgba(0, 0, 0, 0.54)),
    url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80') center/cover;
`

const HeroInner = styled(Container)`
  padding-bottom: clamp(38px, 6vw, 80px);
`

const HeroTitle = styled.h1`
  max-width: 920px;
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: clamp(42px, 7vw, 94px);
  line-height: 0.96;
`

const Content = styled(Container)`
  width: min(100% - 50px, ${({ theme }) => theme.layout.textWidth});
  padding: clamp(52px, 8vw, 112px) 0;

  p {
    margin-bottom: 24px;
    color: ${({ theme }) => theme.colors.gray700};
    font-size: clamp(17px, 2vw, 21px);
  }

  h2 {
    margin: 56px 0 16px;
    font-family: ${({ theme }) => theme.fonts.serif};
    font-size: clamp(30px, 4vw, 52px);
    line-height: 1.02;
  }
`

const Figure = styled.figure`
  margin: 44px 0;

  figcaption {
    margin-top: 12px;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 0.14em;
    color: ${({ theme }) => theme.colors.gray500};
  }
`

const Cta = styled.div`
  margin-top: 48px;
  display: flex;
  gap: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray200};
  padding-top: 24px;
`

export const ArticlePage = () => (
  <>
    <Hero>
      <HeroInner>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.25 }}>
          <HeroTitle>Quiet Luxury Is Built Through Precision</HeroTitle>
        </motion.div>
      </HeroInner>
    </Hero>

    <Content>
      <Reveal>
        <p>
          In premium architecture, atmosphere is a result of measured decisions. Scale, sequence, and material
          transitions need to align long before decoration enters the frame.
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <p>
          We treat every reveal, edge, and threshold as part of one coherent grammar. The goal is not visual
          noise, but lasting calm and confidence.
        </p>
      </Reveal>

      <Figure>
        <img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80"
          alt="Interior material detail"
        />
        <figcaption>Material and light study from a private residence concept.</figcaption>
      </Figure>

      <Reveal>
        <h2>Rhythm, Light, and Restraint</h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p>
          The strongest spaces are often built with fewer elements, but with far tighter control. This editorial
          discipline allows architecture to remain contemporary without depending on short-lived trend cycles.
        </p>
      </Reveal>

      <Cta>
        <ButtonLink to="/projects">View Projects</ButtonLink>
        <ButtonLink to="/" $variant="ghost">
          Contact Studio
        </ButtonLink>
      </Cta>
    </Content>
  </>
)
