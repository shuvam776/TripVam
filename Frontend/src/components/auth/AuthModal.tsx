import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signInWithPopup } from "firebase/auth"

import { auth, googleProvider } from "@/lib/firebase"
import axios from "@/lib/axios"
import { useAuth } from "@/hooks/useAuth"

type Props = {
  open: boolean
  onClose: () => void
}

export default function AuthModal({ open, onClose }: Props) {
  const { setUser } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // ---------- EMAIL LOGIN ----------
  const handleEmailLogin = async () => {
    setLoading(true)
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      })

      // assume backend returns basic user info
      setUser({
        email: res.data?.email ?? email,
        name: res.data?.name,
      })

      onClose()
    } catch (err) {
      console.error("Email login failed", err)
      alert("Login failed")
    } finally {
      setLoading(false)
    }
  }

  // ---------- GOOGLE LOGIN ----------
  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      // 1. Firebase popup
      const result = await signInWithPopup(auth, googleProvider)

      // 2. Firebase ID token
      const idToken = await result.user.getIdToken()

      // 3. Send token to backend
      await axios.post("/auth/google", {
        token: idToken,
      })

      // 4. Set user locally (NO /me)
      setUser({
        email: result.user.email ?? undefined,
        name: result.user.displayName ?? undefined,
      })

      onClose()
    } catch (err) {
      console.error("Google login failed", err)
      alert("Google login failed")
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
