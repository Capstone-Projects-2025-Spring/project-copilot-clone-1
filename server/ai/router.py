from fastapi import APIRouter

router = APIRouter()

@router.get('/suggest', status_code=200)
async def get_suggestion():
    return {"Response": "Here's some code..."}
