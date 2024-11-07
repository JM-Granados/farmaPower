import React from 'react';
import { Link, useLocation  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './SideBar.css';
import gradient from '../assets/lightblue_yellow_gradient.png';
import back1 from '../assets/back1.png';
import userImage from '../assets/user.png';

const SideBar = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const location = useLocation();

    const navigate = useNavigate();

    let links;

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    if (user && user.role === 'Client') {
        links = (
            <>
                <Link className={`yendo nav-link text-white mb-2 ${location.pathname === '/Home_Client' ? 'active' : ''}`} to="/Home_Client">Inicio</Link>
                <Link className={`yendo nav-link text-white mb-2 ${location.pathname === '/MyRequests' ? 'active' : ''}`} to="/MyRequests">Mis solicitudes</Link>
                <Link className={`yendo nav-link text-white mb-2 ${location.pathname === '/NewRequest' ? 'active' : ''}`} to="/NewRequest">Nueva solicitud</Link>
                <Link className={`yendo nav-link text-white mb-2 ${location.pathname === '/MyPoints' ? 'active' : ''}`} to="/MyPoints">Mis puntos</Link>
                <Link className={`yendo nav-link text-white mb-2 ${location.pathname === '/Help' ? 'active' : ''}`} to="/Help">Ayuda</Link>
                <button className="yendo nav-link text-white btn btn-link p-0 mb-5 text-start" onClick={handleLogout}>
                    Salir
                </button>
            </>
        );
    } else if (user && user.role === 'Admin') {
        links = (
            <>
                <Link className={`yendo nav-link text-white mb-2 ${location.pathname === '/Home_Admin' ? 'active' : ''}`} to="/Home_Admin">Inicio</Link>
                <Link className={`yendo nav-link text-white mb-2 ${location.pathname === '/ManageElegibleMedication' ? 'active' : ''}`} to="/ManageElegibleMedication">Medicamentos participantes</Link>
                <Link className={`yendo nav-link text-white mb-2 ${location.pathname === '/ManagePharmacy' ? 'active' : ''}`} to="/ManagePharmacy">Farmacias participantes</Link>
                <Link className={`yendo nav-link text-white mb-2 ${location.pathname === '/ManageProgram' ? 'active' : ''}`} to="/ManageProgram">Programas</Link>
                <Link className={`yendo nav-link text-white mb-2 ${location.pathname === '/Users' ? 'active' : ''}`} to="/Users">Usuarios</Link>
                <button className="yendo nav-link text-white btn btn-link p-0 mb-5 text-start" onClick={handleLogout}>
                    Salir
                </button>
            </>
        );
    } else if (user && user.role === 'Operator') {
        links = (
            <>
                <Link className={`yendo nav-link text-white mb-2 ${location.pathname === '/Home_Operator' ? 'active' : ''}`} to="/Home_Operator">Inicio</Link>
                <Link className={`yendo nav-link text-white mb-2 ${location.pathname === '/Todas' ? 'active' : ''}`} to="/Todas">Todas</Link>
                <Link className={`yendo nav-link text-white mb-2 ${location.pathname === '/Pendientes' ? 'active' : ''}`} to="/Pendientes">Pendientes</Link>
                <Link className={`yendo nav-link text-white mb-2 ${location.pathname === '/Rechazadas' ? 'active' : ''}`} to="/Rechazadas">Rechazadas</Link>
                <Link className={`yendo nav-link text-white mb-2 ${location.pathname === '/Aprobadas' ? 'active' : ''}`} to="/Aprobadas">Aprobadas</Link>
                <button className="yendo nav-link text-white btn btn-link p-0 mb-5 text-start" onClick={handleLogout}>
                    Salir
                </button>
            </>
        );
    } else {
        // Caso no definido o cuando el rol no es reconocido, puedes decidir qué mostrar
        links = <div>Acceso no permitido o rol desconocido</div>;
    }

    return (
        <div className="sidebar d-flex flex-column align-items-start">
            <div className="sidebar-title mb-4 mt-2">Panel de navegación</div>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }}>
                <img className="patras mb-5 align-items-start" alt="Back" src={back1} />
            </a>
            <div className="sidebar-user-container d-flex align-items-center justify-content-start mb-5">
                <div className="user_image_container">
                    <img src={user && user.imageUrl ? user.imageUrl : userImage} alt="Logo" id="user" className="img-fluid" />
                </div>
                <div className="sidebar-user">
                    {user.firstName}
                </div>
            </div>
            <ul class="nav nav-underline ">
                <nav class="nav flex-column text-start">
                    {links}
                </nav>
            </ul>
        </div>
    );
};

export default SideBar;
