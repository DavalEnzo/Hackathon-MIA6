from fastapi import APIRouter

medals = APIRouter()

@medals.get("/")
def read_hosts():
    return {"message": "Read medals"}
