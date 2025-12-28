import { Card } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import PageTransition from "@/components/Layout/PageTransition"
export default function Profile() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <PageTransition>
      <section className="min-h-screen bg-black pt-28 px-6 text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Profile</h1>

          <Card className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center text-xl font-semibold">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-lg font-medium">{user.name}</p>
                <p className="text-sm text-zinc-400">{user.email}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-zinc-800/50 p-4 rounded-md">
                <p className="text-xs text-zinc-400">Account Type</p>
                <p className="text-sm mt-1">Standard User</p>
              </div>

              <div className="bg-zinc-800/50 p-4 rounded-md">
                <p className="text-xs text-zinc-400">Authentication</p>
                <p className="text-sm mt-1">
                  {user.email ? "Email & Password" : "Google"}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </PageTransition>
  )
}
