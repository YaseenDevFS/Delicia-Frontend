'use client'

import React, { useEffect, useState } from 'react'
import {
    ArrowRight,
    Dessert,
    ShoppingBag,
    Utensils,
    UtensilsCrossed,
    PlusCircle,
    ChevronRight,
    CheckCircle,
    X,
    Coffee,
    Salad,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const categories = [
    {
        id: 'all',
        label: 'All',
        icon: ShoppingBag,
    },
    {
        id: 'Appetizers',
        label: 'Appetizers',
        icon: Utensils,
    },
    {
        id: 'Main Course',
        label: 'Main Course',
        icon: UtensilsCrossed,
    },
    {
        id: 'Salads',
        label: 'Salads',
        icon: Salad,
    },
    {
        id: 'Desserts',
        label: 'Desserts',
        icon: Dessert,
    },
    {
        id: 'Drinks',
        label: 'Drinks',
        icon: Coffee,
    },
]

function Menu() {
    const [activeCategory, setActiveCategory] = useState('all')

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const [addingItem, setAddingItem] = useState(null)

    const [notification, setNotification] = useState({
        show: false,
        type: '',
        message: '',
    })

    // =========================
    // Get Menu
    // =========================

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)

                const response = await axios.get(
                    'https://delicia-backend.vercel.app/api/menu'
                )

                console.log('Menu data:', response.data)

                setData(response.data)

            } catch (error) {
                console.error(
                    error.response?.data?.message ||
                    'Error fetching menu data'
                )

                showNotification(
                    'error',
                    'Unable to load the menu.'
                )

            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    // =========================
    // Notification
    // =========================

    const showNotification = (type, message) => {
        setNotification({
            show: true,
            type,
            message,
        })

        setTimeout(() => {
            setNotification({
                show: false,
                type: '',
                message: '',
            })
        }, 3000)
    }

    // =========================
    // Add To Cart
    // =========================

    const addToCart = async (menuItemId) => {
        try {
            const token = localStorage.getItem('token')

            if (!token) {
                showNotification(
                    'error',
                    'Please login before adding dishes to your cart.'
                )

                return
            }

            setAddingItem(menuItemId)

            const response = await axios.post(
                'https://delicia-backend.vercel.app/api/cart',
                {
                    menu_item_id: menuItemId,
                    quantity: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            console.log('Cart response:', response.data)

            const addedItem = data.find(
                (item) => item.id === menuItemId
            )

            showNotification(
                'success',
                `${addedItem?.title || 'Dish'} added to your cart`
            )

        } catch (error) {
            console.error(
                error.response?.data?.message ||
                'Failed to add item to cart'
            )

            showNotification(
                'error',
                error.response?.data?.message ||
                'Failed to add item to cart'
            )

        } finally {
            setAddingItem(null)
        }
    }

    // =========================
    // Get Category Items
    // =========================

    const getCategoryItems = (categoryId) => {
        return data.filter(
            (item) => item.category === categoryId
        )
    }

    // =========================
    // Displayed Categories
    // =========================

    const displayedCategories =
        activeCategory === 'all'
            ? categories.filter(
                (category) => category.id !== 'all'
            )
            : categories.filter(
                (category) => category.id === activeCategory
            )

    return (
        <motion.div
            className="relative col-span-1 rounded-xl border border-white/5 bg-[#18191b] p-3 sm:p-4 md:p-5 lg:p-6"
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

            {/* ========================= */}
            {/* Notification */}
            {/* ========================= */}

            <AnimatePresence>
                {notification.show && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -20,
                            scale: 0.95,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: -20,
                            scale: 0.95,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="fixed right-3 sm:right-6 top-3 sm:top-6 z-[9999] w-[280px] sm:w-[350px]"
                    >
                        <div
                            className={`flex items-start gap-2 sm:gap-3 rounded-xl border p-3 sm:p-4 shadow-2xl backdrop-blur-md ${
                                notification.type === 'success'
                                    ? 'border-green-500/20 bg-[#141816]/95'
                                    : 'border-red-500/20 bg-[#181415]/95'
                            }`}
                        >

                            <div
                                className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full ${
                                    notification.type === 'success'
                                        ? 'bg-green-500/10'
                                        : 'bg-red-500/10'
                                }`}
                            >
                                {notification.type === 'success' ? (
                                    <CheckCircle
                                        className="h-4 w-4 sm:h-5 sm:w-5 text-green-400"
                                    />
                                ) : (
                                    <X
                                        className="h-4 w-4 sm:h-5 sm:w-5 text-red-400"
                                    />
                                )}
                            </div>

                            <div className="flex-1">

                                <p className="text-xs sm:text-sm font-semibold text-white">
                                    {notification.type === 'success'
                                        ? 'Added to Cart'
                                        : 'Something went wrong'}
                                </p>

                                <p className="mt-0.5 sm:mt-1 text-xs leading-4 sm:leading-5 text-gray-400">
                                    {notification.message}
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    setNotification({
                                        show: false,
                                        type: '',
                                        message: '',
                                    })
                                }
                                className="text-gray-500 transition hover:text-white"
                            >
                                <X className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>

                        </div>

                        <motion.div
                            initial={{
                                width: '100%',
                            }}
                            animate={{
                                width: '0%',
                            }}
                            transition={{
                                duration: 3,
                                ease: 'linear',
                            }}
                            className={`h-[2px] ${
                                notification.type === 'success'
                                    ? 'bg-green-400'
                                    : 'bg-red-400'
                            }`}
                        />

                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col gap-3 sm:gap-4">

                {/* ========================= */}
                {/* Breadcrumb */}
                {/* ========================= */}

                <div className="flex flex-col gap-1.5 sm:gap-2">

                    <div className="mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">

                        <span className="text-gray-400">
                            Home
                        </span>

                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />

                        <span className="text-[#d89b2b]">
                            Menu
                        </span>

                    </div>

                    <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-white">
                        Our Menu
                    </h1>

                    <p className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-300 lg:text-base">

                        <Utensils className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#d89b2b]" />

                        Discover our delicious selection of dishes made
                        with the finest ingredients.

                    </p>

                </div>

                {/* ========================= */}
                {/* Categories */}
                {/* ========================= */}

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 rounded-xl border border-white/5 bg-[#141516] px-3 sm:px-4 py-2 sm:py-3">

                    {categories.map((category) => {

                        const Icon = category.icon

                        const isActive =
                            activeCategory === category.id

                        return (
                            <button
                                key={category.id}
                                onClick={() =>
                                    setActiveCategory(category.id)
                                }
                                className={`flex cursor-pointer items-center gap-1.5 sm:gap-2 rounded-xl border px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 transition-all duration-100 active:scale-[0.99] text-xs sm:text-sm ${
                                    isActive
                                        ? 'border-[#d89b2b] bg-[#d89b2b] font-medium text-black shadow-md'
                                        : 'border-white/5 bg-[#18191b] text-gray-300 hover:border-[#d89b2b]/50 hover:text-[#d89b2b]'
                                }`}
                            >

                                <Icon className="h-3 w-3 sm:h-4 sm:w-4" />

                                {category.label}

                            </button>
                        )
                    })}

                </div>

                {/* ========================= */}
                {/* Loading */}
                {/* ========================= */}

                {loading && (
                    <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20">

                        <div className="h-8 w-8 sm:h-10 sm:w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#d89b2b]" />

                        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
                            Loading our menu...
                        </p>

                    </div>
                )}

                {/* ========================= */}
                {/* No Data */}
                {/* ========================= */}

                {!loading && data.length === 0 && (
                    <div className="rounded-xl border border-white/5 bg-[#141516] py-12 sm:py-16 md:py-20 text-center">

                        <ShoppingBag className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-gray-600" />

                        <h2 className="mt-3 sm:mt-4 text-lg sm:text-xl text-white">
                            No dishes found
                        </h2>

                        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-500">
                            There are currently no dishes available.
                        </p>

                    </div>
                )}

                {/* ========================= */}
                {/* Menu */}
                {/* ========================= */}

                {!loading && data.length > 0 && (

                    <motion.div
                        className="flex flex-col gap-4 sm:gap-5 md:gap-6"
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                    >

                        {displayedCategories.map(
                            (category, catIndex) => {

                                const items =
                                    getCategoryItems(category.id)

                                if (items.length === 0) {
                                    return null
                                }

                                return (

                                    <motion.div
                                        key={category.id}
                                        className="rounded-xl border border-white/5 bg-[#141516] p-3 sm:p-4"
                                        initial={{
                                            opacity: 0,
                                            y: 30,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay: catIndex * 0.1,
                                        }}
                                    >

                                        {/* Header */}

                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">

                                            <h2 className="font-sans text-base sm:text-lg md:text-xl font-light capitalize text-white">
                                                {category.label}
                                            </h2>

                                            {activeCategory === 'all' && (
                                                <button
                                                    onClick={() =>
                                                        setActiveCategory(
                                                            category.id
                                                        )
                                                    }
                                                    className="group flex cursor-pointer items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-[#d89b2b] transition hover:underline"
                                                >

                                                    View All

                                                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition group-hover:translate-x-1" />

                                                </button>
                                            )}

                                        </div>

                                        {/* Food */}

                                        <motion.div
                                            className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4"
                                            initial="hidden"
                                            animate="visible"
                                            variants={{
                                                hidden: {
                                                    opacity: 0,
                                                },
                                                visible: {
                                                    opacity: 1,
                                                    transition: {
                                                        staggerChildren: 0.1,
                                                    },
                                                },
                                            }}
                                        >

                                            {items
                                                .slice(
                                                    0,
                                                    activeCategory === 'all'
                                                        ? 4
                                                        : items.length
                                                )
                                                .map((item) => (

                                                    <motion.div
                                                        key={item.id}
                                                        variants={{
                                                            hidden: {
                                                                opacity: 0,
                                                                y: 20,
                                                            },
                                                            visible: {
                                                                opacity: 1,
                                                                y: 0,
                                                                transition: {
                                                                    duration: 0.4,
                                                                },
                                                            },
                                                        }}
                                                        className="overflow-hidden rounded-xl border border-white/5 bg-[#18191b] transition-colors hover:border-white/10"
                                                    >

                                                        {/* Image */}

                                                        <div className="h-28 sm:h-32 md:h-40 w-full bg-[#202022cb]" />

                                                        {/* Content */}

                                                        <div className="flex flex-col gap-1.5 sm:gap-2 p-2 sm:p-3">

                                                            <h3 className="truncate font-sans text-sm sm:text-md font-light text-white">
                                                                {item.title}
                                                            </h3>

                                                            <p className="line-clamp-2 min-h-[30px] sm:min-h-[40px] text-xs sm:text-sm text-gray-400">
                                                                {item.description}
                                                            </p>

                                                            <div className="flex items-center justify-between">

                                                                <p className="text-xs sm:text-sm font-semibold text-[#d89b2b]">
                                                                    $
                                                                    {Number(
                                                                        item.price
                                                                    ).toFixed(2)}
                                                                </p>

                                                                <button
                                                                    onClick={() =>
                                                                        addToCart(
                                                                            item.id
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        addingItem ===
                                                                        item.id
                                                                    }
                                                                    className="cursor-pointer text-[#d89b2b] transition-all duration-100 hover:text-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
                                                                >

                                                                    {addingItem ===
                                                                    item.id ? (

                                                                        <span className="block h-5 w-5 sm:h-6 sm:w-6 animate-spin rounded-full border-2 border-[#d89b2b]/30 border-t-[#d89b2b]" />

                                                                    ) : (

                                                                        <PlusCircle
                                                                            size={20}
                                                                            className="sm:size-6"
                                                                        />

                                                                    )}

                                                                </button>

                                                            </div>

                                                        </div>

                                                    </motion.div>

                                                ))}

                                        </motion.div>

                                    </motion.div>
                                )
                            }
                        )}

                    </motion.div>
                )}

            </div>
        </motion.div>
    )
}

export default Menu