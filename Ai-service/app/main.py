from fastapi import FastAPI
from app.api.v1.routes import router

app = FastAPI(title="AI Semantic Service")

app.include_router(router)

@app.get("/")
def health():
    return {"status": "ok"}
