import React from 'react'
import Layout from '../components/Layout'
import MapPositionTorch from '../components/MapPositionTorch'

export default function PositionTorch() {
    return (
        <Layout>
            <div className="container mt-5">
                <h1 className="text-center">Position de la flamme</h1>
                <p className='text-center mt-4'>La flamme olympique commence son parcours à Olympie, en Grèce, où elle est allumée lors d'une cérémonie traditionnelle. Elle est ensuite transportée par relais à travers plusieurs pays, portée par des athlètes, des célébrités et des citoyens honorés. Ce voyage symbolise la paix et l'unité, en passant par des sites historiques et culturels avant d'arriver à la ville hôte des Jeux Olympiques pour la cérémonie d'ouverture.</p>
                <div className="row mt-4">
                    <div className="col-12">
                        <MapPositionTorch />
                    </div>
                </div>
                <div className="col-12">
                    <p>Source : <a href="https://data.paris2024.org/pages/accueil/">https://data.paris2024.org/pages/accueil/</a></p>
                </div>
            </div>
        </Layout>
    )
}
