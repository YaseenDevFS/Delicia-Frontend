'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, ArrowRight, UtensilsCrossed } from 'lucide-react'
import { motion } from 'framer-motion'

function LoginForm() {
  const [success, setSuccess] = useState(null)
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError(null)
  setSuccess(null)

  try {
    const response = await fetch(
      'http://localhost:4000/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }
    )

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Login failed')
    }

    localStorage.setItem('token', result.token)

    if (result.user) {
      localStorage.setItem('user', JSON.stringify(result.user))
    }

    setSuccess('Welcome back! You’re successfully signed in.')

    setTimeout(() => {
      window.location.href = '/'
    }, 300)

  } catch (error) {
    setError(error.message)
  } finally {
    setLoading(false)
  }
}

  return (
    <motion.div
      className="flex w-full max-w-md flex-col items-center justify-center px-2 py-6 sm:py-8 pt-0"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mb-6 sm:mb-8 w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="relative inline-block">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white">Welcome Back</h1>
          <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-[#d89b2b]" />
        </div>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-400">
          Sign in to continue your culinary journey at{' '}
          <span className="font-medium text-[#d89b2b]">Delicia</span>
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="w-full space-y-4 sm:space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">Email Address</label>
          <div className="group relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-colors group-focus-within:text-[#d89b2b]" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#101112] py-2 sm:py-2.5 pl-9 sm:pl-10 pr-3 text-xs sm:text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-[#d89b2b]/60 focus:bg-[#111214] focus:ring-2 focus:ring-[#d89b2b]/20"
              required
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="mb-1 sm:mb-1.5 flex items-center justify-between">
            <label className="block text-xs sm:text-sm font-medium text-gray-300">Password</label>
            <button
              type="button"
              className="text-xs sm:text-sm font-medium text-[#d89b2b] transition-colors hover:text-[#e0a12f] hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <div className="group relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-colors group-focus-within:text-[#d89b2b]" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#101112] py-2 sm:py-2.5 pl-9 sm:pl-10 pr-9 sm:pr-10 text-xs sm:text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-[#d89b2b]/60 focus:bg-[#111214] focus:ring-2 focus:ring-[#d89b2b]/20"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors hover:text-white"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <Eye className="h-4 w-4 sm:h-5 sm:w-5" /> : <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <label className="group flex cursor-pointer items-center space-x-2">
            <input
              type="checkbox"
              name="rememberMe"
              className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded border-gray-600 bg-[#101112] text-[#d89b2b] transition-all focus:ring-2 focus:ring-[#d89b2b]/30"
            />
            <span className="text-xs sm:text-sm text-gray-300 transition-colors group-hover:text-white">Remember me</span>
          </label>
        </motion.div>

{success && (
  <motion.div
    className="mt-4 sm:mt-5 flex w-full items-center gap-2.5 sm:gap-3 rounded-xl border border-[#d89b2b]/20 bg-[#d89b2b]/10 px-3 sm:px-4 py-3 sm:py-3.5"
    initial={{ opacity: 0, y: -10, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-[#d89b2b]/15">
      <svg
        className="h-4 w-4 sm:h-5 sm:w-5 text-[#d89b2b]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>

    <div>
      <p className="text-xs sm:text-sm font-semibold text-white">
        Welcome back!
      </p>

      <p className="mt-0.5 text-[10px] sm:text-xs text-gray-400">
        You&apos;ve signed in successfully. Enjoy your experience at Delicia.
      </p>
    </div>
  </motion.div>
)}

        <motion.button
          type="submit"
          disabled={loading}
          className="group relative w-full overflow-hidden rounded-lg bg-[#d89b2b] py-2.5 sm:py-3 font-semibold text-white transition-all duration-200 hover:bg-[#e0a12f] hover:shadow-lg hover:shadow-[#d89b2b]/25 disabled:opacity-70 text-sm sm:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center justify-center gap-2">
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              <>
                Sign In
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </span>
        </motion.button>
      </form>

      <motion.div
        className="my-5 sm:my-6 flex w-full items-center gap-3 sm:gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <div className="h-px flex-1 bg-white/10" />
        <span className="whitespace-nowrap text-xs sm:text-sm text-gray-400">or continue with</span>
        <div className="h-px flex-1 bg-white/10" />
      </motion.div>

      <motion.div
        className="grid w-full grid-cols-2 gap-2 sm:gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        <button className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg border border-white/10 bg-[#141516] px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-200 transition-all duration-200 hover:border-white/20 hover:bg-[#18191b] hover:text-white active:scale-98">
          <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>
        <button className="flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg border border-white/10 bg-[#141516] px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-200 transition-all duration-200 hover:border-white/20 hover:bg-[#18191b] hover:text-white active:scale-98">
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>
      </motion.div>

      <motion.p
        className="mt-5 sm:mt-6 text-xs sm:text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        Don&apos;t have an account?{' '}
        <Link href="/register" className="inline-flex items-center gap-0.5 sm:gap-1 font-semibold text-[#d89b2b] transition-colors hover:text-[#e0a12f] hover:underline">
          Sign up
          <ArrowRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
        </Link>
      </motion.p>

      <motion.div
        className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.9 }}
      >
        <UtensilsCrossed className="h-3 w-3 sm:h-4 sm:w-4 text-[#d89b2b]" />
        <span>Delicia • Fine Dining Experience</span>
        <UtensilsCrossed className="h-3 w-3 sm:h-4 sm:w-4 text-[#d89b2b]" />
      </motion.div>
    </motion.div>
  )
}

export default LoginForm