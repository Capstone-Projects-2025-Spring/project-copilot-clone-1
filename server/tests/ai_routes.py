from ai import router
from fastapi.testclient import TestClient
from main import app
from ai.models import CodeRequest, SuggestionResponse

client = TestClient(app)

def test_get_suggestions():
    ##response = client.get("/suggest")
    body = CodeRequest(
        code="#This function computes Matrix multiplication\ndef matrix_mul(a,b)",
        instructions="Complete the code. Do not add any comments and keep function as concise as possible.",
    ).model_dump()
    response = client.post('/suggest', json=body)
    assert response.status_code == 200
