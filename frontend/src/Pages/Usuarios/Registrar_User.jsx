import React, { useState, useEffect } from 'react';
import '../Admin/ModifyPharmacy.css';
import SideBar from '../../NavBar/SideBar';
import Rusuario from '../../assets/RegistrarUsuario.png';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom para la navegación sin recarga.
import usePasswordToggle from "../../ComponentsLogin/usePasswordToggle";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación programática.
const apiURL = import.meta.env.VITE_BACKEND_URL;

const Registrar_User = () => {
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();

    // Declaración de estados para email y password usando el hook useState de React.
    const [role, setRole] = useState("");
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

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

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

        setErrorMessage(''); // Limpia el mensaje de error

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('firstLastName', firstLastName);
        formData.append('secondLastName', secondLastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', role);

        if (photo) {
            formData.append('image', photo); // Añade la foto que el usuario seleccionó
        } else {
            // Si no hay una foto seleccionada, no agregues nada aquí y maneja el valor predeterminado en el backend
        }

        const endpoint = `${apiURL}/api/users/signup`;  // URL del endpoint de signup.

        try {
            const response = await axios.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'  // Esta línea es importante para el correcto manejo del FormData
                }
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
        <div className="container-fluid register-pharmacy">
            <div className="row i-moph-principal">
                <div className="col-lg-3 col-12 px-0">
                    <SideBar />
                </div>

                <div className="col-lg-9 col-12 i-moph-div2">
                    <div className="row i-moph-div3 align-items-end">
                        <div className="col-12 div-gradient-header">
                            <img className='i-moph-imagen' src={Rusuario} alt="Rusuario" />
                        </div>
                    </div>

                    {/* Input fields with labels to the left */}
                    <form className='text-white row g-3 needs-validation mt-4 mx-5' novalidate onSubmit={handleSubmit}>
                        <div className='d-flex justify-content-space-around mb-3'>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Client" onChange={handleRoleChange} />
                                <label className="form-check-label me-3" htmlFor="flexRadioDefault1">
                                    Cliente
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Admin" onChange={handleRoleChange} />
                                <label className="form-check-label me-3" htmlFor="flexRadioDefault2">
                                    Administrador
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="Operator" onChange={handleRoleChange} />
                                <label className="form-check-label" htmlFor="flexRadioDefault3">
                                    Operador
                                </label>
                            </div>
                        </div>

                        {/* Div contenedor para el campo de nombre. */}
                        <div className="col-md-4">
                            <label htmlFor="validationFirstName" className="form-label">Primer nombre</label>
                            {/* Input para nombre con estilos específicos. */}
                            <input
                                type="text"
                                name="firstName"
                                className="elinput form-control bg-transparent border-0 border-bottom rounded-0 text-white"
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
                                className="elinput form-control bg-transparent border-0 border-bottom rounded-0 text-white"
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
                                className="elinput form-control bg-transparent border-0 border-bottom rounded-0 text-white"
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
                                className="elinput form-control bg-transparent border-0 border-bottom rounded-0 text-white"
                                id="validationEmail"
                                aria-describedby="emailHelp"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Div contenedor para el campo de contraseña. */}
                        <div className="col-md-6">
                            <label htmlFor="validationPassword" className="form-label mt-3">Contraseña</label>
                            <div className="contra password-container d-grid">
                                {/* Input para contraseña con estilos específicos. */}
                                <input
                                    type={PasswordInputType}
                                    name="password"
                                    className="elinput space-password form-control bg-transparent border-0 border-bottom rounded-0 text-white"
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


                            <div id="validationPassword" className="mensaje form-text-info">
                                Tu contraseña debe ser de 8-20 caracteres, contener letras, números y símbolos. No debe contener espacios ni emojis.
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="validationCPassword" className="form-label mt-3">Confirmar contraseña</label>
                            {/* Input para contraseña con estilos específicos. */}
                            <div className="contra password-container d-grid">
                                {/* Input para contraseña con estilos específicos. */}
                                <input
                                    type={PasswordInputType}
                                    name="password"
                                    className="elinput space-password form-control bg-transparent border-0 border-bottom rounded-0 text-white"
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
                            <label htmlFor="validationPhoto" className="form-label mt-3">Foto de perfil</label>
                            {/* Input para correo electrónico con estilos específicos. */}
                            <input
                                type="file"
                                name="image"
                                className="elinput file form-control bg-transparent border-0 border-bottom rounded-2 text-white"
                                id="validationEmail"
                                aria-describedby="emailHelp"
                                onChange={(e) => setPhoto(e.target.files[0])}
                            />
                        </div>

                        <div className="row mt-4">
                            {/* Column for the button */}
                            <div className="col-md-6">
                                <button type="submit" className="btn i-moph-modify-pharmacy-button w-50 mt-5">Crear</button>
                            </div>

                            {/* Column for the error message */}
                            <div className="col-md-6">
                                {errorMessage && <div className={`alert alert-danger text-white bg-danger mt-5 text-center ${fade ? 'fade-out' : ''}`} >{errorMessage}</div>}
                            </div>
                        </div>


                    </form >

                </div>
            </div>
        </div>
    );
};
export default Registrar_User;