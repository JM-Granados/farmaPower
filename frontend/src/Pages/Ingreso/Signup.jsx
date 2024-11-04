// Importa las dependencias necesarias de React y otras bibliotecas
import React, { useState, useEffect } from 'react' // Importa React para poder usar JSX y componentes.
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom para la navegación sin recarga.
import axios from 'axios'; // Importa axios para realizar llamadas HTTP.
import usePasswordToggle from "../../ComponentsLogin/usePasswordToggle";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación programática.
import './Signup.css'; // Importa los estilos específicos para la pantalla de login.


function Signup() {
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();

    // Declaración de estados para email y password usando el hook useState de React.
    const [firstName, setFirstName] = useState("");
    const [firstLastName, setFirstLastName] = useState("");
    const [secondLastName, setSecondLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [photo, setPhoto] = useState("");


    // Hook useNavigate de React Router para la navegación programática.
    const navigate = useNavigate();

    // Estado para manejar mensajes de error.
    const [errorMessage, setErrorMessage] = useState('');
    const [fade, setFade] = useState(false);

    // Actualiza el estado al cambiar los campos
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

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

    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    // Valida las contraseñas al enviar
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden.');
            return; // Detiene la ejecución si las contraseñas no coinciden
        }

        console.log(photo); //C:\fakepath\Captura de pantalla 2024-08-16 120708.png


        setErrorMessage(''); // Limpia el mensaje de error

        const endpoint = `http://localhost:3000/api/users/signup`;  // URL del endpoint de signup.

        try {
            const response = await axios.post(endpoint, {
                firstName,
                firstLastName,
                secondLastName,
                email,
                password
            });

            // Verifica si la respuesta del servidor indica un registro exitoso.
            if (response.data.message === "User registered successfully") {
                navigate('/Login'); // O redirige a la pantalla de login, según lo que necesites.
            } else {
                // Si el mensaje no indica éxito, muestra un mensaje de error.
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            // Captura errores de la solicitud y muestra un mensaje de error.
            setErrorMessage(error.response?.data.error || 'An error occurred.');
        }
    }

    return (
        <div className="fullscreen">

            <div className="container text-white position-absolute top-50 start-50 translate-middle">
                {/* Formulario para el ingreso de usuario. */}
                <form className='row g-3 needs-validation' novalidate onSubmit={handleSubmit}>
                    {/* Título del formulario. */}
                    <h1 className='IngresarText text-center mb-5'>Registrarse</h1>

                    {/* Div contenedor para el campo de nombre. */}
                    <div className="col-md-4">
                        <label htmlFor="validationFirstName" className="form-label">Primer nombre</label>
                        {/* Input para nombre con estilos específicos. */}
                        <input
                            type="text"
                            name="firstName"
                            className="form-control bg-transparent border-0 border-bottom rounded-0 text-white"
                            id="validationFirstName"
                            aria-describedby="firstNameHelp"
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Por favor, elige un primer nombre.
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="validationFirstLastName" className="form-label">Primer apellido</label>
                        {/* Input para nombre con estilos específicos. */}
                        <input
                            type="text"
                            name="firstLastName"
                            className="form-control bg-transparent border-0 border-bottom rounded-0 text-white"
                            id="validationFirstLastName"
                            aria-describedby="firstLastNameHelp"
                            required
                            onChange={(e) => setFirstLastName(e.target.value)}
                        />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Por favor, elige un primer apellido.
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="validationSecondLastName" className="form-label">Segundo apellido</label>
                        {/* Input para nombre con estilos específicos. */}
                        <input
                            type="text"
                            name="SecondLastName"
                            className="form-control bg-transparent border-0 border-bottom rounded-0 text-white"
                            id="validationSecondLastName"
                            aria-describedby="SecondLastNameHelp"
                            required
                            onChange={(e) => setSecondLastName(e.target.value)}
                        />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                        <div className="invalid-feedback">
                            Por favor, elige un segundo apellido.
                        </div>
                    </div>

                    {/* Div contenedor para el campo de correo electrónico. */}
                    <div className="col-12">
                        <label htmlFor="validationEmail" className="form-label mt-3">Correo electrónico</label>
                        {/* Input para correo electrónico con estilos específicos. */}
                        <input
                            type="email"
                            name="email"
                            className="form-control bg-transparent border-0 border-bottom rounded-0 text-white"
                            id="validationEmail"
                            aria-describedby="emailHelp"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Div contenedor para el campo de contraseña. */}
                    <div className="col-md-6">
                        <label htmlFor="validationPassword" className="form-label mt-3">Contraseña</label>
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
                                onChange={handlePasswordChange}
                            />
                            <span className="password-toogle-icon">
                                {ToggleIcon}
                            </span>
                        </div>


                        <div id="validationPassword" className="form-text-info">
                            Tu contraseña debe ser de 8-20 caracteres, contener letras, números y símbolos. No debe contener espacios ni emojis.
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="validationCPassword" className="form-label mt-3">Confirmar contraseña</label>
                        {/* Input para contraseña con estilos específicos. */}
                        <div className="password-container d-grid">
                            {/* Input para contraseña con estilos específicos. */}
                            <input
                                type={PasswordInputType}
                                name="password"
                                className="space-password form-control bg-transparent border-0 border-bottom rounded-0 text-white"
                                id="validationCPassword"
                                aria-describedby="passwordHelpInline"
                                required
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            <span className="password-toogle-icon">
                                {ToggleIcon}
                            </span>
                        </div>
                    </div>

                    {/* Div contenedor para el campo de correo electrónico. */}
                    <div className="col-12">
                        <label htmlFor="validationPhoto" className="form-label mt-3">Correo electrónico</label>
                        {/* Input para correo electrónico con estilos específicos. */}
                        <input
                            type="file"
                            name="Photo"
                            className="file form-control bg-transparent border-0 border-bottom rounded-2 text-white"
                            id="validationEmail"
                            aria-describedby="emailHelp"
                            onChange={(e) => setPhoto(e.target.value)}
                        />
                    </div>

                    {/* Div contenedor para los botones del formulario. */}
                    <div className="d-grid gap-2 col-2 mx-auto mt-5">
                        {/* Link para navegar a la página principal después de ingresar. */}
                        <button type="submit" className="CrearS button btn justify-center" >Crear cuenta</button>
                    </div>

                    {errorMessage && <div className={`alert alert-danger text-white bg-danger mt-5 text-center ${fade ? 'fade-out' : ''}`} >{errorMessage}</div>}
                </form >

            </div >
        </div>
    );
};

export default Signup;