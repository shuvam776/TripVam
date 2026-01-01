import { useState } from "react"
import api from "@/services/api"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Loader2, Volume2, Pause, Play, Square } from "lucide-react"
import * as tts from "@/utils/browserTts"

type AIResponse = {
  title: string
  description: string
  places?: string[]
}

export default function Explore() {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AIResponse | null>(null)

  // TTS state
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // ---------------- HANDLERS ----------------

  const handleExplore = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setResult(null)

    // reset voice
    tts.stop()
    setIsSpeaking(false)
    setIsPaused(false)

    try {
      const res = await api.post("/planner/explore", {
        text: prompt,
      })

      setResult(res.data)

      // auto-speak result
      tts.speak(res.data.description, {
        onStart: () => {
          setIsSpeaking(true)
          setIsPaused(false)
        },
        onEnd: () => {
          setIsSpeaking(false)
          setIsPaused(false)
        },
      })
    } catch (err) {
      console.error("Explore AI failed", err)
    } finally {
      setLoading(false)
    }
  }

  const handlePause = () => {
    tts.pause()
    setIsPaused(true)
  }

  const handleResume = () => {
    tts.resume()
    setIsPaused(false)
  }

  const handleStop = () => {
    tts.stop()
    setIsSpeaking(false)
    setIsPaused(false)
  }

  // ---------------- UI ----------------

  return (
    <section className="min-h-screen bg-black text-white pt-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-2">
          Explore with <span className="text-orange-500">AI</span>
        </h1>
        <p className="text-zinc-400 mb-8">
          Describe your travel mood, budget, season, or pace. The AI understands
          intent — not keywords.
        </p>

        {/* INPUT CARD */}
        <Card className="bg-zinc-900 border border-zinc-800 p-6">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: I want a calm mountain trip in March under ₹25k"
            className="bg-black border-zinc-700 text-white resize-none min-h-[120px]"
          />

          <div className="flex justify-end mt-4">
            <Button
              onClick={handleExplore}
              disabled={loading}
              className="bg-orange-500 text-black hover:bg-orange-400 px-6"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Exploring
                </>
              ) : (
                "Explore"
              )}
            </Button>
          </div>
        </Card>

        {/* RESULT */}
        {result && (
          <Card className="mt-10 bg-zinc-900 border border-zinc-800 p-6">
            <h2 className="text-2xl font-semibold mb-3">
              {result.title}
            </h2>

            <p className="text-zinc-300 leading-relaxed">
              {result.description}
            </p>

            {/* AUDIO CONTROLS */}
            <div className="mt-6 flex items-center gap-3 bg-zinc-800/60 rounded-lg px-4 py-3">
              <span className="text-sm text-zinc-400 min-w-[80px]">
                {isSpeaking
                  ? isPaused
                    ? "Paused"
                    : "Speaking…"
                  : "Idle"}
              </span>

              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  tts.speak(result.description, {
                    onStart: () => setIsSpeaking(true),
                    onEnd: () => setIsSpeaking(false),
                  })
                }
              >
                <Volume2 size={18} />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={handlePause}
                disabled={!isSpeaking || isPaused}
              >
                <Pause size={18} />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={handleResume}
                disabled={!isPaused}
              >
                <Play size={18} />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={handleStop}
                disabled={!isSpeaking}
              >
                <Square size={18} />
              </Button>
            </div>

            {/* PLACES / ROADMAP */}
            {result.places && (
              <ul className="mt-6 space-y-2">
                {result.places.map((place, i) => (
                  <li
                    key={i}
                    className="text-zinc-400 list-disc list-inside"
                  >
                    {place}
                  </li>
                ))}
              </ul>
            )}
          </Card>
        )}
      </div>
    </section>
  )
}
