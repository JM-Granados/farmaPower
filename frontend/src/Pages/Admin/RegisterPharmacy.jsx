import React, { useState, useEffect } from 'react';
import './RegisterPharmacy.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/register_pharmacy_title.png';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const apiURL = import.meta.env.VITE_BACKEND_URL; // Ensure you declare apiURL here

const RegisterPharmacy = () => {
    const [states, setStates] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        localNumber: '',
        stateId: ''
    });

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get(`${apiURL}/api/states/get`);
                setStates(response.data);
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        };

        fetchStates();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${apiURL}/api/pharmacies/create`, formData);
            console.log('Pharmacy created successfully:', response.data);
            // Optionally reset the form or show a success message
            setFormData({ name: '', location: '', localNumber: '', stateId: '' });
        } catch (error) {
            console.error('Error creating pharmacy:', error);
        }
    };

    return (
        <div className="container-fluid i-reph-register-pharmacy">
            <div className="row i-reph-principal">
                <div className="col-lg-3 col-12 px-0">
                    <SideBar />
                </div>

                <div className="col-lg-9 col-12 i-reph-div2">
                    <div className="row i-reph-div3 align-items-end">
                        <div className="col-12 div-gradient-header">
                            <img className='i-reph-imagen' src={gradient} alt="Registrar Farmacia" />
                        </div>
                    </div>

                    {/* Input fields with labels to the left */}
                    <div className="row mt-4 align-items-center">
                        <div className="col-md-3">
                            <p className="form-label text-white">Nombre</p>
                        </div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="i-reph-form-control form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row mt-4 align-items-center">
                        <div className="col-md-3">
                            <p className="form-label text-white">Sede</p>
                        </div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="i-reph-form-control form-control"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row mt-4 align-items-center">
                        <div className="col-md-3">
                            <p className="form-label text-white">Número de Local</p>
                        </div>
                        <div className="col-md-6">
                            <input
                                type="number"
                                className="i-reph-form-control form-control"
                                name="localNumber"
                                value={formData.localNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="row mt-4 align-items-center">
                        <div className="col-md-3">
                            <p className="form-label text-white">Provincia</p>
                        </div>
                        <div className="col-md-6">
                            <select
                                className="i-reph-form-select form-select"
                                name="stateId"
                                value={formData.stateId}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione una provincia</option>
                                {states.map((state) => (
                                    <option key={state._id} value={state._id}>
                                        {state.state}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="row mt-4">
                        <div className="col-md-7"></div>
                        <div className="col-md-2">
                            <button className="btn i-reph-create-pharmacy-button w-100" onClick={handleSubmit}>
                                Crear
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPharmacy;
