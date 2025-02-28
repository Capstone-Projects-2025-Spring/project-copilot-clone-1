from ai import router
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_suggestions():
    response = client.get("/suggest")
    assert response.status_code == 200
