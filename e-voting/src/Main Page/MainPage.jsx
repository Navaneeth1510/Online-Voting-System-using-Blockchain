import 'bootstrap/dist/css/bootstrap.min.css';
import Side from '../Side_panel/Side';
import { useEffect, useState } from 'react';
import './MainPage.css'; 
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    const navigate = useNavigate();

    const [active, setActive] = useState(() => {
        const local = localStorage.getItem("active");
        return local ? JSON.parse(local) : false;
    });
    useEffect(() => {
        const interval = setInterval(() => {
            const local = localStorage.getItem("active");
            if (local) {
                setActive(JSON.parse(local));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        localStorage.setItem("active", active);
    }, [active]);

    function gotoresults(){
        navigate('/results');
    }
    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <>           
            <div className="row main-page min-vh-100" style={{ backgroundColor: '#e4dcf8' }}>

            {!active && (
                    <div className="toast-container position-fixed top-0 start-0 w-100 p-1">
                        <div className="toast align-items-center text-bg-warning border-0 show" role="alert" aria-live="assertive" aria-atomic="true"
                            style={{
                                width: '100%',
                                maxWidth: '100%',
                                fontSize:'1.3rem',
                                borderRadius: 4, 
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center px-1 py-1">
                                <div className="toast-body">
                                    The results are out !!
                                </div>
                                <button type="button" className="btn btn-dark me-3" data-bs-dismiss="toast" aria-label="View Results"
                                    onClick={()=>gotoresults()}
                                >
                                    View Results
                                </button>
                            </div>
                        </div>
                    </div>
                )} 

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
                            style={{ backgroundColor: '#6610f2', color: 'white' }} 
                            onClick={handleGetStarted}
                        >
                            Get Started <FaArrowRight />
                        </button>
                    </div>
                </div>
                <div className="col-sm-4 right-content d-flex">
                    <Side />
                </div>
            </div>
        </>
    );
};

export default MainPage;
