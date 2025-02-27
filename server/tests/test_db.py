import unittest
from pymongo import MongoClient
from db import Database

class TestDatabase(unittest.TestCase):
    def setUp(self):
        # MongoDB URI
        uri = "mongodb+srv://Kushi123:KushiTemple25@capcluster.lkmb9.mongodb.net/?retryWrites=true&w=majority"
        
        # Database and collection names
        db_name = "test_user_code_db"
        collection_name = "test_code_snippets"
        
        # Initialize the database connection
        self.db = Database(uri, db_name, collection_name)

    def test_send_and_retrieve_code_snippets(self):
        user_id = "12345"
        language = "Java"
        code = "console.log('Hello, world!');"

        # Insert a code snippet
        inserted_id = self.db.send_code_snippet(user_id, language, code)
        self.assertIsNotNone(inserted_id.inserted_id, "Failed to insert document")

        # Print the inserted data
        # print("Inserted data:", {"userId": user_id, "language": language, "code": code})

        # Retrieve code snippets 
        snippets = self.db.retrieve_code_snippets(user_id)
        self.assertGreater(len(snippets), 0, "No snippets retrieved")

        # Print the retrieved data
        # print("Retrieved data:", snippets)

        # Verify the inserted code snippet is among the retrieved snippets
        retrieved_snippet = snippets[0]
        self.assertEqual(retrieved_snippet["userId"], user_id)
        self.assertEqual(retrieved_snippet["language"], language)
        self.assertEqual(retrieved_snippet["code"], code)

    def tearDown(self):
        # Close the MongoClient connection
        self.db.client.close()

if __name__ == "__main__":
    unittest.main()