import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

type Variant = 'primary' | 'ghost'

type SharedProps = { $variant?: Variant }

const style = css<SharedProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 999px;
  padding: 12px 22px;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  background: ${({ $variant, theme }) => ($variant === 'ghost' ? 'rgba(255,255,255,0.62)' : theme.colors.black)};
  color: ${({ $variant, theme }) => ($variant === 'ghost' ? theme.colors.black : theme.colors.white)};
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition:
    transform ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateY(-1px);
    background: ${({ $variant }) => ($variant === 'ghost' ? 'rgba(20, 20, 32, 0.92)' : '#171724')};
    color: ${({ theme }) => theme.colors.white};
    border-color: rgba(22, 22, 34, 0.92);
    box-shadow: 0 8px 18px rgba(20, 20, 34, 0.14);
  }
`

export const Button = styled(motion.button)<SharedProps>`
  ${style}
`

export const ButtonLink = styled(Link)<SharedProps>`
  ${style}
`
