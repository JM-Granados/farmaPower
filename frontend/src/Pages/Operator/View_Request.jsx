/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import gradient from '../../assets/orange-yellow-gradient.png';
import axios from 'axios';
import './View_Request.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../../NavBar/SideBar';
import '../../NavBar/SideBar.css'; 
import { useNavigate } from 'react-router-dom';
import propRequest from '../../assets/folder-back.png';

const apiURL = import.meta.env.VITE_BACKEND_URL;

function ThisRequest(){
    const [date, setDate] = useState(null);
    const [number, setNumber] = useState(null);
    const [drugstore, setDrugstore] = useState(null);
    const [med, setMed] = useState(null);
    const [medCount, setCount] = useState(null);
    const [status, setStatus] = useState('Pendiente');
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [image, setImage] = useState(null);

    const navigate = useNavigate();


    const endpoint = apiURL;

    useEffect(() => {
        
        // obtener id de la url
        const idFromUrl = window.location.pathname.split("/").pop();
        // Llamada al backend para obtener los datos de la solicitud
        const fetchRequestData = async () => {
            try {
                const response = await axios.get(`${endpoint}/api/requests/request/${idFromUrl}`);
                const data = response.data;

                setDate(data.purchaseDate);
                setNumber(data.invoiceNumber);
                setDrugstore(data.pharmacy.name);
                setCount(data.purchasedQuantity);
                setMed(data.medication.medication.name);
                setStatus(data.rStatus);
                setImage(data.invoiceImage);
            } catch (error) {
                setDate('');
                setNumber('');
                setDrugstore('');
                setCount('');
                setMed('');
                setStatus('');
                setImage(null);
                console.error("Error fetching request data:", error);
            }
        };

        fetchRequestData();
        console.info(image);
    }, [endpoint, image]);

    const handleSave = async () => {
        console.info(status);
        const idFromUrl = window.location.pathname.split("/").pop();
        try {
            const response = await axios.put(`${endpoint}/api/requests/save/${idFromUrl}`, {
                rStatus: status, 
            });
            
            console.info("Estado actualizado:", response.data);
            setSuccessMessage('Estado actualizado correctamente')

            // Redirige al operador a la pantalla de requests después de éxito
            navigate("/Requests");
          } catch (error) {
            console.error("Error al guardar el estado:", error);
            setErrorMessage("Hubo un problema al guardar el estado."); // Mensaje de error
          }
    };

    return(
        <div className="d-flex big">
            <div className="ksidebar-container">
                <SideBar />
            </div>
            <div className="kcontent-container">
                <div className="kgradient-title">
                    <img src={gradient} alt="Logo" id="gradient" className='kgradient-image' />
                </div>
                <form className='form krequest-form'>
                    <div className="kmb-6 row">
                        <label className="col-md-2 col-form-label klabel-text">
                            Fecha de compra
                        </label>
                        <div className="col-md-2">
                            <input
                                type="text"
                                readOnly
                                className="kform-control custom-input"
                                id="staticDate"
                                defaultValue={date ? date.split('T')[0] : ''}
                            />
                        </div>
                    </div>
                    <div className="kmb-6 row">
                        <label className="col-md-2 col-form-label klabel-text">
                            Número de factura
                        </label>
                        <div className="col-md-2">
                            <input
                                type="text"
                                readOnly
                                className="kform-control custom-input"
                                id="staticNumber"
                                defaultValue={number}
                            />
                        </div>
                    </div>
                    <div className="kmb-6 row">
                        <label className="col-md-2 col-form-label klabel-text">
                            Farmacia
                        </label>
                        <div className="col-md-2">
                            <input
                                type="text"
                                readOnly
                                className="kform-control custom-input"
                                id="staticDrugstore"
                                defaultValue={drugstore}
                            />
                        </div>
                    </div>
                    <div className="kmb-6 row">
                        <label className="col-md-2 col-form-label klabel-text">
                            Producto
                        </label>
                        <div className="col-md-2">
                            <input
                                type="text"
                                readOnly
                                className="kform-control custom-input"
                                id="staticMed"
                                defaultValue={med}
                            />
                        </div>
                    </div>
                    <div className="kmb-6 row">
                        <label className="col-md-2 col-form-label klabel-text">
                            Cant. comprada
                        </label>
                        <div className="col-md-2">
                            <input
                                type="text"
                                readOnly
                                className="kform-control custom-input"
                                id="staticCount"
                                defaultValue={medCount}
                            />
                        </div>
                    </div>
                    <div className="mb-6 row">
                        <label className="col-md-2 col-form-label klabel-text">
                            Estado
                        </label>
                        <div className="col-md-2 d-flex">
                            <button className="btn kred-button" type="button" value="" onClick={() => setStatus('Rechazada')}/> {/*Es como un lambda, sin () =>, se ejecuta directo */}
                            <button className="btn kgreen-button" type="button" value="" onClick={() => setStatus('Aprobada')}/>
                            <button className="btn kgrey-button" type="button" value="" onClick={() => setStatus('Pendiente')}/>
                        </div>
                    </div>
                    <div className='kbutton-container'>
                        <button className="btn ksave-button" type="button" onClick={handleSave}>
                            Guardar
                        </button>
                    </div>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    {successMessage && <p className="text-success">{successMessage}</p>}
                </form>
            </div>
            <div className='kcontent-container2'>
                <img src={image && image.startsWith('https') ? image : propRequest} alt="Invoice Image" id="gradient" className={`request-image ${image && image.startsWith('https') ? 'request-image' : 'image-local'}`} />
            </div>
        </div>
    );
}

export default ThisRequest