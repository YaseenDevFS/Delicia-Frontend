'use client'
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

function PopularDishes() {
  const dishes = [
    { name: 'Egyptian Koshari', price: '$12.99', rating: 4.5 },
    { name: 'Egyptian Koshari', price: '$12.99', rating: 4.5 },
    { name: 'Egyptian Koshari', price: '$12.99', rating: 4.5 },
    { name: 'Egyptian Koshari', price: '$12.99', rating: 4.5 },
  ];

  return (
    <motion.div 
      className='grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 mt-4'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      {/* First Column - Popular Dishes */}
      <div className="col-span-1 lg:col-span-3 rounded-xl border border-white/5 bg-[#18191b] p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <h1 className='text-lg sm:text-xl font-sans font-serif text-white font-light'>Popular Dishes</h1>
          <Link href="/menu">
            <span className="text-[#d89b2b] active:scale-99 transition-all duration-100 group flex items-center gap-2 font-medium transition cursor-default text-sm sm:text-base">
              View All Menu
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-3 sm:mt-4">
          {dishes.map((dish, index) => (
            <div key={index} className="rounded-xl border overflow-hidden border-white/5 bg-[#18191b]">
              <div className="h-28 sm:h-32 md:h-40 w-full bg-[#202022cb] hover:bg-[#29282ccb] transition-all duration-100"></div>
              <div className="p-2 sm:p-3">
                <h1 className='text-sm sm:text-md mb-1.5 sm:mb-2 font-sans font-serif text-white font-light truncate'>{dish.name}</h1>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <Star size={14} className="sm:size-4 text-[#d89b2b]" />
                    <span className='text-xs sm:text-sm text-white/50'>{dish.rating}</span>
                  </div>
                  <p className='text-xs sm:text-sm text-[#d89b2b]'>{dish.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second Column - Special Offers / Featured */}
      <div className="col-span-1 rounded-xl border border-white/5 bg-[#18191b] p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <h1 className='text-lg sm:text-xl font-sans font-serif text-white font-light'>Special Offers</h1>
        </div>
        <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
          <div className="rounded-xl border overflow-hidden border-white/5 bg-[#202022cb] hover:bg-[#29282ccb] transition-all duration-100">
            <div className="h-24 sm:h-28 md:h-33 w-full bg-gradient-to-r from-orange-500/20 to-[#d89b2b]/10"></div>
            <div className="p-2 sm:p-3">
              <h1 className='text-sm sm:text-md font-sans font-serif text-white font-light'>Weekend Special</h1>
              <p className='text-xs sm:text-sm text-white/50'>Get 20% off on all orders</p>
              <span className="text-[#d89b2b] group flex items-center gap-2 text-xs sm:text-sm font-medium transition cursor-default mt-1 sm:mt-2">
                Claim Offer
                <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PopularDishes