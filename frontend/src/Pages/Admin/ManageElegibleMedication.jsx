import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageElegibleMedication.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/elegible_medication_title.png';
import pill from '../../assets/drugs1.png';

const ManageElegibleMedication = () => { 
    return (
        <div className="container-fluid mis-solicitudes">
            <div className="row principal">
                <div className="col-lg-3 col-12 px-0">
                    <SideBar />
                </div>

                <div className="col-lg-9 col-12 div2">
                    <div className="row div3 align-items-end">
                        <div className="col-12 div-gradient-header">
                            <img className='imagen' src={gradient} alt="Logo" />
                        </div>
                    </div>

                    <div className="row div4 justify-content-center">
                        <div className="estado btn-group col-md-8 col-10">
                            <button type="button" className="btn" onClick={() => handleFilter('Aprobada')}>Aprobadas</button>
                            <button type="button" className="btn" onClick={() => handleFilter('Pendiente')}>Pendientes</button>
                            <button type="button" className="btn" onClick={() => handleFilter('Rechazada')}>Rechazadas</button>
                            <button type="button" className="btn" onClick={() => handleFilter('Todas')}>Todas</button>
                        </div>
                    </div>

                    <div className="row div5 overflow-auto">
                        {filteredRequests.map((request, index) => (
                            <div className="col-md-4 col-12 mb-3" key={request._id}>
                                <div className="cuadrado">
                                    <div className="row1">
                                        <img src={pill} className="card-img-top" alt="..." />
                                    </div>
                                    <div className="row2">
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

export default ManageElegibleMedication;
