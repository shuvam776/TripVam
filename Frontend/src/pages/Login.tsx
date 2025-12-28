import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { loginApi } from "@/services/auth.api"
import { useState } from "react"

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submit = async () => {
    const res = await loginApi({ email, password })
    login(res.data)
  }

  return (
    <div className="min-h-screen text-white text-2xl flex items-center justify-center bg-black">
      <Card className="w-[380px] bg-zinc-900/70 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-100">
            Welcome back
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
          required={true}
          
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
          required={true}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={submit}
            className="w-full bg-orange-500 text-black"
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
