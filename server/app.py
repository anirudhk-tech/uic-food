from fastapi import FastAPI
import pandas as pd

app = FastAPI()
data = pd.read_csv("data/restaurants.csv")