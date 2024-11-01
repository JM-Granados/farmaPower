import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';
import gradient from '../assets/lightblue_yellow_gradient.png';
import back1 from '../assets/back1.png';
import user from '../assets/user.png';
import selected from "../assets/Pestanaseleccionada.png";
import pill from '../assets/drugs1.png';

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-title">Panel de navegación </div>
            <img className="back-1" alt="Back" src={back1} />
            <Link to="/" className="sidebar-link" onClick={() => changeOption('Inicio')}>Inicio</Link>
            <Link to="/MyRequests" className="sidebar-link" onClick={() => changeOption('Solicitudes')}>Mis solicitudes</Link>
            <Link to="/NewRequest" className="sidebar-link" onClick={() => changeOption('Nueva')}>Nueva solicitud</Link>
            <Link to="/MyPoints" className="sidebar-link" onClick={() => changeOption('Puntos')}>Mis puntos</Link>
            <Link to="/Help" className="sidebar-link" onClick={() => changeOption('Ayuda')}>Ayuda</Link>
            <div className="sidebar-user-container">
                <div className="user_image_container">
                    <img src={user} alt="Logo" id="user" />
                </div>
                <div className="sidebar-user">Nombre usuario</div>
            </div>
        </div>
    );
};

export default SideBar;