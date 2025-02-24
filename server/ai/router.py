from fastapi import APIRouter, HTTPException
from openai import OpenAI
from .models import CodeRequest
import os

router = APIRouter()

API_KEY = os.environ.get("LLM_API_KEY")
MODEL_NAME = os.environ.get("LLM_MODEL", "gpt-4-turbo")
BASE_URL = os.environ.get("LLM_BASE_URL", "https://api.openai.com/v1/chat/completions")

client = OpenAI(
    api_key=API_KEY,
    base_url=BASE_URL,
)

@router.get('/suggest', status_code=200)
async def generate_suggestion(request: CodeRequest):
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
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "developer", "content": "You are an AI code assistant. Follow user instructions carefully."},
                {"role": "user", "content": f"Code:\n{request.code}\n\nInstructions:\n{request.instructions}"}
            ],
            temperature=0.2,
        )

        generated_code = response.choices[0].message.content
        return {"Response": generated_code}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get('/suggest', status_code=200)
async def get_suggestion():
    return {"Response": "Here's some code..."}