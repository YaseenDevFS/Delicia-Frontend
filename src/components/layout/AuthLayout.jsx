import Image from 'next/image'
import { Sandwich, UtensilsCrossed } from 'lucide-react'

export default function AuthLayout({ children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0F0F0F] p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-2xl border border-[#1d1d1da2] bg-[#0F0F0F] shadow-2xl shadow-black/40 lg:max-h-155 lg:grid-cols-[1.1fr_0.9fr]">
        <section
          className="relative hidden items-center justify-center overflow-hidden p-8 sm:p-10 text-white lg:flex"
          style={{
            backgroundImage: "url('/login.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-[#d89b2b]/10" />
          <div className="absolute inset-0 bg-black/70" />

          <div className="relative max-w-md">
            <Image src={'/logo.png'} className="absolute -left-8 sm:-left-10 -top-32 sm:-top-40" width={120} sm:width={150} height={120} sm:height={150} alt="Delicia logo" />
            <div className="flex flex-col items-center">
              <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl lg:text-5xl font-semibold">
                Welcome to <span className="text-[#d89b2b]">Delicia</span>
              </h1>
              <p className="text-center text-base sm:text-lg lg:text-xl leading-6 sm:leading-7 text-gray-200">
                Delicious food delivered to your doorstep. With love from us.
              </p>

              <div className="mt-6 sm:mt-8 flex w-full items-center gap-3 sm:gap-4">
                <span className="h-0.5 flex-1 bg-linear-to-l from-[#d89b2b] to-transparent" />
                <UtensilsCrossed size={20} sm:size={24} className="shrink-0 text-[#d89b2b]" />
                <span className="h-0.5 flex-1 bg-linear-to-r from-[#d89b2b] to-transparent" />
              </div>

              <div className="mt-6 sm:mt-7 flex items-center justify-center gap-3 sm:gap-5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                      <Sandwich className="text-[#d89b2b]" size={24} sm:size={30} />
                    </div>
                    <h2 className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-orange-100">Delicious Food</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center bg-[#111214] p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="w-full max-w-md">{children}</div>
        </section>
      </div>
    </main>
  )
}