from fastapi import HTTPException
from config.db import SessionLocal
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from decimal import Decimal

"""Convert decimal to float"""
def decimal_to_float(value):
    if isinstance(value, Decimal):
        return float(value)
    return value

"""To 10 contries by year"""
async def top_10_countries_by_year(year: int):
    try:
        session = SessionLocal()
        query = text("""
            WITH CountryMedalCounts AS (
    SELECT 
        h.game_year,
        r.country_name,
        COUNT(CASE WHEN r.medal_type IN ('Gold', 'Silver', 'Bronze') THEN 1 END) AS medal_count,
        ROW_NUMBER() OVER (PARTITION BY h.game_year ORDER BY COUNT(*) DESC) AS rank
    FROM 
        olympic_results r
    JOIN 
        olympic_hosts h ON r.slug_game = h.slug_game
    WHERE 
        r.medal_type IS NOT NULL
        AND h.game_year = :year
    GROUP BY 
        h.game_year, r.country_name
)
SELECT 
    game_year,
    country_name,
    medal_count
FROM 
    CountryMedalCounts
WHERE 
    rank <= 10
ORDER BY 
    game_year, rank;
        """)
        result = session.execute(query, {"year": year})
        column_names = list(result.keys())
        countries = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return countries
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching countries. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()

"""Get Events by year"""
async def get_events_by_year(game_year: int):
    try:
        session = SessionLocal()
        query = text("""
            SELECT DISTINCT event_title
            FROM olympic_results r
            JOIN olympic_hosts h ON r.slug_game = h.slug_game
            WHERE h.game_year = :game_year;
        """)
        result = session.execute(query, {"game_year": game_year})
        column_names = list(result.keys())
        events = [{column_names[i]: value for i, value in enumerate(row)} for row in result.fetchall()]
        return events
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching countries. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()
        
"""Get top 10 athletes by year and country"""
async def top_10_athletes_by_country(game_year: int, country_name: str):
    try:
        session = SessionLocal()
        query = text("""
            WITH AthleteMedalCounts AS (
                SELECT 
                    h.game_year,
                    m.athlete_full_name,
                    COUNT(*) AS medal_count,
                    ROW_NUMBER() OVER (PARTITION BY h.game_year ORDER BY COUNT(*) DESC) AS rank
                FROM 
                    olympic_medals m
                JOIN 
                    olympic_hosts h ON m.host_id = h.host_id
                WHERE 
                    m.medal_type IS NOT NULL
                    AND h.game_year = :game_year
                    AND m.country_name = :country_name
                GROUP BY 
                    h.game_year, m.athlete_full_name
            )
            SELECT 
                game_year,
                athlete_full_name,
                medal_count
            FROM 
                AthleteMedalCounts
            WHERE 
                rank <= 10
            ORDER BY 
                game_year, rank;
        """)
        result = session.execute(query, {"game_year": game_year, "country_name": country_name})
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

"""Get best comtries by discipline and year"""
async def get_best_countries_by_dis_year(game_year: int):
    try:
        session = SessionLocal()
        query = text("""
            WITH DisciplineMedalCounts AS (
                SELECT 
                    h.game_year,
                    r.discipline_title,
                    r.country_name,
                    COUNT(*) AS total_medals,
                    SUM(CASE WHEN r.medal_type = 'Gold' THEN 1 ELSE 0 END) AS gold_medals,
                    SUM(CASE WHEN r.medal_type = 'Silver' THEN 1 ELSE 0 END) AS silver_medals,
                    SUM(CASE WHEN r.medal_type = 'Bronze' THEN 1 ELSE 0 END) AS bronze_medals
                FROM 
                    olympic_results r
                JOIN 
                    olympic_hosts h ON r.slug_game = h.slug_game
                WHERE 
                    r.medal_type IN ('Gold', 'Silver', 'Bronze')
                    AND h.game_year = :game_year
                GROUP BY 
                    h.game_year, r.discipline_title, r.country_name
            ),
            RankedCountries AS (
                SELECT 
                    game_year,
                    discipline_title,
                    country_name,
                    total_medals,
                    gold_medals,
                    silver_medals,
                    bronze_medals,
                    ROW_NUMBER() OVER (PARTITION BY game_year, discipline_title ORDER BY total_medals DESC, gold_medals DESC, silver_medals DESC, bronze_medals DESC) AS rank
                FROM 
                    DisciplineMedalCounts
            )
            SELECT 
                game_year,
                discipline_title,
                country_name,
                total_medals,
                gold_medals,
                silver_medals,
                bronze_medals
            FROM 
                RankedCountries
            WHERE 
                rank = 1
            ORDER BY 
                game_year, discipline_title;
        """)
        result = session.execute(query, {"game_year": game_year})
        column_names = list(result.keys())
        countries = [
            {column_names[i]: decimal_to_float(value) for i, value in enumerate(row)}
            for row in result.fetchall()
        ]
        return countries
    except SQLAlchemyError as e:
        print(f"Database error: {str(e)}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching countries. Please try again later.")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again later.")
    finally:
        session.close()