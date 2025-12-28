import axios from "axios"

export const generatePlan = async (req, res) => {
  try {
    const { prompt } = req.body

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" })
    }

    const response = await axios.post(
      `${process.env.AI_SERVICE_URL}/planner`,
      { prompt }
    )

    res.status(200).json(response.data)
  } catch (error) {
    console.error("Planner error:", error.message)
    res.status(500).json({ message: "Planner failed" })
  }
}
