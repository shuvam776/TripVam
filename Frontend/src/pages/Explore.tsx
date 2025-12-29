import { useState } from "react"
import api from "@/services/api"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Loader2, Volume2 } from "lucide-react"

type AIResponse = {
  title: string
  description: string
  places?: string[]
}

export default function Explore() {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AIResponse | null>(null)
  const [speaking, setSpeaking] = useState(false)

  const handleExplore = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setResult(null)

    try {
      const res = await api.post(
        "/planner/explore",
        { prompt },
        { withCredentials: true }
      )

      setResult(res.data)
    } catch (err) {
      console.error("Explore AI failed", err)
    } finally {
      setLoading(false)
    }
  }

  const speak = async () => {
    if (!result?.description) return
    setSpeaking(true)

    try {
      await api.post(
        "/tts/speak",
        { text: result.description },
        { withCredentials: true }
      )
    } catch (err) {
      console.error("TTS failed", err)
    } finally {
      setSpeaking(false)
    }
  }

  return (
    <section className="min-h-screen bg-black text-white pt-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-2">
          Explore with <span className="text-orange-500">AI</span>
        </h1>
        <p className="text-zinc-400 mb-8">
          Describe how you want to travel. Mood, budget, season, pace — TripVam
          understands intent, not keywords.
        </p>

        {/* INPUT */}
        <Card className="bg-zinc-900 border border-zinc-800 p-6">
          <Textarea
            placeholder="Example: I want a calm mountain place in March, not crowded, budget under ₹25k..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-black border-zinc-700 text-white resize-none min-h-[120px]"
          />

          <div className="flex justify-end mt-4">
            <Button
              onClick={handleExplore}
              disabled={loading}
              className="bg-orange-500 text-black px-6"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
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
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  {result.title}
                </h2>
                <p className="text-zinc-300 leading-relaxed">
                  {result.description}
                </p>
              </div>

              <Button
                variant="ghost"
                onClick={speak}
                disabled={speaking}
                className="text-orange-400 hover:text-orange-500"
              >
                <Volume2 />
              </Button>
            </div>

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
