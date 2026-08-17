'use client'
import React from "react";
import About from "./About";
import { motion } from "framer-motion";

function Layout() {
    return (
        <motion.div
            className="bg-[#0F0F0F] rounded-t-2xl flex flex-col relative -top-8 sm:-top-10 border border-[#1d1d1da2] rounded-xl overflow-hidden overflow-y-scroll h-[calc(100vh-6rem)] sm:h-[calc(100vh-7rem)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="p-1.5 mb-15 lg:mb-0 md:mb-0 sm:p-2">
                <About />
            </div>
        </motion.div>
    );
}

export default Layout;