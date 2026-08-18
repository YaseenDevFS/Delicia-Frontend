// src/middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const path = request.nextUrl.pathname
  
  // الصفحات العامة (مسموح بدون تسجيل دخول)
  const publicPaths = ['/login', '/register']
  const isPublicPath = publicPaths.includes(path)

  // ✅ التحقق من التوكن من cookies فقط (أسهل)
  const token = request.cookies.get('token')?.value

  // ✅ إذا كان هناك توكن والمستخدم في صفحة login → يوجه إلى home
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // ✅ إذا لم يكن هناك توكن والمستخدم في صفحة محمية → يوجه إلى login
  if (!token && !isPublicPath) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(loginUrl)
  }

  // ✅ السماح بمواصلة الطلب
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|api|_next).*)',
  ],
}