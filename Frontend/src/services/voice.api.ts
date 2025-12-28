import api from "./api"

export const ttsApi = (text: string) =>
  api.post("/voice", { text })
