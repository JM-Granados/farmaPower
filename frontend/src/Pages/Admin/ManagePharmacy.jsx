import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManagePharmacy.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/manage_pharmacy_title.png';
const apiURL = import.meta.env.VITE_BACKEND_URL;

const ManagePharmacy = () => {
    const [pharmacies, setPharmacies] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        // Fetch all pharmacies on initial load
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

                    {/* Search bar */}
                    <div className="row mt-3">
                        <div className="col-md-8">
                            <input
                                type="text"
                                className="i-maph-form-control form-control"
                                placeholder="Buscar farmacia"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)} // Update search text on input change
                            />
                        </div>
                        <div className="col-md-4 d-flex align-items-center">
                            <span className="i-maph-no-coincidences">No hay coincidencias?</span>
                            <a href="/registerpharmacy" className="i-maph-gradient-link mx-2">Registrar nueva</a>
                        </div>
                    </div>

                    {/* Pharmacies Displayed as Cards */}
                    <div className="row mt-4">
                        {pharmacies.length > 0 ? (
                            pharmacies.map((pharmacy, index) => (
                                <div className="col-md-4" key={pharmacy._id}>
                                    <div className="mt-3 card i-maph-card p-2">
                                        <div className="card-body i-maph-card-body">
                                            <h5 className="card-title i-maph-card-title">{pharmacy.name}</h5>
                                            <p className="card-text i-maph-card-text">
                                                Ubicación: {pharmacy.location} <br />
                                                Número Local: {pharmacy.localNumber} <br />
                                                Estado: {pharmacy.state.state}
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
    );
};

export default ManagePharmacy;
