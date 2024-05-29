from config.db import SessionLocal
from fastapi import HTTPException
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

"""Get all hosts"""
async def get_all(page: int = 1, limit: int = 20):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_hosts LIMIT :limit OFFSET :offset;")
        offset = (page - 1) * limit
        result = session.execute(query, {"limit": limit, "offset": offset})
        column_names = list(result.keys())
        hosts = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return hosts
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching hosts. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()

"""Get host by id"""
async def get_host(host_id: int):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_hosts WHERE host_id = :host_id;")
        result = session.execute(query, {"host_id": host_id})
        column_names = list(result.keys())
        host = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return host
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching hosts. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()

"""Get host by slug name"""
async def get_host_slug(slug: str):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_hosts WHERE slug_game = :slug;")
        result = session.execute(query, {"slug": slug})
        column_names = list(result.keys())
        host = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return host
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching hosts. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()

async def get_host_season(season: str):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_hosts WHERE game_season = :game_season;")
        result = session.execute(query, {"game_season": season})
        column_names = list(result.keys())
        host = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return host
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching hosts. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()

async def get_host_year(year: int):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_hosts WHERE game_year = :game_year;")
        result = session.execute(query, {"game_year": year})
        column_names = list(result.keys())
        host = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return host
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching hosts. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()

async def get_year():
    try:
        session = SessionLocal()
        query = text("SELECT DISTINCT game_year FROM olympic_hosts ORDER BY game_year DESC;")
        result = session.execute(query)
        column_names = list(result.keys())
        years = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return years
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching hosts. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()