import Navbar from "@/components/Layout/Navbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { semanticSearchApi } from "@/services/search.api"
import { ttsApi } from "@/services/voice.api"
import { useState } from "react"

export default function Search() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<string>("")

  const search = async () => {
    const res = await semanticSearchApi(query)
    setResult(res.data.text || JSON.stringify(res.data))
  }

  const speak = async () => {
    const res = await ttsApi(result)
    new Audio(res.data.audioUrl).play()
  }

  return (
    <>
      <Navbar />
      <div className="pt-24 px-6 min-h-screen bg-black text-2xl text-white">
        <div className="max-w-3xl mx-auto space-y-6">
          <Input
            placeholder="Ask about destinations, seasons, culture..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={search}
            className="bg-orange-500 text-black"
          >
            Search
          </Button>

          {result && (
            <Card className="bg-zinc-900/70 border-zinc-800 p-6 text-zinc-300">
              {result}
              <Button
                onClick={speak}
                className="mt-4 bg-orange-500 text-black"
              >
                🔊 Listen
              </Button>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}
