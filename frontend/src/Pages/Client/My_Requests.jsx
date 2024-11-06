import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './My_Requests.css';
import SideBar from '../../NavBar/SideBar';
import '../../NavBar/SideBar.css'; 
import gradient from '../../assets/g.png'; // Corrected path
import pill from '../../assets/drugs1.png';
const apiURL = import.meta.env.VITE_BACKEND_URL;


const MyRequests = () => {
    const user = JSON.parse(localStorage.getItem('user')); 

    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`${apiURL}/api/requests/${user._id}`);
                setRequests(response.data);
                setFilteredRequests(response.data);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchRequests();
    }, []);

    const handleFilter = (status) => {
        setSelectedStatus(status);
        console.log(status)
        if (status === 'Todas') {
            setFilteredRequests(requests); 
        } else {
            // https://www.javascripttutorial.net/javascript-array-filter/ 
            setFilteredRequests(requests.filter(request => request.rStatus === status)); 
        }
    };

    return (
        /*
 
        La pantalla esta dividida en 12 pedazos, ya sea horizontal o verticalmente.
         */
        <div className="mis-solicitudes">
            <div className="row principal">
                {/* Paritmos la pantalla en 2
                Primer pedazo
                Las proporciones se ajustan con porcentajes en el css o se puede -N donde N es la cantidad de pedazos */}
                <div className="div">
                    <SideBar />
                </div>

                {/* Segundo pedazo
                Este pedazo se divide en 3. Esta el titulo, el filtro y las solicitudes */}
                <div className="col div2">
                    {/* Pedazo del titulo */}
                    <div className="row div3">
                        <div className="div-gradient-header d-flex justify-content-start align-items-end" style={{ height: '100%' }}>
                            <img className='imagen' src={gradient} alt="Logo" id="gradient" />
                        </div>
                    </div>

                    {/* Pedazo del filtro - Sacado de bootstrap */}
                    <div className="row div4">
                        <div className="estado btn-group" role="group">
                            <button type="button" className="mbtn" onClick={() => handleFilter('Aprobada')}>Aprobadas</button>
                            <button type="button" className="mbtn" onClick={() => handleFilter('Pendiente')}>Pendientes</button>
                            <button type="button" className="mbtn" onClick={() => handleFilter('Rechazada')}>Rechazadas</button>
                            <button type="button" className="mbtn" onClick={() => handleFilter('Todas')}>Todas</button>
                        </div>
                    </div>

                    {/* Pedazo de las solicitudes */}
                    <div className="row div5 overflow-auto">
                        {filteredRequests.map((request, index) => (
                            // Cada tarjeta es un cuadrado
                            <div className="cuadrado" key={request._id}>
                                {/* Se divide en 2, la imagen y el texto. En el CSS  esta la configuraicion */}
                                {/* Imagen */}
                                <div className="row1">
                                    <div className="col1">
                                        <img src={pill} className="mcard-img-top" alt="..." />
                                    </div>
                                </div>

                                {/* Texto */}
                                <div className="row2">
                                    <div className="col1">
                                        <p>Solicitud #{index + 1} <br />Estado: {request.rStatus}</p>
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

export default MyRequests;
