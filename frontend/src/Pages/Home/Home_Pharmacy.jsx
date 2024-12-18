import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Utilizado para realizar solicitudes HTTP.
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap para diseño y respuesta.
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Funcionalidades de JavaScript de Bootstrap.
import Header_Home from '../../NavBar/Header_Home_User'
import Clientes from '../../assets/Clientes.png'
import Canjes from '../../assets/Canjes.png'

import './Home_Admin.css'

function Home_Guest() {
    const user = JSON.parse(localStorage.getItem('user')); 

    return (
        <div>
            <Header_Home />

            <div className="hcontainer contiene container-fluid d-flex justify-content-start">
                <Link to="/Clients" className="ir ms-5 mt-5 me-5 card-link">
                    <div className="card">
                        <img src={Clientes} className="card-img-top" alt="..." />
                    </div>
                </Link>

                <Link to="/Exchanges" className="ir ms-5 mt-5 me-5 card-link">
                    <div className="card">
                        <img src={Canjes} className="card-img-top" alt="..." />
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