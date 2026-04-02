import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { portfolioProjects } from "../../data/mockData";
import { Container } from "../layout/Container";
import { PremiumTiltText } from "../motion/PremiumTiltText";
import { TextReveal } from "../motion/TextReveal";

const Hero = styled.section`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const HeroImage = styled.div<{ $src: string; $active: boolean }>`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      180deg,
      rgba(21, 21, 31, 0.28) 20%,
      rgba(14, 14, 25, 0.72) 100%
    ),
    url(${({ $src }) => JSON.stringify($src)}) center/cover;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: scale(${({ $active }) => ($active ? 1 : 1.04)});
  transition:
    opacity 1300ms ease,
    transform 1300ms ease;
`;

const ColorBlob = styled(motion.div)`
  position: absolute;
  width: min(42vw, 520px);
  aspect-ratio: 1;
  border-radius: 50%;
  filter: blur(26px);
  opacity: 0.38;
  background: radial-gradient(
    circle at 30% 20%,
    rgba(102, 94, 166, 0.6),
    rgba(255, 125, 150, 0.08)
  );
  top: 12%;
  right: -8%;
`;

const HeroContent = styled(Container)`
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: grid;
  align-content: center;
  justify-items: center;
  text-align: center;
  gap: 16px;
`;

const HeroKicker = styled.p`
  color: rgba(255, 255, 255, 0.88);
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const HeroTitle = styled(PremiumTiltText)`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(64px, 12vw, 180px);
  line-height: 0.85;
  letter-spacing: -0.08em;
`;

const HeroSlogan = styled.p`
  position: absolute;
  left: 50%;
  bottom: clamp(26px, 5vw, 54px);
  margin: 0;
  color: rgba(255, 255, 255, 0.88);
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-align: center;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    bottom: 18px;
    max-width: min(88vw, 360px);
  }
`;

export const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const slideCount = portfolioProjects.length;

  useEffect(() => {
    if (slideCount === 0) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slideCount);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [slideCount]);

  return (
    <Hero ref={heroRef}>
      {portfolioProjects.map((project, i) => (
        <HeroImage key={project.id} $src={project.image} $active={i === index} />
      ))}
      <ColorBlob
        animate={{ x: [0, -10, 8, 0], y: [0, 6, -6, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      <HeroContent>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.35 }}
        >
          <HeroKicker>u1 digital studio</HeroKicker>
          <HeroTitle interactionRef={heroRef} noiseWhenIdle>
            <TextReveal text="u1" delay={0.12} />
          </HeroTitle>
        </motion.div>
        <HeroSlogan>
          Interior lighting that shapes atmosphere, rhythm, and timeless spatial
          character.
        </HeroSlogan>
      </HeroContent>
    </Hero>
  );
};
