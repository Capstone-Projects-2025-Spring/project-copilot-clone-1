from db.models import CodeSnippet
from fastapi.testclient import TestClient
from datetime import datetime
from main import app

client = TestClient(app)


def test_read_logs():
    response = client.get("/logs")
    assert response.status_code == 200


def test_write_logs():
    body = CodeSnippet(
        _id=None, userId="", language="", code="", createdAt=datetime.today()
    ).model_dump() # fastapi expects a dict for json parameter 
    response = client.post("/logs", json=body)
    assert response.status_code == 200
