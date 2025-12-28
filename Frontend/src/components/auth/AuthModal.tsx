import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { loginApi, registerApi, googleLoginApi } from "@/services/auth.api"
import { auth, googleProvider } from "@/lib/firebase"
import { signInWithPopup } from "firebase/auth"
import { useState } from "react"

export default function AuthModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleLogin = async () => {
    const res = await loginApi({ email, password })
    login(res.data)
    onClose()
  }

  const handleRegister = async () => {
    const res = await registerApi({ name, email, password })
    login(res.data)
    onClose()
  }

  const handleGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider)
    const token = await result.user.getIdToken()

    const res = await googleLoginApi(token)
    login(res.data)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle>Get Started</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <Input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <Input
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button className="w-full bg-orange-500 text-black" onClick={handleLogin}>
              Login
            </Button>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <Input placeholder="Name" onChange={e => setName(e.target.value)} />
            <Input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <Input
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              className="w-full bg-orange-500 text-black"
              onClick={handleRegister}
            >
              Register
            </Button>
          </TabsContent>
        </Tabs>

        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={handleGoogle}
        >
          Continue with Google
        </Button>
      </DialogContent>
    </Dialog>
  )
}
