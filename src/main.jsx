import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './header.jsx'
import NavLeft from './navLeft.jsx'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Footer from './Footer.jsx'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <Header/>
      <NavLeft/>
      <Footer/>
    </BrowserRouter>
  
)
