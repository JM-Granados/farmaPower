import "./Info.css"
import back1 from '../../assets/back1.png';

function Info(){
    return (
        <div>
            <div className="info-container">
                <img className="back-1" alt="Back" src={back1} />
                <h1 className="title-info"> Información </h1>
            </div>
            <div className="little-info-container">
                <h2 className="little-info"> Campo de información</h2>   
                <input
                    type="text"
                    readOnly
                    className="custom-input"
                    id="staticInfo"
                    defaultValue=''
                />
            </div>
            <div className="little-info-container2">
                <h2 className="little-info"> Campo de información</h2>   
                <input
                    type="text"
                    readOnly
                    className="custom-input"
                    id="staticInfo"
                    defaultValue=''
                />
            </div>
        </div>
    );
}

export default Info;