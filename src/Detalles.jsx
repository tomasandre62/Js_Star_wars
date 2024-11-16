import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Spinner } from 'react-bootstrap';

const Detalles = () => {
  const { uid } = useParams();
  const [personaje, setPersonaje] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        setCargando(true);
        const response = await axios.get(`https://swapi.tech/api/people/${uid}`);
        setPersonaje(response.data.result);
        setError(null);
      } catch (error) {
        setError(error.message);
        console.error('Error al obtener detalles del personaje:', error);
      } finally {
        setCargando(false);
      }
    };

    fetchDetalles();
  }, [uid]);

  return (
    <Container>
      {error && <p>Error al cargar los datos: {error}</p>}
      {cargando ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      ) : (
        personaje && (
          <Row>
            <Col style={{color:'yellow'}}>
              <Image src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`} fluid />
              <h2 style={{color:'white'}}>{personaje.properties?.name || 'No se encontró el personaje'}</h2>
              <p>Nacimiento: {personaje.properties?.birth_year}</p>
              <p>Altura: {personaje.properties?.height} cm</p>
              <p>Peso: {personaje.properties?.mass} kg</p>
              <p>Color de pelo: {personaje.properties?.hair_color}</p>
            </Col>
          </Row>
        )
      )}
    </Container>
  );
};

export default Detalles;