import React, { useState } from 'react';
import './ModifyProgram.css';
import SideBar from '../../NavBar/SideBar';
import gradient from '../../assets/modify_program_title.png';

const ModifyProgram = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="container-fluid modify-program">
      <div className="row principal">
        <div className="col-lg-3 col-12 px-0">
          <SideBar />
        </div>

        <div className="col-lg-9 col-12 div2">
          <div className="row div3 align-items-end">
            <div className="col-12 div-gradient-header">
              <img className='imagen' src={gradient} alt="Modificar Programa" />
            </div>
          </div>

          <div className="row mt-4 align-items-center">
            <div className="col-md-3">
              <p className="form-label text-white">Nombre</p>
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" />
            </div>
          </div>

          {/* Search bar and label */}
          <div className="row align-items-center mt-3">
            <div className="col-md-3">
              <p className="form-label text-white">Selección de farmacias</p>
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
                <p className="text-white">Aquí se mostrarán las farmacias seleccionadas.</p>
              </div>
            </div>
          </div>

          {/* Description field */}
          <div className="row mt-4 align-items-center">
            <div className="col-md-3">
              <p className="form-label text-white">Descripción</p>
            </div>
            <div className="col-md-6">
              <textarea className="form-control" rows="6" placeholder=""></textarea>
            </div>
          </div>

          {/* Submit buttons */}
          <div className="row mt-4">
            <div className="col-md-7">
            </div>
            <div className="col-md-2">
              <button className="btn modify-program-button w-100">Modificar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyProgram;
