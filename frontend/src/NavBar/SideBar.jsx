import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';
import gradient from '../assets/lightblue_yellow_gradient.png';
import back1 from '../assets/back1.png';
import userImage from '../assets/user.png';

const SideBar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("User data:", user); // Log the user data to verify

    let links;

    if (user && user.role === 'Client') {
        links = (
            <>
                <Link to="/" className="sidebar-link mb-2">Inicio</Link>
                <Link to="/MyRequests" className="sidebar-link mb-2">Mis solicitudes</Link>
                <Link to="/NewRequest" className="sidebar-link mb-2">Nueva solicitud</Link>
                <Link to="/MyPoints" className="sidebar-link mb-2">Mis puntos</Link>
                <Link to="/Help" className="sidebar-link mb-3">Ayuda</Link>
            </>
        );
    } else if (user && user.role === 'Admin') {
        links = (
            <>
                <Link to="/" className="sidebar-link mb-2">Inicio</Link>
                <Link to="/MedicamentosParticipantes" className="sidebar-link mb-2">Medicamentos participantes</Link>
                <Link to="/FarmaciasParticipantes" className="sidebar-link mb-2">Farmacias participantes</Link>
                <Link to="/Programas" className="sidebar-link mb-2">Programas</Link>
                <Link to="/Usuarios" className="sidebar-link mb-3">Usuarios</Link>
            </>
        );
    } else if (user && user.role === 'Operator') {
        links = (
            <>
                <Link to="/" className="sidebar-link mb-2">Inicio</Link>
                <Link to="/Todas" className="sidebar-link mb-2">Todas</Link>
                <Link to="/Pendientes" className="sidebar-link mb-2">Pendientes</Link>
                <Link to="/Rechazadas" className="sidebar-link mb-2">Rechazadas</Link>
                <Link to="/Aprobadas" className="sidebar-link mb-3">Aprobadas</Link>
            </>
        );
    } else {
        // Caso no definido o cuando el rol no es reconocido, puedes decidir qué mostrar
        links = <div>Acceso no permitido o rol desconocido</div>;
    }

    return (
        <div className="sidebar d-flex flex-column align-items-start">
            <div className="sidebar-title mb-3">Panel de navegación</div>
            <img className="back-1 mb-3" alt="Back" src={back1} />
            {links}
            <div className="sidebar-user-container d-flex align-items-center">
                <div className="user_image_container">
                    <img src={user && user.imgUrl ? user.imgUrl : userImage} alt="Logo" id="user" className="img-fluid" />
                </div>
                <div className="sidebar-user ms-2">
                    {user && user.name ? user.name : 'Nombre usuario'}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
