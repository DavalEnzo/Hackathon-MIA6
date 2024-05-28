from fastapi import APIRouter

athletes = APIRouter()

@athletes.get("/")
def read_athletes():
    return {"message": "Read athletes"}



    


