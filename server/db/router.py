from fastapi import APIRouter

router = APIRouter()

@router.post('/logs', status_code=200)
def log_data(data: dict):
    
    return [{"response": "Storing some data", "created": "2025-02-19 10:33:00 AM", "data": data}]

@router.get('/logs', status_code=200)
def read_logs():
    return [{"_id": "complexObject_FF294F", "timestamp": "2025-02-19 10:32:00 AM", "accepted": "false"}]
