import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './ModifyProduct.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/modify_product_title.png';

const apiURL = import.meta.env.VITE_BACKEND_URL;

const ModifyProduct = () => {
  const [searchText, setSearchText] = useState('');
  const [medications, setMedications] = useState([]);
  const [selectedMedicationId, setSelectedMedicationId] = useState(null);
  const [points, setPoints] = useState('');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const location = useLocation();
  const navigate = useNavigate(); // Import useNavigate for navigation

  useEffect(() => {
    console.log("Location state in ModifyProduct:", location.state);

    if (location.state) {
      const { _id, points, exchangeAmount } = location.state;
      setSelectedMedicationId(_id);
      setPoints(points || '');
      setExchangeAmount(exchangeAmount || '');
    }
  }, [location.state]);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/medications/`);
        setMedications(response.data);

        // Check if the selected medication is in the list
        if (location.state && location.state._id) {
          const selected = response.data.find(med => med._id === location.state._id);
          if (selected) {
            setSelectedMedicationId(location.state._id);
          } else {
            console.warn("Selected medication not found in the fetched list.");
          }
        }
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, [location.state]);

  const displayedMedications = searchText
    ? medications.filter(medication =>
      medication.name.toLowerCase().includes(searchText.toLowerCase())
    )
    : medications;

  const handleCheckboxChange = (medicationId) => {
    setSelectedMedicationId(selectedMedicationId === medicationId ? null : medicationId);
  };

  const handleModify = async () => {
    if (selectedMedicationId) {
      const confirmUpdate = window.confirm("Are you sure you want to update this eligible medication?");
      if (confirmUpdate) {
        try {
          const response = await axios.put(`${apiURL}/api/elegiblemedications/modify/${selectedMedicationId}`, {
            medicationId: selectedMedicationId, // Include the medication ID
            points,
            exchangeAmount
          });
          console.log("Modified medication:", response.data);
          alert("Eligible medication updated successfully"); // Success message
          navigate('/ManageEligibleMedication'); // Navigate to eligible medication list
        } catch (error) {
          console.error("Error modifying medication:", error);
          alert("Failed to update eligible medication"); // Error message
        }
      }
    } else {
      console.error("No medication selected for modification.");
      alert("No eligible medication selected for modification."); // Alert for no selection
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this eligible medication?");
    if (confirmDelete) {
      if (selectedMedicationId) {
        try {
          const deleteUrl = `${apiURL}/api/elegiblemedications/delete/${selectedMedicationId}`;
          console.log("DELETE URL:", deleteUrl); // Log the delete URL
          await axios.delete(deleteUrl);
          console.log("Deleted medication with ID:", selectedMedicationId);
          alert("Eligible medication deleted successfully"); // Success message
          setSelectedMedicationId(null); // Clear selection
          setPoints(''); // Clear points
          setExchangeAmount(''); // Clear exchange amount
          navigate('/ManageEligibleMedication'); // Navigate to eligible medication list
        } catch (error) {
          console.error("Error deleting medication:", error);
          alert("Failed to delete eligible medication"); // Error message
        }
      } else {
        console.error("No medication selected for deletion.");
        alert("No eligible medication selected for deletion."); // Alert for no selection
      }
    }
  };

  return (
    <div className="container-fluid i-moprg-register-product">
      <div className="row principal">
        <div className="col-lg-3 col-12 px-0">
          <SideBar />
        </div>

        <div className="col-lg-9 col-12 i-moprg-div2">
          <div className="row i-moprg-div3 align-items-end">
            <div className="col-12 div-gradient-header">
              <img className='i-moprg-imagen' src={gradient} alt="Modificar Producto" />
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
                  className="i-moprg-form-control form-control"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row mt-2">
            <div className="i-moprg-medications-slider">
              {displayedMedications.length > 0 ? (
                displayedMedications.map(medication => (
                  <div className="i-moprg-medication-card" key={medication._id}>
                    <div className="mt-1 i-moprg-card card p-2 position-relative">
                      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <input
                          type="checkbox"
                          checked={selectedMedicationId === medication._id}
                          onChange={() => handleCheckboxChange(medication._id)}
                        />
                      </div>
                      <img src={medication.imageUrl} className="card-img-top" alt={medication.name} />
                      <div className="card-body i-moprg-card-body">
                        <h5 className="card-title i-moprg-card-title">{medication.name}</h5>
                        <p className="card-text i-moprg-card-text">Amount: {medication.amount}</p>
                        <p className="card-text i-moprg-card-text">Type: {medication.type?.medicationType}</p>
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
                className="i-moprg-form-control form-control"
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
                className="i-moprg-form-control form-control"
                value={exchangeAmount}
                onChange={(e) => setExchangeAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-2">
              <button className="btn i-mopr-delete-product-button w-100" onClick={handleDelete}>Eliminar</button>
            </div>
            <div className="col-md-5"></div>
            <div className="col-md-2">
              <button className="btn i-mopr-modify-product-button w-100" onClick={handleModify}>Modificar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyProduct;
