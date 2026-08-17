'use client'
import React from "react";
import { ArrowRight, CalendarDays, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function Hero() {
  return (
    <motion.section
      className="relative  h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden rounded-2xl border border-white/10 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Hero.png')",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Left Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 from-5% to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-sm sm:max-w-md lg:max-w-lg">

          {/* Welcome */}
          <div className="mb-3 sm:mb-4 flex items-center gap-2 text-[#d89b2b]">
            <UtensilsCrossed className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base lg:text-lg font-medium">
              Welcome to Delicia
            </span>
          </div>

          {/* Title */}
          <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
            A Premium{" "}
            <span className="text-[#d89b2b]">
              Dining
            </span>
            <br />
            Experience
          </h1>

          {/* Description */}
          <p className="mt-3 sm:mt-5 max-w-xs sm:max-w-md text-xs sm:text-sm leading-6 sm:leading-7 text-white/75 lg:text-base">
            Exceptional cuisine, elegant ambiance and unforgettable moments.
            Exceptional cuisine,
          </p>

          {/* Buttons */}
          <div className="mt-5 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/menu"
              className="group flex active:scale-99 items-center gap-2 rounded-lg bg-[#d89b2b] px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-white transition duration-100 hover:bg-[#d89b2b]"
            >
              Explore Menu
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition group-hover:translate-x-1" />
            </Link>

            <Link
              href="/reservation/book-table"
              className="flex active:scale-99 items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium text-white backdrop-blur transition duration-100 hover:bg-white/10"
            >
              <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4" />
              Book a Table
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Hero;