import React from 'react';
import Layout from '../components/Layout';
import DevCard from '../components/DevCard';
import TechnologyCard from '../components/TechnologyCard';

const AboutPage = () => {

    const participants = [
        {
            nom: 'GOMEZ ',
            prenom: 'Matias',
            photo: 'https://media.licdn.com/dms/image/C4D03AQFl5qpvakMr6Q/profile-displayphoto-shrink_800_800/0/1616960433681?e=1722470400&v=beta&t=U2jdiZfyqfGJaDK01iOMyHeJNFWzWdO1F9527hFy-jk',
            description: 'Développeur web',
            link: 'https://fr.linkedin.com/in/matias-gomez-99273120a'
        },
        {
            nom: 'ALLART',
            prenom: 'Valentin',
            photo: 'https://media.licdn.com/dms/image/C4E03AQG3KtYt4kiXqw/profile-displayphoto-shrink_800_800/0/1657644446769?e=1722470400&v=beta&t=54yxrC0mQYwCHWzC5BOTeMb_2UXeMTFP-vFDMA_Fqbc',
            description: 'Data scientist',
            link: 'https://www.linkedin.com/in/valentin-allart-137a36223/'
        },
        {
            nom: 'AKODO',
            prenom: 'Berenger',
            photo: 'https://media.licdn.com/dms/image/D4E03AQHiE4YoNZxkIw/profile-displayphoto-shrink_800_800/0/1703530091184?e=1722470400&v=beta&t=-fbhGG6XS0y5kD7adxtH8z985YJGAAb2qztK043Kp7A',
            description: 'Développeur web',
            link: 'https://www.linkedin.com/in/bera-kod/'

        },
        {
            nom: 'GOULLEY',
            prenom: 'Rudy',
            photo: 'https://media.licdn.com/dms/image/D4E35AQFYlI6rqMiJFQ/profile-framedphoto-shrink_800_800/0/1710174754416?e=1717506000&v=beta&t=XX6DYZ9LrZ3ewv99gMQ06_4QYDJLv5N5TD3dho-mGys',
            description: 'Développeur web',
            link: 'https://www.linkedin.com/in/rudy-goulley-807a921b9/'
        },
        {
            nom: 'DAVAL',
            prenom: 'Enzo',
            photo: 'https://media.licdn.com/dms/image/D4E03AQHNgS8LoPrM4Q/profile-displayphoto-shrink_800_800/0/1671181451795?e=1722470400&v=beta&t=1WyVYmxGRPqbWIGDaZQpZg6bJRq7nht5aE6EqNw1MkM',
            description: 'Développeur web',
            link: 'https://www.linkedin.com/in/enzo-daval-7927b01ba/'
        },
        {
            nom: 'LAAKAD',
            prenom: 'Merwan',
            photo: 'https://media.licdn.com/dms/image/D4E03AQG6h8Gz5vw5UQ/profile-displayphoto-shrink_800_800/0/1716983355161?e=1722470400&v=beta&t=uPNA-NDuswkFgBNQxl_CGep7mc8wokjNX4KNraRqK3s',
            description: 'Développeur web',
            link: 'https://www.linkedin.com/in/merwan-laakad/'
        },
        {
            nom: 'LOGANATHAN',
            prenom: 'Julia',
            photo: 'https://media.licdn.com/dms/image/D4E03AQFrza71p20LuA/profile-displayphoto-shrink_800_800/0/1690307538807?e=1722470400&v=beta&t=ntNGuMWeG7lFk9bSsyd1LIZzAK7Two1QsR0tKYZZW7Q',
            description: 'Développeuse web',
            link: 'https://www.linkedin.com/in/julia-loganathan-a28767172/'
        },
        {
            nom: 'GUERPILLON',
            prenom: 'Jonathan',
            photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png',
            description: 'Développeur web',
            link: 'https://www.linkedin.com/in/enzo-daval-7927b01ba/'
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
            name: 'Font Awesome',
            logo: 'https://static-00.iconduck.com/assets.00/font-awesome-icon-512x512-vwz08fde.png',
            description: 'Une bibliothèque d\'icônes vectorielles et d\'outils pour les utiliser facilement sur le web.'
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
        },
        {
            name: 'Python',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
            description: 'Un langage de programmation interprété, interactif et orienté objet.'
        }, 
        {
            name: "scikit-learn",
            logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
            description: "Une bibliothèque open source pour l'apprentissage automatique en Python."
        }, 
        {
            name: "FastAPI",
            logo: "https://cdn.worldvectorlogo.com/logos/fastapi.svg",
            description: "Un framework web et api léger pour Python."
        }, 
        {
            name: "Leaflet",
            logo: "https://leafletjs.com/docs/images/logo.png",
            description: "Une bibliothèque JavaScript pour les cartes interactives."
        },
        {
            name: "Chart.js",
            logo: "https://everttimberg.io/projects/chartjs/logo.png",
            description: "Une bibliothèque JavaScript pour créer des graphiques interactifs."
        }
    ];

    const hosts = [
        {
            name: 'Koyeb',
            logo: 'https://walterbillet.com/wp-content/uploads/logo-koyeb-1.png',
            description: 'Une plateforme de développement cloud qui permet de créer, déployer et scaler des applications en quelques minutes.'
        },
        {
            name: 'Vercel',
            logo: 'https://cdn.worldvectorlogo.com/logos/vercel.svg',
            description: 'Une plateforme cloud pour les applications web statiques et JAMstack.'
        },
        {
            name: 'Always Data',
            logo: 'https://cdn.icon-icons.com/icons2/3911/PNG/512/alwaysdata_logo_icon_247653.png',
            description: 'Un hébergeur web qui propose des solutions d\'hébergement mutualisé, cloud et dédié.'
        }
    ];

    return (
        <Layout>

            <div className='container mt-5'>
                <h1 className='text-center'>À propos</h1>

                <div className='row mt-5 justify-content-evenly'>
                    <p className='fs-4'>Participants</p>
                    {participants.map((participant, index) => (
                        <div className='col-12 col-md-4 col-lg-2 '>
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

                <div className='row mt-5 justify-content-evenly'>
                    <p className='fs-4'>Hébergeurs</p>
                    {hosts.map((host, index) => (
                        <div className='col-12 col-md-4 col-lg-2 '>
                            <TechnologyCard technology={host} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default AboutPage;
