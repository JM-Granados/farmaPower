import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserExchanges.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/user_exchange_title.png';
import pill from '../../assets/drugs1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const apiURL = import.meta.env.VITE_BACKEND_URL;

const ManageElegibleMedication = () => {
    const selectedClient = JSON.parse(localStorage.getItem('selectedClient'));
    const navigate = useNavigate();
    const [medicationPointsData, setMedicationPointsData] = useState([]);
    const [pointsData, setPointsData] = useState({
        totalPoints: 0,
        usedPoints: 0,
        availablePoints: 0,
    });
    const [userData, setUserData] = useState({
        fullName: '',
        email: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = '672b6733dd60abf5b47dd07c'; // Replace with actual user ID
                const response = await axios.get(`${apiURL}/api/users/${userId}/fullname-email`);
                setUserData({
                    fullName: response.data.fullName,
                    email: response.data.email
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchPointsData = async () => {
            try {
                const userId = '672b6733dd60abf5b47dd07c'; // Replace with actual user ID
                const response = await axios.get(`${apiURL}/api/exchanges/points/${userId}`);
                setPointsData(response.data);
            } catch (error) {
                console.error("Error fetching points data:", error);
            }
        };

        fetchPointsData();
    }, []);

    useEffect(() => {
        const fetchMedicationPoints = async () => {
            try {
                const userId = '672b6733dd60abf5b47dd07c'; // Replace with actual user ID
                const response = await axios.get(`${apiURL}/api/exchanges/points/medication/${userId}`);
                setMedicationPointsData(response.data);
            } catch (error) {
                console.error("Error fetching medication points data:", error);
            }
        };

        fetchMedicationPoints();
    }, []);

    return (
        <div className="container-fluid i-ue-manage-elegible-medications">
            <div className="row i-ue-principal">
                <div className="col-lg-3 col-12 px-0">
                    <SideBar />
                </div>

                <div className="col-lg-9 col-12 i-ue-div2">
                    <div className="row i-ue-div3 align-items-end">
                        <div className="col-12 div-gradient-header">
                            <img className="i-ue-imagen" src={gradient} alt="Logo" />
                        </div>
                    </div>

                    <div className="row mt-3">
                        {/* Left Column */}
                        <div className="col-md-7">
                            <div className="row i-ue-user-info">
                                <div className="col-12">
                                    <h3>{userData.fullName}</h3>
                                    <h4>{userData.email}</h4>
                                    <h3 className="mt-4">Medicamentos Aprobados</h3>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="i-ue-medications-slider">
                                    {medicationPointsData.length > 0 ? (
                                        medicationPointsData.map((medication) => (
                                            <div className="i-ue-medication-card" key={medication._id}>
                                                <div className="card i-ue-card p-3 position-relative">
                                                    <div className="i-ue-img-container">
                                                        <img
                                                            src={medication.imageUrl || pill}
                                                            className="mb-3 card-img-top i-ue-card-img"
                                                            alt="Medication"
                                                        />
                                                    </div>
                                                    <div className="card-body i-ue-card-body">
                                                        <h5 className="card-title i-ue-card-title">{medication.name || 'Nombre no disponible'}</h5>
                                                        <p className="card-text i-ue-card-text">
                                                            <strong>Puntos Acumulados:</strong> {medication.accumulatedPoints || '0'} <br />
                                                            <strong>Puntos Canjeados:</strong> {medication.usedPoints || '0'} <br />
                                                            <strong>Puntos Disponibles:</strong> {medication.availablePoints || '0'} <br />
                                                        </p>
                                                        <button
                                                            className="btn i-ue-modify-link"
                                                            onClick={() => handleModifyClick(medication)}
                                                            style={{ position: 'absolute', top: '10px', right: '10px' }}
                                                        >
                                                            <FontAwesomeIcon icon={faInfoCircle} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="i-ue-no-results">No hay medicamentos elegibles que coincidan con la búsqueda.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Right Column */}
                        <div className="col-md-4 i-ue-global-data">
                            <div className="i-ue-global-data-text">
                                <h2>Datos Globales</h2>
                                <hr></hr>
                                <h3 className='mt-5'>Puntos Acumulados: {pointsData.totalPoints}</h3>
                                <hr></hr>
                                <h3 className='mt-5'>Puntos Canjeados: {pointsData.usedPoints}</h3>
                                <hr></hr>
                                <h3 className='mt-5'>Puntos Disponibles: {pointsData.availablePoints}</h3>
                                <hr></hr>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageElegibleMedication;
