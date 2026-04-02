import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Container } from "./Container";

/** Slow drift of pink washes — brand pink only, no purple/mint */
const navPinkDrift = keyframes`
  0% {
    transform: translate3d(-3%, 1%, 0) scale(1);
    opacity: 0.55;
  }
  50% {
    transform: translate3d(2%, -2%, 0) scale(1.06);
    opacity: 0.78;
  }
  100% {
    transform: translate3d(1.5%, 2%, 0) scale(1.03);
    opacity: 0.62;
  }
`;

const Wrapper = styled.header`
  position: fixed;
  top: 12px;
  left: 0;
  right: 0;
  z-index: 30;
  pointer-events: none;
`;

const Inner = styled(Container)`
  position: relative;
  width: min(100% - 52px, 1060px);
  height: 72px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding-inline: 28px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.62);
  background: rgba(255, 255, 255, 0.42);
  backdrop-filter: blur(20px) saturate(155%);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.65) inset,
    0 18px 44px rgba(24, 25, 39, 0.1),
    0 0 0 1px ${({ theme }) => `${theme.colors.solutionsAccent}18`},
    0 12px 40px ${({ theme }) => `${theme.colors.solutionsAccent}12`};
  pointer-events: auto;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: -45% -25%;
    pointer-events: none;
    background:
      radial-gradient(
        ellipse 58% 52% at 12% 42%,
        ${({ theme }) => `${theme.colors.solutionsAccent}38`},
        transparent 54%
      ),
      radial-gradient(
        ellipse 48% 44% at 88% 28%,
        ${({ theme }) => `${theme.colors.solutionsAccent}2a`},
        transparent 50%
      ),
      radial-gradient(
        ellipse 42% 38% at 52% 92%,
        rgba(233, 30, 99, 0.16),
        transparent 56%
      );
    filter: blur(18px);
    animation: ${navPinkDrift} 18s ease-in-out infinite alternate;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
    z-index: 2;
  }

  > * {
    position: relative;
    z-index: 3;
  }

  @media (max-width: 768px) {
    width: min(100% - 30px, 1060px);
    padding-inline: 18px;
  }
`;

const Brand = styled(NavLink)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(24px, 3vw, 34px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.black};
  transition:
    color ${({ theme }) => theme.motion.fast},
    text-shadow ${({ theme }) => theme.motion.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.black};
    text-shadow: 0 0 28px ${({ theme }) => `${theme.colors.solutionsAccent}55`};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.solutionsAccent};
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

const Menu = styled.nav`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 14px;

  a {
    font-family: ${({ theme }) => theme.fonts.display};
    padding: 9px 16px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: ${({ theme }) => theme.colors.black};
    border-radius: 999px;
    border: 1px solid transparent;
    background: transparent;
    transition:
      color ${({ theme }) => theme.motion.fast},
      background ${({ theme }) => theme.motion.fast},
      border-color ${({ theme }) => theme.motion.fast},
      box-shadow ${({ theme }) => theme.motion.fast},
      transform ${({ theme }) => theme.motion.fast};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => `${theme.colors.solutionsAccent}10`};
    border-color: ${({ theme }) => `${theme.colors.solutionsAccent}22`};
    box-shadow: 0 6px 20px ${({ theme }) => `${theme.colors.solutionsAccent}14`};
    transform: translateY(-1px);
  }

  .active {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    border-color: rgba(31, 31, 31, 0.08);
    box-shadow:
      0 8px 24px rgba(31, 31, 31, 0.2),
      0 0 0 1px ${({ theme }) => `${theme.colors.solutionsAccent}35`};
  }

  .active:hover {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    transform: none;
    box-shadow:
      0 10px 28px rgba(31, 31, 31, 0.24),
      0 0 0 1px ${({ theme }) => `${theme.colors.solutionsAccent}45`};
  }
`;

const Utility = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;
`;

const Hamburger = styled.button`
  width: 34px;
  height: 26px;
  border: 0;
  background: transparent;
  padding: 0;
  display: grid;
  align-content: center;
  gap: 5px;
  cursor: pointer;

  span {
    display: block;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.black};
  }
`;

export const Navbar = () => (
  <Wrapper>
    <Inner>
      <Brand to="/">u1</Brand>
      <Menu>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/articles">Services</NavLink>
        <NavLink to="/media">References</NavLink>
      </Menu>
      <Utility>
        <Hamburger aria-label="Open menu" type="button">
          <span />
          <span />
          <span />
        </Hamburger>
      </Utility>
    </Inner>
  </Wrapper>
);
