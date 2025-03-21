from fastapi import APIRouter, HTTPException
from .llm import explainConcept, generate_suggestion, generate_incorrect_suggestion
from .models import CodeRequest, ExplanationRequest, ExplanationResponse, SuggestionResponse

router = APIRouter()

@router.post('/suggest', status_code=200, response_model=SuggestionResponse)
async def get_suggestion(request: CodeRequest) -> dict:
# async def get_suggestion() -> dict:

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
        # request = CodeRequest(
        #     code="#This function computes Matrix multiplication\ndef matrix_mul(a,b)",
        #     instructions="Complete the code. Do not add any comments and keep function as concise as possible.",
        # )
        generated_code = await generate_suggestion(request)
        return {"Response": generated_code}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post('/suggest-inc', status_code=200, response_model=SuggestionResponse)
async def get_incorrect_suggestion(request: CodeRequest) -> dict:
    try:
        generated_code = await generate_incorrect_suggestion(request)
        return {"Response": generated_code}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post('/askEducode', status_code=200, response_model=ExplanationResponse)
async def get_explanation(request:ExplanationRequest) -> dict:
    """
      This route returns AI generated explanations based on user's prompt
    """
    try:
      output = await explainConcept(request.question)
      return {"output":output, "status":200}
    except Exception as e:
      raise HTTPException(status_code=500, detail=str(e))