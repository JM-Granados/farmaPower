/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Requests.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import gradient from '../../assets/orange-yellow-gradient.png';
import user from '../../assets/user.png';
import Request from './Components';

const apiURL = import.meta.env.VITE_BACKEND_URL;
const mockRequests = [
    { id: 1, date: '17-05-2024', status: 'pending' },
    { id: 2, date: '18-05-2024', status: 'approved' },
    { id: 3, date: '19-05-2024', status: 'rejected' },
    { id: 4, date: '20-05-2024', status: 'pending' },
    { id: 5, date: '21-05-2024', status: 'approved' },
    { id: 6, date: '22-05-2024', status: 'pending' },
    { id: 7, date: '23-05-2024', status: 'rejected' },
];

function Requests() {
    const [requests, setRequests] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const endpoint = apiURL;

    useEffect(() => {
        // Crear una función asíncrona dentro de useEffect para realizar la solicitud
        const fetchRequests = async () => {
            try {
                const response = await axios.get(endpoint);
                setRequests(response.data);
            } catch (error) {
                setErrorMessage(error.response?.data.error || 'An error occurred.');
                setRequests(mockRequests);
            }
        };
        
        fetchRequests(); 
    }, [endpoint]);

    return (
        <div className=''>
            <div className="gradient-title d-flex justify-content-between align-items-center">
                <img src={gradient} alt="Logo" id="gradient" className='gradient-image' />
                <img src={user} alt='User' id="top-user" className='user-image' />
            </div>
            <div>
                <ul className="nav nav-underline text-wrapper-4 little-nav-bar"> {/*Aqui falta el color del underline */}
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="#">Todas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pendientes</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Aprobadas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Rechazadas</a>
                    </li>
                </ul>
            </div>
            <div className="container-fluid mt-2">
                <div className="scrollable-container">
                    <div className="row g-4 p-15">
                        {requests.map((request) => (
                            <div key={request.id} className="col-auto d-flex p-3">
                                <Request id={request.id + 1} date={request.date} status={request.status} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
    );
}

export default Requests;