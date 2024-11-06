import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './My_Points.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/my_points.png';
import pill from '../../assets/drugs1.png';
const apiURL = import.meta.env.VITE_BACKEND_URL;

const MyPoints = () => {
    const user = JSON.parse(localStorage.getItem('user')); 

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`${apiURL}/api/requests/totalPointsByMedication/:${user._id}`);
                setRequests(response.data);
                setFilteredRequests(response.data);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchRequests();
    }, []);

    return (
        <div className="mis-puntos">
            <div className="row principal">
                {/* Paritmos la pantalla en 2
                Primer pedazo
                Las proporciones se ajustan con porcentajes en el css o se puede -N donde N es la cantidad de pedazos */}
                <div className="div">
                    <SideBar />
                </div>

                <div className="col mpdiv2">
                    <div className="row mpdiv3">
                        <div className="mpdiv-gradient-header d-flex justify-content-start align-items-end" style={{ height: '100%' }}>
                            <img className='mpimagen' src={gradient} alt="Logo" id="gradient" />
                        </div>
                    </div>
                    <div className="row mpdiv5 overflow-auto">
                        {requests.map((request) => (
                            <div className="mpcuadrado" key={request.medicationId}>
                                {/* Medication Header */}
                                <div className="mpcol2">
                                    <h4>{request.medicationName}</h4>
                                </div>

                                {/* Points Info */}
                                <div className="mpcol1">
                                    <p><br /> Puntos por solicitud: {request.originalPoints}</p>
                                    <p>Puntos actuales: {request.totalPoints}</p>
                                    <p>Puntos faltantes: {(request.originalPoints * request.exchangeAmount) - request.totalPoints}</p>
                                </div>

                                {/* Progress Bar */}
                                <div className="row2">
                                    <div className="progress-bar-container">
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${(request.totalPoints / (request.originalPoints * request.exchangeAmount)) * 100}%`
                                            }}
                                        >
                                            <span>{Math.round((request.totalPoints / (request.originalPoints * request.exchangeAmount)) * 100)}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>



                </div>
            </div>
        </div>
    );
};

export default MyPoints;