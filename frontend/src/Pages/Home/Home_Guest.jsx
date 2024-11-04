import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Utilizado para realizar solicitudes HTTP.
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap para diseño y respuesta.
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Funcionalidades de JavaScript de Bootstrap.
import Header_Home from '../../NavBar/Header_Home'
import nuevaSolicitud from '../../assets/Nueva_Solicitud.png'
import Ayuda from '../../assets/Ayuda.png'
import OfertaNueva from '../../assets/OfertaNueva.png'

import './Home_Guest.css'

function Home_Guest() {
    return (
        <div>
            <Header_Home />
            <div className="hcontainer container justify-content-start">
                <ul className="barrita nav nav-underline">
                    <li className="barrota nav-item">
                        <a className="barritita nav-link active text-white" aria-current="page" href="#">Inicio</a>
                    </li>
                    <li className="barrota nav-item">
                        <a className="barritita nav-link text-white" href="#">Medicamentos participantes</a>
                    </li>
                    <li className="barrota nav-item">
                        <a className="barritita nav-link text-white" href="#">Farmacias participantes</a>
                    </li>
                    <li className="barrota nav-item">
                        <a className="barritita nav-link text-white" href="#">Programas</a>
                    </li>
                </ul>
            </div>

            <div className="contiene container-fluid d-flex justify-content-center">
                <Link to="/ruta-para-nueva-solicitud" className="ir ms-5 mt-5 me-5 card-link">
                    <div className="card">
                        <img src={nuevaSolicitud} className="card-img-top" alt="..." />
                    </div>
                </Link>

                <Link to="/ruta-para-oferta-nueva" className="ir ms-5 mt-5 me-5 card-link">
                    <div className="card">
                        <img src={OfertaNueva} className="card-img-top" alt="..." />
                    </div>
                </Link>

                <Link to="/ruta-para-ayuda" className="ir ms-5 mt-5 me-5 card-link">
                    <div className="card">
                        <img src={Ayuda} className="card-img-top" alt="..." />
                    </div>
                </Link>
            </div>


            {/* // Barra de navegación fija en la parte inferior. */}
            <nav className="foot navbar navbar-expand-lg fixed-bottom">
                <div className="container-md">
                    {/* // Texto para mostrar en la barra de navegación. */}
                    <a className="navbar-brand text-white fs-6" href="#">
                        FarmaTEC 2024
                    </a>
                </div>
            </nav>
        </div>
    );
}

export default Home_Guest;