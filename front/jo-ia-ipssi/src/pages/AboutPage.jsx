import React from 'react';
import Layout from '../components/Layout';
import DevCard from '../components/DevCard';
import TechnologyCard from '../components/TechnologyCard';

const AboutPage = () => {

    const participants = [
        {
            nom: 'GOMEZ ',
            prenom: 'Matias',
            photo: 'https://via.placeholder.com/150',
            description: 'Développeur web'
        },
        {
            nom: 'ALLART',
            prenom: 'Valentin',
            photo: 'https://via.placeholder.com/150',
            description: 'Développeuse backend'
        },
        {
            nom: 'AKODO',
            prenom: 'Berenger',
            photo: 'https://via.placeholder.com/150',
            description: 'Développeuse backend'
        },
        {
            nom: 'GOULLEY',
            prenom: 'Rudy',
            photo: 'https://via.placeholder.com/150',
            description: 'Développeuse backend'
        },
        {
            nom: 'DAVAL',
            prenom: 'Enzo',
            photo: 'https://via.placeholder.com/150',
            description: 'Développeuse backend'
        },
        {
            nom: 'GUERPILLON',
            prenom: 'Jonathan',
            photo: 'https://via.placeholder.com/150',
            description: 'Développeuse backend'
        },
        {
            nom: 'LAAKAD',
            prenom: 'Merwan',
            photo: 'https://via.placeholder.com/150',
            description: 'Développeuse backend'
        },
        {
            nom: 'LOGANATHAN',
            prenom: 'Julia',
            photo: 'https://via.placeholder.com/150',
            description: 'Développeuse backend'
        },
    ];
    const technologies = [
        {
            name: 'React',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
            description: 'Une bibliothèque JavaScript pour construire des interfaces utilisateur.'
          },
          {
            name: 'Bootstrap',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg',
            description: 'Un framework CSS populaire pour construire des sites web responsives et modernes.'
          },
          {
            name: 'Python',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
            description: 'Un langage de programmation interprété, interactif et orienté objet.'
          },
          {
            name: 'PySpark',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg',
            description: 'Une interface Python pour Apache Spark, un moteur de traitement de données en cluster rapide.'
          },
          {
            name: 'Pandas',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Pandas_logo.svg',
            description: 'Une bibliothèque Python pour l\'analyse de données et les manipulations de structures de données.'
          },
          {
            name: 'MySQL',
            logo: 'https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg',
            description: 'Un système de gestion de base de données relationnelle open source.'
          }
      
        // Ajoutez plus de technologies ici
    ];

    return (
        <Layout>    
            <div className='container mt-5'>
                <h1 className='text-center'>À propos</h1>
                <div className='row mt-5'>
                    <p className='fs-4'>Participants</p>
                    {participants.map((participant, index) => (
                        <div className='col-12 col-md-4 col-lg-3'>
                            <DevCard participant={participant} />
                        </div>
                    ))}
                </div>

                <div className="row mt-5">
                    <p className='fs-4'>Technologies Utilisées</p>
                    <div className="row justify-content-evenly mt-5">
                        {technologies.map((technology, index) => (
                            <div className='col-12 col-md-4 col-lg-3'>
                                <TechnologyCard technology={technology} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );  
};

export default AboutPage;
