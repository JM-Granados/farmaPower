import "./Help.css"
import back1 from '../../assets/back1.png';
import { Link } from "react-router-dom";

function Help(){
    return (
        <div className="big-container">
            <Link to='/'>
                <img className="back-1" alt="Back" src={back1} />
            </Link>
            <div className="help-section">
                <div className="card1">
                    <div className="card-body-k">
                        <h1 className="help-text">Bienvenido a FarmaTEC</h1>
                        <p className="help-paragraph">
                            FarmaTEC es una aplicación web diseñada para facilitar la acumulación y canje de puntos en la compra de medicamentos dentro de programas de beneficios farmacéuticos. Nuestro sistema ofrece una experiencia intuitiva y accesible para diferentes tipos de usuarios: clientes, operadores y administradores.
                        </p>
                        <p className="help-paragraph">
                            ¡Inicie sesión para comenzar!
                        </p>
                    </div>
                </div>
                <div className="card2">
                    <div className="card-body-k">
                        <h2 className="help-text">Todo lo que necesita</h2>
                        <ul className="help-list">
                            <li><strong>Clientes:</strong> Registra solicitudes, sube imágenes de facturas, consulta el estado de tus solicitudes y revisa tus puntos acumulados.</li>
                            <li><strong>Operadores:</strong> Visualiza, aprueba o rechaza solicitudes de clientes para garantizar un proceso de canje efectivo.</li>
                            <li><strong>Administradores:</strong> Gestiona programas, medicamentos, usuarios y farmacias para mantener una oferta actualizada.</li>
                        </ul>
                        <p className="help-paragraph">
                            ¡Registrese hoy!
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Help;