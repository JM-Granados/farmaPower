// Importa las dependencias necesarias de React y otras bibliotecas
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ModifyPharmacy.css';

function ModifyPharmacy() {
    return (
        <div className="modify-container">
            <h1 className="title-pharmacy">Modificar Farmacia</h1>

            <div className="form-group">
                <label>Nombre</label>
                <input type="text" />
            </div>

            <div className="form-group">
                <label>Sede</label>
                <input type="text" />
            </div>

            <div className="form-group">
                <label>Dirección</label>
                <input type="text" />
            </div>
            <div className="button-group">
                <button className="delete-pharmacy-button">Eliminar</button>
                <button className="modify-pharmacy-button">Modificar</button>
            </div>
        </div>
    );
}

export default ModifyPharmacy;
