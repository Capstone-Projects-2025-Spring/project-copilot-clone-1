from pymongo import MongoClient

class Database:
    def __init__(self, uri, db_name, collection_name):
        self.client = MongoClient(uri)

        # try:
        # # Initialize the MongoDB client
        #     self.client = MongoClient(uri)
        
        # # Connect to the specified database
        #     print(db_name)
        #     self.db = self.client[db_name]
            
        #     print(f"Successfully connected to MongoDB database: {db_name}")
    
        # except Exception as e:
        #     print(f"Failed to connect to MongoDB: {e}")
 

    def send_code_snippet(self, user_id, language, code):
       
        data = {
            "userId": user_id,
            "language": language,
            "code": code,
        }

        # print(self.db.code_snippets)
        result = self.client.user_code_db.code_snippets.insert_one(data)
        print(result)
        return result

    def retrieve_code_snippets(self, user_id, language):
        
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
    # mongodb+srv://Larry123:LarryTemple25@capcluster-shard-00-02.lkmb9.mongodb.net:27017/?retryWrites=true&w=majority

    # uri = "capcluster-shard-00-02.lkmb9.mongodb.net:27017"
    # uri = "mongodb+srv://Larry123:LarryTemple25@capcluster.lkmb9.mongodb.net:27017/?retryWrites=true&w=majority"
    uri = "mongodb+srv://Larry123:LarryTemple25@capcluster.lkmb9.mongodb.net/?retryWrites=true&w=majority"
    
    # Database and collection names
    db_name = "user_code_db"
    collection_name = "code_snippets"
    
    # Initialize the database connection
    db = Database(uri, db_name, collection_name)
    
    print("sending code snippet")
    # Example: Insert a code snippet
    inserted_id = db.send_code_snippet(
        user_id = "12345",
        language = "TypeScript",
        code = "console.log('Hello, world!');"
    )
    # print(f"Inserted document ID: {inserted_id}") 
    
    # Example: Retrieve code snippets for a user
     # snippets = db.retrieve_code_snippets(user_id="12345")
    # print("Retrieved code snippets:", snippets)