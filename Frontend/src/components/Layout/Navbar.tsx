import { useEffect, useRef, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import gsap from "gsap"
import {
  Menu,
  X,
  User,
  Settings,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useAuth } from "@/hooks/useAuth"
import AuthModal from "@/components/auth/AuthModal"
import FeatureExplainerModal from "@/components/models/FeatureExplainerModel"
import MobileSidebar from "./MobileSidebar"

type FeatureKey = "explore" | "voice" | "community"

const FEATURE_MAP: Record<
  FeatureKey,
  { title: string; description: string; path: string }
> = {
  explore: {
    title: "Explore with AI",
    description:
      "Discover destinations using intent-based AI. TripVam understands mood, budget, season and travel style — not just keywords.",
    path: "/explore",
  },
  voice: {
    title: "AI Voice Assistant",
    description:
      "Plan your trip hands-free by talking to TripVam’s AI voice assistant and getting spoken recommendations.",
    path: "/voice",
  },
  community: {
    title: "Traveler Community",
    description:
      "Connect with travelers who’ve visited or are planning to visit the same destinations. Real insights, real people.",
    path: "/community",
  },
}

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null)
  const lastScroll = useRef(0)

  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [authOpen, setAuthOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeFeature, setActiveFeature] =
    useState<FeatureKey | null>(null)

  /* NAVBAR HIDE / SHOW */
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const show = () =>
      gsap.to(nav, { y: 0, duration: 0.3 })
    const hide = () =>
      gsap.to(nav, { y: -80, duration: 0.3 })

    const onScroll = () => {
      const current = window.scrollY
      if (current < 60) show()
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

  /* FEATURE CLICK HANDLER */
  const handleFeatureClick = (feature: FeatureKey) => {
    setSidebarOpen(false)

    if (!user) {
      setActiveFeature(feature)
      return
    }

    navigate(FEATURE_MAP[feature].path)
  }

  return (
    <>
      {/* NAVBAR */}
      <header
        ref={navRef}
        className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur border-b border-zinc-800"
      >
        <div className="max-w-7xl mx-auto h-16 px-6 flex justify-between items-center text-white">
          {/* LOGO */}
          <span
            className="font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Trip<span className="text-orange-500">Vam</span>
          </span>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-8">
            <NavLink to="/">Home</NavLink>
            <button onClick={() => handleFeatureClick("explore")}>
              Explore AI
            </button>
            <button onClick={() => handleFeatureClick("voice")}>
              Voice
            </button>
            <button onClick={() => handleFeatureClick("community")}>
              Community
            </button>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {!user ? (
              <Button
                onClick={() => setAuthOpen(true)}
                className="bg-orange-500 text-black hidden md:block"
              >
                Get Started
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center">
                    <User size={18} />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="bg-zinc-900 border border-zinc-800 text-white"
                >
                  <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                    className="cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/settings")}
                    className="cursor-pointer"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={logout}
                    className="cursor-pointer text-red-400"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* MOBILE BURGER */}
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onFeatureClick={handleFeatureClick}
      />

      {/* FEATURE EXPLAINER MODAL */}
      {activeFeature && (
        <FeatureExplainerModal
          open
          onClose={() => setActiveFeature(null)}
          title={FEATURE_MAP[activeFeature].title}
          description={FEATURE_MAP[activeFeature].description}
          onContinue={() => {
            setActiveFeature(null)
            setAuthOpen(true)
          }}
        />
      )}

      {/* AUTH MODAL */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </>
  )
}
