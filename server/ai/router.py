from fastapi import APIRouter, HTTPException
from openai.types import Completion
from .llm import generate_suggestion
from .models import CodeRequest

router = APIRouter()

# @router.get('/suggest', status_code=200, response_model=Completion)
@router.get('/suggest', status_code=200)
# async def get_suggestion(request: CodeRequest) -> dict:
async def get_suggestion() -> dict:

    """
    Generate a suggestion for the given code snippet based on instructions.

    This endpoint uses the OpenAI API to process the provided code 
    and instructions, and it returns a modified version of the code.

    **Request Body:**
    - `code`: The code snippet that needs modification or suggestions.
    - `instructions`: Instructions on how to modify or enhance the code.

    **Response:**
    - `Response`: A generated code snippet based on the input code and instructions.

    - **Response status:**
      - `200 OK`: Successfully generated code.
      - `500 Internal Server Error`: If an error occurs during the generation.
    """
    # return {"Response": "Here's some code..."}
    try:
        request = CodeRequest(
            code="print('Hello World!')",
            instructions="Change to be a function that adds two numbers. Do not add any comments and keep function as concise as possible"
        )
        generated_code = await generate_suggestion(request)
        return {"Response": generated_code}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))