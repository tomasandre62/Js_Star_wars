import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

const Admin = () => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('personaje');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { nombre, descripcion, imagen };
    try {
      if (tipo === 'personaje') {
        await axios.post('http://localhost:5000/people', data);
      } else if (tipo === 'planeta') {
        await axios.post('http://localhost:5000/planets', data);
      } else if (tipo === 'nave') {
        await axios.post('http://localhost:5000/starships', data);
      }
      setNombre('');
      setDescripcion('');
      setImagen('');
    } catch (error) {
      console.error("Error al agregar datos:", error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="tipo">
          <Form.Label>Tipo</Form.Label>
          <Form.Control as="select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="personaje">Personaje</option>
            <option value="planeta">Planeta</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="descripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="imagen">
          <Form.Label>URL de la Imagen</Form.Label>
          <Form.Control type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">Agregar</Button>
      </Form>
    </Container>
  );
};

export default Admin;
