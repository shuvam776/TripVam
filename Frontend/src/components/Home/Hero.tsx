import { BackgroundBeams } from "@/components/ui/background-beams"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-2xl text-white">
      <BackgroundBeams />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-3xl px-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-zinc-100 leading-tight">
          Plan smarter.
          <br />
          Travel deeper.
          <span className="text-orange-500"> TripVam</span>
        </h1>

        <p className="mt-6 text-zinc-400 text-lg">
          Semantic travel intelligence with voice assistance.
          No noise. Just insight.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/search"
            className="px-6 py-3 rounded-md bg-orange-500 text-black font-medium"
          >
            Explore with AI
          </a>

          <a
            href="/voice"
            className="px-6 py-3 rounded-md border border-zinc-700 text-zinc-200"
          >
            Use Voice
          </a>
        </div>
      </motion.div>
    </div>
  )
}
