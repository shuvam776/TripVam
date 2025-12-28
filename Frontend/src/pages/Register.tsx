import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { registerApi } from "@/services/auth.api"
import { useState } from "react"

export default function Register() {
  const { login } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submit = async () => {
    const res = await registerApi({ name, email, password })
    login(res.data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-2xl text-white">
      <Card className="w-[380px] bg-zinc-900/70 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-100">
            Create account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full bg-orange-500 text-black">
            Register
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
