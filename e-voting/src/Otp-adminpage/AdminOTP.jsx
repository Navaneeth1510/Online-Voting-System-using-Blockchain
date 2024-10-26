import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Side from '../Side_panel/Side';
import './AdminOTP.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import otp from '../../otp-gen/otp';
import { LuCheckCircle } from "react-icons/lu";
import { VscError } from "react-icons/vsc";

function AdminOTP({ admin }) {
    const navigate = useNavigate();
    const [adminotp, setotp] = useState("");
    const [auth, setAuth] = useState(false); 
    const [crct, setCrct] = useState(false); 

    useEffect(() => {
        sendotp();
    }, []);

    async function validate(e) {
        e.preventDefault();  
        console.log('validating the otp');
        if (adminotp === otp) {
            console.log('OTP correct');
            setCrct(true);  
        } else {
            console.log('OTP incorrect');
            setCrct(false);
        }
        setAuth(true); 
    }

    function okay() {
        if (crct) {
            navigate('/admin-welcome');
        } else {
            setAuth(false); 
        }
    }

    async function sendotp() {
        console.log("Sending the otp");
        try {
            const response = await fetch(`http://localhost:5000/email/send-otp/${admin.adminData.Name}/${admin.adminData.Email}/${otp}`);
            if (!response.ok) {
                throw new Error('Couldn\'t send email');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    return (
        <>
            <div className='row otp-page' style={{ height: "100vh" }}>
                <div className="col-4">
                    <Side />
                </div>
                <div className="col-8">
                    <div className="row mt-5">
                        <div className="col-6 shadow-sm card border rounded-5 ms-5 ps-5 pt-5 pb-5">
                            <h1 className="mb-4" style={{ color: '#5522D0' }}>OTP Authentication</h1>
                            <p>An OTP has been sent to "<span style={{ fontWeight: "bold" }}>{admin.adminData.Email}</span>"</p>
                            <div className="row">
                                <div className="col-1"></div>
                                <div className="col-11">
                                    <p>Please enter the OTP below</p>
                                    <form className="center" onSubmit={validate}>
                                        <input
                                            type="text"
                                            className="mb-3 w-75"
                                            value={adminotp}
                                            onChange={e => setotp(e.target.value)}
                                        /><br />
                                        <div className="row">
                                            <div className="col-3"></div>
                                            <div className="col-6">
                                                <button
                                                    type="submit"
                                                    className="btn center white"
                                                    style={{ backgroundColor: '#5522D0', color: "white" }}
                                                >
                                                    Authenticate
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {auth && (
                    <div
                        className="modal fade show"
                        style={{ display: 'block', background: 'rgba(0, 0, 0, 0.8)' }}
                        aria-labelledby="validationModal"
                        aria-modal="true"
                        role="dialog"
                    >
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content dark rounded-4" style={{ backgroundColor: "#e6e0f3", color: "black" }}>
                                <div className="modal-header d-flex justify-content-center">
                                    <div className="logo">
                                        {crct ? (
                                            <LuCheckCircle style={{ fontSize: "4rem", color: "green" }} />
                                        ) : (
                                            <VscError style={{ fontSize: "4rem", color: "red" }} />
                                        )}
                                    </div>
                                </div>
                                <div className="modal-body d-flex justify-content-center fs-4 mb-2">
                                    {crct ? (
                                        <p>OTP authentication successful</p>
                                    ) : (
                                        <p>OTP authentication failed</p>
                                    )}
                                </div>
                                <div className="modal-footer d-flex justify-content-center pt-0 pb-0 mb-3">
                                    
                                    {crct ? 
                                    (
                                        <button type="button" className="btn" onClick={okay} style={{ backgroundColor: "#5522D0", color: "white" }}>
                                            Okay
                                        </button>
                                    )
                                    :
                                    (
                                        <button type="button" className="btn btn-danger" onClick={okay}>
                                            Okay
                                        </button>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default AdminOTP;
