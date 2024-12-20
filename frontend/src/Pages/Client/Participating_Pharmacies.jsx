import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Participating_Pharmacies.css';
import SideBar2 from '../../NavBar/SideBar';
import '../../NavBar/SideBar.css'; 
import gradient from '../../assets/participating_pharmacies.png'; 
import pharmacy from '../../assets/pharmacy1.png';

const ParticipatingPharmacies = () => {

    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
        const fetchPharmacies = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/pharmacies/g/get');
                setPharmacies(response.data);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchPharmacies();
    }, []);

    return (
        <div className="farmacias-participantes">
            <div className="row principal">
                {/* Paritmos la pantalla en 2
                Primer pedazo
                Las proporciones se ajustan con porcentajes en el css o se puede -N donde N es la cantidad de pedazos */}
                <div className="div">
                    <SideBar2 />
                </div>

                {/* Segundo pedazo
                Este pedazo se divide en 3. Esta el titulo, el filtro y las solicitudes */}
                <div className="col ppdiv2">
                    {/* Pedazo del titulo */}
                    <div className="row ppdiv3">
                        <div className="ppdiv-gradient-header d-flex justify-content-start align-items-end" style={{ height: '100%' }}>
                            <img className='ppimagen' src={gradient} alt="Logo" id="gradient" />
                        </div>
                    </div>
                    <div className="row ppdiv5 overflow-auto">
                        {pharmacies.map((request, index) => (
                            // Cada tarjeta es un cuadrado
                            <div className="ppcuadrado" key={request._id}>
                                {/* Se divide en 2, la imagen y el texto. En el CSS  esta la configuraicion */}
                                {/* Imagen */}
                                <div className="pprow1">
                                    <div className="ppcol1">
                                        <img src={pharmacy} className="ppcard-img-top" alt="..." />
                                    </div>
                                </div>

                                {/* Texto */}
                                <div className="pprow2">
                                    <div className="ppcol1">
                                        <p>Nombre: {request.name}  <br /> {request.location} </p>
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

export default ParticipatingPharmacies;
