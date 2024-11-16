import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Planetas from './Planetas';
import Naves from './Naves';
import Personajes from './Personajes';
import Home from './Home';
import Detalles from './Detalles'; 
import DetallesNaves from './DetallesNaves';
import DetallesPlanetas from './DetallesPlanetas';



function App() {
  return (
    <Routes>
      <Route path='/Planetas' element={<Planetas/>} />
      <Route path='/Naves' element={<Naves/>}/>
      <Route path='/Personajes' element={<Personajes/>} />
      <Route path='/Personajes/:uid' element={<Detalles/>} />
      <Route path='/Naves/:uid' element={<DetallesNaves/>} />
      <Route path='/Planetas/:uid' element={<DetallesPlanetas/>} />
      <Route path='/' element={<Home/>} />
    </Routes>
  );
}

export default App;