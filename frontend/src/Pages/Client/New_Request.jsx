import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './New_Request.css';
import SideBar from '../../NavBar/SideBar';
import '../../NavBar/SideBar.css';
import gradient from '../../assets/new_request.png';
import folder from '../../assets/folder.png';
import upload from '../../assets/upload.png';
import Search from '../../assets/search.png';

const reader = new FileReader();

const apiURL = import.meta.env.VITE_BACKEND_URL;

const NewRequest = () => {
  // Definir el estado para cada campo
  const [purchaseDate, setPurchaseDate] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [pharmacy, setPharmacy] = useState('');
  const [pharmacies, setPharmacies] = useState([]);
  const [purchasedQuantity, setPurchasedQuantity] = useState('');
  const [searchText, setSearchText] = useState('');
  const [medicines, setMedicines] = useState('');
  const [medication, setSelectedMedicineId] = useState(null);
  const [client, setClient] = useState(null);
  const [invoiceImage, setinvoiceImage] = useState(null);

  const user = JSON.parse(localStorage.getItem('user')); 


  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        //const response = await axios.get('http://localhost:3000/api/pharmacies/get');
        const response = await axios.get('${apiURL}/api/pharmacies/get');
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
        //const response = await axios.get(`http://localhost:3000/api/elegiblemedications`);
        const response = await axios.get(`${apiURL}/api/elegiblemedications`);

        setMedicines(response.data);
      } else {
        //const response = await axios.get(`http://localhost:3000/api/elegiblemedications/getMedicineSearched?search=${searchText}`);
        const response = await axios.get(`${apiURL}/api/elegiblemedications/getMedicineSearched?search=${searchText}`);
        setMedicines(response.data);
        console.log(response.data)
      }
    } catch (error) {
      console.error("Error searching medications:", error);
    }
  };

  const handleMedicineClick = (medicineId) => {
    // Al hacer clic en el nombre del medicamento, actualizamos el estado con su ID
    setSelectedMedicineId(medicineId);
    console.log("Medicamento seleccionado con ID:", medicineId); // Imprimir ID seleccionado para depuración
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('purchaseDate', purchaseDate);
    formData.append('invoiceNumber', invoiceNumber);
    formData.append('medication', medication);
    //formData.append('client', '671f4fb9159e507ef744c97d'); 
    formData.append('client', user._id); 
    formData.append('purchasedQuantity', purchasedQuantity);
    formData.append('invoiceImage', invoiceImage); 
    formData.append('pharmacy', pharmacy);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
  
    try {
      const response = await axios.post('http://localhost:3000/api/requests/c/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };
  

  return (
    <div className="nueva-solicitud">
      <div className="row principal">
        <div className="div">
          {/* <SideBar /> */}
        </div>

        <div className="col nrdiv2">
          <div className="row nrdiv3">
            <div className="nrdiv-gradient-header d-flex justify-content-start align-items-end" style={{ height: '100%' }}>
              <img className='nrimagen' src={gradient} alt="Logo" id="gradient" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="row nrdiv5 overflow-auto">
            <div className="col rndiv6 input-group-column">
              <div className="row mt-4 align-items-center">
                <div className="col-md-4">
                  <p className="form-label ">Fecha de compra</p>
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
                  <p className="form-label ">Número de factura</p>
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
                  <p className="form-label ">Farmacia</p>
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
                  <p className="form-label ">Busque su producto</p>
                </div>
                <div className="j-buscador col-md-5 position-relative">
                  <input
                    type="text"
                    className="j-maem-form-control form-control"
                    placeholder="Busque su producto"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  <button className="search-icon-btn" onClick={handleSearch}>
                    <img src={Search} alt="Buscar" />
                  </button>
                </div>
              </div>

              <div className="row mt-4">
                {medicines.length > 0 && (
                  <div className="col-10 overflow-auto nrresult">
                    <ul>
                      {medicines.map((med, index) => (
                        <li key={index}>
                          <p
                            className={`selectable-medicine ${med._id === medication ? 'selected-medicine' : ''}`}
                            onClick={() => handleMedicineClick(med._id)} // Usa la función handleMedicineClick
                          >
                            {med.medication.name} - {med.points} puntos
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>



              <div className="row mt-4 align-items-center">
                <div className="col-md-4">
                  <p className="form-label">Cantidad comprada</p>
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
                <div className="div-upload d-flex flex-column justify-content-center align-items-center">
                  <img
                    className='imagen-upload'
                    src={folder}
                    alt="Upload icon"
                    onClick={() => document.getElementById('file-upload').click()}
                    style={{ cursor: 'pointer', maxWidth: '1000px' }}
                  />
                  <input
                    id="file-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => setinvoiceImage(e.target.files[0])}
                  />
                  <p>{invoiceImage ? invoiceImage.name : "Seleccione la fotografia de su factura"}</p>

                </div>

              </div>
              <div className="row div-upload d-flex justify-content-center align-items-center">
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
