import api from "./api"

export const generatePlanApi = (data: {
  destination: string
  days: number
  budget?: string
  preferences?: string
}) => {
  return api.post("/planner", data)
}
