/* eslint-disable no-unused-vars */
// Importación de useState de React para manejo de estado dentro de los componentes (no utilizado aquí pero preparado para futura expansión).
import { useState } from 'react'
// Importación de componentes específicos de react-router-dom para manejar la navegación dentro de la aplicación.
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Importación de los estilos CSS y JS de Bootstrap para aprovechar sus componentes y funcionalidades predefinidos.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './App.css';

import Header_User from '../NavBar/Header_Home_User'

// Importación de los componentes de las ventanas que se utilizarán en las rutas.
import Home_Guest from '../Pages/Home/Home_Guest' // Componente que muestra la página de inicio para usuarios no autenticados.
import Home_Admin from '../Pages/Home/Home_Admin'
import Home_Client from '../Pages/Home/Home_Client'
import Home_Operator from '../Pages/Home/Home_Operator'
import Home_Pharmacy from '../Pages/Home/Home_Pharmacy'
import Login from '../Pages/Ingreso/Login'; // Componente para la página de login.
import Signup from '../Pages/Ingreso/Signup'
import PassRecovery from '../Pages/Ingreso/PassRecovery'
import Registrar_User from '../Pages/Usuarios/Registrar_User'
import Modificar_User from '../Pages/Usuarios/Modificar_User'
import Users from '../Pages/Usuarios/Users'
import Requests from '../Pages/Operator/Requests';
import ThisRequest from '../Pages/Operator/View_Request';
import RegisterProgram from '../Pages/Program/RegisterProgram';
import Info from '../Pages/Information/Info';
import Help from '../Pages/Help/Help';
import My_Requests from '../Pages/Client/My_Requests'; // Componente para la página de solicitudes del usuario.
import NewRequest from '../Pages/Client/New_Request';
import Points from '../Pages/Client/My_Points';
import Medication from '../Pages/Client/Participating_Medications';
import Pharmacies from '../Pages/Client/Participating_Pharmacies';
import Programs from '../Pages/Client/Programs';
import ManageElegibleMedication from '../Pages/Admin/ManageElegibleMedication';
import ManagePharmacy from '../Pages/Admin/ManagePharmacy';
import ManageProgram from '../Pages/Admin/ManageProgram';
import RegisterProduct from '../Pages/Admin/RegisterProduct';
import ModifyProduct from '../Pages/Admin/ModifyProduct';
import RegisterPharmacy from '../Pages/Admin/RegisterPharmacy';
import ModifyPharmacy from '../Pages/Admin/ModifyPharmacy';
import ModifyProgram from '../Pages/Admin/ModifyProgram';

/**
 * @fileoverview Aplicación principal para el proyecto React usando React Router y Bootstrap.
 *
 * Este archivo define el componente raíz `App`, que configura el enrutamiento para toda la aplicación.
 * Utiliza `BrowserRouter` para manejar el enrutamiento basado en la historia del navegador, permitiendo
 * una experiencia de usuario suave y moderna sin recargas de página completas.
 *
 * Las rutas dentro de la aplicación se definen usando `Routes` y `Route`, que asocian componentes específicos
 * a rutas URL. Actualmente, incluye rutas para la página de inicio de usuarios no autenticados (`Home_Guest`)
 * y la página de login (`Login`).
 *
 * La aplicación también importa y utiliza estilos y componentes de Bootstrap para garantizar una interfaz
 * consistente y receptiva. El uso de Bootstrap facilita la implementación rápida de un diseño atractivo
 * con comportamientos interactivos comunes.
 *
 * Uso:
 * - La aplicación es lanzada por `index.js`, que monta este componente en el DOM.
 * - Las rutas definen los puntos de entrada para las diferentes partes de la aplicación accesibles
 *   a través de la URL.
 */

// Función principal App que define el componente de nivel superior de la aplicación.
function App() {

  // Renderizado de componentes dentro de un BrowserRouter, que envuelve la aplicación para habilitar el enrutamiento.
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para la página de inicio accesible desde la URL base '/' */}
        <Route path='/' element={<Home_Guest />}></Route>
        {/* Ruta para la página de requests de operador accesible desde '/requests' */}
        <Route path='/Requests' element={<Requests/>}></Route>
        {/* Ruta para la página de request específico accesible desde '/viewrequest/id' */}
        <Route path='/Viewrequest/:id' element={<ThisRequest/>}></Route>
        {/* Ruta para la página de registrar programa accesible desde '/registerProgram' */}
        <Route path='/RegisterProgram' element={<RegisterProgram/>}></Route>
        {/* Ruta para la página de registrar programa accesible desde '/info/id' */}
        <Route path='/Info/:id' element={<Info/>}></Route> {/*No se como se vaya a manejar esto */}
        {/* Ruta para la página de registrar programa accesible desde '/help' */}
        <Route path='/Help' element={<Help/>}></Route> {/*No se como se vaya a manejar esto */}

        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Signup' element={<Signup/>}></Route>
        <Route path='/PassRecovery' element={<PassRecovery/>}></Route>
        <Route path='/Registrar_User' element={<Registrar_User/>}></Route>
        <Route path='/Modificar_User' element={<Modificar_User/>}></Route>
        <Route path='/Users' element={<Users/>}></Route>
        <Route path='/Home_Admin' element={<Home_Admin/>}></Route>
        <Route path='/Home_Client' element={<Home_Client/>}></Route>
        <Route path='/Home_Operator' element={<Home_Operator/>}></Route>
        <Route path='/Home_Pharmacy' element={<Home_Pharmacy/>}></Route>
        <Route path='/MyRequests' element={<My_Requests />}></Route>
        <Route path="/NewRequest" element={<NewRequest />}></Route>
        <Route path="/MyPoints" element={<Points />}></Route>

        <Route path="/Medications" element={<Medication />}></Route>
        <Route path="/Pharmacies" element={<Pharmacies />}></Route>
        <Route path="/Programs" element={<Programs />}></Route>
        <Route path='/ManageElegibleMedication' element={<ManageElegibleMedication/>}></Route>
        <Route path='/ManagePharmacy' element={<ManagePharmacy/>}></Route>
        <Route path='/ManageProgram' element={<ManageProgram/>}></Route>
        <Route path='/RegisterProduct' element={<RegisterProduct/>}></Route>
        <Route path='/ModifyProduct' element={<ModifyProduct/>}></Route>
        <Route path='/RegisterPharmacy' element={<RegisterPharmacy/>}></Route>
        <Route path='/ModifyPharmacy' element={<ModifyPharmacy/>}></Route>
        <Route path='/ModifyProgram' element={<ModifyProgram/>}></Route>


        <Route path='/Header_User' element={<Header_User/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

// Exportación del componente App para ser utilizado en index.js como el componente raíz.
export default App
