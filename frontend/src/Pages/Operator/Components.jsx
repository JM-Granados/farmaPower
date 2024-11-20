import pill from '../../assets/drugs1.png';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Components.css';
import hand from '../../assets/handbox.png';

Request.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
};

Exchange.propTypes = {
    id: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    farmacia: PropTypes.string.isRequired
};

function Request({id, date, status, number}){
    const navigate = useNavigate();

    const handleClick = () => { // Maneja la acción de click
        navigate(`/viewrequest/${id}`); // Falta colocar la ruta y mandarle 
    }; //si esto no sirve, envolver en un LINK

    return(
        <div className="request-card" onClick={handleClick}>
            <div className='pill-container'>
                <img src={pill} alt="medicamento" className="pills" />
            </div>
            <div className="request-card-body">
                <p className='request-card-text'>Solicitud #{number+1}</p>
                <p className='request-card-text'>Fecha: {date.split("T")[0]}</p>
                <p className='request-card-text'>Estado: {status}</p>
            </div>
        </div>
    );
}

export function Exchange({id, number, date, product, farmacia}){
    const navigate = useNavigate();

    const handleClick = () => { // Maneja la acción de click
        navigate(`/${id}`); // Falta colocar la ruta y consultar como quiere que le lleguen los params
    };
    
    return (
        <div className='kexchange-card' onClick={handleClick}>
            <div className='khand-container'>
                <img src={hand} alt="manita" className="k-handbox" />
            </div>
            <div className='kexchange-card-body'>
                <p className='kexchange-card-text'>Canje #{number}</p>
                <p className='kexchange-card-text'>Fecha: {date.split("T")[0]}</p>
                <p className='kexchange-card-text'>Producto: {product}</p>
                <p className='kexchange-card-text'>Farmacia: {farmacia}</p>
            </div>
        </div>
    );
}


export default Request