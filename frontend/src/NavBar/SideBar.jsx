import React, { useEffect, useState } from 'react';
import axios from 'axios';

import gradient from '../assets/lightblue_yellow_gradient.png';
import back1 from '../assets/back1.png';
import user from '../assets/user.png';
import selected from "../assets/Pestanaseleccionada.png"
import pill from '../assets/drugs1.png';

const SideBar = () => {

    return (
        <div className="sidebar">
            <div className="sidebar-title">Panel de navegación </div>
            <img className="back-1" alt="Back" src={back1} />
            <div className="sidebar-link">Inicio</div>
            <div className="sidebar-link">Mis solicitudes</div>
            <div className="selected-image-container">
                <img className="selected-tab" alt="selected" src={selected} />
            </div>
            <div className="sidebar-link">Nueva solicitud</div>
            <div className="sidebar-link">Mis puntos</div>
            <div className="sidebar-link">Ayuda</div>
            <div className="sidebar-user-container">
                <div className="user_image_container">
                    <img src={user} alt="Logo" id="user" />
                </div>
                <div className="sidebar-user">Nombre usuario</div>
            </div>
        </div>
    );
};

export default SideBar;
