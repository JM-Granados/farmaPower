import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RegisterProduct.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/register_product_title.png';

const apiURL = import.meta.env.VITE_BACKEND_URL;

const RegisterProduct = () => {
  const [searchText, setSearchText] = useState('');
  const [pharmacies, setPharmacies] = useState([]);
  const [medications, setMedications] = useState([]);
  const [selectedMedicationId, setSelectedMedicationId] = useState(null); // Track selected medication
  const [points, setPoints] = useState('');
  const [exchangeAmount, setExchangeAmount] = useState('');

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/medications/`);
        setMedications(response.data);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, []);

  const displayedMedications = searchText
    ? medications.filter(medication =>
        medication.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : medications;

  const handleCheckboxChange = (medicationId) => {
    setSelectedMedicationId(selectedMedicationId === medicationId ? null : medicationId); // Toggle selection
  };

  const handleCreate = async () => {
    if (!selectedMedicationId || !points || !exchangeAmount) {
      alert("Please select a medication and fill in both points and exchange amount.");
      return;
    }

    try {
      const payload = {
        medication: selectedMedicationId,
        points: Number(points),
        exchangeAmount: Number(exchangeAmount),
      };
      
      await axios.post(`${apiURL}/api/elegiblemedications/create`, payload);
      alert("Eligible medication registered successfully!");
    } catch (error) {
      console.error("Error creating eligible medication:", error);
      alert("There was an error registering the eligible medication.");
    }
  };

  return (
    <div className="container-fluid i-repr-register-product">
      <div className="row principal">
        <div className="col-lg-3 col-12 px-0">
          <SideBar />
        </div>

        <div className="col-lg-9 col-12 i-repr-div2">
          <div className="row i-repr-div3 align-items-end">
            <div className="col-12 div-gradient-header">
              <img className='i-repr-imagen' src={gradient} alt="Registrar Producto" />
            </div>
          </div>

          <div className="row align-items-center mt-3">
            <div className="col-md-3">
              <p className="form-label text-white">Seleccione su producto</p>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="i-repr-form-control form-control"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="i-repr-medications-slider">
              {displayedMedications.length > 0 ? (
                displayedMedications.map(medication => (
                  <div className="i-repr-medication-card" key={medication._id}>
                    <div className="mt-1 i-repr-card card p-2 position-relative">
                      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <input
                          type="checkbox"
                          checked={selectedMedicationId === medication._id}
                          onChange={() => handleCheckboxChange(medication._id)}
                        />
                      </div>
                      <img src={medication.imageUrl} className="card-img-top" alt={medication.name} />
                      <div className="card-body i-repr-card-body">
                        <h5 className="card-title i-repr-card-title">{medication.name}</h5>
                        <p className="card-text i-repr-card-text">Amount: {medication.amount}</p>
                        <p className="card-text i-repr-card-text">Type: {medication.type?.medicationType}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-white">Aquí se mostrarán los medicamentos buscados.</p>
              )}
            </div>
          </div>

          <div className="row mt-4 align-items-center">
            <div className="col-md-3">
              <p className="form-label text-white">Puntos</p>
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="i-repr-form-control form-control"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
              />
            </div>
          </div>

          <div className="row mt-4 align-items-center">
            <div className="col-md-3">
              <p className="form-label text-white">Cantidad para el canje</p>
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="i-repr-form-control form-control"
                value={exchangeAmount}
                onChange={(e) => setExchangeAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-7"></div>
            <div className="col-md-2">
              <button
                className="btn i-repr-create-product-button w-100"
                onClick={handleCreate}
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProduct;
