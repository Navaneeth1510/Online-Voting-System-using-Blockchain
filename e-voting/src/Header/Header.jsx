import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    return (
        <>
            <div className="row align-items-center border-bottom border-dark" style={{ height: '100%' }}>
                <div className="col-4 d-flex align-items-center">
                    <img src="src/assets/e-voting-header.png" className="img-fluid ms-3 p-2" style={{width:"25%"}}/>
                </div>
                <div className="col-5"></div>
                <div className="col-3 d-flex align-items-center justify-content-end">
                    <button type="button" onClick={() => navigate('/login')} className="btn me-2" style={{ color: "white", backgroundColor: '#5522D0' }}>Home</button>
                    <div className="dropdown">
                        <button className="btn dropdown-toggle me-2" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "white", backgroundColor: '#5522D0' }}>
                            About Us
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            <li><a className="dropdown-item">Navaneeth N</a></li>
                            <li><a className="dropdown-item">Prarthana R</a></li>
                            <li><a className="dropdown-item">Rahul G Athreyas</a></li>
                        </ul>
                    </div>
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "white", backgroundColor: '#5522D0' }}>
                            Contact Us
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            <li><a className="dropdown-item">Connect us through</a></li>
                            <li><a className="dropdown-item">Phone: +91 9148048521</a></li>
                            <li><a className="dropdown-item">Email: navaneethnaren6@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
