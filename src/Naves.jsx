import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';



const Naves = () => {
  const [naves, setnaves] = useState([]);
  

  useEffect(() => {
    const fetchnaves = async () => {
      const response = await axios.get('https://www.swapi.tech/api/vehicles/');
      setnaves(response.data.results);
    };

    fetchnaves();
  }, []);


  return (
    <Container>
      <Row>
        {naves.map(nave => (
          <Col className='p-2' key={nave.uid} xs={12} md={6} lg={4}>
            <Card>
              <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/vehicles/${nave.uid}.jpg`} onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150"; }} />
              <Card.Body>
                <Card.Title>{nave.name}</Card.Title>
                <a href={`/naves/${nave.uid}`}>
                  <Button variant="primary">Ver Detalles</Button>
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Naves