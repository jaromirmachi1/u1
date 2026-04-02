import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { portfolioProjects } from '../../data/mockData'
import { Container } from '../layout/Container'
import { Eyebrow, SectionTitle } from '../ui/Section'

const Showcase = styled.section`
  position: relative;
  isolation: isolate;
  padding-block: clamp(48px, 7vw, 96px);
  background: ${({ theme }) => theme.colors.paperBlush};
  color: ${({ theme }) => theme.colors.ink};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
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

const Top = styled(Container)`
  position: relative;
  z-index: 1;
  margin-bottom: clamp(24px, 3.5vw, 48px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: clamp(24px, 5vw, 48px);
  align-items: end;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`

const HeadBlock = styled.div`
  max-width: min(920px, 100%);
`

const EyebrowLight = styled(Eyebrow)`
  color: ${({ theme }) => theme.colors.gray500};
  margin-bottom: 14px;
`

const TitleLight = styled(SectionTitle)`
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 0;
`

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  padding-bottom: 6px;

  @media (max-width: 720px) {
    align-items: flex-start;
  }
`

const Count = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(52px, 10vw, 96px);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 0.9;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.black} 0%,
    ${({ theme }) => theme.colors.gray500} 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`

const MetaLabel = styled.span`
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray500};
`

const ProjectsGrid = styled(Container)`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  /* Tight, even rhythm — no huge “air” between tiles */
  gap: clamp(8px, 1vw, 14px);
  align-items: start;

  padding-bottom: clamp(4px, 1vw, 8px);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`

const Tile = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
`

const TileInner = styled.div`
  position: relative;
  height: 100%;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(31, 31, 31, 0.09);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    0 10px 28px rgba(24, 25, 39, 0.06);
  overflow: hidden;
  transition:
    transform ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast};

  &::before {
    content: '';
    position: absolute;
    inset: -40% -20% auto -20%;
    height: 56px;
    background: radial-gradient(
      ellipse 60% 120% at 50% 0%,
      ${({ theme }) => `${theme.colors.solutionsAccent}18`},
      transparent 62%
    );
    pointer-events: none;
  }

  /* Brand accent rail — reads “premium / editorial” without adding gap */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(
      180deg,
      ${({ theme }) => `${theme.colors.solutionsAccent}cc`} 0%,
      ${({ theme }) => `${theme.colors.solutionsAccent}22`} 55%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity ${({ theme }) => theme.motion.fast};
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(233, 30, 99, 0.2);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.62),
      0 16px 44px rgba(24, 25, 39, 0.09),
      0 0 0 1px ${({ theme }) => `${theme.colors.solutionsAccent}18`};

    &::after {
      opacity: 1;
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.solutionsAccent};
    outline-offset: 4px;
  }
`

const Visual = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.black};
`

const VisualImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.06);
  transition: transform ${({ theme }) => theme.motion.smooth};

  ${Tile}:hover & {
    transform: scale(1.02);
  }
`

const VisualVeil = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to top,
    rgba(10, 10, 14, 0.78) 0%,
    rgba(10, 10, 14, 0.12) 52%,
    transparent 100%
  );
`

const IndexGlyph = styled.span`
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 2;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(22px, 2.8vw, 34px);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 1;
  color: rgba(255, 255, 255, 0.18);
  pointer-events: none;
  mix-blend-mode: soft-light;
`

const TileMeta = styled.div`
  padding: 14px 16px 16px;
  display: grid;
  gap: 8px;
`

const Category = styled.div`
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray500};
`

const Title = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(18px, 2.2vw, 26px);
  font-weight: 650;
  letter-spacing: -0.035em;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.black};
`

const Action = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-top: 4px;
`

const Arrow = styled.span`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  transition: color ${({ theme }) => theme.motion.fast}, letter-spacing ${({ theme }) => theme.motion.fast};

  ${Tile}:hover & {
    color: ${({ theme }) => theme.colors.solutionsAccent};
    letter-spacing: 0.26em;
  }
`

const Rule = styled.span`
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => `${theme.colors.solutionsAccent}55`},
    rgba(31, 31, 31, 0.15)
  );
  opacity: 0.9;
`

const pad2 = (n: number) => String(n).padStart(2, '0')

const TileWrap = styled(motion.div)<{ $span: number }>`
  grid-column: span ${({ $span }) => $span};
  min-width: 0;

  @media (max-width: 860px) {
    grid-column: 1 / -1;
  }
`

const tileMotion = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.04 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const BottomBar = styled(Container)`
  position: relative;
  z-index: 1;
  margin-top: clamp(6px, 1.2vw, 14px);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`

const Hint = styled.p`
  margin: 0;
  max-width: 36ch;
  font-size: 13px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.gray700};
`

const CtaLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;
  padding: 14px 22px;
  border: 1px solid rgba(31, 31, 31, 0.18);
  border-radius: 999px;
  transition:
    background ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast},
    letter-spacing ${({ theme }) => theme.motion.fast};

  &:hover {
    background: ${({ theme }) => `${theme.colors.solutionsAccent}12`};
    border-color: ${({ theme }) => `${theme.colors.solutionsAccent}55`};
    letter-spacing: 0.24em;
  }
`

export const PortfolioProjectsSection = () => {
  const n = portfolioProjects.length

  return (
    <Showcase id="projects">
      <Top>
        <HeadBlock>
          <EyebrowLight>Our</EyebrowLight>
          <TitleLight>Projects</TitleLight>
        </HeadBlock>
        <Meta>
          <Count aria-hidden>{String(n).padStart(2, '0')}</Count>
          <MetaLabel>Featured projects</MetaLabel>
        </Meta>
      </Top>

      <ProjectsGrid aria-label="Project gallery">
        {portfolioProjects.map((project, index) => {
          // Keep a consistent rhythm: 2-up grid (no blank “holes”).
          const span = 6

          return (
            <TileWrap
              key={project.id}
              $span={span}
              custom={index}
              variants={tileMotion}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Tile to="/projects">
                <TileInner>
                  <Visual>
                    <VisualImg src={project.image} alt={`${project.title} — project`} loading="lazy" />
                    <VisualVeil aria-hidden />
                    <IndexGlyph aria-hidden>{pad2(index + 1)}</IndexGlyph>
                  </Visual>
                  <TileMeta>
                    <Category>{project.category}</Category>
                    <Title>{project.title}</Title>
                    <Action>
                      <Rule aria-hidden />
                      <Arrow>View —</Arrow>
                    </Action>
                  </TileMeta>
                </TileInner>
              </Tile>
            </TileWrap>
          )
        })}
      </ProjectsGrid>

      <BottomBar>
        <Hint>Scroll down—each study is a complete interior narrative.</Hint>
        <CtaLink to="/projects">All projects →</CtaLink>
      </BottomBar>
    </Showcase>
  )
}
