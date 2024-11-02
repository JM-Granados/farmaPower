import React, { useState } from 'react';
import './ModifyPharmacy.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/modify_pharmacy_title.png';

const ModifyPharmacy = () => {
    const [searchText, setSearchText] = useState('');

    return (
        <div className="container-fluid modify-pharmacy">
            <div className="row principal">
                <div className="col-lg-3 col-12 px-0">
                    <SideBar />
                </div>

                <div className="col-lg-9 col-12 div2">
                    <div className="row div3 align-items-end">
                        <div className="col-12 div-gradient-header">
                            <img className='imagen' src={gradient} alt="Modificar Farmacia" />
                        </div>
                    </div>

                    {/* Input fields with labels to the left */}
                    <div className="row mt-4 align-items-center">
                        <div className="col-md-3">
                            <p className="form-label text-white">Nombre</p>
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="row mt-4 align-items-center">
                        <div className="col-md-3">
                            <p className="form-label text-white">Sede</p>
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                    <div className="row mt-4 align-items-center">
                        <div className="col-md-3">
                            <p className="form-label text-white">Direccion</p>
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" />
                        </div>
                    </div>

                    {/* Submit button */}
                    <div className="row mt-4">
                        <div className="col-md-2">
                            <button className="btn delete-pharmacy-button w-100">Eliminar</button>
                        </div>
                        <div className="col-md-5">
                        </div>
                        <div className="col-md-2">
                            <button className="btn modify-pharmacy-button w-100">Modificar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModifyPharmacy;
