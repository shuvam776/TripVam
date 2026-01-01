from fastapi import APIRouter
from app.schemas.request import ExploreRequest
from app.services.planner import generate_plan

router = APIRouter(prefix="/v1")

@router.post("/explore")
def explore(req: ExploreRequest):
    return generate_plan(req.text)
