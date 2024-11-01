// Ejemplo en NewRequest.js
import React from 'react';
import SideBar from '../../NavBar/SideBar';

const NewRequest = () => {
  return (
    <div className="nueva-solicitud">
      <SideBar page="new-request" />  {/* Asegúrate de pasar el valor de `page` */}
      {/* Contenido de la página */}
    </div>
  );
};

export default NewRequest;
