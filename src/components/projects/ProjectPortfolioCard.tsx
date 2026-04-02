import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import type { PortfolioProject } from '../../types/content'

interface ProjectPortfolioCardProps {
  project: PortfolioProject
  index: number
}

const Card = styled(motion.article)`
  position: relative;
  width: 100%;
`

const CardLink = styled(Link)`
  display: block;
  position: relative;
  color: inherit;
  text-decoration: none;
  border-radius: 2px;
  overflow: clip;
  isolation: isolate;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.black};
    outline-offset: 6px;
  }
`

const Visual = styled.div`
  position: relative;
  aspect-ratio: 3 / 3.8;
  background: ${({ theme }) => theme.colors.black};
  overflow: hidden;
`

const IndexGlyph = styled.span`
  position: absolute;
  top: clamp(12px, 2vw, 20px);
  right: clamp(12px, 2vw, 20px);
  z-index: 2;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(56px, 9vw, 104px);
  font-weight: 700;
  line-height: 0.85;
  letter-spacing: -0.06em;
  color: rgba(255, 255, 255, 0.12);
  pointer-events: none;
  user-select: none;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.06);
  transition: transform ${({ theme }) => theme.motion.smooth};

  ${CardLink}:hover &,
  ${CardLink}:focus-visible & {
    transform: scale(1);
  }
`

const Scanline = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.12;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.15) 2px,
    rgba(0, 0, 0, 0.15) 3px
  );
  mix-blend-mode: overlay;
`

const Rim = styled.div`
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  pointer-events: none;
`

const Bottom = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: clamp(18px, 3.5vw, 28px);
  background: linear-gradient(
    to top,
    rgba(10, 10, 14, 0.92) 0%,
    rgba(10, 10, 14, 0.45) 55%,
    transparent 100%
  );
  display: grid;
  gap: 8px;
  transform: translateY(6px);
  transition: transform ${({ theme }) => theme.motion.fast};

  ${CardLink}:hover &,
  ${CardLink}:focus-visible & {
    transform: translateY(0);
  }
`

const Category = styled.span`
  font-size: 10px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
`

const Title = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(22px, 2.8vw, 30px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: ${({ theme }) => theme.colors.white};
`

const Arrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  transition: color ${({ theme }) => theme.motion.fast}, letter-spacing ${({ theme }) => theme.motion.fast};

  ${CardLink}:hover &,
  ${CardLink}:focus-visible & {
    color: rgba(255, 255, 255, 0.88);
    letter-spacing: 0.18em;
  }
`

const pad = (n: number) => String(n).padStart(2, '0')

export const ProjectPortfolioCard = ({ project, index }: ProjectPortfolioCardProps) => (
  <Card
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
  >
    <CardLink to="/projects">
      <Visual>
        <IndexGlyph aria-hidden>{pad(index + 1)}</IndexGlyph>
        <Image src={project.image} alt={project.title} loading={index === 0 ? 'eager' : 'lazy'} />
        <Scanline aria-hidden />
        <Rim aria-hidden />
        <Bottom>
          <Category>{project.category}</Category>
          <Title>{project.title}</Title>
          <Arrow>View —</Arrow>
        </Bottom>
      </Visual>
    </CardLink>
  </Card>
)
