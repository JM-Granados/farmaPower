/* eslint-disable no-unused-vars */
import './Exchanges.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../../NavBar/SideBar';

import gradient from '../../assets/blue-pink-gradient.png';
import { Exchange } from '../Operator/Components';

const apiURL = import.meta.env.VITE_BACKEND_URL;

// cuidao con esto porque aun no se define un modelo, por lo que hay que cambiarlo despues
const mockExchanges = [
    {number: 1, date: '17/02/2024', producto: 'Ibuprofeno', farmacia: 'La Bomba'},
    {number: 2, date: '15/02/2024', producto: 'Escitalopram', farmacia: 'La Bomba'},
    {number: 3, date: '12/02/2024', producto: 'Paracetamol', farmacia: 'La Bomba'},
    {number: 4, date: '19/02/2024', producto: 'Enantium', farmacia: 'La Bomba'}
]

//falta configurar la barra de búsqueda

function Exchanges(){
    const [exchanges, setExchanges] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [pointsTotal, setPT] = useState('0');
    const [pointsAvailable, setPA] = useState('0');
    const [pointsExchanged, setPE] = useState('0');

    const endpoint = apiURL;

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(endpoint + "/api/requests/all");
                const data = Array.isArray(response.data) ? response.data : []; // Verifica si data es un array
                setExchanges(data);
            } catch (error) {
                console.error(error.response?.data?.message || 'Error al obtener las solicitudes.');
                setExchanges(mockExchanges);
            };
        }
        fetchRequests();
    }, [endpoint]);


    return (
        <div className="d-flex big">
            <div className="ksidebar-container-exchanges">
                <SideBar />
            </div>
            <div className="kcontent-container-exchanges">
                <div className="kgradient-title-exchanges">
                    <img src={gradient} alt="Logo" id="gradient" className='kgradient-image' />
                </div>
                <div className="krow2">
                    <input
                        type="text"
                        className="k-search-control form-control"
                        placeholder="Buscar cliente"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <div className="kscrollable-container-exchanges">
                    <div className="row g-4 p-15">
                        {exchanges.map((exchange, index) => (
                            <div key={exchange._id} className="col-auto d-flex p-2">
                                {/*Cuidao, esto se tiene que cambiar porque no se cuales nombres tiene en la base */}
                                <Exchange id={exchange._id} number={exchange.number} date={exchange.date} product={exchange.producto} farmacia={exchange.farmacia} /> 
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='kcontent-container2-exchanges'>
                <div className='kbig-global-card'>
                    <h3 className='kglobal-text'>
                        Puntos Acumulados
                    </h3>
                    <h3 className='knumber-text'>
                        {pointsTotal}
                    </h3>
                    <hr className='kline'/>
                    <h3 className='kglobal-text'>
                        Puntos Canjeados
                    </h3>
                    <h3 className='knumber-text'>
                        {pointsExchanged}
                    </h3>
                    <hr className='kline'/>
                    <h3 className='kglobal-text'>
                        Puntos Disponibles
                    </h3>
                    <h3 className='knumber-text'>
                        {pointsAvailable}
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default Exchanges;