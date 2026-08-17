'use client'

import { CalendarDays, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

function Navbar() {
  return (
    <motion.header
      className="
        flex
        pb-7
        w-full
        items-center
        justify-between
        gap-3
        rounded-t-xl
        border
        border-[#1d1d1da2]
        bg-[#18191b]
        p-3
        sm:p-4
        md:p-6
        lg:pt-4
        lg:pb-7
      "
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      {/* Search */}
      <div className="min-w-0 flex-1">
        <input
          placeholder="Search For Dishes..., Drinks, etc."
          type="text"
          className="
            w-full
            max-w-[500px]
            rounded-lg
            bg-[#202022cb]
            px-3
            py-2
            text-sm
            text-white
            placeholder:text-xs
            placeholder:text-[#bfbfbf]

            transition-all
            duration-100

            hover:bg-[#29282ccb]
            focus:bg-[#29282ccb]
            focus:outline-none

            sm:px-4
            sm:text-base
            sm:placeholder:text-sm
          "
        />
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-3 sm:gap-5 md:gap-8">

        {/* Cart */}
        <Link
          href="/cart"
          className="
            rounded-lg
            p-1.5
            transition-all
            duration-100
            hover:bg-[#29282c]
            active:scale-95
          "
        >
          <ShoppingCart
            size={20}
            className="sm:size-[22px]"
          />
        </Link>

        {/* Book Table */}
        <Link
          href="/reservation/book-table"
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-[#d89b2b]
            px-3
            py-2
            text-sm
            font-medium
            text-white

            transition-all
            duration-100

            hover:bg-[#c98f25]
            active:scale-95

            sm:px-4
          "
        >
          <CalendarDays className="h-4 w-4 shrink-0" />

          {/* Hide text on very small screens */}
          <span className="hidden sm:inline">
            Book a Table
          </span>
        </Link>

      </div>

    </motion.header>
  )
}

export default Navbar