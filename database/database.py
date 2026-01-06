import json 
import psycopg2
from tqdm import tqdm
from psycopg2 import sql
from datetime import datetime
import os
from dotenv import load_dotenv

class database:
    def __init__(self):
        print("DATABASE.py : CONNECTING TO POSTGRES DATABASE")
        load_dotenv()   

        self.conn = psycopg2.connect(
            dbname=os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST"),
            port=os.getenv("DB_PORT"),
        )
        self.conn.autocommit = True 
        self.cursor = self.conn.cursor()
        print("DATABASE.py : CONNECTED TO POSTGRES DATABASE")
    
    def get_movie_json_from_uuid(self, uuid):
        # Step 1: Get col names
        movie_info_dict = {}

        query= sql.SQL("SELECT * FROM MOVIE where movie_id=%s")
        self.cursor.execute(query, (uuid, ))
        colnames = [desc[0] for desc in self.cursor.description]

        row = self.cursor.fetchone()

        if row is None:
            return {}

        for i in range(len(colnames)):
            movie_info_dict[str(colnames[i])] = row[i]

        return movie_info_dict

    def get_movie_genres_from_uuid(self, uuid):
        query = sql.SQL("SELECT GENRE.genre_name "  
                        "FROM movie_genre " 
                        "LEFT JOIN GENRE ON movie_genre.genre_id = GENRE.genre_id " 
                        "WHERE movie_id=(SELECT movie_id FROM MOVIE where movie_id=%s)")
        self.cursor.execute(query, (uuid, ))
        genres = self.cursor.fetchall()
        genres_formatted = [i[0] for i in genres]
        genres_dict = {"Genre":genres_formatted}
        return genres_dict

    def get_movie_title_from_uuid(self, uuid):
        #  SELECT movie_title FROM MOVIE where movie_id='af62396b-5c8b-4f05-b3db-418f923046b1';
        query = sql.SQL("SELECT movie_title FROM MOVIE where movie_id=%s")
        self.cursor.execute(query, (uuid, ))
        with self.conn.cursor() as cursor:
            cursor.execute(query, (uuid,))
            row = cursor.fetchone()
    
        if row is None:
            return {"Title":"N/A"}
        return {"Title" : row[0]}
    
    def get_all_movie_uuid_order_by(self,ranking_order, asc=False,topk=None):
        order_by = 'ASC' if asc else "DESC"
        ranking_orders = ["movie_title", "year","released","runtime_mins","imdb_rating","imdb_votes","box_office"]
        query = sql.SQL("SELECT movie_id FROM MOVIE WHERE {col1} is not null ORDER BY {col1} {col2}").format(
            col1=sql.Identifier(ranking_order),
            col2=sql.SQL(order_by)
        )
        self.cursor.execute(query, (ranking_order, ranking_order))
        uuids = self.cursor.fetchall()
        
        if topk is None:
            uuids = uuids[:1000]
        else:
            assert topk > 0 and topk < 1000 
            uuids = uuids[:topk]

        uuids_formatted = [i[0] for i in uuids]
        uuids_formatted_dict = {"uuid":uuids_formatted}
        return uuids_formatted_dict



    


DATABASE_CONNECTION = database()
# a = DATABASE_CONNECTION.get_movie_order_by("box_office")
# print(a[:20])
# a = DATABASE_CONNECTION.get_movie_genres_from_uuid('a5b1f81d-e035-4106-9e87-cb1cf287f9dd')
# print(a)