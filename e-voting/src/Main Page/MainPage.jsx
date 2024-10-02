//MainPage.jsx

import 'bootstrap/dist/css/bootstrap.min.css';
// import VotingImage from './VotingImage';
import Side from '../Side_panel/Side';
import './MainPage.css'; 
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
    <div className="row main-page min-vh-100" style={{ backgroundColor: '#e4dcf8' }}>
        <div className="col-sm-8 d-flex flex-column justify-content-center" style={{ borderRight: '2px solid #CDC1FF' }}>
            <h1 style={{ color: '#6610f2' }} className="mb-5 fs-1 ms-5">Your Vote, Your Voice</h1>
            <div className="border border-secondary rounded-4 w-50 p-2 text-center fs-5 ms-4" style={{ borderColor: '#b7b7b7' }}>
                <p className="fs-2">
                    Your vote is your power..<br />
                    Click, Cast and Change the game.<br />
                    Shape the future with just a tap!!
                </p>
            </div>
            <div className="d-flex justify-content-end w-50 ms-4 mt-4">
                <button
                    className="btn mt-3 rounded-3"
                    style={{ backgroundColor: '#6610f2',color:'white' }} 
                    onClick={handleGetStarted}
                >
                    Get Started
                </button>
            </div>
        </div>
        <div className="col-sm-4 right-content d-flex">
            <Side />
        </div>
    </div>
  );
};

export default MainPage;
