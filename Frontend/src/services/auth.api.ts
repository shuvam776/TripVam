import api from "./api"

export const loginApi = (data: {
  email: string
  password: string
}) => {
  return api.post("/auth/login", data)
}

export const registerApi = (data: {
  name: string
  email: string
  password: string
}) => {
  return api.post("/auth/register", data)
}

export const googleLoginApi = (token: string) => {
  return api.post("/auth/register/google", { token })
}
