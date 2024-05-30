from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from routes.index import athletes, db, hosts, medals, results

"""FastAPI instance"""
app = FastAPI(
    title="Hackathon IPSSI || J.O Paris 2024",
    description="Plongez dans l'avenir des Jeux Olympiques de Paris 2024",
    version="1.0.0",
    contact={
        "name": "Hackathon-MIA6",
        "url": "https://github.com/DavalEnzo/Hackathon-MIA6", 
    }
)

"""CORS Middleware"""
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

"""Redirect to /docs"""
@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")

"""Include routers"""
app.include_router(athletes, prefix="/athletes", tags=["Athletes"], responses={404: {"description": "Not found"}})
app.include_router(hosts, prefix="/hosts", tags=["Hosts"], responses={404: {"description": "Not found"}})
app.include_router(medals, prefix="/medals", tags=["Medals"], responses={404: {"description": "Not found"}})
app.include_router(results, prefix="/results", tags=["Results"], responses={404: {"description": "Not found"}})

app.include_router(db)