import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { generatePlanApi } from "@/services/planner.api"
import { Loader2, MapPin, Calendar, Wallet } from "lucide-react"

export default function Planner() {
  const [destination, setDestination] = useState("")
  const [days, setDays] = useState(3)
  const [budget, setBudget] = useState("")
  const [preferences, setPreferences] = useState("")
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<string | null>(null)

  const generate = async () => {
    if (!destination) return
    setLoading(true)
    setPlan(null)

    try {
      const res = await generatePlanApi({
        destination,
        days,
        budget,
        preferences,
      })

      const output =
        typeof res.data.plan === "string"
          ? res.data.plan
          : JSON.stringify(res.data.plan, null, 2)

      setPlan(output)
    } catch {
      setPlan("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-black pt-28 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold">
            AI Trip Planner
          </h1>
          <p className="text-zinc-400 mt-2 max-w-2xl">
            Tell us where you want to go. We’ll handle the thinking.
          </p>
        </div>

        {/* Input Card */}
        <Card className="bg-zinc-900/60 border border-zinc-800 p-6 md:p-8 backdrop-blur">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Destination */}
            <div>
              <label className="text-sm text-zinc-400 flex items-center gap-2 mb-2">
                <MapPin size={16} /> Destination
              </label>
              <Input
                placeholder="Japan, Paris, Bali..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            {/* Days */}
            <div>
              <label className="text-sm text-zinc-400 flex items-center gap-2 mb-2">
                <Calendar size={16} /> Number of days
              </label>
              <Input
                type="number"
                min={1}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
              />
            </div>

            {/* Budget */}
            <div>
              <label className="text-sm text-zinc-400 flex items-center gap-2 mb-2">
                <Wallet size={16} /> Budget (optional)
              </label>
              <Input
                placeholder="Low / Medium / Luxury"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            {/* Preferences */}
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Preferences
              </label>
              <Textarea
                placeholder="Food, culture, adventure, nightlife..."
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={generate}
              disabled={loading}
              className="bg-orange-500 text-black hover:bg-orange-400 px-6"
            >
              {loading && (
                <Loader2 className="animate-spin mr-2" size={18} />
              )}
              Generate Plan
            </Button>
          </div>
        </Card>

        {/* Result */}
        {plan && (
          <Card className="mt-10 bg-zinc-900 border border-zinc-800 p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Your Personalized Itinerary
            </h2>

            <div className="whitespace-pre-wrap text-zinc-200 leading-relaxed">
              {plan}
            </div>
          </Card>
        )}
      </div>
    </section>
  )
}
