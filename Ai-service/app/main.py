from fastapi import FastAPI
from app.routes.plan import router as plan_router

app = FastAPI()

app.include_router(plan_router, prefix="/ai")

@app.get("/health")
def health():
    return {"status": "ok"}
