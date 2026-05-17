import React from 'react'
import { motion } from 'framer-motion'

export function LoadingSpinner({ size = 'md' }) {
  const sizeClass = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizeClass[size]} border-4 border-slate-600 border-t-primary rounded-full`}
    />
  )
}

export default LoadingSpinner