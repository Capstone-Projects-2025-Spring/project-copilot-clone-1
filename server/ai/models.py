from pydantic import BaseModel

class CodeRequest(BaseModel):
    """
    Represents the request body containing code and instructions.
    """
    code: str
    instructions: str

class ExplanationRequest(BaseModel):
    """
    Represents the request body containing code and instructions.
    """
    question: str

class SuggestionResponse(BaseModel):
    """
    Represents the response containing the generated suggestion or modified code.
    """
    Response: str

class ExplanationResponse(BaseModel):
    output:str
    status:int