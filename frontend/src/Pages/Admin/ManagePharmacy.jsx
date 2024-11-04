import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManagePharmacy.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/manage_pharmacy_title.png';

const ManagePharmacy = () => {
    const [pharmacies, setPharmacies] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        // Fetch all pharmacies on initial load
        const fetchPharmacies = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/pharmacies');
                setPharmacies(response.data);
            } catch (error) {
                console.error("Error fetching pharmacies:", error);
            }
        };

        fetchPharmacies();
    }, []);

    useEffect(() => {
        // Fetch pharmacies based on search text whenever it changes
        const searchPharmacies = async () => {
            if (searchText === '') {
                // Fetch all pharmacies if search text is cleared
                const response = await axios.get('http://localhost:3000/api/pharmacies');
                setPharmacies(response.data);
            } else {
                // Fetch pharmacies that match the search text
                try {
                    const response = await axios.get(`http://localhost:3000/api/pharmacies/search?searchText=${searchText}`);
                    setPharmacies(response.data);
                } catch (error) {
                    console.error("Error searching pharmacies:", error);
                }
            }
        };

        searchPharmacies();
    }, [searchText]); // Trigger search whenever searchText changes

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
                            <span>No hay coincidencias?</span>
                            <a href="/registerpharmacy" className="i-maph-gradient-link mx-2">Registrar nueva</a>
                        </div>
                    </div>

                    {/* Pharmacies Displayed as Cards */}
                    <div className="row mt-4">
                        {pharmacies.length > 0 ? (
                            pharmacies.map((pharmacy, index) => (
                                <div className="col-md-4" key={pharmacy._id}>
                                    <div className="card p-3">
                                        <div className="card-body">
                                            <h5 className="card-title">{pharmacy.name}</h5>
                                            <p className="card-text">
                                                Ubicación: {pharmacy.location} <br />
                                                Número Local: {pharmacy.localNumber} <br />
                                                Estado: {pharmacy.state.name} {/* Assuming state has a name field */}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hay farmacias que coincidan con la búsqueda.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagePharmacy;
