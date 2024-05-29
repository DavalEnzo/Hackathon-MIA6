from fastapi import HTTPException

import os

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '1'

import tensorflow as tf
import joblib
import numpy as np
import pandas as pd


def f_prediction():
    try:
        model = tf.keras.models.load_model('./model/olympic_medal_prediction.h5', compile=False)
        scaler = joblib.load('./model/olympic_medal_prediction_scaler.pkl')

        # Chargement des données
        hist_olympData = pd.read_csv('./olympic_data_cleaned.csv')

        # Séparation des données avant et après 2020
        bf2020 = hist_olympData[hist_olympData['game_year'] < 2020]
        jo2020 = hist_olympData[hist_olympData['game_year'] == 2020]

        # Définition des features et de la target
        features = ['sports', 'epreuves', 'game_part', 'prec_game_medal', 'prec_game_gold', 'prec_game_silver',
                    'prec_game_bronze']

        # Préparation des données pour la prédiction de 2024
        jo2024 = jo2020.copy()
        jo2024['game_year'] = 2024

        # Utilisation des données de 2020 pour prédire 2024
        jo2024['prec_game_medal'] = jo2020['total_medals']
        jo2024['prec_game_gold'] = jo2020['gold_medals']
        jo2024['prec_game_silver'] = jo2020['silver_medals']
        jo2024['prec_game_bronze'] = jo2020['bronze_medals']

        # Extraction des features pour 2024
        X_2024 = jo2024[features]

        # Standardisation des features
        X_2024_scaled = scaler.transform(X_2024)

        # Prediction des médailles pour 2024
        y_pred_2024 = model.predict(X_2024_scaled)

        # Résultats de la prédiction
        results_2024 = pd.DataFrame({
            'Country': jo2024['country_name'],
            'Predicted Gold': np.abs(np.round(y_pred_2024[:, 0])),
            'Predicted Silver': np.abs(np.round(y_pred_2024[:, 1])),
            'Predicted Bronze': np.abs(np.round(y_pred_2024[:, 2]))
        })

        return results_2024.to_dict(orient='records')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))