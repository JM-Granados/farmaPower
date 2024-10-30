/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import gradient from '../../assets/orange-yellow-gradient.png';

import './View_Request.css';

function ThisRequest(){
    const [id, setId] = useState(null);
    const [date, setDate] = useState(null);
    const [number, setNumber] = useState(null);
    const [drugstore, setDrugstore] = useState(null);
    const [med, setMed] = useState(null);
    const [medCount, setCount] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const idFromUrl = window.location.pathname.split("/").pop();
        setId(idFromUrl);
        setNumber(110012);
        setDate('17-05-2024');
        setDrugstore('Central');
        setCount(20);
        setMed('Escytalopram');
        setStatus('Pendiente');
        // llamar al endpoint que saque los datos de la solicitud
    }, []);

    return(
        <div className="">
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
                        Cantidad comprada
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
                    <input className="btn btn-primary red-button btn-sm" type="button" value=""/>
                    <input className="btn btn-primary green-button btn-sm" type="button" value=""/>
                    <input className="btn btn-primary grey-button btn-sm" type="button" value=""/>
                </div>
                <div className='button-container'>
                    <input className="btn btn-primary save-button " type="submit" value="Guardar"/>
                </div>
            </form>
        </div>
    );
}

export default ThisRequest