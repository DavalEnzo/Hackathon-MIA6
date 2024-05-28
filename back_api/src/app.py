from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from routes.index import athletes, db, hosts, medals, results


app = FastAPI(
    title="Hackathon IPSSI || J.O Paris 2024",
    description="Plongez dans l'avenir des Jeux Olympiques de Paris 2024",
    version="1.0.0",
    contact={
        "name": "Hackathon-MIA6",
        "url": "https://github.com/DavalEnzo/Hackathon-MIA6", 
    }
)

@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")


app.include_router(athletes, prefix="/athletes", tags=["Athletes"], responses={404: {"description": "Not found"}})
app.include_router(hosts, prefix="/hosts", tags=["Hosts"], responses={404: {"description": "Not found"}})
app.include_router(medals, prefix="/medals", tags=["Medals"], responses={404: {"description": "Not found"}})
app.include_router(results, prefix="/results", tags=["Results"], responses={404: {"description": "Not found"}})




app.include_router(db)
