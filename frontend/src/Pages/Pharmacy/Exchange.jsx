import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MedicationDetails.css';
import SideBar from '../../NavBar/SideBar';
import inforCanje from '../../assets/InforCanje.png';
import pill from '../../assets/drugs1.png';
import exchange from '../../assets/Canjear.png';
import medicine from '../../assets/medicine.png';

import { useNavigate } from 'react-router-dom';

const apiURL = import.meta.env.VITE_BACKEND_URL;

const MedicationDetails = () => {
    const selectedExchangeId = JSON.parse(localStorage.getItem('selectedExchange'));
    const doubleSelectedClient = JSON.parse(localStorage.getItem('doubleSelectedClient'));
    const navigate = useNavigate();

    const [exchangeData, setExchangeData] = useState(null); // Para almacenar la información del exchange
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar la carga

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.post(`${apiURL}/api/exchanges/ve/visitExchanges`, {
                    idClient: doubleSelectedClient,
                    id: selectedExchangeId,
                });
                setRequests(response.data.data);
                console.log(response.data.data)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching requests:", error);
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    if (loading) {
        return <div>...</div>;
    }

    if (!requests || requests.length === 0) {
        return <div>No hay datos disponibles.</div>;
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return 'Fecha no disponible'; // O maneja como mejor te parezca
        try {
            return new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(new Date(dateStr));
        } catch (error) {
            console.error('Fecha inválida:', dateStr, error);
            return 'Fecha inválida'; // O maneja como mejor te parezca
        }
    };

    return (
        <div className="nueva-solicitud">
            <div className="row principal">
                <div className="div">
                    <SideBar />
                </div>

                <div className="col mddiv2">
                    <div className="row mddiv3">
                        <div className="mddiv-gradient-header d-flex justify-content-start align-items-end" style={{ height: '100%' }}>
                            <img className='jdimagen' src={inforCanje} alt="Logo" id="gradient" />
                        </div>
                    </div>

                    <div className="row i-ue-user-info">
                        <div className="col-12">
                            <h2 className="mt-4 mx-4">Canje #{requests[0].exchangeNumber}</h2>
                        </div>
                    </div>

                    {/* <form onSubmit={handleSubmit} className="row nrdiv5 overflow-auto"> */}
                    <form className="row mddiv5">

                        <div className="col mddiv6 input-group-column">

                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <p className="form-label ">Fecha</p>
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        defaultValue={new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(new Date(requests[0].createdAt))}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="row mt-2 align-items-center">
                                <div className="col-md-4">
                                    <p className="form-label ">Producto</p>
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        //          Si es 0 lo selecciona                  Total de puntos para canjear      -      Lo que ha comprado                                         
                                        defaultValue={requests[0].product.medication.name}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="row mt-2 align-items-center">
                                <div className="col-md-4">
                                    <p className="form-label ">Farmacia</p>
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        defaultValue={requests[0]?.pharmacy.name}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <p className="form-label ">Solicitudes asociadas:</p>
                                </div>
                            </div>
                        </div>


                    </form>
                    <div className="tituloSolicitudes col mddiv9 overflow-auto">
                        {requests.map((subrequest, index) => (
                            subrequest.requests.map((request, index) => (

                                <div className="mdcuadrado" key={request._id}>
                                    {/* Se divide en 2, la imagen y el texto. En el CSS  esta la configuraicion */}
                                    {/* Imagen */}
                                    <div className="row1">
                                        <div className="col1">
                                            <img src={pill} className="mdcard-img-top" alt="..." />
                                        </div>
                                    </div>

                                    {/* Texto */}
                                    <div className="row2">
                                        <div className="col2">
                                            <p>
                                                Fecha: {formatDate(request.purchaseDate)} <br />
                                                Factura: {request.invoiceNumber} <br />
                                                Farmacia: {requests[0].pharmacy.name}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            ))))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MedicationDetails;
