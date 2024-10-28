// Importa las dependencias necesarias de React y otras bibliotecas
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterProduct.css';

function RegisterProduct() {
  return (
    <div className="page-container"> 
      <nav className="navbar">
      <label classname="nav-title">Panel de navegación</label>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#products">Products</a></li>
          <li><a href="#register">Register Product</a></li>
          <li><a href="#settings">Settings</a></li>
        </ul>
      </nav>

      <div className="register-container">
        <h1 className="title-product">Registrar Producto</h1>
        
        <div className="form-group">
          <label>Seleccione su producto</label>
          <div className="search-bar">
            <input type="text" placeholder="Buscar producto..." />
            <button className="search-button">🔍</button>
          </div>
        </div>
        
        <div className="form-group">
          <textarea placeholder="Descripción del producto"></textarea>
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
  
        <button className="create-product-button">Crear</button>
      </div>
    </div>
  );
}

export default RegisterProduct;
