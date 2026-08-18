// components/reservation/book-table/BookTable.jsx
'use client'
import {
    CalendarDays,
    ChevronLeft,
    Clock3,
    Users,
    User,
    Mail,
    Phone,
    MessageSquare,
    Loader2
} from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

function BookTable() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        guests: '2',
        date: '',
        time: '',
        specialRequest: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('Please login to make a reservation')
            }

            if (!formData.date || !formData.time) {
                throw new Error('Please select both date and time')
            }

            const reservationData = {
                reservation_date: formData.date,
                reservation_time: formData.time,
                guests: parseInt(formData.guests),
                occasion: formData.specialRequest || null
            }

            const response = await axios.post(
                'https://delicia-backend.vercel.app/api/reservations',
                reservationData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            )

            if (response.status === 201) {
                setSuccess(true)
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    guests: '2',
                    date: '',
                    time: '',
                    specialRequest: '',
                })
                setTimeout(() => {
                    setSuccess(false)
                }, 5000)
            }
        } catch (error) {
            console.error('Reservation error:', error)
            
            if (error.response) {
                const errorMessage = error.response.data?.message || 'Failed to make reservation'
                if (error.response.status === 401) {
                    setError('Session expired. Please login again.')
                } else {
                    setError(errorMessage)
                }
            } else if (error.request) {
                setError('Network error. Please check your connection.')
            } else {
                setError(error.message || 'Something went wrong')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="col-span-1 rounded-xl border border-white/5 bg-[#18191b] overflow-hidden">
            <div className="p-4 sm:p-5 md:p-6 lg:p-7">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm mb-2 sm:mb-3">
                    <span className="text-gray-400">Home</span>
                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                    <span className="text-gray-400">Reservations</span>
                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                    <span className="text-[#d89b2b]">Book A Table</span>
                </div>

                {/* Header */}
                <div className="flex flex-col gap-1.5 sm:gap-2 mb-5 sm:mb-6 md:mb-8">
                    <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white">
                        Book A Table
                    </h1>
                    <p className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-xs sm:text-sm lg:text-base">
                        <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 text-[#d89b2b] shrink-0" />
                        Make a reservation for your next visit
                    </p>
                </div>

                {/* Success Message */}
                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-4 sm:mb-5 md:mb-6 p-3 sm:p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm sm:text-base"
                        >
                            ✅ Reservation confirmed successfully! We'll see you soon.
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-4 sm:mb-5 md:mb-6 p-3 sm:p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm sm:text-base"
                        >
                            ❌ {error}
                            {error.includes('login') && (
                                <a href="/login" className="ml-2 text-[#d89b2b] hover:underline">
                                    Login here
                                </a>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                    {/* Personal Information */}
                    <div>
                        <h2 className="text-base sm:text-lg font-medium text-white mb-3 sm:mb-4">
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                            {/* Name */}
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <label className="text-xs sm:text-sm text-gray-300">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="w-full h-10 sm:h-12 rounded-lg border border-white/10 bg-[#111214] pl-9 sm:pl-12 pr-3 sm:pr-4 text-xs sm:text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#d89b2b]/60"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <label className="text-xs sm:text-sm text-gray-300">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full h-10 sm:h-12 rounded-lg border border-white/10 bg-[#111214] pl-9 sm:pl-12 pr-3 sm:pr-4 text-xs sm:text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#d89b2b]/60"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <label className="text-xs sm:text-sm text-gray-300">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                        className="w-full h-10 sm:h-12 rounded-lg border border-white/10 bg-[#111214] pl-9 sm:pl-12 pr-3 sm:pr-4 text-xs sm:text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#d89b2b]/60"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Guests */}
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <label className="text-xs sm:text-sm text-gray-300">Number of Guests</label>
                                <div className="relative">
                                    <Users className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                                    <select
                                        name="guests"
                                        value={formData.guests}
                                        onChange={handleChange}
                                        className="w-full h-10 sm:h-12 rounded-lg border border-white/10 bg-[#111214] pl-9 sm:pl-12 pr-3 sm:pr-4 text-xs sm:text-sm text-white outline-none focus:border-[#d89b2b]/60 appearance-none"
                                        disabled={loading}
                                        required
                                    >
                                        <option value="1">1 Guest</option>
                                        <option value="2">2 Guests</option>
                                        <option value="3">3 Guests</option>
                                        <option value="4">4 Guests</option>
                                        <option value="5">5 Guests</option>
                                        <option value="6">6 Guests</option>
                                        <option value="7">7 Guests</option>
                                        <option value="8">8 Guests</option>
                                        <option value="9">9 Guests</option>
                                        <option value="10">10 Guests</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reservation Details */}
                    <div>
                        <h2 className="text-base sm:text-lg font-medium text-white mb-3 sm:mb-4">
                            Reservation Details
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                            {/* Date */}
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <label className="text-xs sm:text-sm text-gray-300">Date</label>
                                <div className="relative">
                                    <CalendarDays className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full h-10 sm:h-12 rounded-lg border border-white/10 bg-[#111214] pl-9 sm:pl-12 pr-3 sm:pr-4 text-xs sm:text-sm text-white outline-none focus:border-[#d89b2b]/60"
                                        required
                                        disabled={loading}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                            </div>

                            {/* Time */}
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <label className="text-xs sm:text-sm text-gray-300">Time</label>
                                <div className="relative">
                                    <Clock3 className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="w-full h-10 sm:h-12 rounded-lg border border-white/10 bg-[#111214] pl-9 sm:pl-12 pr-3 sm:pr-4 text-xs sm:text-sm text-white outline-none focus:border-[#d89b2b]/60"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Special Request */}
                    <div>
                        <label className="text-xs sm:text-sm text-gray-300 block mb-1.5 sm:mb-2">
                            Special Request
                        </label>
                        <div className="relative">
                            <MessageSquare className="absolute left-3 sm:left-4 top-3 sm:top-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                            <textarea
                                name="specialRequest"
                                value={formData.specialRequest}
                                onChange={handleChange}
                                rows="4 sm:rows-5"
                                placeholder="Any special requests or additional information..."
                                className="w-full rounded-lg border border-white/10 bg-[#111214] pl-9 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-xs sm:text-sm text-white placeholder:text-gray-600 outline-none resize-none focus:border-[#d89b2b]/60"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto min-w-[160px] sm:min-w-[200px] h-10 sm:h-12 rounded-lg bg-[#d89b2b] px-6 sm:px-8 text-xs sm:text-sm font-medium text-black transition-colors hover:bg-[#e5aa3b] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                'Confirm Reservation'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BookTable