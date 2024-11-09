import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ModifyProgram.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/modify_program_title.png';

const apiURL = import.meta.env.VITE_BACKEND_URL;

const ModifyProgram = () => {
  const { state: program } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacies, setSelectedPharmacies] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (program) {
      setName(program.name);
      setDescription(program.description);
      setSelectedPharmacies(program.pharmacies.map((pharmacy) => pharmacy._id));
      console.log("Selected pharmacies after loading program:", selectedPharmacies); // Debugging
    }

    const fetchPharmacies = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/pharmacies/get`);
        setPharmacies(response.data);
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
      }
    };

    fetchPharmacies();
  }, [program]);

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

  const handleCheckboxChange = (pharmacyId) => {
    setSelectedPharmacies((prev) =>
      prev.includes(pharmacyId)
        ? prev.filter(id => id !== pharmacyId)
        : [...prev, pharmacyId]
    );
  };

  const handleSave = async () => {
    try {
      await axios.put(`${apiURL}/api/programs/${program._id}`, {
        name,
        description,
        pharmacies: selectedPharmacies,
      });
      navigate('/ManageProgram');
    } catch (error) {
      console.error("Error updating program:", error);
    }
  };


  return (
    <div className="container-fluid i-moprg-modify-program">
      <div className="row i-moprg-principal">
        <div className="col-lg-3 col-12 px-0">
          <SideBar />
        </div>

        <div className="col-lg-9 col-12 i-moprg-div2">
          <div className="row i-moprg-div3 align-items-end">
            <div className="col-12 div-gradient-header">
              <img className='i-moprg-imagen' src={gradient} alt="Modificar Programa" />
            </div>
          </div>

          <div className="row mt-4 align-items-center">
            <div className="col-md-3">
              <p className="form-label text-white">Nombre</p>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="i-moprg-form-control form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="row align-items-center mt-3">
            <div className="col-md-3">
              <p className="form-label text-white">Selección de farmacias</p>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="i-moprg-form-control form-control"
                placeholder="Buscar farmacia"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="i-moprg-pharmacies-slider">
              {pharmacies.length > 0 ? (
                pharmacies.map((pharmacy) => (
                  <div className="i-moprg-pharmacy-card" key={pharmacy._id}>
                    <div className="card i-moprg-card p-2 position-relative">
                      <input
                        type="checkbox"
                        className="form-check-input i-moprg-checkbox"
                        style={{ position: 'absolute', top: '10px', right: '10px' }}
                        checked={selectedPharmacies.includes(pharmacy._id)}
                        onChange={() => handleCheckboxChange(pharmacy._id)}
                      />
                      <div className="card-body i-moprg-card-body">
                        <h5 className="card-title i-moprg-card-title">{pharmacy.name}</h5>
                        <p className="card-text i-moprg-card-text">
                          <strong>Ubicación:</strong> {pharmacy.location} <br />
                          <strong>Número Local:</strong> {pharmacy.localNumber} <br />
                          <strong>Estado:</strong> {pharmacy.state.state}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="i-moprg-no-results">No hay farmacias que coincidan con la búsqueda.</p>
              )}
            </div>
          </div>

          <div className="row mt-4 align-items-center">
            <div className="col-md-3">
              <p className="form-label text-white">Descripción</p>
            </div>
            <div className="col-md-6">
              <textarea
                className="i-moprg-text-area form-control"
                rows="6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-7"></div>
            <div className="col-md-2">
              <button className="btn i-moprg-modify-program-button w-100" onClick={handleSave}>
                Modificar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyProgram;
