/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import gradient from '../../assets/orange-yellow-gradient.png';

import './View_Request.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../../NavBar/SideBar';
import '../../NavBar/SideBar.css'; 

function ThisRequest(){
    const [date, setDate] = useState(null);
    const [number, setNumber] = useState(null);
    const [drugstore, setDrugstore] = useState(null);
    const [med, setMed] = useState(null);
    const [medCount, setCount] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        
        // obtener id de la url
        const idFromUrl = window.location.pathname.split("/").pop();
        // Llamada al backend para obtener los datos de la solicitud
        const fetchRequestData = async () => {
            try {
                const response = await fetch(`/api/requests/request/:id${idFromUrl}`);
                const data = await response.json();
                setDate(data.purchaseDate);
                setNumber(data.invoiceNumber);
                setDrugstore(data.pharmacy.name);
                setCount(data.purchasedQuantity);
                setMed(data.medication.name);
                setStatus(data.rStatus);
            } catch (error) {
                console.error("Error fetching request data:", error);
            }
        };

        fetchRequestData();
    }, []);

    return(
        <div className="d-flex big">
            <div className="sidebar-container">
                <SideBar />
            </div>
            <div className="content-container">
                <div className="gradient-title">
                    <img src={gradient} alt="Logo" id="gradient" className='gradient-image' />
                </div>
                <form className='form request-form'>
                    <div className="mb-6 row">
                        <label className="col-md-2 col-form-label label-text">
                            Fecha de compra
                        </label>
                        <div className="col-md-2">
                            <input
                                type="text"
                                readOnly
                                className="form-control custom-input"
                                id="staticDate"
                                defaultValue={date}
                            />
                        </div>
                    </div>
                    <div className="mb-6 row">
                        <label className="col-md-2 col-form-label label-text">
                            Número de factura
                        </label>
                        <div className="col-md-2">
                            <input
                                type="text"
                                readOnly
                                className="form-control custom-input"
                                id="staticNumber"
                                defaultValue={number}
                            />
                        </div>
                    </div>
                    <div className="mb-6 row">
                        <label className="col-md-2 col-form-label label-text">
                            Farmacia
                        </label>
                        <div className="col-md-2">
                            <input
                                type="text"
                                readOnly
                                className="form-control custom-input"
                                id="staticDrugstore"
                                defaultValue={drugstore}
                            />
                        </div>
                    </div>
                    <div className="mb-6 row">
                        <label className="col-md-2 col-form-label label-text">
                            Producto
                        </label>
                        <div className="col-md-2">
                            <input
                                type="text"
                                readOnly
                                className="form-control custom-input"
                                id="staticMed"
                                defaultValue={med}
                            />
                        </div>
                    </div>
                    <div className="mb-6 row">
                        <label className="col-md-2 col-form-label label-text">
                            Cant. comprada
                        </label>
                        <div className="col-md-2">
                            <input
                                type="text"
                                readOnly
                                className="form-control custom-input"
                                id="staticCount"
                                defaultValue={medCount}
                            />
                        </div>
                    </div>
                    <div className="mb-6 row">
                        <label className="col-md-2 col-form-label label-text">
                            Estado
                        </label>
                        <div className="col-md-2 d-flex">
                            <button className="btn red-button" type="button" value="" onClick={() => setStatus('Rechazada')}/> {/*Es como un lambda, sin () =>, se ejecuta directo */}
                            <button className="btn green-button" type="button" value="" onClick={() => setStatus('Aprobada')}/>
                            <button className="btn grey-button" type="button" value="" onClick={() => setStatus('Pendiente')}/>
                        </div>
                    </div>
                    <div className='button-container'>
                        <button className="btn save-button" type="submit">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ThisRequest