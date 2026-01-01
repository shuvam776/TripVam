from pydantic import BaseModel

class ExploreRequest(BaseModel):
    text: str
