import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export function Card({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      initial={hover ? { opacity: 0, y: 10 } : {}}
      animate={hover ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -5 } : {}}
      className={clsx(
        'glassmorphism p-6 rounded-lg',
        hover && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card