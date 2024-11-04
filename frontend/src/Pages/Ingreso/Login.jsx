// Importa las dependencias necesarias de React y otras bibliotecas
import React, { useState, useEffect } from 'react' // Importa React para poder usar JSX y componentes.
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom para la navegación sin recarga.
import axios from 'axios'; // Importa axios para realizar llamadas HTTP.
import usePasswordToggle from "../../ComponentsLogin/usePasswordToggle";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación programática.
import './Login.css'; // Importa los estilos específicos para la pantalla de login.
const apiURL = import.meta.env.VITE_BACKEND_URL;

/**
 * @fileoverview Componente Login para la aplicación FarmaTEC.
 *
 * Este archivo define el componente React 'Login' que se utiliza para 
 * manejar la entrada de los usuarios a la aplicación. La interfaz permite 
 * a los usuarios ingresar sus credenciales (correo electrónico y contraseña) 
 * para acceder a su cuenta o navegar a la página de registro para crear una nueva cuenta. 
 * 
 * El componente utiliza 'react-router-dom' para la navegación, 'axios' para las llamadas 
 * HTTP futuras (no implementadas aquí pero listas para expansión), y estilos específicos 
 * para mantener la coherencia visual en la pantalla de login. 
 * 
 * La pantalla de login está diseñada para ser visualmente atractiva y accesible, 
 * con controles claros y una navegación sencilla que dirige al usuario a la 
 * pantalla principal de la aplicación o a la página de registro dependiendo 
 * de sus necesidades. 
 * 
 * Recordar que la barra de navegación que está fija en la parte inferior la debe de insertar en todas las 
 * demás ventanas 
 * 
 * Dependencias: 
 * - React: Utilizado para la creación de componentes y manejo de estado. 
 * - React Router Dom: Facilita la navegación entre componentes sin recargar la página. 
 * - Axios: Librería para realizar solicitudes HTTP a servidores externos. 
 * - CSS: Estilos específicos para la vista están definidos en './Login.css'. 
 */


// Define el componente funcional 'Login'
function Login() {
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();

    // Declaración de estados para email y password usando el hook useState de React.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Hook useNavigate de React Router para la navegación programática.
    const navigate = useNavigate();

    // Estado para manejar mensajes de error.
    const [errorMessage, setErrorMessage] = useState('');
    const [fade, setFade] = useState(false);

    useEffect(() => {
        if (errorMessage && !fade) {
            setTimeout(() => {
                setFade(true); // Inicia la transición de difuminado
                setTimeout(() => {
                    setErrorMessage(''); // Limpia el mensaje después de que la transición termine
                    setFade(false); // Restablece el estado de fade para el próximo error
                }, 1000); // Este timeout debe coincidir con la duración de la transición CSS
            }, 5000); // Tiempo visible antes de comenzar a difuminar
        }
    }, [errorMessage, fade]);

    // Función handleSubmit que se ejecuta cuando el formulario se envía.
    const handleSubmit = async (e) => {
        e.preventDefault();  // Previene la recarga de la página al enviar el formulario.
        setErrorMessage('');  // Limpia mensajes de error anteriores.

        const endpoint = `${apiURL}/api/users/login`;  // URL del endpoint de login.

        console.log(endpoint)

        try {
            // Intento de inicio de sesión usando axios para enviar una solicitud POST al servidor.
            const response = await axios.post(endpoint, { email, password });

            // Verifica si la respuesta del servidor indica un inicio de sesión exitoso.
            if (response.data.message === "User logged in successfully") {
                // Guarda los datos del usuario en el almacenamiento local y redirige a la página Home.
                localStorage.setItem('user', JSON.stringify(response.data.user));
                if(response.data.user.role == "Client") {
                    navigate('/Home_Client');
                } else if(response.data.user.role == "Admin") {
                    navigate('/Home_Admin');
                } else {
                    navigate('/Home_Operator');
                }
            } else {
                // Si el mensaje no indica éxito, muestra un mensaje de error.
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            // Captura errores de la solicitud y muestra un mensaje de error.
            setErrorMessage(error.response?.data.error || 'An error occurred.');
        }
    }


    // La función devuelve el JSX para la interfaz de usuario del componente de login.
    return (
        /**
         * Div contenedor con clase para fondo de pantalla completa. Este es especial porque 
         * trae una imagen que es única para esta ventana. No es necesario este div para las demás ventanas
         */
        <div className="fullscreen-bg">

            {/* Div contenedor para el contenido central. */}
            <div className="content">

                {/* Formulario para el ingreso de usuario. */}
                <form className='form' onSubmit={handleSubmit}>
                    {/* Título del formulario. */}
                    <h1 className='IngresarText text-center mb-5'>Ingresar</h1>

                    {/* Div contenedor para el campo de correo electrónico. */}
                    <div className="mb-5">
                        <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico</label>
                        {/* Input para correo electrónico con estilos específicos. */}
                        <input
                            type="email"
                            name="email"
                            className="form-control bg-transparent border-0 border-bottom rounded-0 text-white"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Div contenedor para el campo de contraseña. */}
                    <div className="mb-5">
                        <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                        {/* Input para contraseña con estilos específicos. */}
                        <div className="password-container d-grid">
                            {/* Input para contraseña con estilos específicos. */}
                            <input
                                type={PasswordInputType}
                                name="password"
                                className="space-password form-control bg-transparent border-0 border-bottom rounded-0 text-white"
                                id="validationPassword"
                                aria-describedby="passwordHelpInline"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="password-toogle-icon">
                                {ToggleIcon}
                            </span>
                        </div>
                    </div>

                    {/* Div contenedor para los botones del formulario. */}
                    <div className='form-button-container'>
                        {/* Link para navegar a la página de registro. */}
                        <Link to="/Signup" className="Crear button btn">Crear cuenta</Link>
                        {/* Link para navegar a la página principal después de ingresar. */}
                        <button type="submit" className="Ingresar button btn">Ingresar</button>
                    </div>

                    {errorMessage && <div className={`alert alert-danger text-white bg-danger mt-5 text-center ${fade ? 'fade-out' : ''}`} >{errorMessage}</div>}

                    <div className="form-text text-center mt-5" id="basic-addon4">
                        <Link to="/PassRecovery">¿Olvidaste tu contraseña?</Link>
                    </div>
                </form>
            </div>

            {/* // Barra de navegación fija en la parte inferior. */}
            <nav className="foot navbar navbar-expand-lg fixed-bottom">
                <div className="container-md">

                    {/* // Texto para mostrar en la barra de navegación. */}
                    <a className="navbar-brand text-white fs-6" href="#">
                        FarmaTEC 2024
                    </a>
                </div>
            </nav>
        </div>
    );
}

// Exporta el componente para que pueda ser usado en otras partes de la aplicación.
export default Login;

