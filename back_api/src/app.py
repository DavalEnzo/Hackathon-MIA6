from fastapi import FastAPI
from config.db import check_db_connection

app = FastAPI()

@app.get("/")
def read_root():
    if check_db_connection():
        return {"message": "Database connection established successfully"}
    else:
        return {"message": "Failed to establish database connection"}
    
@app.get("/check-db")
def check_db():
    return check_db_connection()

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}