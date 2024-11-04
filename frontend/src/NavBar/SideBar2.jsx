import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar2.css';
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
            <Link to="/Medications" className="sidebar-link" onClick={() => changeOption('Solicitudes')}>Medicamentos Participantes</Link>
            <Link to="/Pharmacies" className="sidebar-link" onClick={() => changeOption('Nueva')}>Farmacias Participantes</Link>
            <Link to="/Programs" className="sidebar-link" onClick={() => changeOption('Puntos')}>Programas</Link>
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