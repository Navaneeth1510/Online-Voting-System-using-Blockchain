import Side from "../Side_panel/Side"
import Constituency from "../ConstituencyPage/Constituency";
import './Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaEye, FaEyeSlash } from 'react-icons/fa';

function Login({voterData, setVoterData, setConstData}) {
    const navigate = useNavigate();


    //voter    
    const [VoterID, setnewVID] = useState("");
    const [VoterPass, setnewVP] = useState("");
    const [VoterPassVisible, setVoterPassVisible] = useState(false);

    async function voterLogin(e) {
        e.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:5000/voter/${VoterID}/${VoterPass}`);
            if (!response.ok) {
                throw new Error('Voter not found');
            }
            const data = await response.json();
            console.log(data);
            setVoterData(data);
            const constituncy = data.ConstituencyID;
            console.log('constituency id : ',constituncy)
            try {
                const response = await fetch(`http://localhost:5000/const/${constituncy}`);
                if (!response.ok) {
                    throw new Error('Constituency not found');
                }
                const data = await response.json();
                setConstData(data);
    
            } catch (error) {
                console.error('Error:', error.message);
            }
            navigate('/constituency')

        } catch (error) {
            console.error('Error:', error.message);
        }

        setnewVID("");
        setnewVP("");
    }


    //admin
    const [AdminID, setnewAID] = useState("");
    const [AdminPass, setnewAP] = useState("");
    const [AdminPassVisible, setAdminPassVisible] = useState(false);
    
    async function adminLogin(e) {
        e.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:5000/admin/${AdminID}/${AdminPass}`);
            if (!response.ok) {
                throw new Error('Admin not found');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error.message);
        }

        setnewAID("");
        setnewAP("");
    }


    function backtoHome(){
        navigate('/');
    }   

    return (
      <>
        <div className="row login-page" style={{ height: "100vh" }}>
            <div className="col-4">
                <Side />
            </div>
            <div className="col-8">
                <div className="row">
                    <a className="fs-5" style={{ color: "black", textDecoration: "none" , cursor:"pointer"}} onClick={() => backtoHome()}><FaHome /></a>
                    <div className="col-1"></div>
                    <div className="col-10" style={{ height: "100vh" }}>
                        {/* Voter Login */}
                        <div className="h-50 border-bottom border-2 border-dark">
                            <div className="h-25 pt-4">
                                <h1 className="fs-1" style={{ color: '#5522D0' }}>Voter</h1>
                            </div>
                            <form onSubmit={voterLogin} className="rounded-4 border border-3 border-dark" style={{ background: "#E2F0D9", height: "60%" }}>
                                <div className="d-flex p-5 h-75">
                                    <div className="w-50">
                                        <label htmlFor="Email Id" className="fs-4 mb-3">Voter ID</label><br />
                                        <input
                                            type="text"
                                            className="w-75 border border-2 border-dark"
                                            style={{ backgroundColor: '#e4dcf8' }}
                                            value={VoterID}
                                            onChange={e => {
                                                setnewVID(e.target.value)
                                            }}
                                            required
                                        />
                                    </div>
                                    <div className="w-50 position-relative">
                                        <label htmlFor="Password" className="fs-4 mb-3">Password</label><br />
                                        <div className="w-75 d-flex border border-dark border-2" style={{backgroundColor: '#e4dcf8' }}>
                                            <div className="w-100">
                                                <input 
                                                    type={VoterPassVisible ? "text" : "password"}
                                                    className="w-100"
                                                    style={{  backgroundColor: '#e4dcf8', border:"none" }}
                                                    value={VoterPass}
                                                    onChange={e => {
                                                        setnewVP(e.target.value)
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div className="ps-2 pe-2 border-start border-dark">                                        
                                                <span
                                                    className=" me-0"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => setVoterPassVisible(!VoterPassVisible)}
                                                >
                                                    {VoterPassVisible ? <FaEyeSlash /> : <FaEye />}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-5 align-middle">
                                    <div className="col-1"></div>
                                    <div className="col-10 position-relative align-middle">
                                        <button
                                            className="position-absolute end-0 text-white fs-5 w-25 rounded text-white"
                                            style={{ backgroundColor: '#5522D0' }}
                                        >
                                            Login
                                        </button>
                                    </div>
                                    <div className="col-1"></div>
                                </div>
                            </form>
                        </div>
                        {/* Admin Login */}
                        <div className="h-50">
                            <div className="h-25 pt-4">
                                <h1 className="fs-1" style={{ color: '#5522D0' }}>Admin</h1>
                            </div>
                            <form onSubmit={adminLogin} className="rounded-4 border border-3 border-dark" style={{ background: "#E2F0D9", height: "60%" }}>
                                <div className="d-flex p-5 h-75">
                                    <div className="w-50">
                                        <label htmlFor="Email Id" className="fs-4 mb-3">Unique ID</label><br />
                                        <input
                                            type="text"
                                            className="w-75 border border-2 border-dark"
                                            style={{ backgroundColor: '#e4dcf8' }}
                                            value={AdminID}
                                            onChange={e => {
                                                setnewAID(e.target.value)
                                            }}
                                            required
                                        />
                                    </div>
                                    <div className="w-50 position-relative">
                                        <label htmlFor="Password" className="fs-4 mb-3">Password</label><br />
                                        <div className="w-75 d-flex border border-dark border-2" style={{backgroundColor: '#e4dcf8' }}>
                                            <div className="w-100">
                                                <input
                                                    type={AdminPassVisible ? "text" : "password"}
                                                    className="w-100"
                                                    style={{  backgroundColor: '#e4dcf8', border:"none" }}
                                                    value={AdminPass}
                                                    onChange={e => {
                                                        setnewAP(e.target.value)
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div className="ps-2 pe-2 border-start border-dark">
                                                <span
                                                    className="me-0"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => setAdminPassVisible(!AdminPassVisible)}
                                                >
                                                    {AdminPassVisible ? <FaEyeSlash /> : <FaEye />}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-5 align-middle">
                                    <div className="col-1"></div>
                                    <div className="col-10 position-relative align-middle">
                                        <button
                                            className="position-absolute end-0 text-white fs-5 w-25 rounded text-white"
                                            style={{ backgroundColor: '#5522D0' }}
                                        >
                                            Login
                                        </button>
                                    </div>
                                    <div className="col-1"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </div>
      </>
    )
}

export default Login;
