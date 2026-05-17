import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  BarChart3,
  BookOpen,
  Clock,
  MessageCircle,
  Settings,
  LogOut,
  CheckCircle2,
  Zap
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { logout } = useAuth()

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/dashboard' },
    { icon: BookOpen, label: 'Study Planner', href: '/planner' },
    { icon: MessageCircle, label: 'AI Assistant', href: '/assistant' },
    { icon: CheckCircle2, label: 'Habits', href: '/habits' },
    { icon: Zap, label: 'Analytics', href: '/analytics' },
    { icon: Settings, label: 'Settings', href: '/settings' }
  ]

  const isActive = (href) => location.pathname === href

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <>
      {/* Menu Button (Visible on all devices) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg glassmorphism border border-slate-700/50 shadow-lg transition-transform hover:scale-105"
      >
        {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        className="fixed left-0 top-0 h-screen w-64 bg-slate-900/40 backdrop-blur-2xl border-r border-slate-700/50 z-40 pt-20 overflow-y-auto flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.2)]"
      >
        {/* Logo */}
        <div className="px-8 py-8 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <Zap size={18} className="text-white" fill="currentColor" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">StudyFlow<span className="text-primary font-black">AI</span></h1>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4 mt-2">Menu</p>
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="relative block"
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden ${
                    active
                      ? 'text-white bg-primary/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {/* Active Indicator Glow */}
                  {active && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full shadow-[0_0_10px_#6366f1]"
                    />
                  )}
                  
                  <Icon size={20} className={active ? 'text-primary' : ''} />
                  <span className="font-medium text-sm">{item.label}</span>
                </motion.div>
              </Link>
            )
          })}
        </nav>

        {/* User Profile / Logout */}
        <div className="p-4 border-t border-slate-800">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/30 text-slate-400 hover:text-red-400 hover:bg-red-900/20 border border-transparent hover:border-red-900/50 transition-all duration-300 group"
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Sign out</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar