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
    const [filteredRequests, setFRequests] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedStatus, setSelectedStatus] = useState([]);

    const endpoint = apiURL;

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(endpoint);
                setRequests(response.data);
            } catch (error) {
                setErrorMessage(error.response?.data.error || 'An error occurred.');
                setRequests(mockRequests); //eliminar esta linea una vez se hayan hecho las pruebas
            }
        };
        
        fetchRequests(); 
    }, [endpoint]);

    const handleFilter = (status) => {
        setSelectedStatus(status);
        console.log(status)
        if (status === 'Todas') {
            setFRequests(requests); 
        } else {
            setFRequests(requests.filter(request => request.rStatus === status)); 
        }
    };

    return (
        <div className=''>
            <div className="kgradient-title d-flex justify-content-between align-items-center">
                <img src={gradient} alt="Logo" id="gradient" className='kgradient-image' />
                <img src={user} alt='User' id="top-user" className='kuser-image' />
            </div>
            <div>
                <ul className="nav custom-nav-underline nav-underline text-wrapper-17 little-nav-bar"> {/*Aqui falta el color del underline */}
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="#" onClick={() => handleFilter('Todas')}>Todas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={() => handleFilter('Pendiente')}>Pendientes</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={() => handleFilter('Aprobada')}>Aprobadas</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={() => handleFilter('Rechazada')}>Rechazadas</a>
                    </li>
                </ul>
            </div>
            <div className="container-fluid mt-2">
                <div className="scrollable-container">
                    {/* <div className="row g-4 p-15">
                        {requests.map((index, request) => (
                            <div key={request._id} className="col-auto d-flex p-3">
                                <Request id={request._id} date={request.timestamp} status={request.rStatus} />
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
    );
}

export default Requests;