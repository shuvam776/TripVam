from app.models.embeddings import get_model
import numpy as np

INTENTS = {
    "relax": [
        "Choose calm destinations",
        "Prefer beaches or hills",
        "Avoid packed schedules",
    ],
    "adventure": [
        "Pick adventure locations",
        "Include trekking or activities",
        "Plan early mornings",
    ],
    "high" : [
        "Choose a thing to get highest in the room",
        "Include your gf if you have one",
        "Take methanphetamine from Heisenberg"
    
    ]
}

INTENT_TEXTS = list(INTENTS.keys())

def generate_plan(user_text: str):
    model = get_model()

    user_emb = model.encode(user_text)
    intent_embs = model.encode(INTENT_TEXTS)

    scores = np.dot(intent_embs, user_emb)
    best_intent = INTENT_TEXTS[int(scores.argmax())]

    return {
        "intent": best_intent,
        "roadmap": INTENTS[best_intent],
    }
