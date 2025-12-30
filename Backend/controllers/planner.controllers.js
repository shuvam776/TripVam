export const explorePlanner = async (req, res) => {
  try {
    console.log("BODY:", req.body)

    const { text } = req.body || {}

    if (!text) {
      return res.status(400).json({
        error: "text is required",
      })
    }

    return res.status(200).json({
      success: true,
      roadmap: [
        "Analyze how the user feels",
        "Identify suitable destinations",
        "Create a calm travel roadmap",
      ],
      input: text,
    })
  } catch (err) {
    console.error("EXPLORE ERROR:", err)
    return res.status(500).json({ error: "Planner crashed" })
  }
}
