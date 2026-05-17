import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Bell, Search, Sparkles } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

export function Header() {
  const { isDark, toggleTheme } = useTheme()
  const { user } = useAuth()
  const [notifications, setNotifications] = useState(2)

  return (
    <header className="sticky top-0 z-30 glassmorphism rounded-none border-t-0 border-x-0 border-b border-slate-700/50 bg-slate-900/60 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4 pl-16 lg:pl-20">
        {/* Left Side - Search */}
        <div className="flex-1 max-w-md hidden md:flex items-center gap-3">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search tasks, study plans, or ask AI..." 
              className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <kbd className="px-2 py-0.5 text-xs font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">⌘</kbd>
              <kbd className="px-2 py-0.5 text-xs font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">K</kbd>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5 ml-auto">
          {/* AI Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs font-semibold text-primary">AI Ready</span>
          </div>

          <div className="h-6 w-px bg-slate-700/50 hidden sm:block"></div>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
          >
            <Bell size={20} />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-slate-900 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
            )}
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          {/* User Avatar */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] cursor-pointer border border-primary/30"
          >
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </motion.div>
        </div>
      </div>
    </header>
  )
}

export default Header