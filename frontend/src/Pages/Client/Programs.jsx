import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Programs.css';
import SideBar2 from '../../NavBar/SideBar2';
import '../../NavBar/SideBar2.css'; 
import gradient from '../../assets/programs_gradient.png'; 
import program from '../../assets/programs.png';

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
                <div className="col div2">
                    {/* Pedazo del titulo */}
                    <div className="row div3">
                        <div className="div-gradient-header d-flex justify-content-start align-items-end" style={{ height: '100%' }}>
                            <img className='imagen' src={gradient} alt="Logo" id="gradient" />
                        </div>
                    </div>
                    <div className="row div5 overflow-auto">
                        {programs.map((request, index) => (
                            // Cada tarjeta es un cuadrado
                            <div className="cuadrado" key={request._id}>
                                {/* Se divide en 2, la imagen y el texto. En el CSS  esta la configuraicion */}
                                {/* Imagen */}
                                <div className="row1">
                                    <div className="col1">
                                        <img src={program} className="card-img-top" alt="..." />
                                    </div>
                                </div>

                                {/* Texto */}
                                <div className="row2">
                                    <div className="col1">
                                        <p>Nombre: {request.name} 
                                             <br /> {request.pharmacies}</p>
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
