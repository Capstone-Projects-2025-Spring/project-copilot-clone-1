from fastapi import APIRouter
from openai.types import Completion

router = APIRouter()

@router.get('/suggest', status_code=200, response_model=Completion)
async def get_suggestion() -> dict:
    return {"Response": "Here's some code..."}