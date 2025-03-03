from fastapi import APIRouter
from db.models import CodeSnippet
from db.db import Database
from dotenv import load_dotenv
import os

env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env')
load_dotenv(dotenv_path=env_path)

URI = os.environ.get("MONGO_URI")
DB_NAME = os.environ.get("MONGO_DB_NAME")
COLLECTION_NAME = os.environ.get("MONGO_COLLECTION_NAME")

router = APIRouter()
database = Database(uri=URI, db_name=DB_NAME, collection_name=COLLECTION_NAME)

@router.post('/logs', status_code=200)
def log_data(data: CodeSnippet):
    database.send_code_snippet(data.userId, data.language, data.code)
    return [{"response": "Storing some data", "data": data, "created": data.createdAt}]

@router.get('/logs', status_code=200)
def read_logs():
    return [{"_id": "complexObject_FF294F", "timestamp": "2025-02-19 10:32:00 AM", "accepted": "false"}]
