from config.db import SessionLocal
from fastapi import HTTPException
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

"""Get 100 first medals"""
async def f_medals():
    session = SessionLocal()
    try:
        result = session.execute(text("SELECT * FROM olympic_medals LIMIT 100;"))
        column_names = list(result.keys())
        medals = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return medals
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()
        
"""Get all medals"""
async def get_all(page: int = 1, limit: int = 20):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_medals LIMIT :limit OFFSET :offset;")
        offset = (page - 1) * limit
        result = session.execute(query, {"limit": limit, "offset": offset})
        column_names = list(result.keys())
        medals = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return medals
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching athletes. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()
        
"""Get medals by country"""
async def get_medal_country(country_name: str):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_medals WHERE country_name = :country_name;")
        result = session.execute(query, {"country_name": country_name})
        column_names = list(result.keys())
        medals = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return medals
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching medals. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()
        
"""Get medals by event"""
async def get_medal_event(event_title: str):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_medals WHERE event_title = :event_title;")
        result = session.execute(query, {"event_title": event_title})
        column_names = list(result.keys())
        medals = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return medals
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching athletes. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()
        
"""Get medals by discipline"""
async def get_medal_discipline(discipline_title: str):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_medals WHERE discipline_title = :discipline_title;")
        result = session.execute(query, {"discipline_title": discipline_title})
        column_names = list(result.keys())
        medals = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return medals
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching athletes. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()
        
"""Get medals by medal_type"""
async def get_medal_medal_type(medal_type: str):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_medals WHERE medal_type = :medal_type;")
        result = session.execute(query, {"medal_type": medal_type})
        column_names = list(result.keys())
        medals = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return medals
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching athletes. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()
         
"""Get medals by medal_type and country"""
async def get_medal_medal_type_country(medal_type: str, country: str):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_medals WHERE medal_type = :medal_type AND country = :country;")
        result = session.execute(query, {"medal_type": medal_type, "country": country})
        column_names = list(result.keys())
        medals = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return medals
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching athletes. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()
        
"""Get medals by medal_type and year"""
async def get_medal_medal_type_year(medal_type: str, year: int):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_medals WHERE medal_type = :medal_type AND year = :year;")
        result = session.execute(query, {"medal_type": medal_type, "year": year})
        column_names = list(result.keys())
        medals = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return medals
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching athletes. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()
        
"""Get medals by medal_type and sport"""
async def get_medal_medal_type_sport(medal_type: str, sport: str):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_medals WHERE medal_type = :medal_type AND sport = :sport;")
        result = session.execute(query, {"medal_type": medal_type, "sport": sport})
        column_names = list(result.keys())
        medals = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return medals
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching athletes. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()
        
"""Get medals by medal_type and event"""
async def get_medal_medal_type_event(medal_type: str, event: str):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_medals WHERE medal_type = :medal_type AND event = :event;")
        result = session.execute(query, {"medal_type": medal_type, "event": event})
        column_names = list(result.keys())
        medals = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return medals
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching athletes. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()
        
"""Get medals by medal_type and athlete"""
async def get_medal_medal_type_athlete(medal_type: str, athlete: str):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_medals WHERE medal_type = :medal_type AND athlete = :athlete;")
        result = session.execute(query, {"medal_type": medal_type, "athlete": athlete})
        column_names = list(result.keys())
        medals = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return medals
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching athletes. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()
           
"""Get medals by id"""
async def get_medal_id(id: int):
    try:
        session = SessionLocal()
        query = text("SELECT * FROM olympic_medals WHERE id = :id;")
        result = session.execute(query, {"id": id})
        column_names = list(result.keys())
        medal = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return medal
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching athletes. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()
 
"""Get medals by year """       
async def get_medals_by_year():
    try:
        session = SessionLocal()
        query = text("SELECT year, country, COUNT(*) as medal_count FROM olympic_medals GROUP BY year, country;")
        result = session.execute(query)
        column_names = list(result.keys())
        medals_by_year = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return medals_by_year
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching medals by year. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()
        
"""Get medal count by country"""
async def get_medal_count_by_country(game_year: int):
    session = SessionLocal()
    try:
        query = text("""SELECT
            h.game_year,
            m.country_name,
            COUNT(*) as medal_count
        FROM
            olympic_medals m
        JOIN
            olympic_hosts h ON m.host_id = h.host_id
        WHERE
            h.game_year = :game_year
        GROUP BY
            h.game_year, m.country_name
        ORDER BY
            h.game_year, m.country_name;""")
        result = session.execute(query, {"game_year": game_year})

        column_names = list(result.keys())
        medal_counts = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return medal_counts
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="An error occurred while fetching medal counts. Please try again later.")
    finally:
        session.close()

"""get medal count by athlete"""
async def get_medal_count_by_athlete():
        session = SessionLocal()
        try:
            query = text("""
                SELECT
                    h.game_year, 
                    m.athlete_full_name,
                    COUNT(*) as medal_count
                FROM 
                    olympic_medals m
                JOIN 
                    olympic_hosts h ON m.host_id = h.host_id
                GROUP BY 
                    h.game_year, m.athlete_full_name
                ORDER BY 
                    h.game_year, m.medal_count DESC;
            """)
            result = session.execute(query)
            column_names = list(result.keys())
            medal_counts = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
            return medal_counts
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail="An error occurred while fetching medal counts. Please try again later.")
        finally:
            session.close()
            
"""Get discipline with most medals by country"""
async def get_discipline_most_medals_by_country(country: str):
    try:
        session = SessionLocal()
        query = text("""
            SELECT 
                discipline_title, 
                COUNT(*) as medal_count
            FROM 
                olympic_medals
            WHERE 
                country_name = :country
            GROUP BY 
                discipline_title
            ORDER BY 
                COUNT(*) DESC
            LIMIT 1;
        """)
        result = session.execute(query, {"country": country})
        column_names = list(result.keys())
        discipline = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return discipline
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="An error occurred while fetching discipline with most medals by country. Please try again later.")
    finally:
        session.close() 