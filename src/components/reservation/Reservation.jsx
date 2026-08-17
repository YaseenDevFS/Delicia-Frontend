'use client'

import React, { useEffect, useState } from "react"
import {
    CalendarDays,
    Clock3,
    Users,
    FileText,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import axios from "axios"

function Reservation() {
    const [activeTab, setActiveTab] = useState("Upcoming")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const tabs = ["Upcoming", "Past", "Cancelled"]

    useEffect(() => {
        const getReservations = async () => {
            try {
                setLoading(true)
                setError(null)

                const token = localStorage.getItem("token")

                if (!token) {
                    setError("You need to login first.")
                    return
                }

                const response = await axios.get(
                    "http://localhost:4000/api/reservations/my",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                const reservations =
                    response.data.reservations || response.data

                const formattedReservations = reservations.map(
                    (reservation) => ({
                        id: reservation.id,
                        date:
                            reservation.date ||
                            reservation.reservation_date,
                        time:
                            reservation.time ||
                            reservation.reservation_time,
                        guests: `${reservation.guests} Guests`,
                        occasion: reservation.occasion || "No occasion",
                        status: reservation.status,
                        image: reservation.image || "/reservation-1.jpg",
                    })
                )

                setData(formattedReservations)
            } catch (error) {
                console.error("Failed to get reservations:", error)

                setError(
                    error.response?.data?.message ||
                    "Failed to load reservations."
                )
            } finally {
                setLoading(false)
            }
        }

        getReservations()
    }, [])

    const filteredReservations = data.filter((reservation) => {
        if (activeTab === "Cancelled") {
            return reservation.status === "Cancelled"
        }

        if (activeTab === "Past") {
            return (
                reservation.status === "Completed" ||
                reservation.status === "Past"
            )
        }

        return (
            reservation.status === "Confirmed" ||
            reservation.status === "Pending"
        )
    })

    return (
        <motion.div
            className="col-span-1 rounded-xl border border-white/5 bg-[#18191b] overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="p-4 sm:p-5 md:p-6 lg:p-7">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm mb-2 sm:mb-3">
                    <span className="text-gray-400">
                        Home
                    </span>

                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />

                    <span className="text-[#d89b2b]">
                        Reservations
                    </span>
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 lg:gap-6">

                    <div className="flex flex-col gap-1 sm:gap-2">

                        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white">
                            Reservations
                        </h1>

                        <p className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-xs sm:text-sm lg:text-base">
                            <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 text-[#d89b2b] shrink-0" />

                            View and manage your table reservations.
                        </p>

                    </div>

                    <Link href="/reservation/book-table">
                        <button className="px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 lg:py-3 bg-[#d89b2b] hover:bg-[#e0a12f] text-white active:scale-99 font-semibold rounded-lg transition-colors whitespace-nowrap text-sm sm:text-base">
                            Book a Table
                        </button>
                    </Link>

                </div>

                {/* Tabs */}
                <div className="mt-5 sm:mt-6 md:mt-7 border-b border-white/10">

                    <div className="flex items-center gap-4 sm:gap-5 md:gap-7">

                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    relative pb-3 sm:pb-4 text-xs sm:text-sm transition-colors
                                    ${
                                        activeTab === tab
                                            ? "text-[#e0a12f]"
                                            : "text-gray-400 hover:text-white"
                                    }
                                `}
                            >
                                {tab}

                                {activeTab === tab && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d89b2b]" />
                                )}
                            </button>
                        ))}

                    </div>

                </div>

                {/* Content */}

                {/* Loading */}
                {loading && (
                    <div className="mt-3 sm:mt-4 flex flex-col gap-2 sm:gap-3">

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="animate-pulse rounded-xl border border-white/5 bg-[#141516] p-2"
                            >
                                <div className="flex flex-col xl:flex-row gap-3 sm:gap-4 xl:gap-5">

                                    <div className="h-32 sm:h-36 md:h-40 w-full xl:h-[142px] xl:w-[220px] rounded-lg bg-white/5" />

                                    <div className="flex flex-1 flex-col gap-3 sm:gap-4 py-2 sm:py-3 xl:py-4">

                                        <div className="h-3 sm:h-4 w-32 sm:w-48 rounded bg-white/5" />

                                        <div className="h-3 sm:h-4 w-24 sm:w-32 rounded bg-white/5" />

                                        <div className="h-3 sm:h-4 w-28 sm:w-40 rounded bg-white/5" />

                                        <div className="h-3 sm:h-4 w-36 sm:w-56 rounded bg-white/5" />

                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <motion.div
                        className="mt-3 sm:mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 sm:p-5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="text-sm font-medium text-red-400">
                            {error}
                        </p>
                    </motion.div>
                )}

                {/* Empty */}
                {!loading &&
                    !error &&
                    filteredReservations.length === 0 && (
                        <motion.div
                            className="mt-3 sm:mt-4 flex flex-col items-center justify-center rounded-xl border border-white/5 bg-[#141516] py-10 sm:py-12 md:py-14 px-4 sm:px-5 text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <CalendarDays className="h-8 w-8 sm:h-10 sm:w-10 text-[#d89b2b] mb-3 sm:mb-4" />

                            <h3 className="text-base sm:text-lg font-medium text-white">
                                No {activeTab.toLowerCase()} reservations
                            </h3>

                            <p className="mt-1 sm:mt-2 max-w-md text-xs sm:text-sm text-gray-500">
                                You don't have any {activeTab.toLowerCase()} reservations at the moment.
                            </p>

                            {activeTab === "Upcoming" && (
                                <Link
                                    href="/reservation/book-table"
                                    className="mt-4 sm:mt-5"
                                >
                                    <button className="rounded-lg bg-[#d89b2b] px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-[#e0a12f]">
                                        Book a Table
                                    </button>
                                </Link>
                            )}
                        </motion.div>
                    )}

                {/* Reservations */}
                {!loading &&
                    !error &&
                    filteredReservations.length > 0 && (
                        <motion.div
                            className="mt-3 sm:mt-4 flex flex-col gap-2 sm:gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.5,
                                staggerChildren: 0.1,
                            }}
                        >
                            {filteredReservations.map(
                                (reservation, index) => (
                                    <motion.div
                                        key={reservation.id}
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.1,
                                        }}
                                    >
                                        <ReservationCard
                                            reservation={reservation}
                                        />
                                    </motion.div>
                                )
                            )}
                        </motion.div>
                    )}

                {/* Pagination */}
                {!loading &&
                    !error &&
                    filteredReservations.length > 0 && (
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">

                            <button className="flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-md border border-white/5 bg-[#141516] text-gray-400 transition hover:border-white/10 hover:text-white">
                                <ChevronLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            </button>

                            <button className="flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-md bg-[#d99b2b] text-white text-sm sm:text-base">
                                1
                            </button>

                            <button className="flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-md border border-white/5 bg-[#141516] text-gray-300 hover:bg-[#202122] text-sm sm:text-base">
                                2
                            </button>

                            <button className="flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-md border border-white/5 bg-[#141516] text-gray-300 hover:bg-[#202122] text-sm sm:text-base">
                                3
                            </button>

                            <button className="flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-md border border-white/5 bg-[#141516] text-gray-400 transition hover:border-white/10 hover:text-white">
                                <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                            </button>

                        </div>
                    )}

            </div>
        </motion.div>
    )
}

function ReservationCard({ reservation }) {

    const statusStyles = {
        Confirmed: {
            wrapper: "border-green-500/30 bg-green-500/10",
            text: "text-green-400",
        },

        Pending: {
            wrapper: "border-[#d89b2b]/40 bg-[#d89b2b]/10",
            text: "text-[#e0a12f]",
        },

        Cancelled: {
            wrapper: "border-red-500/30 bg-red-500/10",
            text: "text-red-400",
        },

        Completed: {
            wrapper: "border-blue-500/30 bg-blue-500/10",
            text: "text-blue-400",
        },
    }

    const status =
        statusStyles[reservation.status] ||
        statusStyles.Pending

    return (
        <div className="group flex flex-col xl:flex-row gap-3 sm:gap-4 xl:gap-5 rounded-xl border border-white/5 bg-[#141516] p-2 transition-all duration-200 hover:border-white/10 hover:bg-[#18191b]">

            {/* Image */}
            <div className="relative h-32 sm:h-36 md:h-40 w-full xl:h-[142px] xl:w-[220px] shrink-0 overflow-hidden rounded-lg">

                <img
                    src={reservation.image}
                    alt="Reservation"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/10" />

            </div>

            {/* Main Content */}
            <div className="flex flex-1 flex-col justify-between py-1 sm:py-2 px-0.5 sm:px-1">

                <div className="flex flex-col gap-2 sm:gap-3">

                    {/* Date */}
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">

                        <CalendarDays className="h-4 w-4 sm:h-[18px] sm:w-[18px] text-gray-500" />

                        <span>
                            {reservation.date}
                        </span>

                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">

                        <Clock3 className="h-4 w-4 sm:h-[18px] sm:w-[18px] text-gray-500" />

                        <span>
                            {reservation.time}
                        </span>

                    </div>

                    {/* Guests */}
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">

                        <Users className="h-4 w-4 sm:h-[18px] sm:w-[18px] text-gray-500" />

                        <span>
                            {reservation.guests}
                        </span>

                    </div>

                    {/* Occasion */}
                    <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">

                        <FileText className="h-4 w-4 sm:h-[18px] sm:w-[18px] text-gray-500" />

                        <span>
                            {reservation.occasion}
                        </span>

                    </div>

                </div>

            </div>

            {/* Right Section */}
            <div className="xl:w-[235px] shrink-0 xl:border-l border-white/10 flex flex-col justify-between gap-3 sm:gap-4 px-2 sm:px-3 py-1.5 sm:py-2">

                <div>

                    {/* Status */}
                    <span
                        className={`
                            inline-flex items-center rounded-md border px-3 sm:px-4 py-0.5 sm:py-1 text-xs sm:text-sm
                            ${status.wrapper}
                            ${status.text}
                        `}
                    >
                        {reservation.status}
                    </span>

                    {/* Reservation ID */}
                    <div className="mt-1.5 sm:mt-2">

                        <p className="text-xs sm:text-sm text-gray-500">
                            Reservation ID
                        </p>

                        <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
                            #{reservation.id}
                        </p>

                    </div>

                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-3">

                    <button className="flex-1 h-7 sm:h-8 rounded-md border border-[#b67d1d] text-[#d99b2b] text-xs sm:text-sm transition hover:bg-[#d99b2b] hover:text-white">
                        View Details
                    </button>

                    <button className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-white/5 hover:text-white">
                        <MoreVertical className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Reservation