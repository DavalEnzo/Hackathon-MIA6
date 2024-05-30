from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from services.athletes import f_athletes, get_all, get_athlete_id, get_athlete_name, top_10_athletes_by_year

athletes = APIRouter()

"""Route Get 100 first athletes"""
@athletes.get("")
async def get_athletes():
    athletes_list = await f_athletes()
    try:
        return JSONResponse(content=athletes_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
 
"""Route Get all athletes"""    
@athletes.get("/all")
async def get_all_athletes(page: int = 1, limit: int = 20):
    athletes_list = await get_all(page, limit)
    try:
        return JSONResponse(content=athletes_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
"""Route Get athlete by id"""
@athletes.get("/{athlete_id}")
async def get_athlete(athlete_id: int):
    athlete = await get_athlete_id(athlete_id)
    try:
        return JSONResponse(content=athlete)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
"""Route Get athlete by name"""
@athletes.get("/name/{name}")
async def get_athlete_by_name(name: str):
    athlete = await get_athlete_name(name)
    try:
        return JSONResponse(content=athlete)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

"""Get top 10 athletes by year"""
@athletes.get("/top_athletes_by_year/{game_year}")
async def get_top_athletes_by_year(game_year: int):
    athletes_list = await top_10_athletes_by_year(game_year)
    try:
        return JSONResponse(content=athletes_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))