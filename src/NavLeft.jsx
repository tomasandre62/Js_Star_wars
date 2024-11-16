import React from 'react'
import App from './App'

const NavLeft = () => {

    return (
        <div className="d-flex align-items-start">
            <nav class="nav flex-column pt-3">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
                <a class="nav-link" href="/Personajes">Personajes</a>
                <a class="nav-link" href="/Naves">Naves</a>
                <a class="nav-link" href="/Planetas">Planetas</a>
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Peliculas (Proximamente)</a>
            </nav>
            <div className="tab-content pt-5" style={{ width: '100%'}} id="v-pills-tabContent">
                <App />
            </div>
        </div>
    )
}

export default NavLeft