from fastapi import APIRouter

hosts = APIRouter()

@hosts.get("/")
def read_hosts():
    return {"message": "Read hosts"}
