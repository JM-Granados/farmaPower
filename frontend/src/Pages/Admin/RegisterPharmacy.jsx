import React, { useState, useEffect } from 'react';
import './RegisterPharmacy.css';
import SideBar from '../../NavBar/SideBarAdmin';
import gradient from '../../assets/register_pharmacy_title.png';
import axios from 'axios';

const RegisterPharmacy = () => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('/api/states'); // Adjust the endpoint as needed
        // Ensure the response data is an array
        setStates(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching states:", error);
        setStates([]); // Set to an empty array on error
      }
    };
    fetchStates();
  }, []);

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
              <input type="text" className="i-reph-form-control form-control" />
            </div>
          </div>

          <div className="row mt-4 align-items-center">
            <div className="col-md-3">
              <p className="form-label text-white">Sede</p>
            </div>
            <div className="col-md-6">
              <input type="text" className="i-reph-form-control form-control" />
            </div>
          </div>

          <div className="row mt-4 align-items-center">
            <div className="col-md-3">
              <p className="form-label text-white">Número de Local</p>
            </div>
            <div className="col-md-6">
              <input type="number" className="i-reph-form-control form-control" />
            </div>
          </div>

          <div className="row mt-4 align-items-center">
            <div className="col-md-3">
              <p className="form-label text-white">Provincia</p>
            </div>
            <div className="col-md-6">
              <select className="i-reph-form-select form-select">
                <option value="">Seleccione una provincia</option>
                {states.map((state) => (
                  <option key={state._id} value={state.state}>
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
              <button className="btn i-reph-create-pharmacy-button w-100">Crear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPharmacy;
