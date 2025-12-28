import api from "./api"

export const getPlan = (payload: {
  budget: string
  days: number
  season: string
  style: string
}) => api.post("/planner", payload)
