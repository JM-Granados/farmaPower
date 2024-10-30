import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './My_Requests.css';
import SideBar from '../../NavBar/SideBar';
import '../../NavBar/SideBar.css'; 
import gradient from '../../assets/g.png'; // Corrected path
import pill from '../../assets/drugs1.png';

const ParticipatingMedications = () => {

    return (
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

                </div>
            </div>
        </div>
    );
};

export default ParticipatingMedications;
