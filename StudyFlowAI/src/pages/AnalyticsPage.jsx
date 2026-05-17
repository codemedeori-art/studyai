import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { Card } from '../components/Card'
import { useAuth } from '../context/AuthContext'
import { getUserAnalytics } from '../services/firestoreService'

export function AnalyticsPage() {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  // Sample data
  const weeklyData = [
    { day: 'Mon', hours: 4.2 },
    { day: 'Tue', hours: 5.1 },
    { day: 'Wed', hours: 3.8 },
    { day: 'Thu', hours: 6.2 },
    { day: 'Fri', hours: 4.9 },
    { day: 'Sat', hours: 7.3 },
    { day: 'Sun', hours: 2.1 }
  ]

  const subjectData = [
    { name: 'Mathematics', value: 25 },
    { name: 'Physics', value: 20 },
    { name: 'Chemistry', value: 18 },
    { name: 'Biology', value: 16 },
    { name: 'English', value: 21 }
  ]

  const productivityData = [
    { week: 'Week 1', score: 65 },
    { week: 'Week 2', score: 72 },
    { week: 'Week 3', score: 78 },
    { week: 'Week 4', score: 85 }
  ]

  const COLORS = ['#6366f1', '#22c55e', '#8b5cf6', '#ec4899', '#f59e0b']

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(false)
        // Simulating analytics load
        setAnalytics({
          totalHours: 32.6,
          productivity: 85,
          streakDays: 12,
          subjectsStudied: 5
        })
      } catch (error) {
        console.error('Error loading analytics:', error)
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [user])

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-0">
        <Header />
        
        <main className="p-4 md:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Analytics</h1>
            <p className="text-slate-400">Track your study progress and productivity</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Hours', value: analytics?.totalHours || 0, unit: 'h' },
              { label: 'Productivity', value: analytics?.productivity || 0, unit: '%' },
              { label: 'Current Streak', value: analytics?.streakDays || 0, unit: 'd' },
              { label: 'Subjects', value: analytics?.subjectsStudied || 0, unit: '' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold">
                    {stat.value}
                    <span className="text-lg text-slate-400">{stat.unit}</span>
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Weekly Study Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <h3 className="text-lg font-bold mb-4">Weekly Study Hours</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="day" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #475569'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="hours"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={{ fill: '#22c55e', r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Productivity Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <h3 className="text-lg font-bold mb-4">Productivity Score</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={productivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="week" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #475569'
                      }}
                    />
                    <Bar dataKey="score" fill="#22c55e" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </div>

          {/* Subject Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <h3 className="text-lg font-bold mb-4">Study Distribution by Subject</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={subjectData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {subjectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="space-y-3">
                  {subjectData.map((subject, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{subject.name}</span>
                      <span className="ml-auto font-bold">{subject.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default AnalyticsPage