
from pyspark.sql.functions import regexp_replace
from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("Read Various Formats from HDFS") \
    .config("spark.jars.packages", "com.databricks:spark-xml_2.12:0.13.0") \
    .getOrCreate()

from pyspark.sql.window import Window
from pyspark.sql import functions as F
import pandas as pd

df_athletes = spark.read.csv("hdfs://localhost:9000/hackaton/olympic_athletes.csv", header=True, inferSchema=True)
# |-- athlete_url: string (nullable = true)
# |-- athlete_full_name: string (nullable = true)
# |-- games_participations: string (nullable = true)
# |-- first_game: string (nullable = true)
# |-- athlete_year_birth: string (nullable = true)
# |-- athlete_medals: string (nullable = true)
# |-- bio: string (nullable = true)

df_results = spark.read.csv("hdfs://localhost:9000/hackaton/olympic_results.csv", header=True, inferSchema=True)
# |-- _c0: integer (nullable = true) DELETED
# |-- Unnamed: 0: integer (nullable = true) DELETED
# |-- discipline_title: string (nullable = true)
# |-- event_title: string (nullable = true)
# |-- slug_game: string (nullable = true)
# |-- participant_type: string (nullable = true)
# |-- medal_type: string (nullable = true)
# |-- athletes: string (nullable = true)
# |-- rank_equal: string (nullable = true)
# |-- rank_position: string (nullable = true)
# |-- country_name: string (nullable = true)
# |-- country_code: string (nullable = true)
# |-- country_3_letter_code: string (nullable = true)
# |-- athlete_url: string (nullable = true)
# |-- athlete_full_name: string (nullable = true)
# |-- value_unit: string (nullable = true)
# |-- value_type: string (nullable = true)

df_hosts = spark.read.csv("hdfs://localhost:9000/hackaton/olympic_hosts.csv", header=True, inferSchema=True)
# |-- index: integer (nullable = true) DELETED
# |-- slug_game: string (nullable = true)
# |-- game_end_date: timestamp (nullable = true)
# |-- game_start_date: timestamp (nullable = true)
# |-- game_location: string (nullable = true)
# |-- game_name: string (nullable = true)
# |-- game_season: string (nullable = true)
# |-- game_year: integer (nullable = true)
# |-- host_id: integer  PRIMARY KEY 

df_medals = spark.read.csv("hdfs://localhost:9000/hackaton/olympic_medals.csv", header=True, inferSchema=True)
# |-- Unnamed: 0: integer (nullable = true) DELETED
# |-- discipline_title: string (nullable = true)
# |-- slug_game: string (nullable = true)
# |-- event_title: string (nullable = true)
# |-- event_gender: string (nullable = true)
# |-- medal_type: string (nullable = true)
# |-- participant_type: string (nullable = true)
# |-- participant_title: string (nullable = true)
# |-- athlete_url: string (nullable = true)
# |-- athlete_full_name: string (nullable = true)
# |-- country_name: string (nullable = true)
# |-- country_code: string (nullable = true)
# |-- country_3_letter_code: string (nullable = true)

df_results = df_results.drop("_c0", "Unnamed: 0")
df_medals = df_medals.drop("Unnamed: 0")
df_hosts = df_hosts.drop("index")
df_hosts = df_hosts.withColumnRenamed("game_slug", "slug_game")
df_hosts = df_hosts.withColumn("game_end_date", F.date_format("game_end_date", "yyyy-MM-dd HH:mm:ss"))
df_hosts = df_hosts.withColumn("game_start_date", F.date_format("game_start_date", "yyyy-MM-dd HH:mm:ss"))
df_athletes = df_athletes.filter(F.col("athlete_url") != "")

window_spec1 = Window.orderBy("slug_game")
df_hosts = df_hosts.withColumn("host_id", F.row_number().over(window_spec1))

window_spec2 = Window.orderBy("athlete_url")
df_athletes = df_athletes.withColumn("athlete_id", F.row_number().over(window_spec2))

df_medals_with_all = df_medals \
    .join(df_hosts.select("slug_game", "host_id"), df_medals.slug_game == df_hosts.slug_game, "left") \
    .join(df_athletes.select("athlete_url", "athlete_id"), df_medals.athlete_url == df_athletes.athlete_url, "left")

df_medals = df_medals_with_all.select(
    df_medals["*"],
    df_hosts["host_id"],
    df_athletes["athlete_id"]
)

config = {
    'user': '360560',
    'password': 'xu9FVMupFVXk5$6',
    'host': 'mysql-hackathonmia-6.alwaysdata.net',
    'database': 'hackathonmia-6_bdd'
}

import mysql.connector
from mysql.connector import Error   

df_medals = df_medals.fillna({
    'discipline_title': '',
    'slug_game': '',
    'event_title': '',
    'event_gender': '',
    'medal_type': '',
    'participant_type': '',
    'participant_title': '',
    'athlete_url': '',
    'athlete_full_name': '',
    'country_name': '',
    'country_code': '',
    'country_3_letter_code': ''
})

df_results = df_results.fillna({
    'discipline_title': '',
    'event_title': '',
    'slug_game': '',
    'participant_type': '',
    'medal_type': '',
    'athletes': '',
    'rank_equal': '',
    'rank_position': '',
    'country_name': '',
    'country_code': '',
    'country_3_letter_code': '',
    'athlete_url': '',
    'athlete_full_name': '',
    'value_unit': '',
    'value_type': ''
})

df_athletes = df_athletes.fillna({
    'athlete_url': '',
    'athlete_full_name': '',
    'games_participations': '',
    'first_game': '',
    'athlete_year_birth': '',
    'athlete_medals': '',
    'bio': ''
})

df_medals_pandas = df_medals.toPandas()
df_results_pandas = df_results.toPandas()
df_hosts_pandas = df_hosts.toPandas()
df_athletes_pandas = df_athletes.toPandas()

df_medals_pandas = df_medals_pandas.fillna('')
df_results_pandas = df_results_pandas.fillna('')
df_hosts_pandas = df_hosts_pandas.fillna('')
df_athletes_pandas = df_athletes_pandas.fillna('')

try:
    connection = mysql.connector.connect(**config)
    if connection.is_connected():
        print("Connected to MySQL database")
        cursor = connection.cursor()
        cursor.execute("DROP TABLE IF EXISTS olympic_medals")
        cursor.execute("DROP TABLE IF EXISTS olympic_results")
        cursor.execute("DROP TABLE IF EXISTS olympic_hosts")
        cursor.execute("DROP TABLE IF EXISTS olympic_athletes")
        cursor.execute("""
            CREATE TABLE olympic_medals (
                id INT NOT NULL primary key auto_increment,
                discipline_title VARCHAR(255) NOT NULL,
                slug_game VARCHAR(255) NOT NULL,
                event_title VARCHAR(255) NOT NULL,
                event_gender VARCHAR(1) NOT NULL,
                medal_type VARCHAR(255) NOT NULL,
                participant_type VARCHAR(255) NOT NULL,
                participant_title VARCHAR(255) NOT NULL,
                athlete_url VARCHAR(255) NOT NULL,
                athlete_full_name VARCHAR(255) NOT NULL,
                country_name VARCHAR(255) NOT NULL,
                country_code VARCHAR(3) NOT NULL,
                country_3_letter_code VARCHAR(3) NOT NULL,
                host_id INT NULL,
                athlete_id INT NOT NULL
            )
        """)
        cursor.execute("""
            CREATE TABLE olympic_results (
                id INT NOT NULL primary key auto_increment,
                discipline_title VARCHAR(255) NOT NULL,
                event_title VARCHAR(255) NOT NULL,
                slug_game VARCHAR(255) NOT NULL,
                participant_type VARCHAR(255) NOT NULL,
                medal_type VARCHAR(255) NOT NULL,
                athletes TEXT NOT NULL,
                rank_equal VARCHAR(255) NOT NULL,
                rank_position VARCHAR(255) NOT NULL,
                country_name VARCHAR(255) NOT NULL,
                country_code VARCHAR(3) NOT NULL,
                country_3_letter_code VARCHAR(3) NOT NULL,
                athlete_url VARCHAR(255) NOT NULL,
                athlete_full_name VARCHAR(255) NOT NULL,
                value_unit VARCHAR(255) NOT NULL,
                value_type VARCHAR(255) NOT NULL
            )
        """)
        cursor.execute("""
            CREATE TABLE olympic_hosts (
                slug_game VARCHAR(255) NOT NULL,
                game_end_date DATETIME NOT NULL,
                game_start_date DATETIME NOT NULL,
                game_location VARCHAR(255) NOT NULL,
                game_name VARCHAR(255) NOT NULL,
                game_season VARCHAR(255) NOT NULL,
                game_year INT NOT NULL,
                host_id INT NOT NULL PRIMARY KEY
            )
        """)
        cursor.execute("""
            CREATE TABLE olympic_athletes (
                athlete_url VARCHAR(255),
                athlete_full_name VARCHAR(255),
                games_participations VARCHAR(255),
                first_game VARCHAR(255),
                athlete_year_birth VARCHAR(255),
                athlete_medals VARCHAR(255),
                bio TEXT,
                athlete_id INT NOT NULL PRIMARY KEY
            )
        """)
        print("Tables olympic_medals, olympic_results, olympic_hosts, and olympic_athletes created successfully.")
        
        insert_medals_query = """
            INSERT INTO olympic_medals (
                discipline_title, slug_game, event_title, event_gender, medal_type, 
                participant_type, participant_title, athlete_url, athlete_full_name, 
                country_name, country_code, country_3_letter_code, host_id, athlete_id
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        insert_results_query = """
            INSERT INTO olympic_results (
                discipline_title, event_title, slug_game, participant_type, medal_type, 
                athletes, rank_equal, rank_position, country_name, country_code, 
                country_3_letter_code, athlete_url, athlete_full_name, value_unit, value_type
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        insert_hosts_query = """
            INSERT INTO olympic_hosts (
                slug_game, game_end_date, game_start_date, game_location, game_name, 
                game_season, game_year, host_id
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        insert_athletes_query = """
            INSERT INTO olympic_athletes (
                athlete_url, athlete_full_name, games_participations, first_game, 
                athlete_year_birth, athlete_medals, bio, athlete_id
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """
        df_athletes_pandas = df_athletes_pandas.drop_duplicates(subset=['athlete_id'])
        cursor.executemany(insert_medals_query, df_medals_pandas.values.tolist())
        cursor.executemany(insert_results_query, df_results_pandas.values.tolist())
        cursor.executemany(insert_hosts_query, df_hosts_pandas.values.tolist())
        cursor.executemany(insert_athletes_query, df_athletes_pandas.values.tolist())
        
        connection.commit()
        print("DataFrames successfully written to the database.")
except Exception as e:
    print(f"Error: {e}")
finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")