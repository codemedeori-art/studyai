import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Mail, Lock, User, Zap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/Button'
import { LoadingSpinner } from '../components/LoadingSpinner'

export function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    
    if (!email || !password || !confirmPassword) {
      toast.error('Please fill all fields')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      await signup(email, password)
      toast.success('Account created successfully!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setLoading(true)
    try {
      await loginWithGoogle()
      toast.success('Account created successfully!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="inline-block mb-4"
          >
            <Zap size={40} className="text-accent" />
          </motion.div>
          <h1 className="text-3xl font-bold gradient-text mb-2">StudyFlow AI</h1>
          <p className="text-slate-400">Join students worldwide</p>
        </div>

        {/* Signup Form */}
        <div className="glassmorphism p-8 mb-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-darkInput/50 border border-slate-600 focus-within:border-primary">
                <Mail size={18} className="text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent outline-none"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-darkInput/50 border border-slate-600 focus-within:border-primary">
                <Lock size={18} className="text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent outline-none"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-darkInput/50 border border-slate-600 focus-within:border-primary">
                <Lock size={18} className="text-slate-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent outline-none"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="full"
              disabled={loading}
              className="mt-6"
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-600"></div>
            <span className="text-sm text-slate-400">Or</span>
            <div className="flex-1 h-px bg-slate-600"></div>
          </div>

          {/* Google Signup */}
          <Button
            type="button"
            variant="secondary"
            size="full"
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            Continue with Google
          </Button>
        </div>

        {/* Login Link */}
        <p className="text-center text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default SignupPage