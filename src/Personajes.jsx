import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';


const Personajes = () => {
  const [personajes, setPersonajes] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchPersonajes = async () => {
      const response = await axios.get('https://swapi.tech/api/people/');
      setPersonajes(response.data.results);
      const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos')) || [];
      setFavoritos(favoritosGuardados);
    };

    fetchPersonajes();
  }, []);
  

  const handleFavorito = (personaje) => {
    const nuevosFavoritos = [...favoritos];
    const indice = nuevosFavoritos.indexOf(personaje.uid);
    if (indice !== -1) {
      nuevosFavoritos.splice(indice, 1);
    } else {
      nuevosFavoritos.push(personaje.uid);
    }
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
  };

  const handleEliminarFavorito = (id) => {
    const nuevosFavoritos = favoritos.filter((favId) => favId !== id);
    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
  };


  return (
    <Container>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Favoritos ({favoritos.length})
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {favoritos.map((id) => {
            const personajeFavorito = personajes.find((p) => p.uid === id);
            return (
              <Dropdown.Item key={id}>
                <a
                  href={`/personajes/${personajeFavorito.uid}`}
                  onClick={(e) => {
                    e.preventDefault(); 
                    window.location.href = `/personajes/${personajeFavorito.uid}`; 
                    e.stopPropagation(); 
                  }}
                >
                  {personajeFavorito.name}
                </a>
                <Button style={{ marginLeft: '5px' }} variant="link" size="sm" onClick={(e) => {
                  e.stopPropagation(); handleEliminarFavorito(id);
                }}>
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <Row>
        {personajes.map(personaje => (
          <Col className='p-2' key={personaje.uid} xs={12} md={6} lg={4}>
            <Card>
              <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/characters/${personaje.uid}.jpg`} onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }} />
              <Card.Body>
                <Card.Title>{personaje.name}</Card.Title>
              </Card.Body>
              <Row className='d-flex justify-content-start p-2'>
                <Col className='col-5'>
                  <a href={`/personajes/${personaje.uid}`}>
                    <Button variant="primary">Ver Detalles</Button>
                  </a>
                </Col>
                <Col className='col-2'>
                  <Button variant={favoritos.includes(personaje.uid) ? 'warning' : 'primary'} onClick={() => handleFavorito(personaje)}>
                    {favoritos.includes(personaje.uid) ? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Personajes