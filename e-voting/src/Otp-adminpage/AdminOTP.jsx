import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Side from '../Side_panel/Side';
import './AdminOTP.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import otp from '../../otp-gen/otp';


function AdminOTP({admin}){
    const navigate = useNavigate();
    const [adminotp, setotp] = useState("");
    
    useEffect(() => {
        sendotp();
    }, []);


    async function validate(){
        console.log('validating the otp');
        if(adminotp==otp){
            console.log('otp correct');
            navigate('/admin');
        }
    }
    async function sendotp(){
        console.log("Sending the otp");
        try {
            const response = await fetch(`http://localhost:5000/email/send-otp/${admin.Name}/${admin.Email}/${otp}`);
            if (!response.ok) {
                throw new Error('Couldnt send email');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    return (
        <>
            <div className='row otp-page' style={{height:"100vh"}}>
                <div className="col-4">
                    <Side/>
                </div>
                <div className="col-8 ">
                    <div className="row mt-5">
                        <div className="col-6 shadow-sm card border rounded-5 ms-5 ps-5 pt-5 pb-5">
                            <h1 className="mb-4" style={{ color: '#5522D0' }}>OTP Authentication</h1>
                            <p>An OTP has been sent to "<span style={{fontWeight:"bold"}}>{admin.Email}</span>"</p>
                            <div className="row">
                                <div className="col-1"></div>
                                <div className="col-11">
                                    <p>Please enter the OTP below</p>
                                    <form className="center" onSubmit={()=>validate()}>
                                        <input type="text" 
                                            className="mb-3 w-75"
                                            value={adminotp}
                                            onChange={e => {
                                                setotp(e.target.value)
                                            }}
                                        ></input><br/>
                                        <div className="row">
                                            <div className="col-3"></div>
                                            <div className="col-6">
                                                <button type="submit" 
                                                    className="center white" 
                                                    style={{ backgroundColor: '#5522D0', color:"white" }}
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
            </div>
        </>
    )
}

export default AdminOTP;