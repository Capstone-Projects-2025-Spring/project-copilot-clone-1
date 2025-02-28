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