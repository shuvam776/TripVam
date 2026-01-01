import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import * as tts from "@/utils/browserTts"

export default function Voice() {
  const [text, setText] = useState("")
  const [speaking, setSpeaking] = useState(false)
  const [paused, setPaused] = useState(false)

  const speak = () => {
    if (!text.trim()) return

    tts.speak(text, {
      onStart: () => {
        setSpeaking(true)
        setPaused(false)
      },
      onPause: () => setPaused(true),
      onResume: () => setPaused(false),
      onEnd: () => {
        setSpeaking(false)
        setPaused(false)
      },
    })
  }

  return (
    <section className="min-h-screen bg-black text-white pt-28 px-6 sm:w-screen">
      <div className="max-w-3xl mx-auto h-screen w- relative">
        <h1 className="text-3xl font-bold mb-6">Voice Assistant</h1>

        <Card className="bg-zinc-900 border border-zinc-800 p-6">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something to speak..."
            className="bg-black border-zinc-700 text-white min-h-30"
          />

          <div className="flex gap-3 mt-4 relative min-w-screen">
            <Button onClick={speak}>▶ Speak</Button>
            <Button onClick={tts.pause} disabled={!speaking || paused}>
              ⏸ Pause
            </Button>
            <Button onClick={tts.resume} disabled={!paused}>
              ⏵ Resume
            </Button>
            <Button onClick={tts.stop} disabled={!speaking}>
              ⏹ Stop
            </Button>
          </div>

          <p className="text-zinc-400 mt-3">
            Status:{" "}
            {speaking ? (paused ? "Paused" : "Speaking") : "Idle"}
          </p>
        </Card>
      </div>
    </section>
  )
}
