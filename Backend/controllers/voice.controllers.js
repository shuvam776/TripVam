import { textToSpeech } from "../services/ai.service.js"

export const voice = async (req, res) => {
  try {
    const audio = await textToSpeech(req.body.text)
    res.json(audio)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
