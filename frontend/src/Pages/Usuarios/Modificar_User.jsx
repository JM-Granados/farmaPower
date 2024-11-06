import React, { useState, useEffect } from 'react';
import './Modificar_User.css';
import SideBar from '../../NavBar/SideBar';
import ModificarUsuario from '../../assets/ModificarUsuario.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación programática.
const apiURL = import.meta.env.VITE_BACKEND_URL;

const Modificar_User = () => {
    const user = JSON.parse(localStorage.getItem('userToEdit'));

    const [role, setRole] = useState(user.role || "");
    const [firstName, setFirstName] = useState(user.firstName || "");
    const [firstLastName, setFirstLastName] = useState(user.firstLastName || "");
    const [secondLastName, setSecondLastName] = useState(user.secondLastName || "");
    const [email, setEmail] = useState(user.email || "");
    const [photo, setPhoto] = useState(user.imageUrl || "");
    const [isActive, setIsActive] = useState(user.status || "");

    const prepareUpdateData = () => {
        return {
            firstName: firstName,
            firstLastName: firstLastName,
            secondLastName: secondLastName,
            email: email,
            role: role,
            status: isActive,
            imageUrl: photo
        };
    };


    // Hook useNavigate de React Router para la navegación programática.
    const navigate = useNavigate();

    // Estado para manejar mensajes de error.
    const [errorMessage, setErrorMessage] = useState('');
    const [fade, setFade] = useState(false);

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]); // Almacena el archivo seleccionado
    };

    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userToEdit'));
        if (user && user.role) {
            setSelectedRole(user.role);
        }
    }, []);

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userToEdit'));
        if (user && user.status) {
            setIsActive(user.status);
        }
    }, []);

    const handleStatusChange = (e) => {
        setIsActive(e.target.value);
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

        const updateData = prepareUpdateData();

        setErrorMessage(''); // Limpia el mensaje de error

        const endpoint = `${apiURL}/api/users/modifyUser`;  // URL del endpoint de signup.

        if (Object.keys(updateData).length === 0) {
            setErrorMessage("No hay cambios para actualizar.");
            return;  // No hay nada que actualizar.
        }

        console.log(updateData)

        const formData = new FormData();

        // Agregar datos de texto
        formData.append("firstName", updateData.firstName);
        formData.append("firstLastName", updateData.firstLastName);
        formData.append("secondLastName", updateData.secondLastName);
        formData.append("email", updateData.email);
        formData.append("role", updateData.role);
        formData.append("status", updateData.status);

        // Agregar la imagen si es nueva (si se seleccionó una nueva imagen en `photo`)
        if (typeof photo !== 'string') { // Esto asegura que no estamos enviando la URL de la imagen, sino un archivo
            formData.append("image", updateData.imageUrl);  // 'image' debería ser el mismo nombre que tu backend espera
        }

        // Mostrar los contenidos de formData
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }


        try {
            const response = await axios.patch(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Verifica si la respuesta del servidor indica un registro exitoso.
            if (response.data.message === "User updated successfully") {
                navigate('/Users'); // Navega a la lista de usuarios u otra página relevante.
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            // Captura errores de la solicitud y muestra un mensaje de error.
            setErrorMessage(error.response?.data.error || 'An error occurred.');
        }
    }

    return (
        <div className="container-fluid register-pharmacy">
            <div className="row j-moph-principal">
                <div className="col-lg-3 col-12 px-0">
                    <SideBar />
                </div>

                <div className="col-lg-9 col-12 i-moph-div2">
                    <div className="row j-moph-div3 align-items-end">
                        <div className="col-12 div-gradient-header">
                            <img className='j-moph-imagenUser me-5 rounded-circle' src={user.imageUrl} alt="ModificarUsuario" height={125} />
                            <img className='j-moph-imagen' src={ModificarUsuario} alt="ModificarUsuario" />
                        </div>
                    </div>

                    {/* Input fields with labels to the left */}
                    <form className='text-white row g-3 needs-validation mt-4 mx-5' novalidate onSubmit={handleSubmit}>
                        <div className='d-flex justify-content-space-around mb-3'>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="role"
                                    id="flexRadioDefault1"
                                    value="Client"
                                    onChange={handleRoleChange}
                                    checked={selectedRole === 'Client'}
                                />
                                <label className="form-check-label me-3" htmlFor="flexRadioDefault1">
                                    Cliente
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="role"
                                    id="flexRadioDefault2"
                                    value="Admin"
                                    onChange={handleRoleChange}
                                    checked={selectedRole === 'Admin'}
                                />
                                <label className="form-check-label me-3" htmlFor="flexRadioDefault2">
                                    Administrador
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="role"
                                    id="flexRadioDefault3"
                                    value="Operator"
                                    onChange={handleRoleChange}
                                    checked={selectedRole === 'Operator'}
                                />
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
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder={user.firstName}
                            />
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
                                onChange={(e) => setFirstLastName(e.target.value)}
                                placeholder={user.firstLastName}
                            />
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
                                onChange={(e) => setSecondLastName(e.target.value)}
                                placeholder={user.secondLastName}
                            />
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
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={user.email}
                            />
                        </div>

                        {/* Div contenedor para el campo de correo electrónico. */}
                        <div className="col-12">
                            <label htmlFor="validationPhoto" className="form-label mt-3">¿Actualizar foto de perfil?</label>
                            {/* Input para correo electrónico con estilos específicos. */}
                            <input
                                type="file"
                                name="image"
                                className="elinput file form-control bg-transparent border-0 border-bottom rounded-2 text-white mb-3"
                                id="validationEmail"
                                aria-describedby="emailHelp"
                                onChange={(e) => setPhoto(e.target.files[0])}
                            />
                        </div>

                        <div className='d-flex justify-content-space-around'>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="status "
                                    id="flexRadioDefault1"
                                    value="Activated"
                                    onChange={handleStatusChange}
                                    checked={isActive === 'Activated'}
                                />
                                <label className="form-check-label me-3" htmlFor="flexRadioDefault1">
                                    Activo
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="status "
                                    id="flexRadioDefault2"
                                    value="Deactivated"
                                    onChange={handleStatusChange}
                                    checked={isActive === 'Deactivated'}
                                />
                                <label className="form-check-label me-3" htmlFor="flexRadioDefault2">
                                    No activo
                                </label>
                            </div>
                        </div>



                        <div className="row mt-4">
                            {/* Column for the button */}
                            <div className="col-md-6">
                                <button type="submit" className="btn j-moph-modify-pharmacy-button w-50 mt-5">Confirmar cambios</button>
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
export default Modificar_User;