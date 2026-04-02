import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{ delay?: number; y?: number }>

export const Reveal = ({ children, delay = 0, y = 16 }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
