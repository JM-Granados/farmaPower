import React, { useState, useEffect } from 'react';
import './ModifyPharmacy.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/modify_pharmacy_title.png';
import axios from 'axios';
const apiURL = import.meta.env.VITE_BACKEND_URL;

const ModifyPharmacy = () => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/states/get`);
        setStates(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  return (
    <div className="container-fluid register-pharmacy">
      <div className="row i-moph-principal">
        <div className="col-lg-3 col-12 px-0">
          <SideBar />
        </div>

        <div className="col-lg-9 col-12 i-moph-div2">
          <div className="row i-moph-div3 align-items-end">
            <div className="col-12 div-gradient-header">
              <img className='i-moph-imagen' src={gradient} alt="Registrar Farmacia" />
            </div>
          </div>

          {/* Input fields with labels to the left */}
          <div className="row mt-4 align-items-center">
            <div className="col-md-3">
              <p className="form-label text-white">Nombre</p>
            </div>
            <div className="col-md-6">
              <input type="text" className="i-moph-form-control form-control" />
            </div>
          </div>

          <div className="row mt-4 align-items-center">
            <div className="col-md-3">
              <p className="form-label text-white">Sede</p>
            </div>
            <div className="col-md-6">
              <input type="text" className="i-moph-form-control form-control" />
            </div>
          </div>

          <div className="row mt-4 align-items-center">
            <div className="col-md-3">
              <p className="form-label text-white">Número de Local</p>
            </div>
            <div className="col-md-6">
              <input type="number" className="i-moph-form-control form-control" />
            </div>
          </div>

          <div className="row mt-4 align-items-center">
            <div className="col-md-3">
              <p className="form-label text-white">Provincia</p>
            </div>
            <div className="col-md-6">
              <select className="i-moph-form-select form-select">
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
            <div className="col-md-2">
              <button className="btn i-moph-delete-pharmacy-button w-100">Eliminar</button>
            </div>
            <div className="col-md-5">
            </div>
            <div className="col-md-2">
              <button className="btn i-moph-modify-pharmacy-button w-100">Modificar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModifyPharmacy;
