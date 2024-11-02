import React, { useState } from 'react';
import './RegisterProduct.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/register_product_title.png';

const RegisterProduct = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="container-fluid register-product">
      <div className="row principal">
        <div className="col-lg-3 col-12 px-0">
          <SideBar />
        </div>

        <div className="col-lg-9 col-12 div2">
          <div className="row div3 align-items-end">
            <div className="col-12 div-gradient-header">
              <img className='imagen' src={gradient} alt="Registrar Producto" />
            </div>
          </div>

          {/* Search bar and label */}
          <div className="row align-items-center mt-3">
            <div className="col-md-3">
              <p className="form-label text-white">Seleccione su producto</p>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Display section for searched medications */}
          <div className="row mt-4">
            <div className="col-9">
              <div className="cuadrado">
                {/* Display cards or placeholder here */}
                <p className="text-white">Aquí se mostrarán los medicamentos buscados.</p>
              </div>
            </div>
          </div>

          {/* Input fields with labels to the left */}
          <div className="row mt-4 align-items-center">
            <div className="col-md-3">
              <p className="form-label text-white">Puntos</p>
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="row mt-4 align-items-center">
            <div className="col-md-3">
              <p className="form-label text-white">Cantidad para el canje</p>
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" />
            </div>
          </div>

          {/* Dropdown for pharmacy selection */}
          <div className="row mt-4 align-items-center">
            <div className="col-md-3">
              <p className="form-label text-white">Farmacia</p>
            </div>
            <div className="col-md-6">
              <select className="form-select">
                <option value="">Seleccione una farmacia</option>
                <option value="1">Farmacia 1</option>
                <option value="2">Farmacia 2</option>
                <option value="3">Farmacia 3</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>

          {/* Submit button */}
          <div className="row mt-4">
          <div className="col-md-7">
          </div>
            <div className="col-md-2">
              <button className="btn create-product-button w-100">Crear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProduct;
