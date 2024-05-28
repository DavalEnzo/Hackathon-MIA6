from fastapi import APIRouter

results = APIRouter()

@results.get("/")
def read_hosts():
    return {"message": "Read results"}
