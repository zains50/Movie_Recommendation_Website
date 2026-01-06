import psycopg2
import json 
from psycopg2 import sql 

from database.database  import DATABASE_CONNECTION


# Code to create tables 
def add_tables_to_database(): 
    conn = DATABASE_CONNECTION.conn 

    conn.autocommit = True 
    cursor = conn.cursor()

    with open("database/sql_scripts/create_tables.sql") as f:
        cursor.execute(f.read())

    print("Tables created")

    cursor.close()
    conn.close() 

add_tables_to_database()