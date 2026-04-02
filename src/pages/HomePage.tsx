import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeroSection } from "../components/home/HeroSection";
import { IntroTeamSection } from "../components/home/IntroTeamSection";
import { ProcessMapSection } from "../components/home/ProcessMapSection";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { PortfolioProjectsSection } from "../components/projects/PortfolioProjectsSection";
import { SolutionsSection } from "../components/home/SolutionsSection";
import { TeamSection } from "../components/home/TeamSection";

export const HomePage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [hash]);

  return (
    <>
      <HeroSection />
      <IntroTeamSection />
      <ProcessMapSection />
      <TestimonialsSection />
      <PortfolioProjectsSection />
      <SolutionsSection />
      <TeamSection />
    </>
  );
};
