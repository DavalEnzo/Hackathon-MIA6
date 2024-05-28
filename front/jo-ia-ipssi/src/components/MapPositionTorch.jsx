import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import L from 'leaflet';

export default function MapPositionTorch() {
    const [error, setError] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const [formattedCoordinates, setFormattedCoordinates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingData(true);
            const limit = 20; // Set limit for each request
            const totalRows = 4000;
            const numRequests = Math.ceil(totalRows / limit);
            let allData = [];

            try {
                for (let i = 0; i < numRequests; i++) {
                    const offset = i * limit;
                    const urlAPI = `https://data.paris2024.org/api/explore/v2.1/catalog/datasets/games_map_torch_position/records?where=start_datetime%20%3E%20%222024-05-07T07%3A59%3A46%2B00%3A00%22&limit=${limit}&offset=${offset}`;
                    const response = await axios.get(urlAPI);
                    allData = allData.concat(response.data.results);
                }

                const coordinates = allData.map(result => {
                    return [parseFloat(result.latitude).toFixed(6), parseFloat(result.longitude).toFixed(6)];
                });
                setFormattedCoordinates(coordinates);
            } catch (error) {   
                setError(error);
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, []);

    if (loadingData) {
        return (
            <div className="mt-5 text-center">
                <p>
                    <FontAwesomeIcon className="fs-2" icon={faSpinner} spin />
                </p>
                <p>Chargement...</p>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    const startIcon = new L.Icon({
        iconUrl: 'https://cdn-icons-png.freepik.com/512/495/495468.png', // Icon for the starting point
        iconSize: [50, 50],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const endIcon = new L.Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/1978/1978812.png', // Icon for the ending point
        iconSize: [50, 50],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const center = [46.866667, 2.733333];

    const startPoint = formattedCoordinates.length > 0 ? formattedCoordinates[0] : null;
    const endPoint = formattedCoordinates.length > 1 ? formattedCoordinates[formattedCoordinates.length - 1] : null;

    return (
        <MapContainer center={center} zoom={6} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {startPoint && (
                <Marker position={startPoint} icon={startIcon}>
                    <Popup>
                        <span>Départ: {startPoint[0]}, {startPoint[1]}</span>
                    </Popup>
                </Marker>
            )}
            {endPoint && (
                <Marker position={endPoint} icon={endIcon}>
                    <Popup>
                        <span>Arrivée: {endPoint[0]}, {endPoint[1]}</span>
                    </Popup>
                </Marker>
            )}
            <Polyline positions={formattedCoordinates} color="blue" />
        </MapContainer>
    );
}
