from fastapi import APIRouter, HTTPException
from config.db import engine, SessionLocal
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

"""Get 100 first athletes"""
async def f_athletes():
    session = SessionLocal()
    try:
        result = session.execute(text("SELECT * FROM olympic_athletes LIMIT 100;"))
        column_names = list(result.keys())
        athletes = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return athletes
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()
        
"""Get all athletes"""        
async def get_all(page: int = 1, limit: int = 20):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_athletes LIMIT :limit OFFSET :offset;")
        offset = (page - 1) * limit
        result = session.execute(query, {"limit": limit, "offset": offset})
        column_names = list(result.keys())
        athletes = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return athletes
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching athletes. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()
        
"""Get athlete by id"""
async def get_athlete_id(athlete_id: int):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_athletes WHERE athlete_id = :athlete_id;")
        result = session.execute(query, {"athlete_id": athlete_id})
        column_names = list(result.keys())
        athlete = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return athlete
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching athletes. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()
        
        
"""Get athlete by name"""
async def get_athlete_name(full_name: str):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_athletes WHERE athlete_full_name = :full_name;")
        result = session.execute(query, {"full_name": full_name})
        column_names = list(result.keys())
        athlete = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return athlete
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching athletes. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()
        