/* eslint-disable no-unused-vars */
import './Exchanges.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '../../NavBar/SideBar';

import gradient from '../../assets/blue-pink-gradient.png';
import { Exchange } from '../Operator/Components';

const apiURL = import.meta.env.VITE_BACKEND_URL;

function Exchanges(){
    const [exchanges, setExchanges] = useState([]);
    const [filteredExchanges, setFExchanges] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [pointsTotal, setPT] = useState('0');
    const [pointsAvailable, setPA] = useState('0');
    const [pointsExchanged, setPE] = useState('0');
    const [clients, setClients] = useState('');
    const [clientName, setClientName] = useState('Todos');

    const endpoint = apiURL;

    

    useEffect(() => {

        if (searchText === '') {
            setFExchanges(exchanges); // Mostrar todas las exchanges si el campo de búsqueda está vacío
            setClientName('Todos');
            setPT('0');  
            setPE('0');
            setPA('0');
            return;
        }

        const client = clients.find((c) => c.email.toLowerCase().includes(searchText.toLowerCase()));
        if (!client) {
            setClientName('No encontrado');
            setFExchanges([]); // Si no encuentra cliente, no muestra exchanges
            setPT(0);    
            setPE(0);
            setPA(0);
            return;
        }

        setClientName(`${client.firstName} ${client.firstLastName} ${client.secondLastName}`);

        // Filtrar exchanges del cliente
        const clientExchanges = exchanges
                                .filter((exchange) => exchange.client._id === client._id) //cuidao aqui
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
        setFExchanges(clientExchanges);
        const fetchPoints = async () => {
            try {
                const response = await axios.get(endpoint + `/api/exchanges/points/${client._id}`);
                const data = response.data;
                setPT(data.totalPoints);
                setPE(data.usedPoints);
                setPA(data.availablePoints);
            } catch (error) {
                console.error(error.response?.data?.message || 'Error al obtener puntos');
                setPT(0); // Valores por defecto en caso de error
                setPE(0);
                setPA(0);
            }
        };
        fetchPoints();
    }, [searchText, exchanges, clients, endpoint]);

    //Actualizar los datos dinamicamente
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(endpoint + "/api/exchanges/all");
                const data = Array.isArray(response.data) ? response.data : []; // Verifica si data es un array
                // 
                const sortedExchanges = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                // setExchanges(mockExchanges);
                // setFExchanges(mockExchanges)
                setExchanges(sortedExchanges);
                setFExchanges(sortedExchanges);
            } catch (error) {
                console.error(error.response?.data?.message || 'Error al obtener las canjes');
                setExchanges([]);
                setFExchanges([]);
            };
        }
        const fetchClients = async () => {
            try {
                const response = await axios.get(endpoint + "/api/users/clients");
                const data = Array.isArray(response.data) ? response.data : []; // Verifica si data es un array
                setClients(data);
                // setClients(data);
            } catch (error) {
                console.error(error.response?.data?.message || 'Error al obtener las clientes');
                setClients([]);
            };
        }
        fetchClients();
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
                    {/* <button
                        className="ksearch-button-ex btn"
                        onClick={handleSearch}
                    >
                        <img src={searching} alt="Buscar" id="searching" className='ksearching-image'/>
                    </button> */}
                    <h3 className='kglobal-text'>
                        Cliente: {clientName}
                    </h3>
                </div>
                <div className="kscrollable-container-exchanges">
                    <div className="row g-4 p-15">
                        {filteredExchanges.map((exchange, index) => (
                            <div key={exchange._id} className="col-auto d-flex p-2">
                                <Exchange id={exchange._id} number={exchange.exchangeNumber} date={exchange.createdAt} product={exchange.product.medication.name} farmacia={exchange.pharmacy.name} clientID={exchange.client._id}/> 
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