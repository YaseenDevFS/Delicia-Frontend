'use client'
import Layout from '@/components/cart/Layout'
import React from 'react'
import { motion } from 'framer-motion'

function page() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Layout />
        </motion.div>
    )
}

export default page