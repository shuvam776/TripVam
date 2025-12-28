import Navbar from "@/components/Layout/Navbar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ttsApi } from "@/services/voice.api"
import { useState } from "react"

export default function Voice() {
  const [text, setText] = useState("")

  const speak = async () => {
    const res = await ttsApi(text)
    new Audio(res.data.audioUrl).play()
  }

  return (
    <>
      <Navbar />
      <div className="pt-24 px-6 min-h-screen bg-black text-2xl text-white">
        <div className="max-w-2xl mx-auto space-y-4">
          <Textarea
            rows={6}
            placeholder="Enter text to speak"
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            onClick={speak}
            className="bg-orange-500 text-black"
          >
            Speak
          </Button>
        </div>
      </div>
    </>
  )
}
