from pydantic import BaseModel
from bson import ObjectId
from datetime import datetime

class CodeSnippet(BaseModel):
    _id:  ObjectId
    userId: str
    language: str
    code: str
    createdAt: datetime