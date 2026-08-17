'use client'
import React from 'react'
import { Zap, Clock, Star, Truck } from 'lucide-react'
import { motion } from 'framer-motion'

function Features() {
  const features = [
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Get your favorite dishes delivered to you.",
    },
    {
      icon: Clock,
      title: "Quick Service",
      description: "Get your favorite dishes delivered to you.",
    },
    {
      icon: Star,
      title: "Quality Food",
      description: "Get your favorite dishes delivered to you.",
    },
    {
      icon: Truck,
      title: "Easy Tracking",
      description: "Get your favorite dishes delivered to you.",
    },
  ];

  return (
    <div>
      <motion.div 
        className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 sm:gap-4 rounded-xl border border-white/5 bg-[#18191b] p-3 sm:p-4 transition hover:bg-[#202022]">
            <div className="">
              <feature.icon size={20} className="sm:size-6 text-[#d89b2b]" />
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-sm sm:text-base">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400">{feature.description}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Features