from pydantic import BaseModel

class CodeRequest(BaseModel):
    """
    Represents the request body containing code and instructions.
    """
    code: str
    instructions: str