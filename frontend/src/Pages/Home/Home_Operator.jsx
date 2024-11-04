import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Utilizado para realizar solicitudes HTTP.
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap para diseño y respuesta.
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Funcionalidades de JavaScript de Bootstrap.
import Header_Home from '../../NavBar/Header_Home_User'
import Administrar_Solicitudes from '../assets/Administrar_Solicitudes.png'

import './Home_Guest.css'

function Home_Guest() {
    return (
        <div>
            <Header_Home />
            <div className="hcontainer container justify-content-start">
                <ul className="nav nav-underline">
                    <li className="nav-item">
                        <a className="nav-link active text-white" aria-current="page" href="#">Inicio</a>
                    </li>
                </ul>
            </div>

            <div className="container-fluid d-flex justify-content-center">
                <Link to="/ruta-para-nueva-solicitud" className="ms-5 mt-5 me-5 card-link">
                    <div className="card">
                        <img src={Administrar_Solicitudes} className="card-img-top" alt="..." />
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