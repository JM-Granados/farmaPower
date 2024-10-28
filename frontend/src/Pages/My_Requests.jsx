import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './My_Requests.css';

import gradient from '../assets/lightblue_yellow_gradient.png';
import back1 from '../assets/back1.png';
import user from '../assets/user.png';
import selected from "../assets/Pestanaseleccionada.png"
import pill from '../assets/drugs1.png';

const MyRequests = () => {


    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/requests')
            .then(response => {
                setRequests(response.data);
                console.log(requests);
            })

            .catch(error => {
                console.error("Error fetching requests:", error);
            });
    }, []);


    return (
        <div className="mis-solicitudes">
            <div className="gradient-header">
                <div className="gradient-image-container">
                    <img src={gradient} alt="Logo" id="gradient" />
                </div>
                <div className="gradient-text">Mis Solicitudes</div>
            </div>

            <div className="sidebar">
                <div className="sidebar-title">Panel de navegación </div>
                <img className="back-1" alt="Back" src={back1} />
                <div className="sidebar-link">Inicio</div>
                <div className="sidebar-link">Mis solicitudes</div>
                <div className="selected-image-container">
                    <img className="selected-tab" alt="selected" src={selected} />
                </div>
                <div className="sidebar-link">Nueva solicitud</div>
                <div className="sidebar-link">Mis puntos</div>
                <div className="sidebar-link">Ayuda</div>
                <div className="sidebar-user-container">
                    <div className="user_image_container">
                        <img src={user} alt="Logo" id="user" />
                    </div>
                    <div className="sidebar-user">Nombre usuario</div>
                </div>
            </div>
            <div className="request-card d-inline-block">
                <div className="card d-inline-block">
                    {requests.map((request, index) => (
                        <div key={request._id} className="request-frame">
                            <div className="request-card-num">Solicitud #{index + 1}</div>
                            <div className="request-card-status">Estado: {request.rStatus}</div>
                        </div>
                    ))}
                    <div className="pill-image-container">
                        <img className="pill" alt="pill" src={pill} />
                    </div>
                </div>
            </div>
            {/* <div className="request-cardd">
                <div className="div">
                    {requests.map((request, index) => (
                        <div key={request._id} className="request-frame">
                            <div className="request-card-num">Solicitud #{index + 1}</div>
                            <div className="request-card-status">Estado: {request.rStatus}</div>
                        </div>
                    ))}
                </div>

                <div className="pill-image-container">
                    <img className="pill" alt="pill" src={pill} />
                </div>
            </div> */}

            <div className="overlap-2">
                <img
                    className="back"
                    alt="Back"
                    src="https://c.animaapp.com/LJ6fRBJx/img/back-2@2x.png"
                />

                <div className="text-wrapper-4">Estado</div>
            </div>
        </div>
    );
};

export default MyRequests;
