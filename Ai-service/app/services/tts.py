import pyttsx3

def speak(text: str):
    try:
        engine = pyttsx3.init()
        engine.say(text)
        engine.runAndWait()
        engine.stop()
    except Exception as e:
        print("TTS ERROR:", e)
        # swallow error so API doesn't crash
