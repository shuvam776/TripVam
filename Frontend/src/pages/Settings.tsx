import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import PageTransition from "@/components/Layout/PageTransition"

export default function Settings() {
  const [voiceEnabled, setVoiceEnabled] = useState(true)

  return (
    <PageTransition>
      <section className="min-h-screen bg-black pt-28 px-6 text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>

          <Card className="bg-zinc-900 border border-zinc-800 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">AI Voice Responses</p>
                <p className="text-sm text-zinc-400">
                  Enable spoken travel plans
                </p>
              </div>
              <Switch
                checked={voiceEnabled}
                onCheckedChange={setVoiceEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Visibility</p>
                <p className="text-sm text-zinc-400">
                  Hide email from community
                </p>
              </div>
              <Switch />
            </div>
          </Card>
        </div>
      </section>
    </PageTransition>
  )
}
