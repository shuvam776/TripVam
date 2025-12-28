import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { LogOut, User, Settings } from "lucide-react"

export default function ProfileMenu() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U"

  return (
    <div className="relative">
      {/* Avatar */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-9 h-9 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center text-sm font-semibold text-white hover:border-orange-500 transition"
      >
        {initial}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-800">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-zinc-400 truncate">
              {user?.email}
            </p>
          </div>

          <button
            onClick={() => {
              navigate("/profile")
              setOpen(false)
            }}
            className="flex items-center gap-2 px-4 py-3 hover:bg-zinc-800 w-full text-left"
          >
            <User size={16} /> Profile
          </button>

          <button
            onClick={() => {
              navigate("/settings")
              setOpen(false)
            }}
            className="flex items-center gap-2 px-4 py-3 hover:bg-zinc-800 w-full text-left"
          >
            <Settings size={16} /> Settings
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-zinc-800 w-full text-left"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  )
}
