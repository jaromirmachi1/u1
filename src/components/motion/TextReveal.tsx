import { motion } from 'framer-motion'
import styled from 'styled-components'

const Wrap = styled.span`
  display: inline-block;
  overflow: hidden;
`

type Props = {
  text: string
  delay?: number
}

export const TextReveal = ({ text, delay = 0 }: Props) => (
  <Wrap>
    <motion.span
      initial={{ y: '105%' }}
      animate={{ y: '0%' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ display: 'inline-block' }}
    >
      {text}
    </motion.span>
  </Wrap>
)
