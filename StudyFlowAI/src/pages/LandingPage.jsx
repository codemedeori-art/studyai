import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Zap,
  BookOpen,
  Brain,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react'
import { Button } from '../components/Button'

export function LandingPage() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Scheduling',
      description: 'Get personalized study schedules powered by Google Gemini AI'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your productivity and study habits with detailed analytics'
    },
    {
      icon: Zap,
      title: 'Pomodoro Timer',
      description: 'Stay focused with our built-in Pomodoro focus timer'
    },
    {
      icon: BookOpen,
      title: 'Study Plans',
      description: 'Create customized study plans for your exams and goals'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Engineering Student',
      text: 'StudyFlow AI completely changed my study routine. I improved from 68% to 92%!',
      avatar: '👩‍🎓'
    },
    {
      name: 'Mike Johnson',
      role: 'Medical Student',
      text: 'The AI scheduling is incredibly smart. It understands my weak areas perfectly.',
      avatar: '👨‍⚕️'
    },
    {
      name: 'Priya Patel',
      role: 'Data Science Student',
      text: 'The analytics helped me identify my best study times. Highly recommended!',
      avatar: '👩‍💻'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glassmorphism border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="inline-block"
          >
            <Zap size={32} className="text-accent" />
          </motion.div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
            <a href="#demo" className="text-slate-300 hover:text-white transition">Demo</a>
            <a href="#testimonials" className="text-slate-300 hover:text-white transition">Testimonials</a>
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="secondary" size="sm">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Study Smarter</span>
            <br />
            <span className="text-white">Not Harder</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            AI-powered study planning, habit tracking, and productivity analytics. Join thousands of students improving their grades.
          </p>
          <Link to="/signup">
            <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
              Start Your Journey <ArrowRight size={20} />
            </Button>
          </Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 p-8 glassmorphism rounded-lg"
        >
          <div className="bg-gradient-primary rounded-lg h-96 flex items-center justify-center">
            <BookOpen size={80} className="text-white opacity-50" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-4 md:px-6 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-center mb-16 gradient-text"
        >
          Powerful Features
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glassmorphism p-6 rounded-lg"
              >
                <Icon size={32} className="text-accent mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="max-w-6xl mx-auto px-4 md:px-6 py-20">
        <div className="glassmorphism p-12 rounded-lg text-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap size={48} className="text-accent mx-auto mb-4" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Studies?</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Start using StudyFlow AI today and see measurable improvements in your productivity and grades.
          </p>
          <Link to="/signup">
            <Button variant="accent" size="lg">Get Started Free</Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-6xl mx-auto px-4 md:px-6 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-center mb-16 gradient-text"
        >
          Student Success Stories
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glassmorphism p-6 rounded-lg"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="text-slate-300 mb-4">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{testimonial.avatar}</span>
                <div className="text-left">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-20 py-8 text-center text-slate-400">
        <p>&copy; 2024 StudyFlow AI. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage