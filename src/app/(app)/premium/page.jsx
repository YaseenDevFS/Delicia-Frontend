export default function PremiumPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#111214] px-6 py-12 text-white">
      <div className="w-full max-w-xl rounded-2xl border border-[#d89b2b]/30 bg-[#18191b] p-8 text-center shadow-2xl shadow-[#d89b2b]/10">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#d89b2b]">Delicia Premium</p>
        <h1 className="mt-4 font-serif text-4xl text-white">Upgrade Your Experience</h1>
        <p className="mt-4 text-gray-300">
          Unlock exclusive menus, priority reservations, and premium dining perks.
        </p>
        <div className="mt-8 rounded-xl border border-[#d89b2b]/20 bg-[#141516] p-5 text-left">
          <p className="text-sm text-gray-400">Premium includes</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-200">
            <li>• Priority table booking</li>
            <li>• Members-only offers</li>
            <li>• Early access to special events</li>
          </ul>
        </div>
        <button className="mt-8 rounded-lg bg-[#d89b2b] px-6 py-3 font-medium text-black transition hover:bg-[#e0a12f]">
          Get Premium
        </button>
      </div>
    </main>
  );
}
