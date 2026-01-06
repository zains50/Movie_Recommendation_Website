import pickle 
from backend.recommendation_engine.get_movie_recommendations import get_model_rec

def get_recommendations(watch_list):

    with open("_data/_movie_emb_processed/uuids.pkl", "rb") as f:
        uuid_list = pickle.load(f)
    index_listed = [uuid_list.index(x) for x in watch_list]
    recs = get_model_rec(0,0,0,index_listed,0.7,only_after_2000=True,k=1000)
    uuid_recommendations = [uuid_list[x] for x in recs]
    return uuid_recommendations