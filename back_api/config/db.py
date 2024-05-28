import sqlalchemy
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
from dotenv import load_dotenv
import os

load_dotenv()

db_user = os.getenv('DB_USERNAME')
db_password = os.getenv('DB_PASSWORD')
db_host = os.getenv('DB_HOST')
db_port = os.getenv('DB_PORT')
db_name = os.getenv('DB_NAME')

engine = create_engine(f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}")

con = engine.connect()

def check_db_connection():
    try:
        connection = engine.connect()
        connection.close()
        return {"status": "success", "message": "Database connection established successfully."}
    except SQLAlchemyError as e:
        return {"status": "error", "message": str(e)}
