from app.models.embeddings import generate_embedding
from app.services.similarity import cosine_similarity

# --- INTENT LABELS (v1, curated) ---
INTENT_LABELS = {
    "low_energy_escape": 
        "mentally tired, exhausted, wants rest, no activities, slow pace",

    "cold_nature_retreat": 
        "cold weather, mountains, hill stations, nature, fresh air",

    "social_fun_trip": 
        "wants people, fun, nightlife, social energy, meeting others",

    "adventure_thrill": 
        "trekking, adventure sports, physical challenge, excitement",

    "spiritual_detox": 
        "meditation, temples, spiritual calm, inner peace",

    "beach_relax_warm": 
        "warm beach, sun, relaxed, ocean, slow life"
}


# Precompute embeddings ONCE
_LABEL_EMBEDDINGS = {
    label: generate_embedding(desc)
    for label, desc in INTENT_LABELS.items()
}


def detect_intents(user_text: str, top_k: int = 3):
    user_embedding = generate_embedding(user_text)

    scores = []
    for label, label_embedding in _LABEL_EMBEDDINGS.items():
        score = cosine_similarity(user_embedding, label_embedding)
        scores.append({
            "label": label,
            "score": round(score, 4)
        })

    scores.sort(key=lambda x: x["score"], reverse=True)
    return scores[:top_k]
