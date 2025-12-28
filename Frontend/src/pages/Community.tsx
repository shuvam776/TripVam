import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { Map, Users, Mic } from "lucide-react"

const rooms = [
  {
    place: "Japan",
    people: 128,
    tag: "Culture • Food • Cities",
  },
  {
    place: "Bali",
    people: 94,
    tag: "Beaches • Nature • Remote",
  },
  {
    place: "Paris",
    people: 76,
    tag: "Art • Romance • History",
  },
  {
    place: "Iceland",
    people: 51,
    tag: "Adventure • Nature",
  },
]

export default function Community() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      ".room-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      }
    )
  }, [])

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-black pt-28 px-6 text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Travel Community
          </h1>
          <p className="text-zinc-400 mt-3 max-w-3xl">
            Join destination-based rooms. Talk to travelers who’ve been
            there or are planning the same journey.
          </p>
        </div>

        {/* Rooms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card
              key={room.place}
              className="room-card group bg-zinc-900/60 border border-zinc-800 p-6 backdrop-blur transition-transform duration-300 hover:-translate-y-1 hover:border-orange-500/40"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {room.place}
                  </h2>
                  <p className="text-sm text-zinc-400 mt-1">
                    {room.tag}
                  </p>
                </div>
                <Map className="text-orange-500" />
              </div>

              <div className="mt-6 flex items-center gap-3 text-zinc-400">
                <Users size={18} />
                <span>{room.people} travelers</span>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-zinc-700 text-white hover:border-orange-500"
                >
                  Visiting
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-zinc-700 text-white hover:border-orange-500"
                >
                  Been There
                </Button>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
                <Mic size={14} />
                Voice rooms coming soon
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
