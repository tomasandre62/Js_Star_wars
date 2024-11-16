import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';




const Planetas = () => {
  const [planetas, setplanetas] = useState([]);
  

  useEffect(() => {
    const fetchplanetas = async () => {
      const response = await axios.get('https://www.swapi.tech/api/planets/');
      setplanetas(response.data.results);
    };

    fetchplanetas();
  }, []);


  return (
    <Container>
      <Row>
        {planetas.map(planeta => (
          <Col className='p-2' key={planeta.uid} xs={12} md={6} lg={4}>
            <Card>
              <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/planets/${planeta.uid}.jpg`} onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150"; }} />
              <Card.Body>
                <Card.Title>{planeta.name}</Card.Title>
                <a href={`/planetas/${planeta.uid}`}>
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

export default Planetas