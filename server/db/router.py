from fastapi import APIRouter, HTTPException
from db.models import CodeSnippet, SuggestionLog, User, UserInputLog
from db.db import Database
from dotenv import load_dotenv
import os

env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env")
load_dotenv(dotenv_path=env_path)

URI = os.environ.get("MONGO_URI")
DB_NAME = os.environ.get("MONGO_DB_NAME")
COLLECTION_NAME = os.environ.get("MONGO_COLLECTION_NAME")

router = APIRouter()
database = Database(uri=URI, db_name=DB_NAME, collection_name=COLLECTION_NAME)


@router.post("/logs", status_code=200)
def log_data(data: CodeSnippet):
    """
    Write data to a collection in database
    """
    try:
        # add input verification here
        database.send_code_snippet(data.userId, data.language, data.code)
        return [{"response": "Storing some data", "data": data, "created": data.createdAt}]
    except Exception as e:
        raise HTTPException(status_code=500)


@router.get("/logs", status_code=200)
def read_logs():
    """
    Read from a collection in database
    """
    return [{"_id": "complexObject_FF294F", "timestamp": "2025-02-19 10:32:00 AM", "accepted": "false"}]

@router.post('/suggestion-logs', status_code=200)
def log_suggestion(data: SuggestionLog):
    """"""
    # Save the suggestion log to the database
    result = database.send_suggestion_log(
        user_id=data.userId,
        event_type=data.eventType,
        suggestion=data.suggestion,
        fileName=data.fileName,
        position=data.position,
        timestamp=data.timestamp
    )
    return {"response": "Suggestion log stored", "data": data, "inserted_id": str(result.inserted_id)}

@router.post('/user-input-logs', status_code=200)
def log_user_input(data: UserInputLog):
    """"""
    # Save the user input log to the database
    result = database.send_interval_log(
        user_id=data.userId,
        code=data.code,
        fileName=data.fileName,
        timestamp=data.timestamp
    )
    return {"response": "User input log stored", "data": data, "inserted_id": str(result.inserted_id)}

@router.post('/storeUser', status_code=200)
def add_user_mongodb(data: User):
    """
        Data passed has the vscode created accountID and githubUsername
        Response is {message:str, status:int}
        Status:
            - 200: User document added to DB
            - 204: User already exists in DB
            - 500: error trying to fetch or post user
    """
    res = database.register_user(data.gitHubUsername, data.accountId)
    return res
