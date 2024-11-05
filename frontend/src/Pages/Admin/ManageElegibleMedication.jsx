import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageElegibleMedication.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/elegible_medication_title.png';
import pill from '../../assets/drugs1.png';

const ManageElegibleMedication = () => {
    const [medications, setMedications] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        // Fetch all eligible medications on initial load
        const fetchMedications = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/elegiblemedication');
                setMedications(response.data);
            } catch (error) {
                console.error("Error fetching eligible medications:", error);
            }
        };

        fetchMedications();
    }, []);

    useEffect(() => {
        // Fetch medications based on search text whenever it changes
        const searchMedications = async () => {
            if (searchText === '') {
                // Fetch all medications if search text is cleared
                const response = await axios.get('http://localhost:3000/api/elegiblemedication');
                setMedications(response.data);
            } else {
                // Fetch medications that match the search text
                try {
                    const response = await axios.get(`http://localhost:3000/api/elegiblemedication/search?searchText=${searchText}`);
                    setMedications(response.data);
                } catch (error) {
                    console.error("Error searching medications:", error);
                }
            }
        };

        searchMedications();
    }, [searchText]); // Trigger search whenever searchText changes

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

                    {/* Search bar and text */}
                    <div className="row mt-3">
                        <div className="col-md-8">
                            <input
                                type="text"
                                className="i-maem-form-control form-control"
                                placeholder="Buscar medicamento"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)} // Update search text on input change
                            />
                        </div>
                        <div className="col-md-4 d-flex align-items-center">
                            <span className='i-maem-no-coincidences'>No hay coincidencias?</span>
                            <a href="/registerproduct" className="i-maem-gradient-link mx-2">Registrar nuevo</a>
                        </div>
                    </div>

                    {/* Medications Displayed as Cards */}
                    <div className="row mt-4">
                        {medications.length > 0 ? (
                            medications.map((medication, index) => (
                                <div className="col-md-4" key={medication._id}>
                                    <div className="card p-3">
                                        <img src={pill} className="card-img-top" alt="Medication" />
                                        <div className="card-body">
                                            <h5 className="card-title">Medication #{index + 1}</h5>
                                            <p className="card-text">
                                                Puntos: {medication.points} <br />
                                                Cantidad de Intercambio: {medication.exchangeAmount}
                                            </p>
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
    );
};

export default ManageElegibleMedication;
