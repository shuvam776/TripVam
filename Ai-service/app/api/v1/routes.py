from fastapi import APIRouter
from app.schemas.request import EmbedRequest, TTSRequest
from app.services.inference import detect_intents
from app.services.tts import speak

router = APIRouter(prefix="/v1")

@router.post("/intent")
def intent_detection(req: EmbedRequest):
    return {
        "input": req.text,
        "intents": detect_intents(req.text)
    }

@router.post("/tts")
def text_to_speech(req: TTSRequest):
    try:
        speak(req.text)
        return {"success": True}
    except Exception as e:
        print("TTS ROUTE ERROR:", e)
        return {"success": False}
