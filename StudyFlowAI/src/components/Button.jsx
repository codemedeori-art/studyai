import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const baseClass = 'font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'btn-gradient text-white',
    secondary: 'bg-darkCard border border-slate-600 text-white hover:border-primary',
    accent: 'btn-accent text-white',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
    full: 'w-full px-6 py-3 text-base'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(baseClass, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button