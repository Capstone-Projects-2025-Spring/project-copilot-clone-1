from pydantic import BaseModel, field_serializer
from bson import ObjectId
from datetime import datetime

class CodeSnippet(BaseModel):
    _id:  ObjectId
    userId: str
    language: str
    code: str
    createdAt: datetime

    @field_serializer('createdAt')
    def serialize_dt(self, dt: datetime):
        return dt.timestamp()

class SuggestionLog(BaseModel):
    userId: str
    eventType: str  # "Presented", "Accepted", or "Rejected"
    suggestion: str
    fileName: str
    position: dict  # Cursor position
    timestamp: str

class UserInputLog(BaseModel):
    userId: str
    code: str
    fileName: str
    timestamp: str

class User(BaseModel):
    gitHubUsername: str
    accountId:str