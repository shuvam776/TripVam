import { textToSpeech } from "../services/ai.service.js"

export const speakController = async (req, res) => {
  try {
    const { text } = req.body
    if (!text || typeof text !== "string") {
      return res.status(400).json({
        message: "text is required",
      })
    }

    await textToSpeech(text)

    res.json({
      success: true,
    })
  } catch (err) {
    console.error("VOICE ERROR:", err)

    res.status(500).json({
      message: "Voice service failed",
    })
  }
}
