import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import confetti from 'canvas-confetti'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Zap,
  Calendar,
  Sparkles,
  Target,
  Clock,
  ChevronRight,
  Flame
} from 'lucide-react'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { getUserTasks, getUserAnalytics, updateTask } from '../services/firestoreService'
import { generateMotivationalQuote } from '../services/geminiService'
import { usePomodoroTimer } from '../hooks/usePomodoroTimer'

const weeklyData = [
  { name: 'Mon', hours: 2.5 },
  { name: 'Tue', hours: 3.8 },
  { name: 'Wed', hours: 1.5 },
  { name: 'Thu', hours: 4.2 },
  { name: 'Fri', hours: 3.0 },
  { name: 'Sat', hours: 5.5 },
  { name: 'Sun', hours: 4.0 },
];

export function DashboardPage() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [analytics, setAnalytics] = useState(null)
  const [quote, setQuote] = useState('')
  const [loading, setLoading] = useState(true)
  const { minutes, seconds, isActive, toggle, reset } = usePomodoroTimer()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        if (user?.uid) {
          const tasksData = await getUserTasks(user.uid)
          setTasks(tasksData.slice(0, 5))
          
          const analyticsData = await getUserAnalytics(user.uid)
          setAnalytics(analyticsData)
        }

        const motivationalQuote = await generateMotivationalQuote()
        setQuote(motivationalQuote)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  const handleTaskComplete = async (task) => {
    try {
      const newStatus = !task.completed
      await updateTask(task.id, { completed: newStatus })
      
      setTasks(tasks.map(t => 
        t.id === task.id ? { ...t, completed: newStatus } : t
      ))

      if (newStatus) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#22c55e', '#8b5cf6', '#eab308']
        })
        toast.success('Task completed! Keep the momentum going! 🔥')
      }
    } catch (error) {
      toast.error('Failed to update task')
    }
  }

  const completedTasks = tasks.filter(t => t.completed).length
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0
  const progressCircumference = 2 * Math.PI * 38;
  const progressOffset = progressCircumference - (completionRate / 100) * progressCircumference;

  // Pomodoro SVG logic
  const totalSeconds = minutes * 60 + seconds;
  const timerPercentage = (totalSeconds / 1500) * 100; // 25 minutes = 1500 seconds
  const timerCircumference = 2 * Math.PI * 110;
  const timerOffset = timerCircumference - (timerPercentage / 100) * timerCircumference;

  return (
    <div className="flex min-h-screen text-slate-100">
      <Sidebar />
      <div className="flex-1 lg:ml-0 relative z-10">
        <Header />
        
        <main className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-8">
          
          {/* TOP ROW: Hero + Motivation */}
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 glassmorphism p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between group"
            >
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full filter blur-[100px] group-hover:bg-primary/30 transition-colors duration-1000"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full filter blur-[80px] group-hover:bg-accent/30 transition-colors duration-1000"></div>

              <div className="relative z-10 md:w-2/3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/50 text-xs font-semibold uppercase tracking-wider text-slate-300 mb-6 backdrop-blur-md">
                  <Flame size={14} className="text-orange-500" /> 5 Day Streak
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                  Welcome back,<br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-400 to-accent">{user?.displayName || 'Student'}</span> 👋
                </h1>
                <p className="text-xl text-slate-300 mb-8 font-medium">
                  You are <span className="text-accent font-bold">{completionRate}%</span> closer to crushing your weekly goal. Keep pushing!
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" className="shadow-[0_0_20px_rgba(99,102,241,0.4)] px-8 py-3 text-lg font-bold rounded-xl">
                    Resume Study
                  </Button>
                  <Button variant="secondary" className="px-8 py-3 text-lg font-bold rounded-xl bg-slate-800/50 backdrop-blur-md border border-slate-700 hover:bg-slate-700/50">
                    View Planner
                  </Button>
                </div>
              </div>

              {/* Progress Ring */}
              <div className="relative z-10 mt-8 md:mt-0 flex flex-col items-center justify-center">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl"></div>
                  <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" className="stroke-slate-800/50" strokeWidth="8" fill="none" />
                    <motion.circle
                      cx="50" cy="50" r="38"
                      className="stroke-primary"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: progressCircumference }}
                      animate={{ strokeDashoffset: progressOffset }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      style={{ strokeDasharray: progressCircumference }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-black text-white">{completionRate}%</span>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">Goal</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Motivational Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glassmorphism p-8 relative overflow-hidden flex flex-col justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent"></div>
              <Target className="text-accent mb-6" size={32} />
              <h3 className="text-xl font-bold mb-4 text-white">Daily Inspiration</h3>
              <p className="text-lg font-medium text-slate-300 italic leading-relaxed">
                "{quote || 'The future belongs to those who prepare for it today.'}"
              </p>
            </motion.div>
          </div>

          {/* SECTION 2 - STATS CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Total Tasks', value: tasks.length, icon: BookOpen, color: 'text-primary', bg: 'from-primary/20' },
              { label: 'Completed', value: completedTasks, icon: CheckCircle2, color: 'text-accent', bg: 'from-accent/20' },
              { label: 'Productivity', value: `${completionRate}%`, icon: TrendingUp, color: 'text-blue-400', bg: 'from-blue-500/20' },
              { label: 'Focus Hours', value: `${analytics?.studyHours || 0}h`, icon: Zap, color: 'text-purple-400', bg: 'from-purple-500/20' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
              >
                <div className="glassmorphism p-6 relative overflow-hidden h-full group hover:-translate-y-1 transition-transform duration-300 border border-slate-700/50 hover:border-slate-600/80">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${stat.bg} to-transparent rounded-full filter blur-[40px] opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                    <div className="p-2 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-slate-700/50">
                      <stat.icon size={20} className={stat.color} />
                    </div>
                  </div>
                  <p className="text-4xl font-black relative z-10 tracking-tight">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* MAIN CONTENT GRID */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-8">
              
              {/* PERFORMANCE CHART */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glassmorphism p-6 md:p-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold">Weekly Performance</h3>
                    <p className="text-slate-400 mt-1">Your study hours over the last 7 days</p>
                  </div>
                  <Button variant="secondary" className="hidden sm:flex items-center gap-2">
                    Detailed Report <ChevronRight size={16} />
                  </Button>
                </div>
                
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyData}>
                      <defs>
                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        stroke="#64748b" 
                        axisLine={false} 
                        tickLine={false}
                        dy={10}
                      />
                      <YAxis 
                        stroke="#64748b" 
                        axisLine={false} 
                        tickLine={false}
                        dx={-10}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                        itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="hours" 
                        stroke="#6366f1" 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorHours)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* TODAY'S TASKS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glassmorphism p-6 md:p-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <Target className="text-primary" size={28} /> Action Items
                  </h3>
                  <Button variant="secondary" size="sm">View All</Button>
                </div>
                
                {tasks.length === 0 ? (
                  <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-dashed border-slate-700">
                    <CheckCircle2 size={48} className="text-slate-600 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-slate-300">All caught up!</h4>
                    <p className="text-slate-500 mt-2">Take a break or add new tasks from the sidebar.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                          task.completed 
                            ? 'bg-accent/5 border-accent/20' 
                            : 'bg-slate-800/40 border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/80'
                        }`}
                      >
                        <div 
                          onClick={() => handleTaskComplete(task)}
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                          task.completed
                            ? 'bg-accent border-accent text-slate-900 shadow-[0_0_10px_rgba(34,197,94,0.5)] scale-110'
                            : 'border-slate-500 hover:border-primary hover:bg-primary/10'
                        }`}>
                          {task.completed && <CheckCircle2 size={16} className="text-slate-900" />}
                        </div>
                        <div className="flex-1">
                          <span className={`block font-bold text-lg transition-all duration-300 ${task.completed ? 'line-through text-slate-500' : 'text-slate-200 group-hover:text-white'}`}>
                            {task.title}
                          </span>
                          <span className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                            <BookOpen size={12} /> Study Material
                          </span>
                        </div>
                        {task.dueDate && (
                          <span className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 group-hover:border-slate-700 transition-colors">
                            <Calendar size={14} className="text-primary" />
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* SIDE COLUMN: Pomodoro + AI Insights */}
            <div className="space-y-8">
              
              {/* FOCUS TIMER (APPLE WATCH STYLE) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="glassmorphism p-8 relative overflow-hidden flex flex-col items-center justify-center text-center premium-card-hover"
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 via-indigo-500/5 to-transparent transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                
                <h3 className="text-sm font-bold mb-6 uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Clock size={16} className="text-primary" /> Focus Mode
                </h3>
                
                {/* SVG Circular Timer */}
                <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                  <div className={`absolute inset-0 bg-primary/20 rounded-full blur-3xl transition-all duration-1000 ${isActive ? 'scale-110 opacity-100' : 'scale-75 opacity-30'}`}></div>
                  
                  <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 240 240">
                    {/* Background Track */}
                    <circle cx="120" cy="120" r="110" className="stroke-slate-800/80" strokeWidth="12" fill="none" />
                    
                    {/* Progress Track */}
                    <motion.circle
                      cx="120" cy="120" r="110"
                      className="stroke-primary filter drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: timerCircumference }}
                      animate={{ strokeDashoffset: timerOffset }}
                      transition={{ duration: 1, ease: "linear" }}
                      style={{ strokeDasharray: timerCircumference }}
                    />
                  </svg>
                  
                  {/* Timer Text */}
                  <div className="absolute flex flex-col items-center justify-center text-center z-20">
                    <div className="text-6xl font-black font-mono tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </div>
                    <span className="text-sm text-slate-400 font-semibold uppercase tracking-widest mt-2">
                      {isActive ? 'Session Active' : 'Ready'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 w-full relative z-10">
                  <Button
                    variant={isActive ? 'secondary' : 'primary'}
                    className="flex-1 py-4 text-lg font-bold rounded-xl shadow-[0_10px_30px_rgba(99,102,241,0.3)] transition-all"
                    onClick={toggle}
                  >
                    {isActive ? 'Pause' : 'Start Focus'}
                  </Button>
                  <Button variant="secondary" className="px-6 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700" onClick={reset}>
                    Reset
                  </Button>
                </div>
              </motion.div>

              {/* AI INSIGHTS */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="glassmorphism p-8 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-primary via-indigo-500 to-accent"></div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-primary/20 rounded-xl border border-primary/30">
                    <Sparkles size={24} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">AI Insights</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/50 flex items-start gap-3 transition hover:bg-slate-800/80 hover:border-primary/50 group">
                    <span className="text-accent mt-1 group-hover:scale-125 transition-transform">●</span>
                    <p className="text-slate-300 leading-relaxed text-sm">Your focus score improved by <strong className="text-white">12%</strong> this week. Keep taking regular breaks.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/50 flex items-start gap-3 transition hover:bg-slate-800/80 hover:border-blue-400/50 group">
                    <span className="text-blue-400 mt-1 group-hover:scale-125 transition-transform">●</span>
                    <p className="text-slate-300 leading-relaxed text-sm">You skipped DBMS revision yesterday. Consider prioritizing it today.</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardPage