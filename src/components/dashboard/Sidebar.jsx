'use client'

import {
  Home,
  BookOpen,
  CalendarDays,
  FileText,
  LogOut,
  LogIn,
  Contact,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../../../public/logo.png";

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: "Home", link: "/" },
    { icon: BookOpen, label: "Menu", link: "/menu" },
    { icon: CalendarDays, label: "Reservation", link: "/reservation" },
    { icon: FileText, label: "About", link: "/about" },
    { icon: Contact, label: "Contact", link: "/contact" },
  ];

  const [activePage, setActivePage] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ التحقق من حالة تسجيل الدخول
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkAuth();

    // الاستماع للتغييرات في localStorage
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  useEffect(() => {
    const currentItem = menuItems.find(
      (item) => item.link === pathname
    );

    if (currentItem) {
      setActivePage(currentItem.label);
    }
  }, [pathname]);

  const goToPage = (link, label) => {
    setActivePage(label);
    router.push(link);
  };

  // ✅ دالة تسجيل الخروج
  const logout = () => {
    // حذف التوكن من localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // حذف التوكن من cookies
    document.cookie = 'token=; path=/; max-age=0';
    
    // تحديث حالة تسجيل الدخول
    setIsLoggedIn(false);
    
    // التوجيه إلى صفحة تسجيل الدخول
    router.push('/login');
  };

  // ✅ دالة تسجيل الدخول (توجيه إلى صفحة login)
  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}

      className="
        fixed bottom-0 left-0 z-50

        w-full
        border-t border-[#1d1d1da2]
        bg-[#18191b]
        text-white
        lg:sticky lg:top-0 lg:left-auto lg:bottom-auto
        lg:h-[calc(100vh-3rem)]
        lg:w-auto
        lg:min-w-[220px]
        lg:rounded-xl
        lg:border
        lg:flex
        lg:flex-col
      "
    >

      {/* ================= DESKTOP LOGO ================= */}

      <div className="hidden shrink-0 p-6 lg:block">
        <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            width={150}
            priority
          />
        </Link>
      </div>

      {/* ================= MENU ================= */}

      <nav className="w-full lg:flex-1 lg:overflow-y-auto lg:px-4 lg:pb-4">

        <ul
          className="
            flex
            items-center
            justify-around
            px-2
            py-2

            lg:block
            lg:space-y-2
            lg:px-0
            lg:py-0
          "
        >

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.label;

            return (
              <li
                key={item.label}
                onClick={() =>
                  goToPage(item.link, item.label)
                }

                className={`
                  flex
                  cursor-pointer
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  rounded-lg
                  px-2
                  py-1.5
                  text-xs
                  transition-colors

                  lg:flex-row
                  lg:justify-start
                  lg:gap-3
                  lg:p-3
                  lg:text-base

                  hover:bg-[#2A2A2A]

                  ${
                    isActive
                      ? "bg-[#d89b2b]/20 text-[#d89b2b]"
                      : "text-gray-300"
                  }
                `}
              >

                <Icon
                  size={20}
                  className="shrink-0"
                />

                <span>
                  {item.label}
                </span>

              </li>
            );
          })}

        </ul>

      </nav>

      {/* ================= DESKTOP BOTTOM ================= */}

      <div
        className="
          hidden
          shrink-0
          border-t
          border-[#1d1d1da2]
          p-4
          lg:block
        "
      >

        {/* Premium */}

        <div className="rounded-lg border border-[#d89b2b]/10 p-4">

          <div className="flex items-center gap-2">

            <span className="text-[#d89b2b]">
              ★
            </span>

            <span className="font-serif text-white">
              Delicia Premium
            </span>

          </div>

          <p className="mt-2 text-sm text-gray-200">
            Get access to exclusive features and priority support.
          </p>

          <button
            onClick={() => router.push("/premium")}
            className="
              mt-4
              w-full
              rounded-lg
              bg-gradient-to-r
              from-[#d89b2b]/40
              to-[#d89b2b]/30
              py-2
              text-sm
              text-[#d89b2b]
              hover:opacity-80
            "
          >
            Upgrade Now
          </button>

        </div>

        {/* ✅ Logout / Sign In Button */}

        <button
          onClick={isLoggedIn ? logout : goToLogin}
          className={`
            mt-4
            flex
            w-full
            items-center
            gap-3
            rounded-lg
            p-3
            transition-colors
            hover:bg-[#2A2A2A]

            ${isLoggedIn 
              ? 'text-red-400 hover:text-red-300' 
              : 'text-[#d89b2b] hover:text-[#e0a12f]'
            }
          `}
        >

          {isLoggedIn ? (
            <>
              <LogOut size={20} />
              <span>Logout</span>
            </>
          ) : (
            <>
              <LogIn size={20} />
              <span>Sign In</span>
            </>
          )}

        </button>

      </div>

    </motion.aside>
  );
}

export default Sidebar;