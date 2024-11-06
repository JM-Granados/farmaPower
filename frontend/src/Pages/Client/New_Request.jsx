import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './New_Request.css';
import SideBar from '../../NavBar/SideBar';
import '../../NavBar/SideBar.css';
import gradient from '../../assets/new_request.png';
import folder from '../../assets/folder.png';
import upload from '../../assets/upload.png';
import Search from '../../assets/search.png';

const NewRequest = () => {
  // Definir el estado para cada campo
  const [purchaseDate, setPurchaseDate] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [pharmacy, setPharmacy] = useState('');
  const [pharmacies, setPharmacies] = useState([]);
  const [purchasedQuantity, setPurchasedQuantity] = useState('');
  const [searchText, setSearchText] = useState('');



  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/pharmacies/get');
        setPharmacies(response.data);
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
      }
    };

    fetchPharmacies();
  }, []);


  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      if (searchText == "") {
        const response = await axios.get(`${apiURL}/api/users/getUsers`);
        console.log(response.data)
        setUsers(response.data);
      } else {
        const response = await axios.get(`${apiURL}/api/users/getUsersSearched?search=${searchText}`);
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };



  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      purchaseDate,
      invoiceNumber,
      pharmacy,
      purchasedQuantity,
    };
    console.log('Datos enviados:', formData);
    // Aquí puedes hacer la lógica para enviar los datos a un servidor
  };

  return (
    <div className="nueva-solicitud">
      <div className="row principal">
        <div className="div">
          <SideBar />
        </div>

        <div className="col nrdiv2">
          <div className="row nrdiv3">
            <div className="nrdiv-gradient-header d-flex justify-content-start align-items-end" style={{ height: '100%' }}>
              <img className='nrimagen' src={gradient} alt="Logo" id="gradient" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="row nrdiv5">
            <div className="col rndiv6 input-group-column">
              <div className="row mt-4 align-items-center">
                <div className="col-md-4">
                  <p className="form-label text-white">Fecha de compra</p>
                </div>
                <div className="col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="row mt-4 align-items-center">
                <div className="col-md-4">
                  <p className="form-label text-white">Número de factura</p>
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="row mt-4 align-items-center">
                <div className="col-md-4">
                  <p className="form-label text-white">Farmacia</p>
                </div>
                <div className="dropdown">
                  <select
                    className="form-control"
                    value={pharmacy}
                    onChange={(e) => setPharmacy(e.target.value)}
                  >
                    <option value="">Selecciona una opción</option>
                    {pharmacies.map((pharmacy) => (
                      <option key={pharmacy._id} value={pharmacy._id}>
                        {pharmacy.name}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              <div className="row mt-4 align-items-center">
                <div className="col-md-4">
                  <p className="form-label text-white">Busque su producto</p>
                </div>
                <div className="j-buscador col-md-5 position-relative">
                  <input
                    type="text"
                    className="j-maem-form-control form-control"
                    placeholder="Buscar usuario"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <button className="search-icon-btn" onClick={handleSearch}>
                    <img src={Search} alt="Buscar" />
                  </button>
                </div>

              </div>


              <div className="row mt-4 align-items-center">
                <div className="col-md-4">
                  <p className="form-label text-white">Cantidad comprada</p>
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    value={purchasedQuantity}
                    onChange={(e) => setPurchasedQuantity(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="col-3 rndiv8">
              <div className="col-3 rndiv7">
                <div className="div-upload d-flex justify-content-center align-items-end">
                  <img
                    className='imagen-upload'
                    src={folder}
                    alt="Upload icon"
                    onClick={() => document.getElementById('file-upload').click()}
                    style={{ cursor: 'pointer' }}
                  />
                  <input
                    id="file-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => console.log(e.target.files[0])} // Aquí manejas el archivo seleccionado
                  />
                </div>

              </div>
              <div className="div-upload d-flex justify-content-center align-items-end">
                <img
                  className="imagen-upload"
                  src={upload}
                  alt="Upload icon"
                  onClick={handleSubmit}
                  style={{ cursor: 'pointer' }}
                />
              </div>


            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRequest;
