// src/middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname
  
  // 🔓 الصفحات العامة (مسموح بدون تسجيل دخول)
  const publicPaths = ['/login', '/register']
  const isPublicPath = publicPaths.includes(path)

  // 🔑 التحقق من وجود التوكن
  const token = request.cookies.get('token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '')

  // 🚫 إذا لم يكن هناك توكن والمستخدم يحاول دخول صفحة محمية
  if (!token && !isPublicPath) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(loginUrl)
  }

  // ✅ إذا كان هناك توكن والمستخدم يحاول دخول صفحة تسجيل الدخول
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // ✅ السماح بمواصلة الطلب
  return NextResponse.next()
}

// تحديد المسارات التي يعمل عليها الـ middleware
export const config = {
  matcher: [
    /*
     * استثناء الملفات الثابتة وAPI
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
}