"use client";

import React, { useState } from "react";
import {
    ChevronRight,
    Mail,
    Phone,
    MapPin,
    Clock3,
    Send,
    User,
    MessageSquare,
    CalendarDays,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Contact form submitted:", formData);
    };

    const contactInfo = [
        {
            icon: Phone,
            title: "Phone",
            value: "+20 123 456 7890",
            description: "Available every day",
        },
        {
            icon: Mail,
            title: "Email",
            value: "hello@delicia.com",
            description: "We reply within 24 hours",
        },
        {
            icon: MapPin,
            title: "Our Location",
            value: "Downtown, Cairo",
            description: "Egypt",
        },
    ];

    return (
        <motion.div 
            className="col-span-1  overflow-hidden rounded-xl border border-white/5 bg-[#18191b]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="p-3  md:p-5 lg:p-7">

                {/* =========================================
                    Breadcrumb
                ========================================= */}
                <div className="mb-4 sm:mb-5 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <span className="text-gray-400">Home</span>
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                    <span className="text-[#d89b2b]">Contact Us</span>
                </div>

                {/* =========================================
                    Header
                ========================================= */}
                <motion.section 
                    className="mb-5 sm:mb-6 md:mb-7"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <span className="text-xs sm:text-sm font-medium text-[#d89b2b]">
                        Contact Delicia
                    </span>
                    <h1 className="mt-2 sm:mt-3 max-w-3xl font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-white">
                        We&apos;d Love to{" "}
                        <span className="text-[#d89b2b]">
                            Hear From You
                        </span>
                    </h1>
                    <p className="mt-3 sm:mt-4 max-w-2xl text-xs sm:text-sm leading-6 sm:leading-7 text-gray-400 sm:text-base">
                        Have a question, special request, or simply want to
                        say hello? Our team is always here to help. Reach out
                        and let&apos;s make your next experience at Delicia
                        unforgettable.
                    </p>
                </motion.section>

                {/* =========================================
                    Contact Information
                ========================================= */}
                <motion.section 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, staggerChildren: 0.1 }}
                >
                    {contactInfo.map((item) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.title}
                                className="group rounded-xl border border-white/5 bg-[#141516] p-4 sm:p-5 transition duration-200 hover:border-[#d89b2b]/30 hover:bg-[#18191b]"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-lg border border-[#d89b2b]/20 bg-[#d89b2b]/10">
                                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#d89b2b]" strokeWidth={1.7} />
                                </div>
                                <h3 className="mt-3 sm:mt-5 text-xs sm:text-sm text-gray-500">
                                    {item.title}
                                </h3>
                                <p className="mt-0.5 sm:mt-1 text-sm sm:text-base text-white">
                                    {item.value}
                                </p>
                                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-600">
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.section>

                {/* =========================================
                    Main Contact Area
                ========================================= */}
                <motion.section 
                    className="mt-5 sm:mt-6 grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-[1.5fr_1fr]"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* =====================================
                        Contact Form
                    ===================================== */}
                    <motion.div 
                        className="rounded-xl border border-white/5 bg-[#141516] p-4 sm:p-5 md:p-6 lg:p-7"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-4 sm:mb-5 md:mb-6">
                            <span className="text-xs sm:text-sm font-medium text-[#d89b2b]">
                                Send us a message
                            </span>
                            <h2 className="mt-1.5 sm:mt-2 font-serif text-2xl sm:text-3xl font-light text-white">
                                Get in Touch
                            </h2>
                            <p className="mt-1.5 sm:mt-2 max-w-xl text-xs sm:text-sm leading-5 sm:leading-6 text-gray-500">
                                Fill out the form below and our team will get
                                back to you as soon as possible.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                                <div>
                                    <label htmlFor="name" className="mb-1.5 sm:mb-2 block text-xs sm:text-sm text-gray-400">
                                        Your Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-600" />
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            required
                                            className="h-9 sm:h-11 w-full rounded-lg border border-white/5 bg-[#101112] pl-9 sm:pl-10 pr-3 sm:pr-4 text-xs sm:text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-[#d89b2b]/50"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-1.5 sm:mb-2 block text-xs sm:text-sm text-gray-400">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-600" />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                            className="h-9 sm:h-11 w-full rounded-lg border border-white/5 bg-[#101112] pl-9 sm:pl-10 pr-3 sm:pr-4 text-xs sm:text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-[#d89b2b]/50"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="mb-1.5 sm:mb-2 block text-xs sm:text-sm text-gray-400">
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="What would you like to talk about?"
                                    required
                                    className="h-9 sm:h-11 w-full rounded-lg border border-white/5 bg-[#101112] px-3 sm:px-4 text-xs sm:text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-[#d89b2b]/50"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="mb-1.5 sm:mb-2 block text-xs sm:text-sm text-gray-400">
                                    Your Message
                                </label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-3 top-3 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600" />
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4 sm:rows-5 md:rows-6"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write your message..."
                                        required
                                        className="w-full resize-none rounded-lg border border-white/5 bg-[#101112] px-9 sm:px-10 py-2.5 sm:py-3 text-xs sm:text-sm leading-5 sm:leading-6 text-white outline-none placeholder:text-gray-600 transition focus:border-[#d89b2b]/50"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="flex h-9 sm:h-11 w-full sm:w-auto items-center justify-center gap-1.5 sm:gap-2 rounded-lg bg-[#d89b2b] px-4 sm:px-5 text-xs sm:text-sm font-medium text-white transition hover:bg-[#e0a12f]"
                            >
                                <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                Send Message
                                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </button>
                        </form>
                    </motion.div>

                    {/* =====================================
                        Right Information
                    ===================================== */}
                    <motion.div 
                        className="flex flex-col gap-4 sm:gap-5 md:gap-6"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* Opening Hours */}
                        <div className="rounded-xl border border-white/5 bg-[#141516] p-4 sm:p-5 md:p-6">
                            <div className="flex items-center gap-2.5 sm:gap-3">
                                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[#d89b2b]/10">
                                    <Clock3 className="h-4 w-4 sm:h-5 sm:w-5 text-[#d89b2b]" />
                                </div>
                                <div>
                                    <p className="text-[10px] sm:text-xs text-gray-500">Visit Us</p>
                                    <h3 className="font-serif text-lg sm:text-xl text-white">Opening Hours</h3>
                                </div>
                            </div>
                            <div className="mt-4 sm:mt-5 md:mt-6 space-y-3 sm:space-y-4">
                                <div className="flex items-center justify-between border-b border-white/5 pb-2.5 sm:pb-3">
                                    <span className="text-xs sm:text-sm text-gray-400">Monday - Thursday</span>
                                    <span className="text-xs sm:text-sm text-gray-200">11:00 AM - 11:00 PM</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-white/5 pb-2.5 sm:pb-3">
                                    <span className="text-xs sm:text-sm text-gray-400">Friday - Saturday</span>
                                    <span className="text-xs sm:text-sm text-gray-200">11:00 AM - 12:00 AM</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs sm:text-sm text-gray-400">Sunday</span>
                                    <span className="text-xs sm:text-sm text-gray-200">12:00 PM - 10:00 PM</span>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div
                            className="relative min-h-[200px] sm:min-h-[240px] md:min-h-[280px] overflow-hidden rounded-xl border border-white/5 bg-[#141516] bg-cover bg-center"
                            style={{
                                backgroundImage: "url('/contact-map.jpg')",
                            }}
                        >
                            <div className="absolute inset-0 bg-black/55" />
                            <div className="absolute inset-x-3 sm:inset-x-4 md:inset-x-5 bottom-3 sm:bottom-4 md:bottom-5 rounded-lg border border-white/10 bg-[#101112]/90 p-3 sm:p-4 backdrop-blur-md">
                                <div className="flex items-start gap-2.5 sm:gap-3">
                                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-[#d89b2b]">
                                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] sm:text-xs text-[#d89b2b]">Find Us</p>
                                        <h3 className="mt-0.5 sm:mt-1 text-sm sm:text-base text-white">Delicia Downtown</h3>
                                        <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs leading-4 sm:leading-5 text-gray-500">
                                            25 Restaurant Street, Downtown Cairo, Egypt
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>

                {/* =========================================
                    Reservation CTA
                ========================================= */}
                <motion.section
                    className="relative mt-5 sm:mt-6 overflow-hidden rounded-xl border border-[#d89b2b]/20 bg-[#141516] px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-8 lg:flex lg:items-center lg:justify-between"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#d89b2b]/10 blur-3xl" />
                    <div className="relative">
                        <span className="text-xs sm:text-sm font-medium text-[#d89b2b]">
                            Ready for a memorable experience?
                        </span>
                        <h2 className="mt-1.5 sm:mt-2 font-serif text-xl sm:text-2xl font-light text-white sm:text-3xl">
                            Reserve your table today.
                        </h2>
                        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-500">
                            We look forward to welcoming you at Delicia.
                        </p>
                    </div>
                    <Link
                        href="/reservation/book-table"
                        className="relative mt-4 sm:mt-5 lg:mt-0 flex h-9 sm:h-11 items-center justify-center gap-1.5 sm:gap-2 rounded-lg bg-[#d89b2b] px-4 sm:px-5 md:px-6 text-xs sm:text-sm font-medium text-white transition hover:bg-[#e0a12f]"
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

export default Contact;