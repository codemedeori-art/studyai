import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { Plus, X, Wand2, Calendar as CalendarIcon, Clock, BookOpen, AlertCircle, Sparkles, Target, Coffee } from 'lucide-react'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import { generateStudySchedule } from '../services/geminiService'
import { createStudyPlan } from '../services/firestoreService'

export function StudyPlannerPage() {
  const { user } = useAuth()
  const [subjects, setSubjects] = useState(['Mathematics', 'Physics'])
  const [subjectInput, setSubjectInput] = useState('')
  const [examDates, setExamDates] = useState(['Calculus - Dec 15'])
  const [examInput, setExamInput] = useState('')
  const [weakTopics, setWeakTopics] = useState(['Integration'])
  const [weakInput, setWeakInput] = useState('')
  const [availableHours, setAvailableHours] = useState(4)
  const [loading, setLoading] = useState(false)
  
  // Store both raw string and parsed structured data
  const [generatedSchedule, setGeneratedSchedule] = useState(null)
  const [structuredPlan, setStructuredPlan] = useState(null)

  const handleAdd = (input, setInput, list, setList) => {
    if (input.trim() && !list.includes(input.trim())) {
      setList([...list, input.trim()])
      setInput('')
    }
  }

  const handleRemove = (index, list, setList) => {
    setList(list.filter((_, i) => i !== index))
  }

  const generateSchedule = async () => {
    if (subjects.length === 0 || examDates.length === 0 || availableHours === 0) {
      toast.error('Please add at least one subject and exam date')
      return
    }

    setLoading(true)
    try {
      const scheduleRaw = await generateStudySchedule(subjects, examDates, weakTopics, availableHours)
      setGeneratedSchedule(scheduleRaw)

      // Try to parse JSON from AI response
      let parsed = null;
      try {
        let cleanJson = scheduleRaw.replace(/```json/gi, '').replace(/```/g, '').trim();
        parsed = JSON.parse(cleanJson);
        if (parsed.schedule) {
          setStructuredPlan(parsed.schedule);
        }
      } catch (err) {
        console.error('Failed to parse AI schedule as JSON', err)
      }

      if (user?.uid) {
        await createStudyPlan(user.uid, {
          subjects, examDates, weakTopics, availableHours, 
          schedule: scheduleRaw,
          createdAt: new Date()
        })
      }

      toast.success('Study schedule generated successfully!')
    } catch (error) {
      toast.error('Failed to generate schedule. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen text-slate-100">
      <Sidebar />
      <div className="flex-1 lg:ml-0 relative z-10 flex flex-col h-screen">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-[1600px] mx-auto w-full">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2 tracking-tight flex items-center gap-3">
                <CalendarIcon className="text-primary" size={36} />
                Smart Study Planner
              </h1>
              <p className="text-slate-400 text-lg">Let our AI build your perfect study routine.</p>
            </div>
            
            {generatedSchedule && (
              <Button variant="primary" onClick={() => window.print()} className="shadow-lg shadow-primary/20 bg-slate-800 border border-slate-700 text-white hover:bg-slate-700">
                Export to PDF
              </Button>
            )}
          </motion.div>

          <div className="grid xl:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="xl:col-span-4 space-y-6"
            >
              <div className="glassmorphism p-6 relative overflow-hidden border border-slate-700/50 bg-slate-900/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full filter blur-[50px]"></div>
                
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="text-primary" size={20} /> Parameters
                </h2>

                {/* Subjects */}
                <div className="mb-6 relative z-10">
                  <label className="block text-xs uppercase tracking-widest font-semibold text-slate-400 mb-2">Subjects</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={subjectInput}
                      onChange={(e) => setSubjectInput(e.target.value)}
                      placeholder="e.g., Biology"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-slate-600 shadow-inner"
                      onKeyPress={(e) => e.key === 'Enter' && handleAdd(subjectInput, setSubjectInput, subjects, setSubjects)}
                    />
                    <Button size="sm" variant="primary" onClick={() => handleAdd(subjectInput, setSubjectInput, subjects, setSubjects)} className="rounded-xl px-4 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                      <Plus size={20} />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                      {subjects.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary-light text-sm shadow-sm"
                        >
                          <BookOpen size={14} className="text-primary opacity-70" />
                          {item}
                          <button onClick={() => handleRemove(index, subjects, setSubjects)} className="hover:text-white transition-colors ml-1">
                            <X size={14} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Exam Dates */}
                <div className="mb-6 relative z-10">
                  <label className="block text-xs uppercase tracking-widest font-semibold text-slate-400 mb-2">Upcoming Exams</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={examInput}
                      onChange={(e) => setExamInput(e.target.value)}
                      placeholder="e.g., Midterms - Oct 15"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-slate-600 shadow-inner"
                      onKeyPress={(e) => e.key === 'Enter' && handleAdd(examInput, setExamInput, examDates, setExamDates)}
                    />
                    <Button size="sm" variant="primary" onClick={() => handleAdd(examInput, setExamInput, examDates, setExamDates)} className="rounded-xl px-4 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                      <Plus size={20} />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <AnimatePresence>
                      {examDates.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-950/50 border border-slate-800/80 group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-slate-800 rounded-md"><Target size={14} className="text-slate-400" /></div>
                            <span className="text-sm font-medium">{item}</span>
                          </div>
                          <button onClick={() => handleRemove(index, examDates, setExamDates)} className="text-slate-500 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all">
                            <X size={16} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Weak Topics */}
                <div className="mb-6 relative z-10">
                  <label className="block text-xs uppercase tracking-widest font-semibold text-slate-400 mb-2">Weak Topics to Focus On</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={weakInput}
                      onChange={(e) => setWeakInput(e.target.value)}
                      placeholder="e.g., Organic Chemistry"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all placeholder-slate-600 shadow-inner"
                      onKeyPress={(e) => e.key === 'Enter' && handleAdd(weakInput, setWeakInput, weakTopics, setWeakTopics)}
                    />
                    <Button size="sm" variant="secondary" onClick={() => handleAdd(weakInput, setWeakInput, weakTopics, setWeakTopics)} className="rounded-xl px-4 border-slate-700 bg-slate-800 hover:bg-slate-700">
                      <Plus size={20} />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence>
                      {weakTopics.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-900/20 border border-red-900/30 text-red-300 text-sm"
                        >
                          <AlertCircle size={14} className="text-red-400/70" />
                          {item}
                          <button onClick={() => handleRemove(index, weakTopics, setWeakTopics)} className="hover:text-red-100 ml-1 transition-colors">
                            <X size={14} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Daily Hours */}
                <div className="mb-8 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-xs uppercase tracking-widest font-semibold text-slate-400">Daily Study Hours</label>
                    <div className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent font-bold text-sm">
                      {availableHours} Hours
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={availableHours}
                    onChange={(e) => setAvailableHours(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                <Button
                  variant="primary"
                  size="full"
                  onClick={generateSchedule}
                  disabled={loading}
                  className="flex items-center justify-center gap-3 py-4 text-lg font-bold rounded-xl shadow-[0_10px_30px_rgba(99,102,241,0.4)]"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      <span className="animate-pulse">AI is thinking...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 size={22} className="animate-pulse" />
                      Generate Master Plan
                    </>
                  )}
                </Button>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Output */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="xl:col-span-8 h-full"
            >
              {loading ? (
                 <div className="h-full min-h-[500px] glassmorphism border border-slate-700/50 flex flex-col items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5"></div>
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   >
                     <Wand2 size={64} className="text-primary mb-6 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                   </motion.div>
                   <h3 className="text-2xl font-bold text-white mb-2">Analyzing your parameters...</h3>
                   <p className="text-slate-400">Our AI model is calculating the optimal path to success.</p>
                 </div>
              ) : structuredPlan ? (
                <div className="space-y-6">
                  {structuredPlan.map((dayPlan, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glassmorphism border border-slate-700/50 overflow-hidden"
                    >
                      <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                            {index + 1}
                          </div>
                          {dayPlan.day}
                        </h3>
                        <div className="px-4 py-1.5 rounded-full bg-slate-800 text-slate-300 text-sm font-medium border border-slate-700 flex items-center gap-2">
                          <Target size={14} className="text-accent" /> {dayPlan.focus}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="relative border-l-2 border-slate-800 ml-4 space-y-8 pb-4">
                          {dayPlan.sessions.map((session, sIdx) => (
                            <div key={sIdx} className="relative pl-8 group">
                              <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-slate-900 transition-colors ${
                                session.type?.toLowerCase().includes('break') 
                                  ? 'bg-orange-400 group-hover:bg-orange-300 shadow-[0_0_10px_rgba(251,146,60,0.5)]'
                                  : session.type?.toLowerCase().includes('revision')
                                  ? 'bg-blue-500 group-hover:bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                                  : 'bg-primary group-hover:bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]'
                              }`}></div>
                              
                              <div className="bg-slate-900/40 hover:bg-slate-800/60 transition-colors rounded-xl p-5 border border-slate-800/50 group-hover:border-slate-700">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                  <div className="flex items-center gap-2 text-primary font-bold text-lg">
                                    {session.subject}
                                  </div>
                                  <div className="flex items-center gap-2 text-slate-400 text-sm bg-slate-950 px-3 py-1 rounded-md border border-slate-800">
                                    <Clock size={14} /> {session.time}
                                  </div>
                                </div>
                                
                                <p className="text-slate-300 font-medium">
                                  {session.type?.toLowerCase().includes('break') && <Coffee size={16} className="inline mr-2 text-orange-400" />}
                                  {session.topic}
                                </p>
                                
                                <div className="mt-3 inline-flex px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-slate-950 border border-slate-800 text-slate-500">
                                  {session.type || 'Study'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : generatedSchedule ? (
                 <div className="glassmorphism p-8 border border-slate-700/50">
                    <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2"><Sparkles className="text-primary"/> Schedule Generated</h3>
                    <div className="prose prose-invert max-w-none text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">
                      {generatedSchedule.replace(/```json/gi, '').replace(/```/g, '')}
                    </div>
                 </div>
              ) : (
                <div className="h-full min-h-[600px] glassmorphism border border-slate-700/50 flex flex-col items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-slate-900/50"></div>
                  <div className="w-96 h-96 bg-primary/5 rounded-full absolute filter blur-[100px] group-hover:bg-primary/10 transition-colors duration-1000"></div>
                  <CalendarIcon size={80} className="text-slate-700 mb-6 relative z-10" />
                  <h3 className="text-2xl font-bold text-slate-300 mb-2 relative z-10">No Schedule Active</h3>
                  <p className="text-slate-500 max-w-sm text-center relative z-10">
                    Add your subjects, exams, and weak topics on the left. Our AI will automatically construct the perfect week for you.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default StudyPlannerPage