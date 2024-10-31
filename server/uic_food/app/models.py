from django.db import models
import pandas as pd
import json

data = pd.read_csv("C:/Users/Anirudh/Documents/myapps/uic-food/server/uic_food/app/data/restaurants.csv")
df = pd.DataFrame(data)

mexican_food = df[df["category_title"] == "Mexican"]
italian_food = df[df["category_title"] == "Italian"]
indian_food = df[df["category_title"] == "Indian"]
chinese_food = df[df["category_title"] == "Chinese"]
thai_food = df[df["category_title"] == "Thai"]
japanese_food = df[df["category_title"] == "Japanese"]
american_food = df[df["category_title"].isin(["American", "Burgers", "Pizza", "Salad", "Hot Dogs", "Sandwiches"])]

def return_data ():
    data_dict = df.to_dict(orient='records')
    return data_dict

def return_filtered_data (filters):
    categories = filters["categories"]
    delivery_only = filters["delivery_only"]
    veggie_only = filters["veggie_only"]
    max_price = filters["max_price"]
    max_distance = filters["max_distance"]
    
    filtered_data = pd.DataFrame()

    if len(categories) == 0:
        filtered_data = return_data()

    for category in categories:
        if category == "Italian":
            filtered_data = pd.concat([filtered_data, italian_food])
        elif category == "Chinese":
            filtered_data = pd.concat([filtered_data, chinese_food])
        elif category == "Mexican":
            filtered_data = pd.concat([filtered_data, mexican_food])
        elif category == "Indian":
            filtered_data = pd.concat([filtered_data, indian_food])
        elif category == "Thai":
            filtered_data = pd.concat([filtered_data, thai_food])
        elif category == "Japanese":
            filtered_data = pd.concat([filtered_data, japanese_food])
        else:
            filtered_data = pd.concat([filtered_data, american_food])

    print("Filtered data: ", json.dumps(filtered_data.to_dict(orient="records"), indent=4, sort_keys=True))
    
