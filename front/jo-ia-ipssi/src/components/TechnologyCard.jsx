import React from 'react';
import { Card } from 'react-bootstrap';

const TechnologyCard = ({ technology }) => {
  return (
    <Card className='border-0 mt-4'>
      <Card.Img className='w-50 m-auto' variant="top" src={technology.logo} />
      <Card.Body className='text-center'>
        <Card.Title>{technology.name}</Card.Title>
        <Card.Text>{technology.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TechnologyCard;