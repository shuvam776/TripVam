import fetch from "node-fetch"

export const generatePlan = async (req, res) => {
  try {
    const { destination, days, budget, preferences } = req.body

    if (!destination || !days) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const aiRes = await fetch(
      `${process.env.AI_SERVICE_URL}/semantic-search`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          Plan a ${days}-day trip to ${destination}.
          Budget: ${budget || "flexible"}
          Preferences: ${preferences || "general travel"}
          `,
        }),
      }
    )

    const aiData = await aiRes.json()

    res.json({
      destination,
      days,
      plan: aiData.results || aiData,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Planner failed" })
  }
}
