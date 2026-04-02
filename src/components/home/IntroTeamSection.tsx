import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import aboutWorkImg from '../../assets/about-work.png'
import { ABOUT_HERO_FALLBACK, featuredLogos } from '../../data/aboutSection'
import { Container } from '../layout/Container'

const Wrap = styled.section`
  position: relative;
  background: ${({ theme }) => theme.colors.white};
  padding-block: clamp(72px, 11vw, 128px);
  overflow: visible;
`

const Kicker = styled.p`
  margin: 0 auto clamp(28px, 5vw, 48px);
  text-align: center;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray500};
`

const Stage = styled.div`
  position: relative;
  max-width: min(100% - 52px, ${({ theme }) => theme.layout.maxWidth});
  margin-inline: auto;
  /* Tight to the CTA; enough bottom padding so the absolute image doesn’t cover “Featured in” */
  padding-bottom: clamp(28px, 7vh, 96px);

  @media (max-width: 768px) {
    padding-bottom: 0;
  }
`

/** Floats left, overlaps centered headline; not in document flow on desktop */
const ImageWrap = styled.div`
  position: absolute;
  left: 0;
  top: clamp(72px, 14vh, 180px);
  width: min(40vw, 460px);
  max-width: 42%;
  z-index: 1;
  border-radius: 4px;
  overflow: hidden;
  pointer-events: none;

  @media (max-width: 768px) {
    position: relative;
    left: auto;
    top: auto;
    width: 100%;
    max-width: none;
    margin-bottom: clamp(24px, 6vw, 36px);
    pointer-events: auto;
  }
`

const HeroImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  max-height: min(38vh, 380px);
  object-fit: cover;
  object-position: 30% center;
  mask-image: linear-gradient(90deg, transparent 0%, #000 14%, #000 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 14%, #000 100%);
`

/** Centered block above the image (z-index); headline + CTA only */
const ContentStack = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(20px, 2.8vw, 32px);
  text-align: center;
  width: 100%;
`

const Headline = styled.h2`
  margin: 0;
  max-width: 16ch;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(40px, 6vw, 96px);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.035em;
  text-align: center;
  color: ${({ theme }) => theme.colors.black};
`

const Line = styled.span`
  display: block;
`

const Cta = styled(Link)`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 28px;
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  transition:
    transform ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(31, 31, 31, 0.18);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.black};
    outline-offset: 4px;
  }
`

const CtaIcon = styled.span`
  font-size: 12px;
  line-height: 1;
  opacity: 0.95;
`

const Trust = styled.div`
  margin-top: clamp(28px, 5vw, 48px);
  padding-top: clamp(20px, 3.5vw, 36px);
  border-top: 1px solid rgba(31, 31, 31, 0.08);
`

const TrustLabel = styled.p`
  margin: 0 0 clamp(24px, 4vw, 32px);
  text-align: center;
  font-size: 10px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray500};
`

const LogoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(24px, 4vw, 56px);
  row-gap: 28px;
`

const LogoImg = styled.img<{ $maxWidth: number }>`
  display: block;
  width: auto;
  height: auto;
  max-height: clamp(26px, 3.5vw, 42px);
  max-width: min(${({ $maxWidth }) => $maxWidth}px, 88vw);
  object-fit: contain;
  object-position: left center;
  opacity: 0.94;
  transition: opacity ${({ theme }) => theme.motion.fast};

  &:hover {
    opacity: 1;
  }
`

export const IntroTeamSection = () => {
  const [heroSrc, setHeroSrc] = useState<string>(aboutWorkImg)

  return (
    <Wrap id="about">
      <Container>
        <Kicker>About u1</Kicker>

        <Stage>
          <ImageWrap>
            <HeroImage
              src={heroSrc}
              alt=""
              loading="eager"
              decoding="async"
              onError={() => {
                if (heroSrc !== ABOUT_HERO_FALLBACK) setHeroSrc(ABOUT_HERO_FALLBACK)
              }}
            />
          </ImageWrap>
          <ContentStack>
            <Headline>
              <Line>We dress buildings</Line>
              <Line>from the inside for</Line>
              <Line>twenty-five years</Line>
            </Headline>
            <Cta to="/about">
              <CtaIcon aria-hidden>✦</CtaIcon>
              Who we are
            </Cta>
          </ContentStack>
        </Stage>

        <Trust>
          <TrustLabel>Featured in</TrustLabel>
          <LogoRow>
            {featuredLogos.map((logo) => (
              <LogoImg
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                $maxWidth={logo.maxWidth}
              />
            ))}
          </LogoRow>
        </Trust>
      </Container>
    </Wrap>
  )
}
