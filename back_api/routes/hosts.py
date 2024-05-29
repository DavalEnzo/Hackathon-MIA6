from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse

from services.hosts import get_all, get_host, get_host_slug, get_host_season, get_host_year

hosts = APIRouter()

"""Route Get all hosts"""
@hosts.get("/all")
async def read_hosts(page: int = 1, limit: int = 20):
    host_list = await get_all(page, limit)
    try:
        return host_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

"""Route Get host by id"""
@hosts.get("/{host_id}")
async def read_host(host_id: int):
    host = await get_host(host_id)
    try:
        return host
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

"""Route Get host by slug name"""
@hosts.get("/slug/{slug}")
async def get_host_slug(slug: str):
    host = await get_host_slug(slug)
    try:
        return host
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@hosts.get("/season/{season}")
async def read_host_season(season: str):
    host = await get_host_season(season)
    try:
        return host
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@hosts.get("/year/{year}")
async def read_host_year(year: int):
    host = await get_host_year(year)
    try:
        return host
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))