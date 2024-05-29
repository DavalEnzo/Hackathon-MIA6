from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi import HTTPException
from services.results import top_10_countries_by_year, get_events_by_year, top_10_athletes_by_country,get_year

results = APIRouter()

"""To 10 contries by year"""
@results.get("/get_top_countries_by_year/{year}")
async def get_top_countries_by_year(year: int):
    countries_list = await top_10_countries_by_year(year)
    try:
        return JSONResponse(content=countries_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

"""Get Events by year"""
@results.get("/get_events_year/{game_year}")
async def get_events_year(game_year: int):
    events_list = await get_events_by_year(game_year)
    try:
        return JSONResponse(content=events_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
"""Top athletes by contrie and year"""
@results.get("/top_athletes_by_country_y/{game_year}/{country_name}")
async def top_athletes_by_country_y(game_year: int, country_name: str):
    athletes_list = await top_10_athletes_by_country(game_year, country_name)
    try:
        return JSONResponse(content=athletes_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
"""Get year"""
@results.get("/get_year_host")
async def get_year_host():
    year = await get_year()
    try:
        return JSONResponse(content=year)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    

