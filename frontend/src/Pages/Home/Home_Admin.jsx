import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Utilizado para realizar solicitudes HTTP.
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap para diseño y respuesta.
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Funcionalidades de JavaScript de Bootstrap.
import Header_Home from '../../NavBar/Header_Home_User'
import Gestionar_Farmacias from '../../assets/Gestionar_Farmacias.png'
import Gestionar_Programa from '../../assets/Gestionar_Programa.png'
import Gestionar_Productos from '../../assets/Gestionar_Productos.png'

import './Home_Admin.css'

function Home_Guest() {
    const user = JSON.parse(localStorage.getItem('user')); 

    return (
        <div>
            <Header_Home />
            <div className="hcontainer container justify-content-start">
                <ul className="barrita nav nav-underline">
                    <li className="barrota nav-item">
                        <a className="barritita nav-link active text-white" aria-current="page" href="/Home_Admin">Inicio</a>
                    </li>
                    <li className="barrota nav-item">
                        <a className="barritita nav-link text-white" href="/ManageElegibleMedication">Medicamentos</a>
                    </li>
                    <li className="barrota nav-item">
                        <a className="barritita nav-link text-white" href="/ManagePharmacy">Farmacias</a>
                    </li>
                    <li className="barrota nav-item">
                        <a className="barritita nav-link text-white" href="/ManageProgram">Programas</a>
                    </li>
                    <li className="barrota nav-item">
                        <a className="barritita nav-link text-white" href="/">Usuarios</a>
                    </li>
                </ul>
            </div>

            <div className="contiene container-fluid d-flex justify-content-center">
                <Link to="/ManageProgram" className="ir ms-5 mt-5 me-5 card-link">
                    <div className="card">
                        <img src={Gestionar_Programa} className="card-img-top" alt="..." />
                    </div>
                </Link>

                <Link to="/ManagePharmacy" className="ir ms-5 mt-5 me-5 card-link">
                    <div className="card">
                        <img src={Gestionar_Farmacias} className="card-img-top" alt="..." />
                    </div>
                </Link>

                <Link to="/ManageElegibleMedication" className="ir ms-5 mt-5 me-5 card-link">
                    <div className="card">
                        <img src={Gestionar_Productos} className="card-img-top" alt="..." />
                    </div>
                </Link>
            </div>


            {/* // Barra de navegación fija en la parte inferior. */}
            <nav className="foot navbar navbar-expand-lg fixed-bottom">
                <div className="container-md justify-content-center">
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