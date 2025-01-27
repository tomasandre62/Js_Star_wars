import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';

const Personajes = () => {
  const [personajes, setPersonajes] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchPersonajes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/people');
        setPersonajes(response.data);
        const responseFavoritos = await axios.get('http://localhost:5000/users/favorites?usuario_id=1');
        setFavoritos(responseFavoritos.data.filter(fav => fav.personaje_id).map(fav => fav.personaje_id));
      } catch (error) {
        console.error("Error al obtener los personajes:", error);
      }
    };

    fetchPersonajes();
  }, []);

  const handleFavorito = async (personaje) => {
    try {
      let nuevosFavoritos = [...favoritos];
      if (favoritos.includes(personaje.id)) {
        await axios.delete(`http://localhost:5000/favorite/character/${personaje.id}`, { data: { usuario_id: 1 } });
        nuevosFavoritos = nuevosFavoritos.filter(id => id !== personaje.id);
      } else {
        await axios.post(`http://localhost:5000/favorite/character/${personaje.id}`, { usuario_id: 1 });
        nuevosFavoritos.push(personaje.id);
      }
      setFavoritos(nuevosFavoritos);
    } catch (error) {
      console.error("Error al gestionar favorito:", error);
    }
  };

  const handleEliminarFavorito = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/favorite/character/${id}`, { data: { usuario_id: 1 } });
      setFavoritos(favoritos.filter(favId => favId !== id));
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
    }
  };

  const handleBorrar = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/people/${id}`);
      setPersonajes(personajes.filter(personaje => personaje.id !== id));
    } catch (error) {
      console.error("Error al borrar el personaje:", error);
    }
  };

  return (
    <Container>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Favoritos ({favoritos.length})
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {favoritos.map((id) => {
            const personajeFavorito = personajes.find((p) => p.id === id);
            return (
              personajeFavorito && (
                <Dropdown.Item key={id}>
                  <div>
                    {personajeFavorito.nombre}
                    <Button style={{ marginLeft: '5px' }} variant="link" size="sm" onClick={(e) => {
                      e.stopPropagation(); handleEliminarFavorito(id);
                    }}>
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </div>
                </Dropdown.Item>
              )
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <Row>
        {personajes.map(personaje => (
          <Col className='p-2' key={personaje.id} xs={12} md={6} lg={4}>
            <Card>
              <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/characters/${personaje.id}.jpg`} onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }} />
              <Card.Body>
                <Card.Title>{personaje.nombre}</Card.Title>
              </Card.Body>
              <Row className='d-flex justify-content-start p-2'>
                <Col className='col-2'>
                  <Button variant={favoritos.includes(personaje.id) ? 'warning' : 'primary'} onClick={() => handleFavorito(personaje)}>
                    {favoritos.includes(personaje.id) ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
                  </Button>
                </Col>
                <Col className='col-2'>
                  <Button variant="danger" onClick={() => handleBorrar(personaje.id)}>Borrar</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Personajes;
