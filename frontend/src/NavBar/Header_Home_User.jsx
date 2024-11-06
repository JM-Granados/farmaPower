import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap para diseño y respuesta.
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Funcionalidades de JavaScript de Bootstrap.
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Header_Home.css'; // Estilos específicos para la barra de navegación.

import User_icon from '../assets/user.png'

const Header_Home = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Asegúrate de que esto está en tu componente.

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Función para manejar el cierre de sesión.
    const handleLogout = () => {
        localStorage.removeItem('user'); // Elimina el usuario de localStorage.
        navigate('/'); // Redirige al usuario a la página de inicio.
    }


    /**
     * Renderiza el componente de barra de navegación usando clases de Bootstrap para el diseño.
     * Incluye enlaces de navegación y un menú desplegable para perfiles de usuario.
     */
    return (
        /* Contenedor principal de la barra de navegación utilizando clases de Bootstrap para el diseño. */
        <nav className="navbar navbar-expand-lg navbar-custom fixed-top d-flex justify-content-start barra">
            {/* 'container-fluid' permite que el contenido de la navbar se extienda de borde a borde, ocupando todo el ancho disponible. */}
            <div className="container-fluid align-center">
                {/* Área del logo o nombre de la empresa en la barra de navegación, actúa como enlace a la página de inicio. */}
                <a className="bienvenido navbar-brand text-white">
                    {/* Imagen del logo, especificando una clase para estilos adicionales y fijando la altura a 40 píxeles. */}
                    Bienvenido, {user.firstName}
                </a>
                {/* Botón de alternancia para dispositivos con pantallas pequeñas, controla la visibilidad del menú colapsable. */}
                <button className="cayendo navbar-toggler"
                    type="button"
                    onClick={toggleDropdown}
                    aria-expanded={isDropdownOpen}
                    aria-label="Toggle navigation">
                    <img src={User_icon} alt="User_icon" className='User_icon' height={50} />
                </button>
                <div className={`navegacion dropdown-menu${isDropdownOpen ? ' show' : ''} shadow-lg`} aria-expanded={isDropdownOpen}>
                    <li>
                        <Link to="/Login" className="log dropdown-item">Perfil</Link>
                    </li>
                    <li>
                        <Link to="/Login" className="log dropdown-item">Ayuda</Link>
                    </li>
                    <li>
                        <hr className="divide dropdown-divider"></hr>
                    </li>
                    <li>
                        <button className="log dropdown-item text-white" onClick={handleLogout}>Salir</button>
                    </li>
                </div>

                {/* Div contenedor para los elementos del menú que se mostrarán u ocultarán dependiendo del estado de 'collapse'. */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <li className="nav-item dropdown">
                        <a className="espacioBoton nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={user.imageUrl} alt="User_icon" className="User_icon rounded-circle" height={50} />
                        </a>
                        
                        {/* Elementos del menú desplegable para acciones adicionales del usuario. */}
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="/Profile">Perfil</a></li>
                            <li><a className="dropdown-item" href="/Help">Ayuda</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={handleLogout}>Salir</button></li>
                        </ul>
                    </li>
                </div>
            </div>
        </nav>
    );

}

// Exporta el componente para que pueda ser usado en otros lugares de la aplicación.
export default Header_Home;
