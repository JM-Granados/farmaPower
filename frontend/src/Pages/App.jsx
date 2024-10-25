import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


//Ventanas:
import Home_Guest from './Home_Guest'
import Login from './Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home_Guest/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
