from fastapi import APIRouter
from pydantic import BaseModel
from app.services.planner import generate_plan

router = APIRouter()

class PlanRequest(BaseModel):
    text: str

@router.post("/plan")
def plan(req: PlanRequest):
    return generate_plan(req.text)
