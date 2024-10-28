// Importa las dependencias necesarias de React y otras bibliotecas
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ModifyProduct.css';

function ModifyProduct() {
    return (
      <div className="modify-program-container">
        <h1 className="title-product">Modificar Producto</h1>
        
        <div className="form-group">
          <label>Seleccione su producto</label>
          <div className="search-bar">
            <input type="text" placeholder="Buscar producto..." />
            <button className="search-button">🔍</button>
          </div>
        </div>
        
        <div className="form-group">
          <textarea></textarea>
        </div>
  
        <div className="form-group">
          <label>Puntos</label>
          <input type="number" />
        </div>
  
        <div className="form-group">
          <label>Cantidad para el canje</label>
          <input type="number" />
        </div>
  
        <div className="form-group">
          <label>Farmacia</label>
          <select>
            <option>Seleccione una farmacia</option>
            <option>Farmacia 1</option>
            <option>Farmacia 2</option>
            <option>Farmacia 3</option>
          </select>
        </div>
  
        <div className="button-group">
          <button className="delete-product-button">Eliminar</button>
          <button className="modify-product-button">Modificar</button>
        </div>
      </div>
    );
}

export default ModifyProduct;
