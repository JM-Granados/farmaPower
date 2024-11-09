import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageProgram.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/manage_program_title.png';
import list from '../../assets/to-do-list.png';
import edit from '../../assets/Editar.png';
import { useNavigate } from 'react-router-dom';

const apiURL = import.meta.env.VITE_BACKEND_URL;

const ManageProgram = () => {
    const navigate = useNavigate();
    const [programs, setPrograms] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await axios.get(apiURL + '/api/programs');
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
                const response = await axios.get(apiURL + '/api/programs');
                setPrograms(response.data);
            } else {
                try {
                    const response = await axios.get(`${apiURL}/api/programs/search?name=${searchText}`);
                    setPrograms(response.data);
                } catch (error) {
                    console.error("Error searching programs:", error);
                }
            }
        };

        searchPrograms();
    }, [searchText]);

    const handleEditClick = (program) => {
        navigate(`/ModifyProgram`, { state: program });
    };

    return (
        <div className="container-fluid i-mapr-manage-programs">
            <div className="row i-mapr-principal">
                <div className="col-lg-3 col-12 px-0">
                    <SideBar />
                </div>

                <div className="col-lg-9 col-12 i-mapr-div2">
                    <div className="row i-mapr-div3 align-items-end">
                        <div className="col-12 div-gradient-header">
                            <img className='i-mapr-imagen' src={gradient} alt="Manage Programs" />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-8">
                            <input
                                type="text"
                                className="i-mapr-form-control form-control"
                                placeholder="Buscar programa"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4 d-flex align-items-center">
                            <span className="i-mapr-no-results">No hay coincidencias?</span>
                            <a href="/registerprogram" className="i-mapr-gradient-link mx-2">Registrar nuevo</a>
                        </div>
                    </div>

                    <div className="row mt-4">
                        {programs.length > 0 ? (
                            programs.map((program) => (
                                <div className="col-md-3" key={program._id}>
                                    <div className="program-card p-3">
                                        <div className='lists-container'>
                                            <img src={list} alt="medicamento" className="lists" />
                                        </div>
                                        <div className="k-edit-icon" onClick={() => handleEditClick(program)}>
                                            <img src={edit} alt="Edit" className="edit-icon" />
                                        </div>
                                        <div className="p-card-body">
                                            <h5 className="p-card-title">{program.name}</h5>
                                            <p className="p-card-text">
                                                Descripción: {program.description.length > 40
                                                    ? program.description.slice(0, 40) + "..."
                                                    : program.description}
                                            </p>
                                            <p className="p-card-text">
                                                Medicamentos elegibles: {program.medications.length}
                                            </p>
                                            <p className="p-card-text">
                                                Reglas aplicables: {program.rule ? program.rule.rule : 'No disponible'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="i-mapr-no-results">No hay programas que coincidan con la búsqueda.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProgram;
