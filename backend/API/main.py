from typing import Union 
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from backend.recommendation_engine.rec_engine import get_recommendations
from backend.API.process_search_query import search_router  # import the router
from backend.API.get_movie_info import movie_information
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(search_router)
app.include_router(movie_information)
items_db = {}


class Item(BaseModel): 
    name: str
    price: float
    if_offer: Union[bool, None] = None

class User(BaseModel):
    name: str
    password: str
    email: str

# get recommendations
@app.get("/recommend/{watch_list}")
def create_user(watch_list : str):
    watch_list = watch_list.split(",")
    recs = get_recommendations(watch_list)
    return {"recommendations" : recs}

@app.get("/")
def read_root():
    return {"Hello" : "i am a noob"}

