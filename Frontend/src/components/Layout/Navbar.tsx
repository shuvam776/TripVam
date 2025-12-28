import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import NavLink from "./NavLink"
import { useAuth } from "@/hooks/useAuth"
import AuthModal from "@/components/auth/AuthModal"
import ProfileMenu from "./ProfileMenu"

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null)
  const lastScroll = useRef(0)
  const [authOpen, setAuthOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const show = () =>
      gsap.to(nav, { y: 0, duration: 0.35, ease: "power3.out" })

    const hide = () =>
      gsap.to(nav, { y: -80, duration: 0.35, ease: "power3.out" })

    const onScroll = () => {
      const current = window.scrollY
      if (current < 50) show()
      else if (current > lastScroll.current) hide()
      else show()
      lastScroll.current = current
    }

    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < 40) show()
    }

    window.addEventListener("scroll", onScroll)
    window.addEventListener("mousemove", onMouseMove)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  const goProtected = (path: string) => {
    if (!user) setAuthOpen(true)
    else navigate(path)
    setMobileOpen(false)
  }

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur border-b border-zinc-800"
      >
        <div className="max-w-7xl mx-auto h-16 px-6 flex justify-between items-center text-white">
          {/* Logo */}
          <span
            className="font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Trip<span className="text-orange-500">Vam</span>
          </span>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            <NavLink to="/" label="Home" />
            <button onClick={() => goProtected("/planner")}>
              <NavLink to="/planner" label="AI Planner" />
            </button>
            <button onClick={() => goProtected("/community")}>
              <NavLink to="/community" label="Community" />
            </button>
            <button onClick={() => goProtected("/voice")}>
              <NavLink to="/voice" label="Voice" />
            </button>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            {user ? (
              <ProfileMenu />
            ) : (
              <Button
                onClick={() => setAuthOpen(true)}
                className="bg-orange-500 text-black hidden md:block"
              >
                Get Started
              </Button>
            )}

            {/* Mobile Toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Sheet */}
        {mobileOpen && (
          <div className="md:hidden bg-black border-t border-zinc-800 px-6 py-6 space-y-4">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => goProtected("/planner")}>AI Planner</button>
            <button onClick={() => goProtected("/community")}>Community</button>
            <button onClick={() => goProtected("/voice")}>Voice</button>

            {!user && (
              <Button
                onClick={() => {
                  setAuthOpen(true)
                  setMobileOpen(false)
                }}
                className="bg-orange-500 text-black w-full mt-4"
              >
                Get Started
              </Button>
            )}
          </div>
        )}
      </header>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
