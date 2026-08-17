"use client";

import React from "react";
import {
    CalendarDays,
    ChevronRight,
    ChefHat,
    Users,
    Star,
    MapPin,
    Play,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function About() {
    const stats = [
        {
            icon: ChefHat,
            value: "15+",
            label: "Years of Experience",
        },
        {
            icon: Users,
            value: "50+",
            label: "Expert Chefs",
        },
        {
            icon: Star,
            value: "25K+",
            label: "Happy Customers",
        },
        {
            icon: MapPin,
            value: "8",
            label: "Branches Worldwide",
        },
    ];

    return (
        <motion.div 
            className="col-span-1 overflow-hidden rounded-xl border border-white/5 bg-[#18191b]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="p-3 sm:p-4 md:p-5 lg:p-7">

                {/* =========================================
                    Breadcrumb
                ========================================= */}
                <div className="mb-4 sm:mb-5 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <span className="text-gray-400">Home</span>
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                    <span className="text-[#d89b2b]">About Us</span>
                </div>

                {/* =========================================
                    Hero Section
                ========================================= */}
                <section className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-2">

                    {/* Hero Content */}
                    <motion.div 
                        className="flex flex-col justify-center py-2 sm:py-3 lg:py-6"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-[#d89b2b]">
                            About Delicia
                        </span>
                        <h1 className="max-w-2xl font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.08] text-white">
                            Our Passion for{" "}
                            <span className="text-[#d89b2b]">
                                Exceptional Dining
                            </span>
                        </h1>
                        <p className="mt-4 sm:mt-6 max-w-xl text-xs sm:text-sm leading-6 sm:leading-7 text-gray-400 sm:text-base">
                            At Delicia, we believe that dining is more than just
                            food — it&apos;s about creating memorable experiences.
                            Our journey began with a simple passion: to bring
                            people together through exceptional cuisine, warm
                            hospitality, and an ambiance that feels like home.
                        </p>

                        {/* Hero Actions */}
                        <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
                            <Link
                                href="/reservation/book-table"
                                className="flex h-9 sm:h-11 items-center gap-1.5 sm:gap-2 rounded-lg bg-[#d89b2b] px-3.5 sm:px-5 text-xs sm:text-sm font-medium text-white transition hover:bg-[#e0a12f]"
                            >
                                <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                <span>Book a Table</span>
                                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </Link>
                            <button className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300 transition hover:text-white">
                                <span className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[#d89b2b] text-[#d89b2b]">
                                    <Play className="ml-0.5 h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" />
                                </span>
                                <span className="hidden xs:inline">Watch Our Story</span>
                                <span className="xs:hidden">Watch</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[320px] xl:min-h-[410px] overflow-hidden rounded-xl border border-white/5 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/about-hero.jpg')",
                        }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="absolute inset-0 bg-black/10" />
                    </motion.div>

                </section>

                {/* =========================================
                    Statistics
                ========================================= */}
                <motion.section
                    className="mt-5 sm:mt-6 grid grid-cols-2 overflow-hidden rounded-xl border border-white/5 bg-[#141516] lg:grid-cols-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                >
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                className={`flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-4 sm:py-6 lg:px-6 ${
                                    index !== 0
                                        ? "border-t border-white/5 lg:border-l lg:border-t-0"
                                        : ""
                                }`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Icon className="h-6 w-6 sm:h-8 sm:w-8 shrink-0 text-[#d89b2b] sm:h-9 sm:w-9" strokeWidth={1.5} />
                                <div>
                                    <h3 className="font-serif text-xl sm:text-2xl text-white sm:text-3xl">
                                        {stat.value}
                                    </h3>
                                    <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500 sm:text-sm">
                                        {stat.label}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.section>

                {/* =========================================
                    Our Story
                ========================================= */}
                <motion.section 
                    className="mt-5 sm:mt-6 grid grid-cols-1 gap-5 sm:gap-6 rounded-xl border border-white/5 bg-[#141516] p-2.5 sm:p-3 md:p-4 lg:grid-cols-2 lg:p-0"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Story Image */}
                    <div
                        className="min-h-[200px] sm:min-h-[280px] md:min-h-[340px] lg:min-h-[430px] overflow-hidden rounded-lg bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/about-story.jpg')",
                        }}
                    >
                        <div className="h-full w-full bg-black/5" />
                    </div>

                    {/* Story Content */}
                    <motion.div 
                        className="flex flex-col justify-center px-2.5 sm:px-4 md:px-5 py-4 sm:py-6 lg:px-8 lg:py-10"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <span className="text-xs sm:text-sm font-medium text-[#d89b2b]">
                            Our Story
                        </span>
                        <h2 className="mt-2 sm:mt-3 font-serif text-2xl sm:text-3xl font-light leading-tight text-white sm:text-4xl">
                            A Tradition of Excellence
                        </h2>
                        <div className="mt-3 sm:mt-5 space-y-3 sm:space-y-4 text-xs sm:text-sm leading-6 sm:leading-7 text-gray-400 sm:text-base">
                            <p>
                                Founded in 2009, Delicia started as a small
                                bistro with a big dream — to redefine fine
                                dining in a way that is both innovative and
                                heartfelt.
                            </p>
                            <p>
                                Over the years, we have grown into a beloved
                                restaurant brand, known for our dedication to
                                quality, creativity, and guest satisfaction.
                            </p>
                            <p className="hidden sm:block">
                                Every dish we serve is crafted with the finest
                                ingredients, thoughtful techniques, and a touch
                                of passion. Whether it&apos;s a casual lunch, a
                                family dinner, or a special celebration, we are
                                here to make every moment special.
                            </p>
                        </div>

                        {/* Signature */}
                        <div className="mt-4 sm:mt-6">
                            <p className="font-serif text-2xl sm:text-3xl italic text-[#d89b2b]">
                                Delicia Team
                            </p>
                            <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500 sm:text-sm">
                                The Delicia Family
                            </p>
                        </div>
                    </motion.div>
                </motion.section>

                {/* =========================================
                    Bottom CTA
                ========================================= */}
                <motion.section
                    className="relative mt-5 sm:mt-6 overflow-hidden rounded-xl border border-[#d89b2b]/20 bg-[#141516] px-4 sm:px-6 md:px-8 py-6 sm:py-8 lg:flex lg:items-center lg:justify-between"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#d89b2b]/10 blur-3xl" />
                    <div className="relative">
                        <span className="text-xs sm:text-sm font-medium text-[#d89b2b]">
                            Experience Delicia
                        </span>
                        <h2 className="mt-1.5 sm:mt-2 font-serif text-xl sm:text-2xl font-light text-white sm:text-3xl">
                            Make your next meal unforgettable.
                        </h2>
                        <p className="mt-1.5 sm:mt-2 max-w-xl text-xs sm:text-sm text-gray-500">
                            Join us for exceptional food, warm hospitality,
                            and moments worth remembering.
                        </p>
                    </div>
                    <Link
                        href="/reservation/book-table"
                        className="relative mt-4 sm:mt-6 lg:mt-0 flex h-9 sm:h-11 items-center justify-center gap-1.5 sm:gap-2 rounded-lg bg-[#d89b2b] px-4 sm:px-6 text-xs sm:text-sm font-medium text-white transition hover:bg-[#e0a12f]"
                    >
                        <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Book a Table
                        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Link>
                </motion.section>

            </div>
        </motion.div>
    );
}

export default About;