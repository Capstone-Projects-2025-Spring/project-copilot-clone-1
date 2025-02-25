from pymongo import MongoClient

class Database:
    def __init__(self, uri, db_name, collection_name):
        try:
            # Initialize the MongoDB client
            self.client = MongoClient(uri)
            
            # Force a connection attempt by listing databases
            self.client.list_database_names()  # This will raise an exception if the connection fails
            
            # Connect to the specified database
            self.db = self.client[db_name]
            self.collection = self.db[collection_name]
            
            print(f"Successfully connected to MongoDB database: {db_name}")
    
        except Exception as e:
            print(f"Failed to connect to MongoDB: {e}")
            raise e  # Optionally re-raise the exception to stop execution

    def send_code_snippet(self, user_id, language, code):
        data = {
            "userId": user_id,
            "language": language,
            "code": code,
        }

        result = self.collection.insert_one(data)
        print(result)
        return result

    def retrieve_code_snippets(self, user_id, language=None):
        query = {}
        if user_id:
            query["userId"] = user_id
        if language:
            query["language"] = language
        
        # Retrieve documents based on the query
        documents = self.collection.find(query)
        
        # Convert the cursor to a list of dictionaries
        return list(documents)

# Example usage:
if __name__ == "__main__":
    # MongoDB URI 
    uri = "mongodb+srv://Kushi123:KushiTemple25@capcluster.lkmb9.mongodb.net/?retryWrites=true&w=majority"
    
    # Database and collection names
    db_name = "user_code_db"
    collection_name = "code_snippets"
    
    # Initialize the database connection
    try:
        db = Database(uri, db_name, collection_name)
        
        # print("sending code snippet")
        # Insert a code snippet
        inserted_id = db.send_code_snippet(
            user_id = "12345",
            language = "Java",
            code = "console.log('Hello, world!');"
        )
        print(f"Inserted document ID: {inserted_id.inserted_id}") 
        
        # Retrieve code snippets for a user
        snippets = db.retrieve_code_snippets(user_id = "12345")
        print("Retrieved code snippets:", snippets)
    
    except Exception as e:
        print(f"An error occurred during execution: {e}")