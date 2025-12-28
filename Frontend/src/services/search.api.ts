import api from "./api"

export const semanticSearchApi = (query: string) =>
  api.post("/search", { query })
