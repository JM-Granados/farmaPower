import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManagePharmacy.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/manage_pharmacy_title.png';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const apiURL = import.meta.env.VITE_BACKEND_URL;

const ManagePharmacy = () => {
    const [pharmacies, setPharmacies] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPharmacies = async () => {
            try {
                const response = await axios.get(`${apiURL}/api/pharmacies/get`);
                setPharmacies(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching pharmacies:", error);
            }
        };

        fetchPharmacies();
    }, []);

    useEffect(() => {
        const fetchSearchedPharmacies = async () => {
            if (searchText) {
                try {
                    const response = await axios.get(`${apiURL}/api/pharmacies/search?name=${searchText}`);
                    setPharmacies(response.data);
                } catch (error) {
                    console.error("Error searching pharmacies:", error);
                }
            } else {
                const fetchAllPharmacies = async () => {
                    try {
                        const response = await axios.get(`${apiURL}/api/pharmacies/get`);
                        setPharmacies(response.data);
                    } catch (error) {
                        console.error("Error fetching pharmacies:", error);
                    }
                };

                fetchAllPharmacies();
            }
        };

        fetchSearchedPharmacies();
    }, [searchText]);

    const handleModifyClick = (pharmacy) => {
        navigate('/modifypharmacy', { state: { pharmacy } });
    };

    return (
        <div className="container-fluid i-maph-manage-pharmacies">
            <div className="row i-maph-principal">
                <div className="col-lg-3 col-12 px-0">
                    <SideBar />
                </div>

                <div className="col-lg-9 col-12 i-maph-div2">
                    <div className="row i-maph-div3 align-items-end">
                        <div className="col-12 div-gradient-header">
                            <img className='i-maph-imagen' src={gradient} alt="Manage Pharmacies" />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-8">
                            <input
                                type="text"
                                className="i-maph-form-control form-control"
                                placeholder="Buscar farmacia"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4 d-flex align-items-center">
                            <span className="i-maph-no-coincidences">No hay coincidencias?</span>
                            <a href="/registerpharmacy" className="i-maph-gradient-link mx-2">Registrar nueva</a>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="i-maph-pharmacies-slider">
                            {pharmacies.length > 0 ? (
                                pharmacies.map((pharmacy) => (
                                    <div className="i-maph-pharmacy-card" key={pharmacy._id}>
                                        <div className="card i-maph-card p-2 position-relative">
                                            <button
                                                className="btn i-maph-modify-link"
                                                onClick={() => handleModifyClick(pharmacy)}
                                                style={{ position: 'absolute', top: '10px', right: '10px' }}
                                            >
                                                <FontAwesomeIcon icon={faPencilAlt} />
                                            </button>
                                            <div className="card-body i-maph-card-body">
                                                <h5 className="card-title i-maph-card-title">{pharmacy.name}</h5>
                                                <p className="card-text i-maph-card-text">
                                                    <strong>Ubicación:</strong> {pharmacy.location} <br />
                                                    <strong>Número Local:</strong> {pharmacy.localNumber} <br />
                                                    <strong>Estado:</strong> {pharmacy.state.state}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="i-maph-no-results">No hay farmacias que coincidan con la búsqueda.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagePharmacy;
