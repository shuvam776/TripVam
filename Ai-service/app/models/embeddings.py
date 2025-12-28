from app.models.hf_loader import get_model

def generate_embedding(text: str) -> list[float]:
    model = get_model()
    embedding = model.encode(text, normalize_embeddings=True)
    return embedding.tolist()
