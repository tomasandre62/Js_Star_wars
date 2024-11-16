import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Spinner } from 'react-bootstrap';

const DetallesNaves = () => {
  const { uid } = useParams();
  const [nave, setnave] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        setCargando(true);
        const response = await axios.get(`https://www.swapi.tech/api/vehicles/${uid}`);
        setnave(response.data.result);
        setError(null);
      } catch (error) {
        setError(error.message);
        console.error('Error al obtener detalles del nave:', error);
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
        nave && (
          <Row>
            <Col style={{color:'yellow'}}>
              <Image src={`https://starwars-visualguide.com/assets/img/vehicles/${uid}.jpg`} fluid />
              <h2 style={{color:'white'}}>{nave.properties?.name || 'No se encontró el nave'}</h2>
              <p>Capacidad: {nave.properties?.cargo_capacity} Kg</p>
              <p>Tiempo de Consumibles: {nave.properties?.consumables}</p>
              <p>Costo: {nave.properties?.cost_in_credits} Creditos</p>
              <p>Personal necesario: {nave.properties?.crew}</p>
              <p>Longitud: {nave.properties?.length } Mts.</p>
              <p>Fabricante: {nave.properties?.manufacturer }</p>
              <p>Velocidad Maxima: {nave.properties?.max_atmosphering_speed } Km/h</p>
              
            </Col>
          </Row>
        )
      )}
    </Container>
  );
};

export default DetallesNaves;