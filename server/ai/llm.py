from openai import OpenAI
from .models import CodeRequest
from dotenv import load_dotenv
import os

env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env')
load_dotenv(dotenv_path=env_path)

API_KEY = os.environ.get("LLM_API_KEY")
MODEL_NAME = os.environ.get("LLM_MODEL", "llama3.2")
BASE_URL = os.environ.get("LLM_BASE_URL")

client = OpenAI(
    api_key=API_KEY,
    base_url=BASE_URL,
)

async def generate_suggestion(request: CodeRequest):
    """
    Generate a suggestion for the given code snippet based on instructions.

    **Request Body:**
    - `code`: The code snippet that needs modification or suggestions.
    - `instructions`: Instructions on how to modify or enhance the code.

    **Response:**
    - `Response`: A generated code snippet based on the input code and instructions.
    """

    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "developer", "content": "You are an AI code assistant. Given the code sample, return the remaining piece to finish the code, without reqriting existing code, or adding explanation"},
                {"role": "user", "content": f"Code:\n{request.code}\n\nInstructions:\n{request.instructions}"}
            ],
            temperature=0.2,
        )
        generated_code = response.choices[0].message.content
        print(generated_code)
        return generated_code
    except Exception as e:
        raise Exception(f"Error generating suggestion: {str(e)}")

async def explainConcept(question:str)-> str:
    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "assistant", "content": "You are an AI coding assistant, explain the concept behind the question. Respond in well-formed markdown"},
                {"role": "user", "content": f"Question: {question}"}
            ],
            temperature=0.2,
        )
        generated_code = response.choices[0].message.content
        print(generated_code)
        return generated_code
    except Exception as e:
        raise Exception(f"Error generating concept explanation: {str(e)}")