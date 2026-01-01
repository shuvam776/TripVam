let utterance: SpeechSynthesisUtterance | null = null

export const speak = (
  text: string,
  callbacks?: {
    onStart?: () => void
    onEnd?: () => void
    onPause?: () => void
    onResume?: () => void
  }
) => {
  stop()

  utterance = new SpeechSynthesisUtterance(text)
  utterance.onstart = callbacks?.onStart || null
  utterance.onend = callbacks?.onEnd || null

  speechSynthesis.speak(utterance)
}

export const pause = () => speechSynthesis.pause()
export const resume = () => speechSynthesis.resume()

export const stop = () => {
  if (speechSynthesis.speaking) speechSynthesis.cancel()
}
