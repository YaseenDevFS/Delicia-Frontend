'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { register } from '@/services/auth'

function RegisterForm() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex w-full max-w-md flex-col items-center justify-center px-2 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8 w-full">
        <div className="relative inline-block">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white">Create Account</h1>
          <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-[#d89b2b]" />
        </div>
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-400">
          Join Delicia and reserve your favorite table
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4 sm:space-y-5">
        <div>
          <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#101112] py-2 sm:py-2.5 pl-9 sm:pl-10 pr-3 text-xs sm:text-sm text-white placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-[#d89b2b]/60 focus:ring-2 focus:ring-[#d89b2b]/20"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#101112] py-2 sm:py-2.5 pl-9 sm:pl-10 pr-3 text-xs sm:text-sm text-white placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-[#d89b2b]/60 focus:ring-2 focus:ring-[#d89b2b]/20"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Create a password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#101112] py-2 sm:py-2.5 pl-9 sm:pl-10 pr-9 sm:pr-10 text-xs sm:text-sm text-white placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-[#d89b2b]/60 focus:ring-2 focus:ring-[#d89b2b]/20"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors hover:text-white"
            >
              {showPassword ? <Eye className="h-4 w-4 sm:h-5 sm:w-5" /> : <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1 sm:mb-1.5 block text-xs sm:text-sm font-medium text-gray-300">Confirm Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={data.confirmPassword}
              onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#101112] py-2 sm:py-2.5 pl-9 sm:pl-10 pr-9 sm:pr-10 text-xs sm:text-sm text-white placeholder:text-gray-500 outline-none transition-colors duration-200 focus:border-[#d89b2b]/60 focus:ring-2 focus:ring-[#d89b2b]/20"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors hover:text-white"
            >
              {showConfirmPassword ? <Eye className="h-4 w-4 sm:h-5 sm:w-5" /> : <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>
        </div>

        {error && <p className="text-xs sm:text-sm font-medium text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-lg bg-[#d89b2b] px-4 py-2.5 sm:py-3 font-semibold text-white transition-all duration-200 hover:bg-[#e0a12f] text-sm sm:text-base"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-5 sm:mt-6 text-xs sm:text-sm text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-[#d89b2b] transition-colors hover:text-[#e0a12f]">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default RegisterForm