import React, { useState, useEffect } from 'react';
import './ModifyPharmacy.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/modify_pharmacy_title.png';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const apiURL = import.meta.env.VITE_BACKEND_URL;

const ModifyPharmacy = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const pharmacy = location.state?.pharmacy || {}; // Get pharmacy data from location state
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({
    name: pharmacy.name || '',
    location: pharmacy.location || '',
    localNumber: pharmacy.localNumber || '',
    stateId: pharmacy.state?._id || ''
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

  const handleUpdate = async () => {
    try {
      await axios.put(`${apiURL}/api/pharmacies/update/${pharmacy._id}`, formData);
      alert("Pharmacy updated successfully");
      navigate('/ManagePharmacy'); // Change this to your pharmacy list route
    } catch (error) {
      console.error("Error updating pharmacy:", error);
      alert("Failed to update pharmacy");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this pharmacy?");
    if (confirmDelete) {
      try {
        await axios.delete(`${apiURL}/api/pharmacies/delete/${pharmacy._id}`);
        alert("Pharmacy deleted successfully");
        navigate('/ManagePharmacy'); // Change this to your pharmacy list route
      } catch (error) {
        console.error("Error deleting pharmacy:", error);
        alert("Failed to delete pharmacy");
      }
    }
  };

  return (
    <div className="container-fluid register-pharmacy">
      <div className="row i-moph-principal">
        <div className="col-lg-3 col-12 px-0">
          <SideBar />
        </div>

        <div className="col-lg-9 col-12 i-moph-div2">
          <div className="row i-moph-div3 align-items-end">
            <div className="col-12 div-gradient-header">
              <img className='i-moph-imagen' src={gradient} alt="Modificar Farmacia" />
            </div>
          </div>

          <div className="row mt-4 align-items-center">
            <div className="col-md-3">
              <p className="form-label text-white">Nombre</p>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="i-moph-form-control form-control"
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
                className="i-moph-form-control form-control"
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
                className="i-moph-form-control form-control"
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
                className="i-moph-form-select form-select"
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

          <div className="row mt-4">
            <div className="col-md-2">
              <button className="btn i-moph-delete-pharmacy-button w-100" onClick={handleDelete}>Eliminar</button>
            </div>
            <div className="col-md-5"></div>
            <div className="col-md-2">
              <button className="btn i-moph-modify-pharmacy-button w-100" onClick={handleUpdate}>Modificar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyPharmacy;
