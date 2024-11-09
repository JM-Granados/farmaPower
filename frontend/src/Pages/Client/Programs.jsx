import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Programs.css';
import SideBar2 from '../../NavBar/SideBar';
import '../../NavBar/SideBar.css'; 
import gradient from '../../assets/programs_gradient.png'; 
import program from '../../assets/programs.png';
const apiURL = import.meta.env.VITE_BACKEND_URL;

const Programs = () => {

    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get(`${apiURL}/api/programs`);
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
                            // Cada tarjeta es un cuadrado
                            <div className="pcuadrado" key={program._id}>
                                {/* Se divide en 2, la imagen y el texto. En el CSS  esta la configuraicion */}
                                
                                {/* Texto */}
                                <div className="prow2">
                                    <div className="pcol1">
                                        <p>
                                            Nombre: {program.name} 
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

export default Programs;
