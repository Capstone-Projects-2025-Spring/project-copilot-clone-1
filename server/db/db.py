from pymongo import MongoClient

class Database:
    def __init__(self, uri, db_name, collection_name):
        try:
            # Initialize the MongoDB client
            self.client = MongoClient(uri, tlsAllowInvalidCertificates=True)
            
            # Force a connection attempt by listing databases
            self.client.list_database_names()  # This will raise an exception if the connection fails
            
            # Connect to the specified database
            self.db = self.client[db_name]
            self.collection = self.db[collection_name]
            self.interval_collection = self.db["interval_logging"]  # New collection for interval logs
            self.users = self.db["users"]
#            print(f"Successfully connected to MongoDB database: {db_name}")
    
        except Exception as e:
#            print(f"Failed to connect to MongoDB: {e}")
            raise e  # Optionally re-raise the exception to stop execution

    def send_code_snippet(self, user_id, language, code):
        data = {
            "userId": user_id,
            "language": language,
            "code": code,
        }

        result = self.collection.insert_one(data)
#        print(result)
        return result

    def send_suggestion_log(self, user_id, event_type, suggestion, fileName, position, timestamp):
        data = {
            "userId": user_id,
            "eventType": event_type,
            "suggestion": suggestion,
            "fileName": fileName,
            "position": position,
            "timestamp": timestamp
        }

        result = self.collection.insert_one(data)
#        print(result)
        return result

    def send_interval_log(self, user_id, code, fileName, timestamp):
        data = {
            "userId": user_id,
            "code": code,
            "fileName": fileName,
            "timestamp": timestamp
        }

        result = self.interval_collection.insert_one(data)
#        print(result)
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
    
    def register_user(self, gitHubUsername, accountId):
        try: 
            existing_user = self.users.find_one({"accountId":accountId})
#            print(existing_user)

            if existing_user:
                print("User already Exists")
                return {"message": "User already exists", "status": 204}

            new_user = {
                "gitHubUsername":gitHubUsername,
                "accountId":accountId,
            }
            self.users.insert_one(new_user)

            return {"message": "User added successfully", "status": 200}
        except Exception as e:
            print(f"Failed to Fetch/Post User: {e}")
