from pydantic import BaseModel
from database.database import DATABASE_CONNECTION
from fastapi import APIRouter
from uuid import UUID

movie_information = APIRouter()


@movie_information.get("/movie_information/{uuid}")
def get_movie_information_from_uuid(uuid: UUID):
    uuid = str(uuid)
    movie_information = DATABASE_CONNECTION.get_movie_json_from_uuid(uuid)
    return movie_information


@movie_information.get("/movie_title/{uuid}")
def get_movie_title_from_uuid(uuid: str):
    movie_title = DATABASE_CONNECTION.get_movie_title_from_uuid(uuid)
    return movie_title

@movie_information.get("/movie_genre/{uuid}")
def get_movie_genre_from_uuid(uuid: str):
    movie_title = DATABASE_CONNECTION.get_movie_genres_from_uuid(uuid)
    return movie_title

@movie_information.get("/get_all_movie_order_by/{order_by}")
def get_all_movie_order_by(order_by : str):
    movie_uuids = DATABASE_CONNECTION.get_all_movie_uuid_order_by(order_by)
    return movie_uuids

@movie_information.get("/get_all_movie_order_by/{order_by}/topk={topk}")
def get_all_movie_order_by_topk(order_by : str, topk : int):
    movie_uuids = DATABASE_CONNECTION.get_all_movie_uuid_order_by(ranking_order=order_by, topk=topk)
    return movie_uuids