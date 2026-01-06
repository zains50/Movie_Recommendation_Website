import json  
import os 
import torch 
import requests
import numpy as np 
from tqdm import tqdm
import pickle 
from PIL import Image 
from sentence_transformers import  SentenceTransformer

data_file =  "_data/movie_info_with_uuid.json"

with open(data_file, encoding="utf-8") as f:
    genres = []
    movie_information = json.load(f)


TEXT_MODEL  = SentenceTransformer("all-MiniLM-L6-v2")
IMG_MODEL = SentenceTransformer("clip-ViT-B-32")

def encodeText(text_list):
    emb = TEXT_MODEL.encode(text_list)
    return emb

def is_valid_image(path):
    try:
        with Image.open(path) as img:
            img.load()   # force decode
        return True
    except Exception as e:
        print(e)

        return False


dummy = IMG_MODEL.encode(Image.new("RGB", (32, 32)))
emb_dim = len(dummy)

def encodeImage(movie_poster_file):
    # get embedding dimension by encoding a dummy image
    file =  movie_poster_file
    if is_valid_image(file):
        img = Image.open(file).convert("RGB")
        emb = IMG_MODEL.encode(img)
    else:
        emb = np.zeros(emb_dim)

    return emb

def generate_movie_emb():
    uuids = [] 
    all_emb = []

    genres_dict = {
            "Action": 0,
            "Adventure": 1,
            "Animation": 2,
            "Children's": 3,
            "Comedy": 4,
            "Crime": 5,
            "Documentary": 6,
            "Drama": 7,
            "Fantasy": 8,
            "Film-Noir": 9,
            "Horror": 10,
            "Musical": 11,
            "Mystery": 12,
            "Romance": 13,
            "Sci-Fi": 14,
            "Thriller": 15,
            "War": 16,
            "Western": 17
    }
    

    for m in tqdm(movie_information):
        title = m.get("Title", f"Movie")
        year = m.get("Year", "N/A")
        genres_raw = m.get("Genre", "")
        genre_arr = genres_raw.split(", ")
        summary = m.get("Plot", "")
        movie_id = m.get("UUID")
        uuids.append(movie_id)
        # TEXT EMBEDDING
        if genres_raw == "NOT_FOUND":
            te = encodeText(f"{title}: Not found")
        else:
            te = encodeText(f"{title}: {summary}, {genres_raw}")
        genre_tensor = torch.zeros(18)
        for g in genre_arr:
            genre_indx = genres_dict.get(g,-1)
            if genre_indx == -1:
                continue
            else:
                genre_tensor[genre_indx] = 1


        # IMAGE EMBEDDING
        ie = encodeImage(f"movie_system_frontend/public/_posters/{movie_id}.jpg")

        combined_emb = np.concatenate([te,ie])
        combined_emb = torch.from_numpy(combined_emb)
        combined_emb = torch.concat([genre_tensor, combined_emb])
        all_emb.append(combined_emb)

    all_emb = torch.stack(all_emb)
    return all_emb, uuids
        

all_emb, uuids = generate_movie_emb()
torch.save(all_emb, "all_emb.pt")

with open("uuid_map.pkl", "wb") as f:
    pickle.dump(uuids, f)
