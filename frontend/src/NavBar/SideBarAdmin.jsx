import React from 'react';
import { Link } from 'react-router-dom';
import './SideBarAdmin.css';
import gradient from '../assets/lightblue_yellow_gradient.png';
import back1 from '../assets/back1.png';
import user from '../assets/user.png';

const SideBar = () => {
    return (
        <div className="sidebar d-flex flex-column align-items-start">
            <div className="sidebar-title mb-3">Panel de navegación</div>
            <img className="back-1 mb-3" alt="Back" src={back1} />
            <Link to="/" className="sidebar-link mb-2">Inicio</Link>
            <Link to="/ManageElegibleMedication" className="sidebar-link mb-2">Medicamentos participantes</Link>
            <Link to="/ManagePharmacy" className="sidebar-link mb-2">Farmacias participantes</Link>
            <Link to="/ManageProgram" className="sidebar-link mb-2">Programas</Link>
            <Link to="/Help" className="sidebar-link mb-3">Usuarios</Link>
            <div className="sidebar-user-container d-flex align-items-center">
                <div className="user_image_container">
                    <img src={user} alt="Logo" id="user" className="img-fluid" />
                </div>
                <div className="sidebar-user ms-2">Nombre usuario</div>
            </div>
        </div>
    );
};

export default SideBar;
