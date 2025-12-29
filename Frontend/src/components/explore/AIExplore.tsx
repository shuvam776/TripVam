import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import api from "@/services/api"

export default function AIExplore() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const search = async () => {
    if (!query) return
    setLoading(true)

    const res = await api.get(`/search?q=${query}`)
    setResults(res.data.results || [])

    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        AI-powered exploration
      </h2>

      <div className="flex gap-3">
        <Input
          placeholder="e.g. calm places in Kerala"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          onClick={search}
          className="bg-orange-500 text-black"
        >
          Explore
        </Button>
      </div>

      {loading && (
        <p className="text-zinc-400">Thinking…</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {results.map((r, i) => (
          <div
            key={i}
            className="border border-zinc-800 bg-zinc-900 p-4 rounded-lg"
          >
            <p className="font-medium">
              {r.title || "Destination"}
            </p>
            <p className="text-sm text-zinc-400 mt-1">
              {r.description || "AI-curated insight"}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
