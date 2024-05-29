from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from services.medals import f_medals, get_all,get_medal_country,get_medal_event,get_medal_discipline,get_medal_count_by_country,get_medal_count_by_athlete,get_discipline_most_medals_by_country

medals = APIRouter()

"""Route Get 100 first medals"""
@medals.get("/")
async def get_medals():
    medals_list = await f_medals()
    try:
        return JSONResponse(content=medals_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

"""Route Get all medals"""
@medals.get("/all")
async def get_medals(page: int = 1, limit: int = 20):
    medals_list = await get_all(page, limit)
    try:
        return JSONResponse(content=medals_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
"""Route Get medals by country"""
@medals.get("/country/{country_name}")
async def get_medals_by_country(country_name: str):
    medals_list = await get_medal_country(country_name)
    try:
        return JSONResponse(content=medals_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
"""Route Get medals by event"""
@medals.get("/event/{event_title}")
async def get_medals_by_event(event_title: str):
    medals_list = await get_medal_event(event_title)
    try:
        return JSONResponse(content=medals_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

"""Route Get medals by discipline"""
@medals.get("/discipline/{discipline_title}")
async def get_medals_by_discipline(discipline_title: str):
    medals_list = await get_medal_discipline(discipline_title)
    try:
        return JSONResponse(content=medals_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
"""Route Get medals count by country"""
@medals.get("/count_by_country")
async def get_medals_count_by_country(year: int):
    medals_list = await get_medal_count_by_country(year)
    try:
        return JSONResponse(content=medals_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
"""Route Get medals count by athlete"""
@medals.get("/count_by_athlete")
async def get_medals_count_athlete():
    medals_list = await get_medal_count_by_athlete()
    try:
        return JSONResponse(content=medals_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))    
    
"""Route Get discipline most medals by country"""
@medals.get("/get_discipline_most_medals_by_country/{country}")
async def get_discipline_m_medals_by_country(country: str):
    medals_list = await get_discipline_most_medals_by_country(country)
    try:
        return JSONResponse(content=medals_list)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))