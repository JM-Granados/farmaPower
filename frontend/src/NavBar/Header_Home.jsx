import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Utilizado para realizar solicitudes HTTP.
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap para diseño y respuesta.
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Funcionalidades de JavaScript de Bootstrap.
import './Header_Home.css'; // Estilos específicos para la barra de navegación.

import User_icon from '../assets/user.png'

const Header_Home = () => {

    // Estado para controlar la visibilidad del menú desplegable.
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Función para alternar la visibilidad del menú desplegable.
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);


    /**
     * Renderiza el componente de barra de navegación usando clases de Bootstrap para el diseño.
     * Incluye enlaces de navegación y un menú desplegable para perfiles de usuario.
     */
    return (
        /* Contenedor principal de la barra de navegación utilizando clases de Bootstrap para el diseño. */
        <nav className="navbar navbar-expand-lg navbar-custom fixed-top d-flex justify-content-start">
            {/* 'container-fluid' permite que el contenido de la navbar se extienda de borde a borde, ocupando todo el ancho disponible. */}
            <div className="container-fluid align-center">
                {/* Área del logo o nombre de la empresa en la barra de navegación, actúa como enlace a la página de inicio. */}
                <a className="navbar-brand text-white">
                    {/* Imagen del logo, especificando una clase para estilos adicionales y fijando la altura a 40 píxeles. */}
                    Bienvenido
                </a>
                {/* Botón de alternancia para dispositivos con pantallas pequeñas, controla la visibilidad del menú colapsable. */}
                <button className="navbar-toggler"
                    type="button"
                    onClick={toggleDropdown}
                    aria-expanded={isDropdownOpen}
                    aria-label="Toggle navigation">
                    <img src={User_icon} alt="User_icon" className='User_icon' height={50} />
                </button>
                <div className={`dropdown-menu${isDropdownOpen ? ' show' : ''} shadow-lg`} aria-expanded={isDropdownOpen}>
                    <li>
                        <Link to="/Login" className="dropdown-item">Inciar sesión</Link>
                    </li>
                </div>

                {/* Div contenedor para los elementos del menú que se mostrarán u ocultarán dependiendo del estado de 'collapse'. */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    {/* Lista adicional para botones o acciones específicas como registro o ingreso. */}
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            {/* Botón para 'Ingresar', con estilos Bootstrap para botones. */}
                            <Link to="/Login" className="IngresarButton btn btn-primary">
                                Inciar sesión
                                {/* Imagen usada como icono dentro del botón, con rotación para efecto visual. */}
                            </Link>
                        </li>
                        {/* Menú desplegable para opciones de usuario, mostrando un icono de usuario como indicador. */}
                        <li className="nav-item">
                            <img src={User_icon} alt="User_icon" className="User_icon" height={50} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );

}

// Exporta el componente para que pueda ser usado en otros lugares de la aplicación.
export default Header_Home;
