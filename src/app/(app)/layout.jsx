import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <main className="min-h-screen bg-[#0F0F0F] p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 lg:gap-6">
            <Sidebar />
            <div className="space-y-4 lg:space-y-6">
              <Navbar />
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}