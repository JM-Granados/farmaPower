import pill from '../../assets/drugs1.png';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Components.css';

Request.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
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

export default Request