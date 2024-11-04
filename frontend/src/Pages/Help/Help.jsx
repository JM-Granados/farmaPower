import "./Help.css"
import back1 from '../../assets/back1.png';

function Help(){
    return (
        <div className="big-container">
            <img className="back-1" alt="Back" src={back1} />
            <div className="help-section">
                <div className="card1">
                    <div className="card-body-k">
                        <h1 className="help-text"> Bloque de información </h1>
                    </div>
                </div>
                <div className="card2">
                    <div className="card-body-k">
                        <h1 className="help-text"> Bloque de información </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Help;