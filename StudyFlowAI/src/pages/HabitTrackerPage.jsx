import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Plus, Flame, CheckCircle2, Trash2 } from 'lucide-react'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { createHabit, getUserHabits, updateHabit, deleteHabit } from '../services/firestoreService'

export function HabitTrackerPage() {
  const { user } = useAuth()
  const [habits, setHabits] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [habitName, setHabitName] = useState('')
  const [frequency, setFrequency] = useState('daily')

  useEffect(() => {
    const loadHabits = async () => {
      try {
        if (user?.uid) {
          const habitsData = await getUserHabits(user.uid)
          setHabits(habitsData)
        }
      } catch (error) {
        console.error('Error loading habits:', error)
      }
    }

    loadHabits()
  }, [user])

  const handleAddHabit = async (e) => {
    e.preventDefault()
    if (!habitName.trim()) {
      toast.error('Please enter a habit name')
      return
    }

    try {
      const habitId = await createHabit(user.uid, {
        name: habitName,
        frequency,
        completed: [],
        streak: 0
      })
      
      setHabits([...habits, {
        id: habitId,
        name: habitName,
        frequency,
        completed: [],
        streak: 0
      }])
      
      setHabitName('')
      setShowForm(false)
      toast.success('Habit added!')
    } catch (error) {
      toast.error('Failed to add habit')
      console.error(error)
    }
  }

  const handleCompleteHabit = async (habitId, habit) => {
    try {
      const today = new Date().toDateString()
      const completed = habit.completed || []
      
      if (completed.includes(today)) {
        const updated = completed.filter(d => d !== today)
        await updateHabit(habitId, { completed: updated })
        setHabits(habits.map(h => h.id === habitId ? { ...h, completed: updated } : h))
      } else {
        const updated = [...completed, today]
        await updateHabit(habitId, { completed: updated })
        setHabits(habits.map(h => h.id === habitId ? { ...h, completed: updated } : h))
        toast.success('Great job! Keep it up!')
      }
    } catch (error) {
      toast.error('Failed to update habit')
      console.error(error)
    }
  }

  const handleDeleteHabit = async (habitId) => {
    try {
      await deleteHabit(habitId)
      setHabits(habits.filter(h => h.id !== habitId))
      toast.success('Habit deleted')
    } catch (error) {
      toast.error('Failed to delete habit')
      console.error(error)
    }
  }

  const getStreakCount = (completed) => {
    if (!completed || completed.length === 0) return 0
    
    const dates = completed.map(d => new Date(d)).sort((a, b) => b - a)
    let streak = 0
    let currentDate = new Date()
    
    for (const date of dates) {
      const diffTime = currentDate - date
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === streak) {
        streak++
        currentDate = date
      } else {
        break
      }
    }
    
    return streak
  }

  const isCompletedToday = (completed) => {
    if (!completed) return false
    const today = new Date().toDateString()
    return completed.includes(today)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-0">
        <Header />
        
        <main className="p-4 md:p-8 max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">Habit Tracker</h1>
              <p className="text-slate-400">Build consistency, one day at a time</p>
            </div>
            <Button
              variant="accent"
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2"
            >
              <Plus size={20} />
              New Habit
            </Button>
          </motion.div>

          {/* Add Habit Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card>
                <form onSubmit={handleAddHabit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Habit Name</label>
                    <input
                      type="text"
                      value={habitName}
                      onChange={(e) => setHabitName(e.target.value)}
                      placeholder="e.g., Morning meditation"
                      className="w-full px-4 py-2 rounded-lg bg-darkInput border border-slate-600 focus:border-primary outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Frequency</label>
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-darkInput border border-slate-600 focus:border-primary outline-none"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" variant="primary" size="full">
                      Add Habit
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="full"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}

          {/* Habits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map((habit, index) => {
              const streak = getStreakCount(habit.completed)
              const completedToday = isCompletedToday(habit.completed)

              return (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-bold">{habit.name}</h3>
                      <button
                        onClick={() => handleDeleteHabit(habit.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Streak */}
                    <div className="flex items-center gap-2 mb-4">
                      <Flame size={20} className="text-orange-500" />
                      <span className="text-2xl font-bold">{streak}</span>
                      <span className="text-slate-400">day streak</span>
                    </div>

                    {/* Complete Button */}
                    <Button
                      variant={completedToday ? 'accent' : 'secondary'}
                      size="full"
                      onClick={() => handleCompleteHabit(habit.id, habit)}
                      className="flex items-center justify-center gap-2"
                    >
                      {completedToday ? (
                        <>
                          <CheckCircle2 size={18} />
                          Completed Today
                        </>
                      ) : (
                        'Mark Complete'
                      )}
                    </Button>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {habits.length === 0 && !showForm && (
            <Card className="text-center py-12">
              <p className="text-slate-400 mb-4">No habits yet. Create one to get started!</p>
              <Button
                variant="primary"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2"
              >
                <Plus size={18} />
                Add First Habit
              </Button>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}

export default HabitTrackerPage