import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Container } from './Container'

const Shell = styled.footer`
  position: relative;
  isolation: isolate;
  color: #ffffff;
  padding-block: clamp(72px, 12vw, 140px) clamp(44px, 7vw, 72px);
  overflow: hidden;
  background: linear-gradient(165deg, #0c0c0e 0%, #000000 38%, #060607 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
      radial-gradient(
        ellipse 55% 45% at 92% -8%,
        ${({ theme }) => `${theme.colors.solutionsAccent}22`},
        transparent 58%
      ),
      radial-gradient(
        ellipse 40% 35% at 4% 102%,
        rgba(140, 124, 255, 0.07),
        transparent 55%
      );
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.11;
    pointer-events: none;
    z-index: 0;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
  }
`

const Reveal = styled(motion.div)`
  position: relative;
  z-index: 1;
`

const LogoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: clamp(24px, 5vw, 48px);
  margin-bottom: clamp(56px, 9vw, 96px);
  padding-bottom: clamp(40px, 6vw, 56px);
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(
      90deg,
      rgba(233, 30, 99, 0.35) 0%,
      rgba(255, 255, 255, 0.12) 42%,
      rgba(255, 255, 255, 0.04) 100%
    )
    1;
`

const BrandBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: min(100%, 520px);
`

const BrandLink = styled(Link)`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 0.35em;
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 800;
  font-size: clamp(28px, 4.2vw, 44px);
  letter-spacing: -0.03em;
  line-height: 1;
  color: #fafafa;
  text-decoration: none;
  text-transform: uppercase;
  transition:
    transform ${({ theme }) => theme.motion.fast},
    text-shadow ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateY(-2px);
    text-shadow: 0 0 40px ${({ theme }) => `${theme.colors.solutionsAccent}44`};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.solutionsAccent};
    outline-offset: 8px;
  }
`

const U1 = styled.span`
  display: inline-flex;
  align-items: flex-start;
`

const One = styled.span`
  position: relative;
  display: inline-block;

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    width: 7px;
    height: 5px;
    margin-left: -3.5px;
    background: ${({ theme }) => theme.colors.solutionsAccent};
    border-radius: 2px;
    box-shadow: 0 0 18px ${({ theme }) => `${theme.colors.solutionsAccent}99`};
  }
`

const BrandRest = styled.span`
  font-weight: 600;
  font-size: 0.48em;
  letter-spacing: 0.3em;
  opacity: 0.92;
`

const BrandTag = styled.p`
  margin: 0;
  max-width: 32ch;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 12px;
  line-height: 1.55;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.42);
`

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(28px, 5vw, 48px);
  padding-bottom: clamp(48px, 7vw, 72px);

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`

const ColBlock = styled.div`
  position: relative;
  padding-left: clamp(0px, 1.5vw, 8px);

  @media (min-width: 901px) {
    &:not(:first-child)::before {
      content: '';
      position: absolute;
      left: -12px;
      top: 4px;
      bottom: 4px;
      width: 1px;
      background: linear-gradient(
        180deg,
        transparent 0%,
        rgba(255, 255, 255, 0.1) 22%,
        rgba(233, 30, 99, 0.22) 50%,
        rgba(255, 255, 255, 0.08) 78%,
        transparent 100%
      );
    }
  }
`

const ColHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: clamp(18px, 2.5vw, 22px);
`

const ColMark = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.solutionsAccent};
  box-shadow: 0 0 14px ${({ theme }) => `${theme.colors.solutionsAccent}66`};
  flex-shrink: 0;
`

const ColTitle = styled.span`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.42);
`

const LinkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const linkUnderline = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  font-family: inherit;
  font-size: clamp(14px, 1.15vw, 16px);
  font-weight: 500;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  padding: 6px 0;
  transition: color ${({ theme }) => theme.motion.fast};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 4px;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.solutionsAccent};
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    color: #ffffff;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.solutionsAccent};
    outline-offset: 4px;
    border-radius: 2px;
  }
`

const FooterLink = styled(Link)`
  ${linkUnderline}
`

const ExternalLink = styled.a`
  ${linkUnderline}

  &::before {
    content: '↗';
    font-size: 11px;
    opacity: 0;
    transform: translate(-2px, 2px);
    transition:
      opacity ${({ theme }) => theme.motion.fast},
      transform ${({ theme }) => theme.motion.fast};
  }

  &:hover::before {
    opacity: 0.55;
    transform: translate(0, 0);
  }
`

const SocialSplit = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px clamp(20px, 3vw, 36px);
  align-items: start;
`

const SocialCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const LegalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(20px, 4vw, 40px);
  padding-top: clamp(32px, 5vw, 48px);
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`

const LegalCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
`

const LegalLink = styled(Link)`
  position: relative;
  display: inline-block;
  width: fit-content;
  font-size: 12px;
  letter-spacing: 0.06em;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  transition: color ${({ theme }) => theme.motion.fast};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.25);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    color: rgba(255, 255, 255, 0.95);
  }

  &:hover::after {
    transform: scaleX(1);
    background: ${({ theme }) => theme.colors.solutionsAccent};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.solutionsAccent};
    outline-offset: 4px;
  }
`

const Copyright = styled.p`
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.04em;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.32);
`

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export const Footer = () => (
  <Shell>
    <Container>
      <Reveal
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
      <motion.div variants={itemVariants}>
        <LogoRow>
          <BrandBlock>
            <BrandLink to="/">
              <U1>
                u<One>1</One>
              </U1>
              <BrandRest>space design</BrandRest>
            </BrandLink>
            <BrandTag>Interior architecture, light, and material—built with quiet precision.</BrandTag>
          </BrandBlock>
        </LogoRow>
      </motion.div>

      <motion.div variants={itemVariants}>
        <MainGrid>
          <ColBlock>
            <ColHead>
              <ColMark aria-hidden />
              <ColTitle>What</ColTitle>
            </ColHead>
            <LinkList>
              <li>
                <FooterLink to="/">Explore</FooterLink>
              </li>
              <li>
                <FooterLink to="/projects">Projects</FooterLink>
              </li>
              <li>
                <FooterLink to={{ pathname: '/', hash: 'solutions' }}>Solutions</FooterLink>
              </li>
            </LinkList>
          </ColBlock>

          <ColBlock>
            <ColHead>
              <ColMark aria-hidden />
              <ColTitle>Who</ColTitle>
            </ColHead>
            <LinkList>
              <li>
                <FooterLink to="/about">About</FooterLink>
              </li>
              <li>
                <FooterLink to={{ pathname: '/', hash: 'team' }}>Team</FooterLink>
              </li>
              <li>
                <FooterLink to="/career">Careers</FooterLink>
              </li>
            </LinkList>
          </ColBlock>

          <ColBlock>
            <ColHead>
              <ColMark aria-hidden />
              <ColTitle>Impact</ColTitle>
            </ColHead>
            <LinkList>
              <li>
                <FooterLink to="/sustainability">Sustainability</FooterLink>
              </li>
              <li>
                <FooterLink to="/future">Future</FooterLink>
              </li>
              <li>
                <FooterLink to="/articles">News</FooterLink>
              </li>
              <li>
                <ExternalLink href="mailto:studio@u1.com">Contact</ExternalLink>
              </li>
            </LinkList>
          </ColBlock>

          <ColBlock>
            <ColHead>
              <ColMark aria-hidden />
              <ColTitle>Social</ColTitle>
            </ColHead>
            <SocialSplit>
              <SocialCol>
                <ExternalLink href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </ExternalLink>
                <ExternalLink href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  Instagram
                </ExternalLink>
              </SocialCol>
              <SocialCol>
                <ExternalLink href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                  Facebook
                </ExternalLink>
                <ExternalLink href="https://x.com/" target="_blank" rel="noopener noreferrer">
                  X
                </ExternalLink>
              </SocialCol>
            </SocialSplit>
          </ColBlock>
        </MainGrid>
      </motion.div>

      <motion.div variants={itemVariants}>
        <LegalGrid>
          <LegalCol>
            <LegalLink to="/privacy">Privacy Policy</LegalLink>
            <Copyright>Copyright © {new Date().getFullYear()} U1</Copyright>
          </LegalCol>
          <LegalCol>
            <LegalLink to="/terms">Terms of Use</LegalLink>
          </LegalCol>
          <LegalCol>
            <LegalLink to="/transparency">Transparency Statement</LegalLink>
          </LegalCol>
          <LegalCol>
            <LegalLink to="/cookies">Cookie Management</LegalLink>
          </LegalCol>
        </LegalGrid>
      </motion.div>
      </Reveal>
    </Container>
  </Shell>
)
