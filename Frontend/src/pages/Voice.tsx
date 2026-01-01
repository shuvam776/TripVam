import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import {
  Volume2,
  Pause,
  Play,
  Square,
} from "lucide-react"
import * as tts from "@/utils/browserTts"

export default function Voice() {
  const [text, setText] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const handleSpeak = () => {
    if (!text.trim()) return

    tts.speak(text, {
      onStart: () => {
        setIsSpeaking(true)
        setIsPaused(false)
      },
      onPause: () => setIsPaused(true),
      onResume: () => setIsPaused(false),
      onEnd: () => {
        setIsSpeaking(false)
        setIsPaused(false)
      },
    })
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

  return (
    <section className="min-h-screen bg-black text-white pt-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-2">
          Voice <span className="text-orange-500">Assistant</span>
        </h1>
        <p className="text-zinc-400 mb-8">
          Paste or type text and let the browser read it out loud.
        </p>

        {/* INPUT */}
        <Card className="bg-zinc-900 border border-zinc-800 p-6">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste anything you want to hear…"
            className="bg-black border-zinc-700 text-white resize-none min-h-35"
          />

          {/* AUDIO BAR */}
          <div className="mt-5 flex flex-wrap items-center gap-3 bg-zinc-800/60 rounded-lg px-4 py-3">
            <span className="text-sm text-zinc-400 min-w-22.5">
              {isSpeaking
                ? isPaused
                  ? "Paused"
                  : "Speaking…"
                : "Idle"}
            </span>

            <Button size="icon" variant="ghost" onClick={handleSpeak}>
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
        </Card>
      </div>
    </section>
  )
}
