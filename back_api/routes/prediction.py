from fastapi import APIRouter, HTTPException
from services.prediction import f_prediction

prediction = APIRouter()

@prediction.get("/")
def get_prediction():
    prediction_list = f_prediction()
    try:
        return prediction_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))