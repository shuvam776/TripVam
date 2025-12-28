import { semanticSearch } from "../services/ai.service.js"

export const search = async (req, res) => {
  try {
    const result = await semanticSearch(req.body.query)
    res.json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
