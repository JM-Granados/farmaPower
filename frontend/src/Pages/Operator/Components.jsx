import pill from '../../assets/drugs1.png';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Components.css';

Request.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
};

function Request({id, date, status}){
    const navigate = useNavigate();

    const handleClick = () => { // Maneja la acción de click
        navigate(`/viewrequest/${id}`); // Falta colocar la ruta y mandarle 
    }; //si esto no sirve, envolver en un LINK

    return(
        <div className="request-card" onClick={handleClick}>
            <div className="card-body">
                <div className='pill-container'>
                    <img src={pill} alt="medicamento" className="pills" />
                </div>
                <p className='request-card-text'>Solicitud #{id}</p>
                <p className='request-card-text'>Fecha: {date}</p>
                <p className='request-card-text'>Estado: {status}</p>
            </div>
        </div>
    );
}

export default Request