import React from 'react';
import { Card, Button } from 'react-bootstrap';

const DevCard = ({ participant }) => {
    return (
        <Card className='mt-3'>
            <Card.Img variant="top" src={participant.photo} />
            <Card.Body>
                <Card.Title className='text-center'>{participant.nom} {participant.prenom}</Card.Title>
                <div className='text-center'>
                    <Card.Text>{participant.description}</Card.Text>
                    <Button variant="primary">Voir plus</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default DevCard;