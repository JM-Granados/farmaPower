import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Programs.css';
import SideBar2 from '../../NavBar/SideBar';
import '../../NavBar/SideBar.css'; 
import gradient from '../../assets/programs_gradient.png'; 
import programimg from '../../assets/programs.png';

const Programs = () => {

    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/programs');
                setPrograms(response.data);
            } catch (error) {
                console.error("Error fetching requests:", error);
            }
        };

        fetchPrograms();
    }, []);

    return (
        <div className="programas">
            <div className="row principal">
                {/* Paritmos la pantalla en 2
                Primer pedazo
                Las proporciones se ajustan con porcentajes en el css o se puede -N donde N es la cantidad de pedazos */}
                <div className="div">
                    <SideBar2 />
                </div>

                {/* Segundo pedazo
                Este pedazo se divide en 3. Esta el titulo, el filtro y las solicitudes */}
                <div className="col pdiv2">
                    {/* Pedazo del titulo */}
                    <div className="row pdiv3">
                        <div className="pdiv-gradient-header d-flex justify-content-start align-items-end" style={{ height: '100%' }}>
                            <img className='pimagen' src={gradient} alt="Logo" id="gradient" />
                        </div>
                    </div>
                    <div className="row pdiv5 overflow-auto">
                    {programs.map((program, index) => (
                        <div className="pcuadrado" key={program._id}>
                            {/* Sección de la imagen */}
                            <div className="prow1">
                            <div className="pcol1"> <img src={programimg} className="mcard-img-top" alt={program.name} />
                            </div>
                            </div>

                            {/* Sección del texto */}
                            <div className="prow2">
                            <div className="pcol1">
                                <p>Nombre: {program.name}</p>
                                <p>Descripción: {program.description}</p>

                                {/* Renderizado de las farmacias
                                {program.pharmacies && program.pharmacies.length > 0 ? (
                                program.pharmacies.map((pharmacy) => (
                                    <p key={pharmacy._id}>
                                    {pharmacy.name} - Ubicación: {pharmacy.location}
                                    </p>
                                ))
                                ) : (
                                <p>No hay farmacias asociadas.</p>
                                )} */}
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

export default Programs;
