import axios from "axios"

export const explorePlanner = async (req, res) => {
  try {
    const { text } = req.body
    if (!text) {
      return res.status(400).json({ error: "text is required" })
    }

    const aiRes = await axios.post(
      `${process.env.AI_SERVICE_URL}/ai/plan`,
      { text }
    )

    const { intent, roadmap } = aiRes.data

    const description =
      intent === "relax"
        ? "You’re looking for a peaceful and slow-paced journey. This plan focuses on comfort, calm locations, and minimal rush."
        : "You’re in the mood for an energetic and adventure-filled trip. This plan emphasizes activities, exploration, and excitement."

    return res.status(200).json({
      title: `Travel Plan – ${intent.toUpperCase()}`,
      description,
      places: roadmap,
    })
  } catch (err) {
    console.error("EXPLORE ERROR:", err.message)
    return res.status(500).json({ error: "Planner crashed" })
  }
}
