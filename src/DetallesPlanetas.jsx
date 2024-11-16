import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Spinner } from 'react-bootstrap';

const DetallesPlanetas = () => {
  const { uid } = useParams();
  const [planeta, setplaneta] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        setCargando(true);
        const response = await axios.get(`https://www.swapi.tech/api/planets/${uid}`);
        setplaneta(response.data.result);
        setError(null);
      } catch (error) {
        setError(error.message);
        console.error('Error al obtener detalles del planeta:', error);
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
        planeta && (
          <Row>
            <Col style={{color:'yellow'}}>
              <Image src={`https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`} fluid />
              <h2 style={{color:'white'}}>{planeta.properties?.name || 'No se encontró el planeta'}</h2>
              <p>Clima: {planeta.properties?.climate}</p>
              <p>Diametro: {planeta.properties?.diameter} Km</p>
              <p>Gravedad: {planeta.properties?.gravity}</p>
              <p>Poblacion: {planeta.properties?.population} Habitantes</p>
              <p>Geografia: {planeta.properties?.terrain }</p>           
            </Col>
          </Row>
        )
      )}
    </Container>
  );
};

export default DetallesPlanetas;