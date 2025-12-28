from pydantic import BaseModel

class EmbedRequest(BaseModel):
    text: str

class SimilarityRequest(BaseModel):
    text_a: str
    text_b: str

class TTSRequest(BaseModel):
    text: str
