import { Button } from "@/components/ui/button"

export default function ExploreLanding({
  onGetStarted,
}: {
  onGetStarted: () => void
}) {
  return (
    <div className="text-center space-y-8">
      <h1 className="text-4xl font-bold">
        Explore travel with
        <span className="text-orange-500"> AI intelligence</span>
      </h1>

      <p className="text-zinc-400 max-w-2xl mx-auto">
        Discover destinations based on intent, mood,
        budget, and season — powered by TripVam AI.
      </p>

      <div className="grid md:grid-cols-3 gap-6 text-left">
        <Feature
          title="Semantic Search"
          desc="Search by intent, not keywords."
        />
        <Feature
          title="Smart Grouping"
          desc="Grouped by vibe and travel style."
        />
        <Feature
          title="AI Curation"
          desc="Results refined with intelligence."
        />
      </div>

      <Button
        onClick={onGetStarted}
        className="bg-orange-500 text-black px-8 py-6 text-lg"
      >
        Get Started with Google
      </Button>
    </div>
  )
}

function Feature({
  title,
  desc,
}: {
  title: string
  desc: string
}) {
  return (
    <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-900">
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-zinc-400 mt-1">
        {desc}
      </p>
    </div>
  )
}
