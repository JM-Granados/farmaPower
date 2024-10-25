// Importación de useState de React para manejo de estado dentro de los componentes (no utilizado aquí pero preparado para futura expansión).
import { useState } from 'react'

// Importación de componentes específicos de react-router-dom para manejar la navegación dentro de la aplicación.
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importación de los estilos CSS y JS de Bootstrap para aprovechar sus componentes y funcionalidades predefinidos.
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importación de los componentes de las ventanas que se utilizarán en las rutas.
import Home_Guest from './Home_Guest' // Componente que muestra la página de inicio para usuarios no autenticados.
import Login from './Login'; // Componente para la página de login.

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
        <Route path='/' element={<Home_Guest/>}></Route>
        {/* Ruta para la página de login accesible desde '/Login' */}
        <Route path='/Login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

// Exportación del componente App para ser utilizado en index.js como el componente raíz.
export default App
