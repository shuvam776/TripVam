import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Home() {
  const navigate = useNavigate()

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold mb-6">
          Travel planned by <span className="text-orange-500">AI</span>
        </h1>

        <p className="text-zinc-400 mb-10">
          Discover destinations based on mood, budget, season, and intent —
          not keywords.
        </p>

        {/* HERO CTA — UNPROTECTED */}
        <Button
          onClick={() => navigate("/explore")}
          className="
            bg-orange-500 text-black px-8 py-6 text-lg
            focus:outline-none focus:ring-0
            active:bg-orange-500
          "
        >
          Explore with AI
        </Button>
      </div>
    </section>
  )
}
