// Importa las dependencias necesarias de React y otras bibliotecas
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPharmacy.css';

function RegisterPharmacy() {
    return (
      <div className="register-container">
        <h1 className="title-pharmacy">Registrar Farmacia</h1>
        
        <div className="form-group">
          <label>Nombre</label>
          <input type="text"/>
        </div>

        <div className="form-group">
          <label>Sede</label>
          <input type="text"/>
        </div>

        <div className="form-group">
          <label>Dirección</label>
          <input type="text"/>
        </div>
        
        <button className="create-pharmacy-button">Crear</button>
      </div>
    );
  }
  
  export default RegisterPharmacy;
