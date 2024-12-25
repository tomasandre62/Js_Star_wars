import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Slide1 from './imagenes/slide1.jpg'
import Slide2 from './imagenes/slide2.jpg'
import Slide3 from './imagenes/slide3.jpg'
import { Card, Button } from 'react-bootstrap';
import Icard from './imagenes/Icard.svg'



const Home = () => {
  return (
    <div className='pe-4'>
      <div className='row'>
        <Carousel className='col-12'>
          <Carousel.Item>
            <Image src={Slide1} fluid />
            <Carousel.Caption>
              <h3>Bienvenido a el Blog</h3>
              <p>Encontraras informacion detallada de Personajes, Naves, y Planetas</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image src={Slide2} fluid />
            <Carousel.Caption>
              <h3>Planteas y personajes</h3>
              <p>Edad, Tamaño, Genero, Geografia, Poblacion, caracteristicas y mas.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image src={Slide3} fluid />
            <Carousel.Caption>
              <h3>The skywalker saga</h3>
              <p>
                Sabias que existe un video juego de Star Wars pero en un mundo Lego?
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="row pt-5">
        <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center">
          <Card className='col-11'>
            <Card.Img variant="top" src={Icard} />
            <Card.Body>
              <Card.Title>Conoce los Personajes</Card.Title>
              <Card.Text>
                Lista de los personajes mas importantes de la saga, entra y conoce todas sus caracteristicas, sabemos hast el color de sus ojos.
              </Card.Text>
              <a href="/Personajes">
                <Button variant="primary">Personajes</Button>
              </a>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center">
          <Card className='col-11'>
            <Card.Img variant="top" src={Icard} />
            <Card.Body>
              <Card.Title>Conoce las Naves</Card.Title>
              <Card.Text>
                Lista de las naves mas relevantes de la saga, entra y conoce todas sus caracteristicas, peso, tamaño, valor, capacidad, etc.
              </Card.Text>
              <a href="/Naves">
                <Button variant="primary">Naves</Button>
              </a>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center">
          <Card className='col-11'>
            <Card.Img variant="top" src={Icard} />
            <Card.Body>
              <Card.Title>Conoce los Planetas</Card.Title>
              <Card.Text>
                Aprende sobre los planetas mas importantes de la saga, entra y ve todas sus caracteristicas, tamaños, poblacion, tipo de geografia y mas.
              </Card.Text>
              <a href="/Planetas">
                <Button variant="primary">Planetas</Button>
              </a>
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center">
          <Card className='col-11'>
            <Card.Img variant="top" src={Icard} />
            <Card.Body>
              <Card.Title>Conoce las Peliculas</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button className='disabled ' variant="primary">Proximamente</Button>
            </Card.Body>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default Home