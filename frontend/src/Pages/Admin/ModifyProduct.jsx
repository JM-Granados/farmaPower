import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './ModifyProduct.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/modify_product_title.png';

const apiURL = import.meta.env.VITE_BACKEND_URL;

const ModifyProduct = () => {
  const [points, setPoints] = useState('');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [selectedElegibleMedicationId, setSelectedElegibleMedicationId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const medication = location.state;

  useEffect(() => {
    if (location.state) {
      const { _id, points, exchangeAmount } = location.state;
      setSelectedElegibleMedicationId(_id); // Store the elegiblemedication ID
      setPoints(points || '');
      setExchangeAmount(exchangeAmount || '');
    }
  }, [location.state]);

  const handleModify = async () => {
    if (selectedElegibleMedicationId) {
      const confirmUpdate = window.confirm("Are you sure you want to update this eligible medication?");
      if (confirmUpdate) {
        // Ensure points and exchangeAmount have valid values
        if (!points || !exchangeAmount) {
          alert("Please fill in both points and exchange amount.");
          return;
        }

        try {
          const payload = {
            points: parseInt(points, 10),     // Convert to integer
            exchangeAmount: parseInt(exchangeAmount, 10) // Convert to integer
          };

          console.log("Payload:", payload); // Log the payload for debugging

          const response = await axios.put(`${apiURL}/api/elegiblemedications/modify/${selectedElegibleMedicationId}`, payload);

          console.log("Modified medication:", response.data);
          alert("Eligible medication updated successfully"); // Success message
          navigate('/ManageElegibleMedication'); // Navigate to eligible medication list
        } catch (error) {
          console.error("Error modifying medication:", error);
          if (error.response) {
            console.error("Backend error message:", error.response.data);
            alert(`Failed to update eligible medication: ${error.response.data.message || error.response.data}`);
          } else {
            alert("Failed to update eligible medication"); // General error message
          }
        }
      }
    } else {
      console.error("No eligible medication selected for modification.");
      alert("No eligible medication selected for modification."); // Alert for no selection
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this eligible medication?");
    if (confirmDelete) {
      if (selectedElegibleMedicationId) {
        try {
          const deleteUrl = `${apiURL}/api/elegiblemedications/delete/${selectedElegibleMedicationId}`;
          await axios.delete(deleteUrl);
          alert("Eligible medication deleted successfully");
          setSelectedElegibleMedicationId(null);
          setPoints('');
          setExchangeAmount('');
          navigate('/ManageElegibleMedication');
        } catch (error) {
          console.error("Error deleting medication:", error);
          alert("Failed to delete eligible medication");
        }
      } else {
        console.error("No eligible medication selected for deletion.");
        alert("No eligible medication selected for deletion.");
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

          <div>
            <p className="i-mopr-name-label">{medication.medication?.name || 'No medication selected'}</p>
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
