import openai
import os
from db import Database
from dotenv import load_dotenv
from pymongo import MongoClient


# Connect to MongoDB
client = MongoClient(os.environ.get(MONGO_URI))

load_dotenv()
key = os.getenv("LLM_API_KEY")

db_name = client["ai_suggestions"]
collection_name = client["correct_suggestion"]

def get_suggestion(prompt):
    response = openai.ChatCompletion.create(
        model=" Model Were Using ",
        messages=[{"role": "user", "content": prompt}]
    )
    return response["choices"][0]["message"]["content"]



#needs changes for mongo
def store_suggestion(prompt):
    suggestion = get_suggestion(prompt)
    document = {"prompt": prompt, "suggestion": suggestion}
    collection_name.insert_one(document)
    return document

# Example Usage
prompt_text = "How does AI impact modern software development?"
result = store_suggestion(prompt_text)
print("Stored:", result)