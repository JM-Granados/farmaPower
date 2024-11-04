
import cone from '../../assets/cone.png';
import './RegisterProgram.css';
import SideBar from '../../NavBar/SideBar';

function RegisterProgram() {
    return (
        <div className="d-flex all-page">
            <div className="k-sidebar-container">
                <SideBar />
            </div>
            <div className="k-content-container">
                <img src={cone} alt="ElConito" className='elConito' />
            </div>
        </div>
    );
}

export default RegisterProgram;