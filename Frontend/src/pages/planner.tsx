import { useState } from "react"
import { getPlan } from "../services/planner.api"

export default function Planner() {
  const [result, setResult] = useState<any>(null)

  const submit = async () => {
    const res = await getPlan({
      budget: "medium",
      days: 5,
      season: "spring",
      style: "culture",
    })
    setResult(res.data)
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <button
        onClick={submit}
        className="bg-orange-500 text-black px-6 py-2 rounded"
      >
        Get Plan
      </button>

      {result && (
        <div className="mt-6 border border-orange-500/20 p-4 rounded">
          <h2 className="text-xl text-orange-500">
            {result.destination}
          </h2>
          <p>{result.reason}</p>
          <p className="text-sm text-gray-400">
            Best time: {result.best_time}
          </p>
        </div>
      )}
    </div>
  )
}
