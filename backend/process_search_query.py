from pydantic import BaseModel
from database.database import DATABASE_CONNECTION
from backend.search_engine.search_engine import SEARCH_ENGINE

from fastapi import APIRouter
search_router = APIRouter()

class SearchQuery(BaseModel):
    search_query: str 

@search_router.get("/search/{search_query}")
def get_search_values(search_query: str):
    search_query_dict = {"message" : "search_query_results"}
    return_values_uuid = SEARCH_ENGINE.search(search_query=search_query, return_k=100)
    search_query_dict = {"results" : return_values_uuid}

    return search_query_dict

