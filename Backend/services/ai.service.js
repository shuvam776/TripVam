import axios from "axios";

const AI_BASE_URL = `${process.env.AI_SERVICE_URL}/v1`;

// ---- semantic intent detection ----
export async function semanticIntent(text) {
  const res = await axios.post(`${AI_BASE_URL}/intent`, {
    text,
  });

  return res.data;
}

// ---- text to speech trigger ----


export async function textToSpeech(text) {
  console.log("Calling AI TTS with:", text)

  const res = await axios.post(`${AI_BASE_URL}/tts`, {
    text,
  })

  console.log("AI TTS response:", res.data)
  return res.data
}

