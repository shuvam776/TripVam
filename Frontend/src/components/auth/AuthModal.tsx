import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"

type Props = {
  open: boolean
  onClose: () => void
}

export default function AuthModal({ open, onClose }: Props) {
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleEmailLogin = async () => {
    setLoading(true)
    try {
      await login({
        type: "email",
        email,
        password,
      })
      onClose()
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const token = await result.user.getIdToken()

      await login({
        type: "google",
        token,
      })

      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white border border-zinc-800">
        <h2 className="text-xl font-semibold">Welcome to TripVam</h2>

        <div className="mt-4 space-y-3">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            onClick={handleEmailLogin}
            disabled={loading}
            className="w-full bg-orange-500 text-black"
          >
            Continue
          </Button>

          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            disabled={loading}
            className="w-full"
          >
            Continue with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
