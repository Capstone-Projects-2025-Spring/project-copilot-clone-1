from openai import OpenAI
from .models import CodeRequest
from dotenv import load_dotenv
import os

env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env')
load_dotenv(dotenv_path=env_path)

API_KEY = os.environ.get("LLM_API_KEY")
MODEL_NAME = os.environ.get("LLM_MODEL", "llama3.2")
BASE_URL = os.environ.get("LLM_BASE_URL")

INST = "You are an AI code assistant. Given the code sample, generate the remaining characters needed to finish the code, do NOT include code already given in the sample. Provide only the raw code without any formatting, comments, or Markdown symbols. Do NOT include triple backticks or extra explanations—only the code itself. Keep function as concise as possible."
INST_INC = "You are an AI code assistant. Given the code sample, generate the remaining characters needed to finish the code that appears plausible but contains a subtlee mistake. The code should should not cause any syntax or compilation errors, but it should cause incorrect logic, inefficiency, or an unintended side effect. Examples of such mistakes would be inefficient code, incorrect conditional logic, code that goes against the intended use of the function, etc. Ensure that the code remains syntactically valid. Do NOT include code already given in the sample. Provide only the raw code without any formatting, comments, or Markdown symbols. Do NOT include triple backticks or extra explanations—only the code itself. Keep function as concise as possible."

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
                {"role": "developer", "content": INST},
                {"role": "user", "content": f"Code:\n{request.code}\n\nInstructions:\n{request.instructions}"}
            ],
            temperature=0.2,
        )
        generated_code = response.choices[0].message.content
        print(generated_code)
        return generated_code
    except Exception as e:
        raise Exception(f"Error generating suggestion: {str(e)}")
    
async def generate_incorrect_suggestion(request: CodeRequest):
    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "developer", "content": INST_INC},
                {"role": "user", "content": f"Code:\n{request.code}\n\nInstructions:\n{request.instructions}"}
            ],
            temperature=0.2,
        )
        generated_code = response.choices[0].message.content;
        return generated_code
    except Exception as e:
        raise Exception(f"Error generating incorrect suggestion: {str(e)}")

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