from fastapi import APIRouter, HTTPException
from .llm import generate_suggestion
from .models import CodeRequest, SuggestionResponse

router = APIRouter()

@router.get('/suggest', status_code=200, response_model=SuggestionResponse)
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
    try:
        request = CodeRequest(
            code="#This function computes Matrix multiplication\ndef matrix_mul(a,b)",
            instructions="Complete the code. Do not add any comments and keep function as concise as possible.",
        )
        generated_code = await generate_suggestion(request)
        return {"Response": generated_code}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))