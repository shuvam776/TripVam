import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import api from "@/services/api"

type User = {
  id: string
  name: string
  email: string
}

type LoginPayload =
  | { type: "email"; email: string; password: string }
  | { type: "google"; token: string }

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (payload: LoginPayload) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  /* LOAD USER FROM COOKIE */
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/me", {
          withCredentials: true,
        })
        setUser(res.data.user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchMe()
  }, [])

  /* LOGIN HANDLER */
  const login = async (payload: LoginPayload) => {
    if (payload.type === "email") {
      const res = await api.post(
        "/auth/login",
        {
          email: payload.email,
          password: payload.password,
        },
        { withCredentials: true }
      )
      setUser(res.data.user)
    }

    if (payload.type === "google") {
      const res = await api.post(
        "/auth/google",
        { token: payload.token },
        { withCredentials: true }
      )
      setUser(res.data.user)
    }
  }

  /* LOGOUT */
  const logout = async () => {
    await api.post("/auth/logout", {}, { withCredentials: true })
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return ctx
}
