import React from 'react';
import App from './App';

const NavLeft = () => {
  return (
    <div className="d-flex align-items-start">
      <nav className="nav flex-column pt-3">
        <a className="nav-link active" aria-current="page" href="/">Home</a>
        <a className="nav-link" href="/Personajes">Personajes</a>
        <a className="nav-link" href="/Planetas">Planetas</a>
        <a className="nav-link" href="/Admin">Agregar</a> {/* Nueva ruta agregada */}
        <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Peliculas (Proximamente)</a>
      </nav>
      <div className="tab-content pt-5" style={{ width: '100%' }} id="v-pills-tabContent">
        <App />
      </div>
    </div>
  );
};

export default NavLeft;
