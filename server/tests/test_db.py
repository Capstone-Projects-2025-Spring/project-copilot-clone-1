import pytest
from db.db import Database  

def setup_db():
    # MongoDB URI
    uri = "mongodb+srv://Kushi123:KushiTemple25@capcluster.lkmb9.mongodb.net/?retryWrites=true&w=majority"

    # Database and collection names
    db_name = "test_user_code_db"
    collection_name = "test_code_snippets"
    
    # Initialize the database connection
    db = Database(uri, db_name, collection_name)
    return db

def test_db_connection():
    db = setup_db()

    assert db.client is not None
    assert db.db is not None
    assert db.collection is not None
    
    db.client.close()

def test_send_and_retrieve_code_snippets():
    db = setup_db()

    user_id = "12345"
    language = "Java"
    code = "console.log('Hello, world!');"

    # Insert a code snippet
    inserted_id = db.send_code_snippet(user_id, language, code)
    assert inserted_id.inserted_id is not None, "Failed to insert document"

    # Retrieve code snippets
    snippets = db.retrieve_code_snippets(user_id)
    assert len(snippets) > 0, "No snippets retrieved"

    # Verify the inserted code snippet is among the retrieved snippets
    retrieved_snippet = snippets[0]
    assert retrieved_snippet["userId"] == user_id
    assert retrieved_snippet["language"] == language
    assert retrieved_snippet["code"] == code

    db.client.close()