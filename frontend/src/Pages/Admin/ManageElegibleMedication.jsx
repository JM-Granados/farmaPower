import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageElegibleMedication.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/elegible_medication_title.png';
import pill from '../../assets/drugs1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const apiURL = import.meta.env.VITE_BACKEND_URL;

const ManageElegibleMedication = () => {
    const [medications, setMedications] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    // Fetch medications based on searchText
    useEffect(() => {
        const fetchMedications = async () => {
            try {
                if (searchText) {
                    // Search for medications by name
                    const response = await axios.get(`${apiURL}/api/elegiblemedications/search?name=${searchText}`);
                    setMedications(response.data);
                } else {
                    // Fetch all medications if no search text is entered
                    const response = await axios.get(`${apiURL}/api/elegiblemedications`);
                    setMedications(response.data);
                }
            } catch (error) {
                console.error("Error fetching eligible medications:", error);
            }
        };

        fetchMedications();
    }, [searchText]); // Re-fetch when searchText changes

    // Redirect to ModifyProduct page
    const handleModifyClick = (medication) => {
        navigate('/modifyproduct', { state: medication });
    };

    return (
        <div className="container-fluid i-maem-manage-elegible-medications">
            <div className="row i-maem-principal">
                <div className="col-lg-3 col-12 px-0">
                    <SideBar />
                </div>

                <div className="col-lg-9 col-12 i-maem-div2">
                    <div className="row i-maem-div3 align-items-end">
                        <div className="col-12 div-gradient-header">
                            <img className='i-maem-imagen' src={gradient} alt="Logo" />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-8">
                            <input
                                type="text"
                                className="i-maem-form-control form-control"
                                placeholder="Buscar medicamento"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4 d-flex align-items-center">
                            <span className="i-maem-no-coincidences">No hay coincidencias?</span>
                            <a href="/registerproduct" className="i-maem-gradient-link mx-2">Registrar nuevo</a>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="i-maem-medications-slider">
                            {medications.length > 0 ? (
                                medications.map((eligibleMedication) => (
                                    <div className="i-maem-medication-card" key={eligibleMedication._id}>
                                        <div className="card i-maem-card p-3 position-relative">
                                            <img
                                                src={eligibleMedication.medication?.imageUrl || pill}
                                                className="mb-3 card-img-top i-maem-card-img"
                                                alt="Medication"
                                            />
                                            <div className="card-body i-maem-card-body">
                                                <h5 className="card-title i-maem-card-title">
                                                    {eligibleMedication.medication?.name || 'Nombre no disponible'}
                                                </h5>
                                                <p className="card-text i-maem-card-text">
                                                    <strong>Tipo:</strong> {eligibleMedication.medication?.type?.typeMedication || 'Tipo no disponible'} <br />
                                                    <strong>Cantidad:</strong> {eligibleMedication.medication?.amount || 'Cantidad no disponible'} <br />
                                                    {(eligibleMedication.type === 'points') ? (
                                                        <>
                                                            <strong>Puntos:</strong> {eligibleMedication.points} <br />
                                                        </>
                                                    ) : (eligibleMedication.type === 'percentage') ? (
                                                        <>
                                                            <strong>Porcentaje:</strong> {eligibleMedication.percentage} <br />
                                                        </>
                                                    ) : null}
                                                    <strong>Cantidad de Intercambio:</strong> {eligibleMedication.exchangeAmount}
                                                </p>
                                                <button
                                                    className="btn i-maem-modify-link"
                                                    onClick={() => handleModifyClick(eligibleMedication)}
                                                    style={{ position: 'absolute', top: '10px', right: '10px' }}
                                                >
                                                    <FontAwesomeIcon icon={faPencilAlt} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="i-maem-no-results">No hay medicamentos elegibles que coincidan con la búsqueda.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageElegibleMedication;
