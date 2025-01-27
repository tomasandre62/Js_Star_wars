import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';

const Planetas = () => {
  const [planetas, setPlanetas] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchPlanetas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/planets');
        setPlanetas(response.data);
        const responseFavoritos = await axios.get('http://localhost:5000/users/favorites?usuario_id=1');
        setFavoritos(responseFavoritos.data.filter(fav => fav.planeta_id).map(fav => fav.planeta_id));
      } catch (error) {
        console.error("Error al obtener los planetas:", error);
      }
    };

    fetchPlanetas();
  }, []);

  const handleFavorito = async (planeta) => {
    try {
      let nuevosFavoritos = [...favoritos];
      if (favoritos.includes(planeta.id)) {
        await axios.delete(`http://localhost:5000/favorite/planet/${planeta.id}`, { data: { usuario_id: 1 } });
        nuevosFavoritos = nuevosFavoritos.filter(id => id !== planeta.id);
      } else {
        await axios.post(`http://localhost:5000/favorite/planet/${planeta.id}`, { usuario_id: 1 });
        nuevosFavoritos.push(planeta.id);
      }
      setFavoritos(nuevosFavoritos);
    } catch (error) {
      console.error("Error al gestionar favorito:", error);
    }
  };

  const handleEliminarFavorito = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/favorite/planet/${id}`, { data: { usuario_id: 1 } });
      setFavoritos(favoritos.filter(favId => favId !== id));
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
    }
  };

  const handleBorrar = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/planets/${id}`);
      setPlanetas(planetas.filter(planeta => planeta.id !== id));
    } catch (error) {
      console.error("Error al borrar el planeta:", error);
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
            const planetaFavorito = planetas.find((p) => p.id === id);
            return (
              planetaFavorito && (
                <Dropdown.Item key={id}>
                  <div>
                    {planetaFavorito.nombre}
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
        {planetas.map(planeta => (
          <Col className='p-2' key={planeta.id} xs={12} md={6} lg={4}>
            <Card>
              <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/planets/${planeta.id}.jpg`} onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }} />
              <Card.Body>
                <Card.Title>{planeta.nombre}</Card.Title>
              </Card.Body>
              <Row className='d-flex justify-content-start p-2'>
                <Col className='col-2'>
                  <Button variant={favoritos.includes(planeta.id) ? 'warning' : 'primary'} onClick={() => handleFavorito(planeta)}>
                    {favoritos.includes(planeta.id) ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
                  </Button>
                </Col>
                <Col className='col-2'>
                  <Button variant="danger" onClick={() => handleBorrar(planeta.id)}>Borrar</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Planetas;
