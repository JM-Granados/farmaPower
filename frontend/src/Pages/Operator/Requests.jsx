/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Requests.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import gradient from '../../assets/orange-yellow-gradient.png';
import user from '../../assets/user.png';
import Request from './Components';

const apiURL = import.meta.env.VITE_BACKEND_URL;

function Requests() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFRequests] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedStatus, setSelectedStatus] = useState([]);

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

    const endpoint = apiURL;

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(endpoint + "/api/requests/all");
                const data = Array.isArray(response.data) ? response.data : []; // Verifica si data es un array
                setRequests(data);
                setFRequests(data);
            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'Error al obtener las solicitudes.');
                setRequests([]);
                setFRequests([]);
            };
        }
        fetchRequests();
    }, [endpoint]);


    function handleFilter(status) {
        setSelectedStatus(status);
        console.log(status);
        if (status === 'Todas') {
            setFRequests(requests);
        } else {
            setFRequests(requests.filter(request => request.rStatus === status));
        }
    }

    return (
        <div className=''>
            <nav className="navbar navbar-expand-lg navbar-custom fixed-top d-flex justify-content-start barra">
                <div className="container-fluid align-center">
                    {/* Botón de Android */}
                    <button className="cayendo navbar-toggler"
                        type="button"
                        onClick={toggleAndroidDropdown}
                        aria-expanded={isAndroidDropdownOpen}
                        aria-label="Toggle navigation">
                        <img
                            src={user.imageUrl}
                            alt="User_icon"
                            className="User_icon rounded-circle"
                            height={75}
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
                        <ul className="fotonga navbar-nav">
                            <li className="nav-item dropdown">
                                <a
                                    className="espacioBoton nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    onClick={toggleDropdown}
                                    aria-expanded={isDropdownOpen}
                                >
                                    <img
                                        src={user.imageUrl}
                                        alt="User_icon"
                                        className="User_icon rounded-circle"
                                        height={75}
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

            <div className="kgradient-title d-flex justify-content-between align-items-center">
                <img src={gradient} alt="Logo" id="gradient" className='kgradient-image' />
            </div>
            <div>
                <ul className="nav custom-nav-underline nav-underline text-wrapper-17 little-nav-bar"> {/*Aqui falta el color del underline */}
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="javascript:void(0);" onClick={() => handleFilter('Todas')}>Todas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:void(0);" onClick={() => handleFilter('Pendiente')}>Pendientes</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:void(0);" onClick={() => handleFilter('Aprobada')}>Aprobadas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="javascript:void(0);" onClick={() => handleFilter('Rechazada')}>Rechazadas</a>
                    </li>
                </ul>
            </div>
            <div className="container-fluid mt-2">
                <div className="scrollable-container">
                    <div className="row g-4 p-15">
                        {filteredRequests.map((request, index) => (
                            <div key={request._id} className="col-auto d-flex p-3">
                                <Request id={request._id} date={request.createdAt} status={request.rStatus} number={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
    );
}

export default Requests;