'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import {
    ShoppingBag,
    Trash2,
    Plus,
    Minus,
    ArrowLeft,
    ArrowRight,
    Tag,
    Truck,
    ShieldCheck,
    ChevronLeft,
} from 'lucide-react'
import { motion } from 'framer-motion'

function Cart() {
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [promoCode, setPromoCode] = useState('')
    const [promoApplied, setPromoApplied] = useState(false)

    // =========================
    // Get Cart
    // =========================

    const getCart = async () => {
        try {
            setLoading(true)
            setError(null)

            const token = localStorage.getItem('token')

            if (!token) {
                setError('Please login to view your cart.')
                return
            }

            const response = await axios.get(
                'http://localhost:4000/api/cart',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            console.log('Cart:', response.data)

            setCart(response.data.items || [])

        } catch (error) {
            console.error('GET CART ERROR:', error)

            setError(
                error.response?.data?.message ||
                'Failed to load your cart.'
            )
        } finally {
            setLoading(false)
        }
    }

    // =========================
    // Load Cart
    // =========================

    useEffect(() => {
        getCart()
    }, [])

    // =========================
    // Update Quantity
    // =========================

    const updateQuantity = async (id, type, currentQuantity) => {
        try {
            const token = localStorage.getItem('token')

            let newQuantity =
                type === 'increase'
                    ? currentQuantity + 1
                    : currentQuantity - 1

            if (newQuantity < 1) {
                newQuantity = 1
            }

            await axios.patch(
                `http://localhost:4000/api/cart/${id}`,
                {
                    quantity: newQuantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            await getCart()

        } catch (error) {
            console.error(
                'UPDATE CART ERROR:',
                error.response?.data || error
            )
        }
    }

    // =========================
    // Remove Item
    // =========================

    const removeItem = async (id) => {
        try {
            const token = localStorage.getItem('token')

            await axios.delete(
                `http://localhost:4000/api/cart/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            await getCart()

        } catch (error) {
            console.error(
                'REMOVE CART ERROR:',
                error.response?.data || error
            )
        }
    }

    // =========================
    // Clear Cart
    // =========================

    const clearCart = async () => {
        try {
            const token = localStorage.getItem('token')

            await axios.delete(
                'http://localhost:4000/api/cart',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setCart([])

        } catch (error) {
            console.error(
                'CLEAR CART ERROR:',
                error.response?.data || error
            )
        }
    }

    // =========================
    // Calculations
    // =========================

    const subtotal = cart.reduce(
        (total, item) =>
            total +
            Number(item.price) * item.quantity,
        0
    )

    const delivery = subtotal > 0 ? 5 : 0

    const discount = promoApplied
        ? subtotal * 0.1
        : 0

    const total =
        subtotal +
        delivery -
        discount

    const totalItems = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    )

    // =========================
    // Promo
    // =========================

    const applyPromo = () => {
        if (
            promoCode.trim().toUpperCase() ===
            'DELICIA10'
        ) {
            setPromoApplied(true)
        }
    }

    // =========================
    // Loading
    // =========================

    if (loading) {
        return (
            <motion.div
                className="col-span-1 rounded-xl border border-white/5 bg-[#18191b] overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="flex min-h-[350px] sm:min-h-[500px] items-center justify-center">

                    <div className="flex flex-col items-center gap-3 sm:gap-4">

                        <div className="h-8 w-8 sm:h-10 sm:w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#d89b2b]" />

                        <p className="text-xs sm:text-sm text-gray-500">
                            Loading your cart...
                        </p>

                    </div>

                </div>
            </motion.div>
        )
    }

    // =========================
    // Error
    // =========================

    if (error) {
        return (
            <motion.div
                className="col-span-1 rounded-xl border border-white/5 bg-[#18191b] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex min-h-[350px] sm:min-h-[500px] flex-col items-center justify-center px-4 sm:px-6 text-center">

                    <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">

                        <ShoppingBag className="h-7 w-7 sm:h-9 sm:w-9 text-red-400" />

                    </div>

                    <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-medium text-white">
                        Unable to load your cart
                    </h2>

                    <p className="mt-1.5 sm:mt-2 max-w-md text-xs sm:text-sm text-gray-500">
                        {error}
                    </p>

                    <button
                        onClick={getCart}
                        className="mt-4 sm:mt-6 rounded-lg bg-[#d89b2b] px-5 sm:px-6 py-2 sm:py-3 font-semibold text-white transition hover:bg-[#e0a12f] text-sm sm:text-base"
                    >
                        Try Again
                    </button>

                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="col-span-1 rounded-xl border border-white/5 bg-[#18191b] overflow-hidden"
            initial={{
                opacity: 0,
                y: 30,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.6,
            }}
        >

            <div className="p-4 sm:p-5 md:p-6 lg:p-7">

                {/* Breadcrumb */}

                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm mb-3 sm:mb-4">

                    <Link
                        href="/"
                        className="text-gray-400 hover:text-white transition"
                    >
                        Home
                    </Link>

                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />

                    <span className="text-[#d89b2b]">
                        Cart
                    </span>

                </div>

                {/* Header */}

                <div className="flex flex-col gap-2 sm:gap-3 mb-5 sm:mb-6 md:mb-8">

                    <div className="flex items-center gap-2 sm:gap-3">

                        <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-[#d89b2b]/10 border border-[#d89b2b]/20">

                            <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-[#d89b2b]" />

                        </div>

                        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white">
                            Your Cart
                        </h1>

                    </div>

                    <p className="text-xs sm:text-sm lg:text-base text-gray-400">
                        Review your selected dishes before placing your order.
                    </p>

                </div>

                {/* Empty Cart */}

                {cart.length === 0 ? (

                    <motion.div
                        className="flex flex-col items-center justify-center rounded-xl border border-white/5 bg-[#141516] px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center"
                        initial={{
                            opacity: 0,
                            scale: 0.98,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                    >

                        <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#d89b2b]/10 border border-[#d89b2b]/20">

                            <ShoppingBag className="h-7 w-7 sm:h-9 sm:w-9 text-[#d89b2b]" />

                        </div>

                        <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-medium text-white">
                            Your cart is empty
                        </h2>

                        <p className="mt-1.5 sm:mt-2 max-w-md text-xs sm:text-sm text-gray-500">
                            Looks like you haven't added anything to your cart yet.
                            Explore our menu and discover something delicious.
                        </p>

                        <Link
                            href="/menu"
                            className="mt-5 sm:mt-7 inline-flex items-center gap-2 rounded-lg bg-[#d89b2b] px-5 sm:px-6 py-2 sm:py-3 font-semibold text-white transition hover:bg-[#e0a12f] text-sm sm:text-base"
                        >
                            Explore Menu

                            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />

                        </Link>

                    </motion.div>

                ) : (

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">

                        {/* Cart Items */}

                        <div className="xl:col-span-2">

                            <div className="flex items-center justify-between mb-3 sm:mb-4">

                                <h2 className="text-base sm:text-lg font-medium text-white">
                                    Order Items
                                </h2>

                                <span className="text-xs sm:text-sm text-gray-500">
                                    {totalItems} items
                                </span>

                            </div>

                            <div className="flex flex-col gap-2 sm:gap-3">

                                {cart.map((item, index) => (

                                    <motion.div
                                        key={item.id}
                                        layout
                                        className="group rounded-xl border border-white/5 bg-[#141516] p-2 sm:p-3 transition-all hover:border-white/10 hover:bg-[#18191b]"
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

                                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

                                            {/* Image */}

                                            <div className="relative h-24 w-full sm:h-28 sm:w-28 md:h-32 md:w-32 shrink-0 overflow-hidden rounded-lg bg-[#101112]">

                                                {item.image ? (

                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                    />

                                                ) : (

                                                    <div className="flex h-full w-full items-center justify-center">

                                                        <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-gray-700" />

                                                    </div>

                                                )}

                                                <div className="absolute inset-0 bg-black/10" />

                                            </div>

                                            {/* Information */}

                                            <div className="flex flex-1 flex-col justify-between gap-3 sm:gap-4">

                                                <div>

                                                    <div className="flex items-start justify-between gap-2 sm:gap-3">

                                                        <div>

                                                            <h3 className="text-sm sm:text-base font-medium text-white">
                                                                {item.title}
                                                            </h3>

                                                            <p className="mt-0.5 sm:mt-1 max-w-md text-xs leading-4 sm:leading-5 text-gray-500">
                                                                {item.description}
                                                            </p>

                                                        </div>

                                                        <button
                                                            onClick={() =>
                                                                removeItem(item.id)
                                                            }
                                                            className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
                                                        >

                                                            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />

                                                        </button>

                                                    </div>

                                                </div>

                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">

                                                    {/* Quantity */}

                                                    <div className="flex items-center rounded-lg border border-white/10 bg-[#101112]">

                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    'decrease',
                                                                    item.quantity
                                                                )
                                                            }
                                                            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-gray-400 transition hover:text-white"
                                                        >

                                                            <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

                                                        </button>

                                                        <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-medium text-white">
                                                            {item.quantity}
                                                        </span>

                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    'increase',
                                                                    item.quantity
                                                                )
                                                            }
                                                            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center text-gray-400 transition hover:text-[#d89b2b]"
                                                        >

                                                            <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

                                                        </button>

                                                    </div>

                                                    {/* Price */}

                                                    <div className="text-right">

                                                        <p className="text-base sm:text-lg font-semibold text-[#d89b2b]">
                                                            $
                                                            {(
                                                                Number(item.price) *
                                                                item.quantity
                                                            ).toFixed(2)}
                                                        </p>

                                                        {item.quantity > 1 && (

                                                            <p className="text-xs text-gray-500">
                                                                $
                                                                {Number(item.price).toFixed(2)}
                                                                {' '}each
                                                            </p>

                                                        )}

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </motion.div>

                                ))}

                            </div>

                            {/* Continue Shopping */}

                            <Link
                                href="/menu"
                                className="mt-4 sm:mt-5 inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-400 transition hover:text-[#d89b2b]"
                            >

                                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />

                                Continue Shopping

                            </Link>

                        </div>

                        {/* Summary */}

                        <div className="xl:col-span-1">

                            <div className="sticky top-6 rounded-xl border border-white/5 bg-[#141516] p-4 sm:p-5">

                                <h2 className="text-base sm:text-lg font-medium text-white">
                                    Order Summary
                                </h2>

                                {/* Promo */}

                                <div className="mt-4 sm:mt-5">

                                    <label className="mb-1.5 sm:mb-2 block text-xs font-medium text-gray-400">
                                        Promo Code
                                    </label>

                                    <div className="flex gap-1.5 sm:gap-2">

                                        <div className="relative flex-1">

                                            <Tag className="absolute left-2.5 sm:left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-gray-500" />

                                            <input
                                                type="text"
                                                value={promoCode}
                                                onChange={(e) =>
                                                    setPromoCode(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter code"
                                                disabled={promoApplied}
                                                className="h-9 sm:h-10 w-full rounded-lg border border-white/10 bg-[#101112] pl-8 sm:pl-9 pr-2 sm:pr-3 text-xs sm:text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#d89b2b]/50"
                                            />

                                        </div>

                                        <button
                                            onClick={applyPromo}
                                            disabled={
                                                promoApplied ||
                                                !promoCode.trim()
                                            }
                                            className="rounded-lg border border-[#d89b2b]/40 px-2.5 sm:px-4 text-xs sm:text-sm font-medium text-[#d89b2b] transition hover:bg-[#d89b2b] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Apply
                                        </button>

                                    </div>

                                    {promoApplied && (

                                        <p className="mt-1.5 sm:mt-2 text-xs text-green-400">
                                            Promo code applied successfully.
                                        </p>

                                    )}

                                </div>

                                <div className="my-4 sm:my-5 h-px bg-white/10" />

                                {/* Prices */}

                                <div className="flex flex-col gap-2 sm:gap-3">

                                    <div className="flex items-center justify-between text-xs sm:text-sm">

                                        <span className="text-gray-400">
                                            Subtotal
                                        </span>

                                        <span className="text-gray-200">
                                            ${subtotal.toFixed(2)}
                                        </span>

                                    </div>

                                    <div className="flex items-center justify-between text-xs sm:text-sm">

                                        <span className="flex items-center gap-1.5 sm:gap-2 text-gray-400">

                                            <Truck className="h-3.5 w-3.5 sm:h-4 sm:w-4" />

                                            Delivery

                                        </span>

                                        <span className="text-gray-200">
                                            ${delivery.toFixed(2)}
                                        </span>

                                    </div>

                                    {promoApplied && (

                                        <div className="flex items-center justify-between text-xs sm:text-sm">

                                            <span className="text-green-400">
                                                Discount
                                            </span>

                                            <span className="text-green-400">
                                                -${discount.toFixed(2)}
                                            </span>

                                        </div>

                                    )}

                                </div>

                                <div className="my-4 sm:my-5 h-px bg-white/10" />

                                {/* Total */}

                                <div className="flex items-end justify-between">

                                    <div>

                                        <p className="text-xs sm:text-sm text-gray-400">
                                            Total
                                        </p>

                                        <p className="mt-0.5 sm:mt-1 text-xs text-gray-600">
                                            Including delivery
                                        </p>

                                    </div>

                                    <span className="text-xl sm:text-2xl font-semibold text-[#d89b2b]">
                                        ${total.toFixed(2)}
                                    </span>

                                </div>

                                {/* Checkout */}

                                <button className="group mt-4 sm:mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#d89b2b] py-2.5 sm:py-3 font-semibold text-white transition-all hover:bg-[#e0a12f] hover:shadow-lg hover:shadow-[#d89b2b]/20 active:scale-[0.98] text-sm sm:text-base">
                                    Proceed to Checkout

                                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />

                                </button>

                                {/* Security */}

                                <div className="mt-4 sm:mt-5 flex items-start gap-2 sm:gap-3 rounded-lg border border-white/5 bg-[#101112] p-2.5 sm:p-3">

                                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-[#d89b2b]" />

                                    <p className="text-[10px] sm:text-[11px] leading-4 sm:leading-5 text-gray-500">
                                        Your order information is securely
                                        processed and protected.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </motion.div>
    )
}

export default Cart