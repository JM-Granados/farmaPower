import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Participating_Medications.css';
import SideBar2 from '../../NavBar/SideBar';
import '../../NavBar/SideBar.css';
import gradient from '../../assets/participating_medications.png';
import medicine from '../../assets/medicine.png';

const ParticipatingMedications = () => {
    const [elegibleMedications, setElegibleMedications] = useState([]);

    useEffect(() => {
        const fetchElegibleMedications = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/elegiblemedications');
                setElegibleMedications(response.data);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchElegibleMedications();
    }, []);

    return (
        <div className="medicamentos-participantes">
            <div className="row principal">
                {/* Paritmos la pantalla en 2
                Primer pedazo
                Las proporciones se ajustan con porcentajes en el css o se puede -N donde N es la cantidad de pedazos */}
                <div className="div">
                    <SideBar2 />
                </div>

                {/* Segundo pedazo
                Este pedazo se divide en 3. Esta el titulo, el filtro y las solicitudes */}
                <div className="col pmdiv2">
                    {/* Pedazo del titulo */}
                    <div className="row pmdiv3">
                        <div className="pmdiv-gradient-header d-flex justify-content-start align-items-end" style={{ height: '100%' }}>
                            <img className='pmimagen' src={gradient} alt="Logo" id="gradient" />
                        </div>
                    </div>
                    <div className="row pmdiv5 overflow-auto">
                        {elegibleMedications.map((request, index) => (
                            // Cada tarjeta es un cuadrado
                            <div className="pmcuadrado" key={request._id}>
                                {/* Se divide en 2, la imagen y el texto. En el CSS  esta la configuraicion */}
                                {/* Imagen */}
                                <div className="pmrow1">
                                    <div className="pmcol1">
                                        <img src={medicine} className="mcard-img-top" alt="..." />
                                    </div>
                                </div>

                                {/* Texto */}
                                <div className="pmrow2">
                                    <div className="pmcol1">
                                        <p>Nombre: {request.medication.name}  <br /> Puntos: {request.points} </p>
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

export default ParticipatingMedications;
