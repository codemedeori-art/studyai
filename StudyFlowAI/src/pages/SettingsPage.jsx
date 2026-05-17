import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Bell, Moon, Sun, LogOut, Mail, Shield } from 'lucide-react'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export function SettingsPage() {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(true)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-0">
        <Header />
        
        <main className="p-4 md:p-8 max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-slate-400">Manage your preferences</p>
          </motion.div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card>
              <h2 className="text-xl font-bold mb-6">Profile Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-darkInput border border-slate-600 text-slate-400">
                    <Mail size={18} />
                    <span>{user?.email || 'Not set'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Display Name</label>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-darkInput border border-slate-600 text-slate-400">
                    <span>{user?.displayName || 'Student'}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Display Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card>
              <h2 className="text-xl font-bold mb-6">Display</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-darkCard/50">
                  <div className="flex items-center gap-3">
                    {isDark ? <Moon size={20} /> : <Sun size={20} />}
                    <span className="font-medium">Dark Mode</span>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isDark ? 'bg-primary' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isDark ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Card>
              <h2 className="text-xl font-bold mb-6">Notifications</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-darkCard/50">
                  <div className="flex items-center gap-3">
                    <Bell size={20} />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-slate-400">Get notified about study reminders</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications ? 'bg-accent' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg hover:bg-darkCard/50">
                  <div className="flex items-center gap-3">
                    <Mail size={20} />
                    <div>
                      <p className="font-medium">Email Updates</p>
                      <p className="text-sm text-slate-400">Receive progress reports</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setEmailUpdates(!emailUpdates)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      emailUpdates ? 'bg-accent' : 'bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        emailUpdates ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Privacy & Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card>
              <h2 className="text-xl font-bold mb-6">Privacy & Security</h2>
              
              <Button
                variant="secondary"
                size="full"
                className="flex items-center gap-2 justify-start"
              >
                <Shield size={18} />
                Change Password
              </Button>
            </Card>
          </motion.div>

          {/* Logout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={handleLogout}
              variant="secondary"
              size="full"
              className="flex items-center gap-2 justify-center text-red-400 hover:text-red-300 border-red-900/20 hover:border-red-900"
            >
              <LogOut size={18} />
              Logout
            </Button>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default SettingsPage