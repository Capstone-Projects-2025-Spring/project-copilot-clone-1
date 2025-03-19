from pymongo import MongoClient
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# Initialize FastAPI app
app = FastAPI()

# Database Connection Class
class Database:
    def __init__(self, uri, db_name, collection_name):
        try:
            # Initialize MongoDB client
            self.client = MongoClient(uri, tlsAllowInvalidCertificates=True)
            
            # Connect to database and collection
            self.db = self.client[db_name]
            self.collection = self.db[collection_name]
            self.users = self.db["users"]
            
            print(f"Successfully connected to MongoDB database: {db_name}")

        except Exception as e:
            print(f"Failed to connect to MongoDB: {e}")
            raise e  # Stop execution if connection fails

    # Store code snippet in MongoDB
    def send_code_snippet(self, user_id, language, code):
        data = {
            "userId": user_id,
            "language": language,
            "code": code,
        }
        result = self.collection.insert_one(data)
        return result.inserted_id
    


    # Retrieve code snippets from MongoDB
    def retrieve_code_snippets(self, user_id, language=None):
        query = {"userId": user_id}
        if language:
            query["language"] = language
        
        documents = list(self.collection.find(query, {"_id": 0}))  # Hide _id field
        return documents

    # Register user in MongoDB
    def register_user(self, gitHubUsername, username, accessToken):
        existing_user = self.users.find_one({"gitHubUsername": gitHubUsername})

        if existing_user:
            print("User already Exists")
            return {"message": "User already exists", "status": "exists"}

        new_user = {
            "gitHubUsername": gitHubUsername,
            "username": username,
            "accessToken": accessToken
        }
        self.users.insert_one(new_user)

        return {"message": "User added successfully", "status": "added"}


# MongoDB Connection
db = Database(
    uri="mongodb+srv://Schetroma1:Temple25@capcluster.lkmb9.mongodb.net/?retryWrites=true&w=majority",
    db_name="user_database",
    collection_name="users"
)

# Define request model for user registration
class User(BaseModel):
    gitHubUsername: str
    username: str
    accessToken: str

# API endpoint to check and add user
@app.post("/storeUser")
async def register_user(user: User):
    result = db.register_user(user.gitHubUsername, user.username, user.accessToken)
    return result

# API endpoint to submit code snippet
class CodeSnippet(BaseModel):
    userId: str
    language: str
    code: str

@app.post("/codeStorage")
async def submit_code(snippet: CodeSnippet):
    inserted_id = db.send_code_snippet(snippet.userId, snippet.language, snippet.code)
    return {"message": "Code snippet added successfully", "inserted_id": str(inserted_id)}