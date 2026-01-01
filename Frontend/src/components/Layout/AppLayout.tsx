import Navbar from "@/components/Layout/Navbar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Main content area */}
      <main className="pt-20 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
