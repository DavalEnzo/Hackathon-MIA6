import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const DevCard = ({ participant }) => {
    return (
        <Card className='mt-3 border-0'>
            <Card.Img className='rounded-circle' variant="top" src={participant.photo} />
            <Card.Body>
                <Card.Title className='text-center'>{participant.nom} {participant.prenom}</Card.Title>
                <div className='text-center'>
                    <Card.Text>{participant.description}</Card.Text>
                    <a target='_blank' href={participant.link} style={{color: '#0a66c2'}} className='text-primary fs-2'>
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </div>
            </Card.Body>
        </Card>
    );
};

export default DevCard;