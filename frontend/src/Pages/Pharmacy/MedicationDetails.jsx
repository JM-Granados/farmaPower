import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MedicationDetails.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/MedicationsDetail_gradient.png';
import pill from '../../assets/drugs1.png';
import exchange from '../../assets/Canjear.png';
import medicine from '../../assets/medicine.png';

import { useNavigate } from 'react-router-dom';

const apiURL = import.meta.env.VITE_BACKEND_URL;

const MedicationDetails = () => {
    const selectedClient = JSON.parse(localStorage.getItem('selectedClient'));
    const selectedMedication = JSON.parse(localStorage.getItem('selectedMedication'));
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar la carga

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.post(`${apiURL}/api/requests/vs/visitCandidates`, {
                    idClient:selectedClient._id,
                    id:selectedMedication._id,
                });
                setRequests(response.data.data); 
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

    const puntosDisponibles = requests
    .filter((request) => request.rStatus === 'Aprobada')
    .reduce((total, request) => total + request.medication.points * request.purchasedQuantity, 0);

    const puntosParaCanje = requests[0]?.medication.exchangeAmount * requests[0]?.medication.points;

    const puedeCanjear = puntosDisponibles >= puntosParaCanje;

    function getRequestIdsForPoints(requests) {
      const selectedRequestIds = [];
      let accumulatedPoints = 0; 
    
      for (const request of requests) {
        const requestPoints = (request.medication.exchangeAmount || 0) * (request.medication.points || 0);
        selectedRequestIds.push(request._id);
        accumulatedPoints += requestPoints;
        if (accumulatedPoints >= puntosParaCanje) {
          break;
        }
      }
      return selectedRequestIds;
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append('product', requests[0].medication._id);
      formData.append('client', selectedClient._id);
      formData.append('pharmacy', requests[0].pharmacy._id);
      formData.append('requests', getRequestIdsForPoints(requests
        .filter((request) => request.rStatus === 'Aprobada'))); 
  
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
    
      try {
        //const response = await axios.post('http://localhost:3000/api/requests/c/', formData, {
        const response = await axios.post(`${apiURL}/api/exchanges/newExchange`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
  
        console.log('Respuesta del servidor:', response.data);
        navigate('/Clients')
      } catch (error) {
        console.error("Error al enviar los datos:", error);
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
                  <img className='mdimagen' src={gradient} alt="Logo" id="gradient" />
                </div>
              </div>
    
              {/* <form onSubmit={handleSubmit} className="row nrdiv5 overflow-auto"> */}
              <form  className="row mddiv5">

                <div className="col mddiv6 input-group-column">
                 
                  <div className="row mt-4 align-items-center">
                    <div className="col-md-4">
                      <p className="form-label ">Puntos por unidad</p>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={requests[0]?.medication.points || -1} 
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row mt-4 align-items-center">
                    <div className="col-md-4">
                      <p className="form-label ">Puntos para el canje</p>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        //          Si es 0 lo selecciona                  Total de puntos para canjear      -      Lo que ha comprado                                         
                        defaultValue={Math.max( 0, (requests[0]?.medication.exchangeAmount || -9999) * (requests[0]?.medication.points || -9999) 
                            - (requests[0]?.medication.points || -9999) *(requests[0]?.purchasedQuantity || -9999) )}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row mt-4 align-items-center">
                    <div className="col-md-4">
                      <p className="form-label ">Puntos acumulados</p>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={(requests[0]?.medication.points || -9999) *(requests[0]?.purchasedQuantity || -9999) }
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="row mt-4 align-items-center">
                    <div className="col-md-4">
                      <p className="form-label ">Puntos disponibles</p>
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        defaultValue={puntosDisponibles}
                        readOnly
                      />
                    </div>
                  </div>


                </div>
    
                <div className="col-3 mddiv8">
                  <div className="col-3 rndiv7">
                    <div className="div-upload d-flex flex-column justify-content-center align-items-center">
                      <img
                        className='mdimagen-upload'
                        src={medicine}
                        alt="Upload icon"
                        style={{ cursor: 'pointer', maxWidth: '1000px' }}
                      />
                      <h3 className='med-name'><br />{requests[0].medication.medication.name}</h3>
                    </div>
                  </div>

                  {puedeCanjear && (
                    <div className="row div-upload d-flex justify-content-center align-items-center">
                        <img
                        className="imagen-canjear"
                        src={exchange}
                        alt="Upload icon"
                        onClick={handleSubmit}
                        style={{ cursor: 'pointer' }}
                        />
                    </div>
                  )}
    
    
                </div>
    
              </form>

              <div className="col mddiv9 overflow-auto">
                {requests.map((request, index) => (
                        // Cada tarjeta es un cuadrado
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
                                        Fecha: {new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' }).format(new Date(request.purchaseDate))} <br />
                                        Factura: {request.invoiceNumber} <br />
                                        Farmacia: {request.pharmacy.name} <br />
                                        Canje: {request.exchangeNumber}
                                    </p>
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

export default MedicationDetails;