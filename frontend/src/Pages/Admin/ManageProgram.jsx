import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageProgram.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/manage_program_title.png';

const ManageProgram = () => {
    const [programs, setPrograms] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/programs');
                setPrograms(response.data);
            } catch (error) {
                console.error("Error fetching programs:", error);
            }
        };

        fetchPrograms();
    }, []);

    useEffect(() => {
        const searchPrograms = async () => {
            if (searchText === '') {
                const response = await axios.get('http://localhost:3000/api/programs');
                setPrograms(response.data);
            } else {
                try {
                    const response = await axios.get(`http://localhost:3000/api/programs/search?searchText=${searchText}`);
                    setPrograms(response.data);
                } catch (error) {
                    console.error("Error searching programs:", error);
                }
            }
        };

        searchPrograms();
    }, [searchText]);

    return (
        <div className="container-fluid i-maph-manage-programs">
            <div className="row i-maph-principal">
                <div className="col-lg-3 col-12 px-0">
                    <SideBar />
                </div>

                <div className="col-lg-9 col-12 i-maph-div2">
                    <div className="row i-maph-div3 align-items-end">
                        <div className="col-12 div-gradient-header">
                            <img className='i-maph-imagen' src={gradient} alt="Manage Programs" />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-8">
                            <input
                                type="text"
                                className="i-maph-form-control form-control"
                                placeholder="Buscar programa"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4 d-flex align-items-center">
                            <span>No hay coincidencias?</span>
                            <a href="/registerprogram" className="i-maph-gradient-link mx-2">Registrar nuevo</a>
                        </div>
                    </div>

                    <div className="row mt-4">
                        {programs.length > 0 ? (
                            programs.map((program) => (
                                <div className="col-md-4" key={program._id}>
                                    <div className="card p-3">
                                        <div className="card-body">
                                            <h5 className="card-title">{program.name}</h5>
                                            <p className="card-text">
                                                Descripción: {program.description} <br />
                                                Medicamentos elegibles: {program.medications.length} <br />
                                                Reglas aplicables: {program.rule.name} {/* Adjust based on schema */}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay programas que coincidan con la búsqueda.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProgram;
