import { callPlannerAI } from "../services/ai.service.js"

export const planner = async (req, res) => {
  try {
    const result = await callPlannerAI({
      ...req.body,
      userId: req.user.id, // useful later
    })

    res.json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
