from fastapi import FastAPI

from ai.router import router as ai_router
from db.router import router as db_router

app = FastAPI()

app.include_router(ai_router)
app.include_router(db_router)
