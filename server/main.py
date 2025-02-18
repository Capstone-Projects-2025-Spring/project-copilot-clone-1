from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def hello_word() -> str:
    return "Hello World!"