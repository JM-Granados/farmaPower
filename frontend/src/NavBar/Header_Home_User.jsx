import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header_Home.css';

import User_icon from '../assets/user.png';

const Header_Home = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    // Estados para controlar los dropdowns de escritorio y Android
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAndroidDropdownOpen, setIsAndroidDropdownOpen] = useState(false);

    // Función de logout
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    // Alterna la visibilidad del dropdown principal
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Alterna la visibilidad del dropdown para Android
    const toggleAndroidDropdown = () => {
        setIsAndroidDropdownOpen(!isAndroidDropdownOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-custom fixed-top d-flex justify-content-start barra">
            <div className="container-fluid align-center">
                <a className="bienvenido navbar-brand text-white">
                    Bienvenido, {user.firstName}
                </a>

                {/* Botón de Android */}
                <button className="cayendo navbar-toggler"
                    type="button"
                    onClick={toggleAndroidDropdown}
                    aria-expanded={isAndroidDropdownOpen}
                    aria-label="Toggle navigation">
                    <img
                        src={user.imageUrl || User_icon}
                        alt="User_icon"
                        className="User_icon rounded-circle"
                        height={50}
                    />
                </button>

                {/* Dropdown para Android */}
                <div className={`navegacion dropdown-menu${isAndroidDropdownOpen ? ' show' : ''} shadow-lg`} aria-expanded={isAndroidDropdownOpen}>
                    <li>
                        <Link to="/Help" className="log dropdown-item">Ayuda</Link>
                    </li>
                    <li>
                        <hr className="divide dropdown-divider"></hr>
                    </li>
                    <li>
                        <button className="log dropdown-item text-white" onClick={handleLogout}>Salir</button>
                    </li>
                </div>

                {/* Dropdown principal para escritorio */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a
                                className="espacioBoton nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                onClick={toggleDropdown}
                                aria-expanded={isDropdownOpen}
                            >
                                <img
                                    src={user.imageUrl || User_icon}
                                    alt="User_icon"
                                    className="User_icon rounded-circle"
                                    height={50}
                                />
                            </a>

                            {/* Elementos del menú desplegable principal */}
                            <ul className={`navegacion dropdown-menu dropdown-menu-end${isDropdownOpen ? ' show' : ''}`}>
                                <li><Link className="log dropdown-item" to="/Help">Ayuda</Link></li>
                                <li><hr className="divide dropdown-divider" /></li>
                                <li><button className="log dropdown-item" onClick={handleLogout}>Salir</button></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header_Home;
