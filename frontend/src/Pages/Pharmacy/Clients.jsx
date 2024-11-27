import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Usuarios/Users.css'
import { Link } from 'react-router-dom';
import SideBar from '../../NavBar/SideBar';
import ClientesPharmacy from '../../assets/ClientesPharmacy.png';
import userIcon from '../../assets/IconoUser.png'
import SelectedUser from '../../assets/SelectedUser.png'
import Search from '../../assets/Search.png'
import { useNavigate } from 'react-router-dom';
const apiURL = import.meta.env.VITE_BACKEND_URL;

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        // Fetch all eligible medications on initial load
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${apiURL}/api/users/clients`);
                console.log(response.data)
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUser();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            if (searchText == "") {
                const response = await axios.get(`${apiURL}/api/users/getUsers`);
                console.log(response.data)
                setUsers(response.data);
            } else {
                const response = await axios.get(`${apiURL}/api/users/getUsersSearched?search=${searchText}`);
                setUsers(response.data);
            }
        } catch (error) {
            console.error("Error searching users:", error);
        }
    };

    const handleEditClick = (user) => {
        localStorage.setItem('selectedClient', JSON.stringify(user));

        // Navegar a la página de edición
        navigate(`/UserExchanges`);
    };

    const getRoleSpanish = (role) => {
        switch (role) {
            case 'Admin':
                return 'Administrador';
            case 'Client':
                return 'Cliente';
            case 'Operator':
                return 'Operador';
            case 'Pharmacy':
                return 'Farmacia';
            default:
                return 'Rol no definido';
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <div className="container-fluid j-maem-manage-elegible-medications">
            <div className="row j-maem-principal">
                <div className="col-lg-3 col-12 px-0">
                    <SideBar />
                </div>

                <div className="col-lg-9 col-12 j-maem-div2">
                    <div className="row j-maem-div3 align-items-end">
                        <div className="col-12 div-gradient-header">
                            <img className='j-imagen' src={ClientesPharmacy} alt="Usuarios"/>
                        </div>
                    </div>

                    {/* Search bar and text */}
                    <div className="row mt-3">
                        <div className="j-buscador col-md-8 position-relative">
                            <input
                                type="text"
                                className="j-maem-form-control form-control"
                                placeholder="Buscar usuario"
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button className="search-icon-btn" onClick={handleSearch}>
                                <img src={Search} alt="Buscar" />
                            </button>
                        </div>
                    </div>

                    {/* Medications Displayed as Cards */}
                    <div className="row mt-4 j-maem-card-container">
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <div className="col-md-4 mb-4" key={user._id}>
                                    <div className="j-cartaUsers card p-3 position-relative">
                                        <div className="card-body text-white rounded-2">
                                            <p className="card-text">
                                                <div className="edit-icon" onClick={() => handleEditClick(user)}>
                                                    <img src={SelectedUser} alt="Edit" className="info-icon" />
                                                </div>
                                                {getRoleSpanish(user.role)} <br />
                                                {user.status === 'Activated' ? 'Activo' : 'No activo'}
                                            </p>
                                        </div>
                                        <img
                                            src={user.principalImage ? user.imageUrl : userIcon}
                                            className="j-fotitoUser card-img-top mb-3 rounded-2"
                                            alt="user"
                                            height={404}
                                        />
                                        <div className="card-body text-white rounded-2">
                                            <h5 className="card-title">{user.firstName} {user.firstLastName} {user.secondLastName}</h5>
                                            <p className="card-text">
                                                Correo: {user.email} <br />
                                                Fecha de ingreso: {formatDate(user.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="j-maem-no-results">No hay usuarios que coincidan con la búsqueda.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
