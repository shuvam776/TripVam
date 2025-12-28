import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import AuthModal from "@/components/auth/AuthModal"
import { useState } from "react"

export default function Navbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto h-16 px-6 flex justify-between items-center">
          <span className="font-bold text-white">
            Trip<span className="text-orange-500">Vam</span>
          </span>

          <nav className="flex gap-6 text-white">
            <button onClick={() => !user && setOpen(true)}>AI Planner</button>
            <button onClick={() => !user && setOpen(true)}>Voice</button>
          </nav>

          {user ? (
            <Button onClick={logout} className="bg-orange-500 text-black">
              Logout
            </Button>
          ) : (
            <Button onClick={() => setOpen(true)} className="bg-orange-500 text-black">
              Get Started
            </Button>
          )}
        </div>
      </header>

      <AuthModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
