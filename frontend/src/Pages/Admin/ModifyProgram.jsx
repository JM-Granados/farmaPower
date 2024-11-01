// Importa las dependencias necesarias de React y otras bibliotecas
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ModifyProgram.css';

function ModifyProgram() {
    return (
      <div className="modify-container">
        <h1 className="title-program">Modificar Producto</h1>
        
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Farmacias disponibles</label>
          <div className="search-bar">
            <input type="text" placeholder="Buscar farmacia..." />
            <button className="search-button">🔍</button>
          </div>
        </div>
        
        <div className="form-group">
          <textarea></textarea>
        </div>
  
        <div className="form-group">
          <label>Descripción</label>
          <textarea></textarea>
        </div>
  
        <div className="button-group">
          <button className="delete-program-button">Eliminar</button>
          <button className="modify-program-button">Modificar</button>
        </div>
      </div>
    );
}

export default ModifyProgram;