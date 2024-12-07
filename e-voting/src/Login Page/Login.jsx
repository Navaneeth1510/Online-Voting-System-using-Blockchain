import Side from "../Side_panel/Side"
import './Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaEye, FaEyeSlash } from 'react-icons/fa';
import { LuCheckCircle } from "react-icons/lu";
import { VscError } from "react-icons/vsc";

function Login({voter, admin}) {
    const navigate = useNavigate();

    const[login , setLogin]=useState(false);
    const[user,setUser] = useState(true);
    const[error, setError] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const[Loginspinner, setLoginspinner] = useState(false);
    const[spinner, setSpinner] = useState(false);


    //voter    
    const [VoterID, setnewVID] = useState("");
    const [VoterPass, setnewVP] = useState("");
    const [VoterPassVisible, setVoterPassVisible] = useState(false);

    async function voterLogin(e) {
        e.preventDefault();
        setLoginspinner(true);
        setError(false);
        setUser(false);
        setTimeout(async () => {
            try {
                const response = await fetch(`http://localhost:5000/voter/${VoterID}/${VoterPass}`);
                if (!response.ok) {
                    setError(true);
                    throw new Error('Voter not found');
                }
                const data = await response.json();
                voter.setVoterData(data);
                const constituncy = data.ConstituencyID;
    
                try {
                    const constResponse = await fetch(`http://localhost:5000/const/${constituncy}`);
                    if (!constResponse.ok) {
                        setError(true);
                        throw new Error('Constituency not found');
                    }
                    const constData = await constResponse.json();
                    voter.setConstData(constData);
                    setError(false);
                    setLoginSuccess(true);
                } catch (error) {
                    setError(true);
                    setLoginSuccess(false); 
                    console.error('Error:', error.message);
                }
            } catch (error) {
                setError(true);
                setLoginSuccess(false); 
                console.error('Error:', error.message);
            }
            setLogin(true);
            setnewVID("");
            setnewVP("");
            setLoginspinner(false); // Hide Loginspinner after login logic
        }, 1500);
    }

    //admin
    const [AdminID, setnewAID] = useState("");
    const [AdminPass, setnewAP] = useState("");
    const [AdminPassVisible, setAdminPassVisible] = useState(false);

    async function adminLogin(e) {
        e.preventDefault();
        setSpinner(true);
        setError(false);
        setUser(true);
        setTimeout(async ()=>{
            try {
                const response = await fetch(`http://localhost:5000/admin/${AdminID}/${AdminPass}`);
                if (!response.ok) {
                    setError(true);
                    throw new Error('Admin not found');
                }
                const data = await response.json();
                admin.setAdminData(data);
                setLoginSuccess(true); 
            } catch (error) {
                setError(true);
                setLoginSuccess(false);
                console.error('Error:', error.message);
            }
            setLogin(true);
            setnewAID("");
            setSpinner(false);
            setnewAP("");
        },1500);
    }


    function backtoHome(){
        navigate('/');
    }   

    function redokay(){
        setLogin(false);
    }
    function okay(){
        if(user)            
            navigate('/otp-authentication');
        else
            navigate('/face-detection-details');
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
                                        {!Loginspinner ? 
                                            (
                                                <button
                                                className="position-absolute end-0 text-white fs-5 w-25 rounded text-white"
                                                style={{ backgroundColor: '#5522D0' }}
                                                >                                            
                                                Login
                                                </button>
                                            )
                                            :
                                            (
                                                <button className=" btn-primary position-absolute end-0 text-white fs-5 w-25 rounded text-white" type="button" disabled  style={{ backgroundColor: '#5522D0' }}>
                                                    <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                                    <span role="status"> Loading...</span>
                                                </button>
                                            )
                                        }
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
                                    {!spinner ? 
                                        (
                                            <button
                                            className="position-absolute end-0 text-white fs-5 w-25 rounded text-white"
                                            style={{ backgroundColor: '#5522D0' }}
                                            >                                            
                                            Login
                                            </button>
                                        )
                                        :
                                        (
                                            <button className=" btn-primary position-absolute end-0 text-white fs-5 w-25 rounded text-white" type="button" disabled  style={{ backgroundColor: '#5522D0' }}>
                                                <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                                <span role="status"> Loading...</span>
                                            </button>
                                        )
                                    }
                                    </div>
                                    <div className="col-1"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
            {login && (
                <div
                    className="modal fade show"
                    style={{display: 'block', background: 'rgba(0, 0, 0, 0.8)'}}
                    aria-labelledby="validationModal"
                    aria-modal="true"
                    role="dialog"
                >
                    <div className="modal-dialog modal-dialog-centered " role="document">
                        <div className="modal-content dark rounded-4" style={{backgroundColor:"#e6e0f3", color:"black"}}>
                            <div className="modal-header d-flex justify-content-center">
                                <div className="logo">
                                {!error && loginSuccess ? (
                                    <LuCheckCircle style={{ fontSize: "4rem", color: "green" }} /> 
                                )
                                :
                                (
                                    <VscError style={{ fontSize: "4rem", color: "red" }} />
                                )}
                                </div>
                            </div>
                            <div className="modal-body d-flex justify-content-center fs-4 mb-2">
                                {!error && loginSuccess ? (
                                    <p>{user ? 'Admin login successful!' : 'Voter login successful!'}</p>
                                ) : (
                                    <p>{user ? 'Admin login failed!' : 'Voter login failed!'}</p>
                                )}
                            </div>
                            <div className="modal-footer d-flex justify-content-center pt-0 pb-0 mb-3">
                                {!error && loginSuccess ? (
                                    <button type="button" className="btn" onClick={() => okay()} style={{ backgroundColor: "#5522D0", color: "white" }}>
                                        Okay
                                    </button>
                                ) : (
                                    <button type="button" className="btn btn-danger" onClick={() => redokay()}>
                                        Okay
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
      </>
    )
}

export default Login;
