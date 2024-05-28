from fastapi import APIRouter,HTTPException
from config.db import check_db_connection



db = APIRouter()
@db.get("/db")
def root():
    if check_db_connection():
        return {"message": "Database connection established successfully"}
    else:
        return {"message": "Failed to establish database connection"}
    

