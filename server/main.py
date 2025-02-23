from fastapi import FastAPI

from ai.router import router as ai_router
from db.router import router as db_router

app = FastAPI(title='EduCode REST API', description='Educational AI Assistant', version='1.0')

app.include_router(ai_router)
app.include_router(db_router)
