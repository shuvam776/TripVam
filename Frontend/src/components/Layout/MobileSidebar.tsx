import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

type FeatureKey = "explore" | "voice" | "community"

type Props = {
  open: boolean
  onClose: () => void
  onFeatureClick: (feature: FeatureKey) => void
}

export default function MobileSidebar({
  open,
  onClose,
  onFeatureClick,
}: Props) {
  const navigate = useNavigate()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* SIDEBAR */}
      <aside className="absolute right-0 top-0 h-full w-72 bg-zinc-900 border-l border-zinc-800 p-6 text-white">
        <div className="flex justify-between items-center mb-8">
          <span className="font-bold text-lg">
            Trip<span className="text-orange-500">Vam</span>
          </span>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <nav className="space-y-4">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              navigate("/")
              onClose()
            }}
          >
            Home
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onFeatureClick("explore")}
          >
            Explore with AI
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onFeatureClick("voice")}
          >
            Voice Assistant
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => onFeatureClick("community")}
          >
            Community
          </Button>
        </nav>
      </aside>
    </div>
  )
}
