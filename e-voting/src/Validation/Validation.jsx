import React from 'react';
import { useState } from 'react';
import HeaderLogout from '../Header_Logout/Header_Logout';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'
import { LuCheckCircle } from "react-icons/lu";
import { VscError } from "react-icons/vsc";
import AdminSide from '../Admin-side/AdminPanel';

function Validation({admin}) {
    const navigate = useNavigate();

    const[validate, setValidate] = useState(false);
    const[valid, setValid] = useState(true);

    async function validateBlockchain(){
        console.log("validating the blockchain");
        try {
            const response = await fetch(`http://localhost:5000/blockchain/validate`);
            if (!response.ok) {
                throw new Error('couldnt fetch details');
            }
            const data = await response.json();
            console.log(data);
            setValidate(true);
            if(data["is_valid"]==false){
                setValid(false);
            }

        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    async function restoreBlockchain(){
        console.log("restoring the blockchain");
        try {
            const response = await fetch(`http://localhost:5000/blockchain/restore`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('couldnt fetch details');
            }
            const data = await response.json();
            console.log(data);
            console.log("validating the blockchain");
            try {
                const response = await fetch(`http://localhost:5000/blockchain/validate`);
                if (!response.ok) {
                    throw new Error('couldnt fetch details');
                }
                const data = await response.json();
                console.log(data);
                setValidate(false);
                if(data["is_valid"]==true){
                    setValid(true);
                }

            } catch (error) {
                console.error('Error:', error.message);
            }
            handleCloseModal();

        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    function handleCloseModal() {
        setValidate(false); 
    }
    function backtoHome(){
        navigate('/admin');
    }

    return (
        <>
            <HeaderLogout props={admin} user={admin.adminData} />
            <div className="row"> 
                <div className="col-8 border-bottom align-items-center ">
                    <div className="container-fluid"> 
                        <div className="row d-flex align-items-center">
                            <div className="col-9">
                                <button className="btn btn-lg d-flex align-items-center" onClick={() => backtoHome()} >
                                    <FaHome className="me-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="body d-flex justify-content-center">
                        <div className="bg-light border rounded-4 p-4 border-secondary mt-5" style={{width:"75%"}}>
                            <h2 className="display-6 fw-bold" style={{ color: '#6f42c1' }}>
                                Instructions & Guidelines
                            </h2>
                            
                            <ul className="fs-5">
                                <li>To check the validity of the blockchain, please click the button below.</li>
                                <li>Blockchain verification might take some time depending on the size of the chain. Please be patient while the process completes.</li>
                                <li>Double-check that the system is not being accessed from an insecure network or device during validation.</li>
                                <li>If the blockchain is invalid, the system will restore a backup, and the voting process may require revalidation from some users.</li>
                                <li>Once the process is complete, you will be notified of the result.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="d-flex mt-3 p-4 justify-content-end">
                        <button  className="btn" style={{ backgroundColor: '#6f42c1', color: 'white', width:"10%" }}
                            onClick={()=>validateBlockchain()}>
                            Validate
                        </button>
                    </div>
                </div>

                
                <div className="col-4">
                    <AdminSide  admin={admin}/>
                </div>

                {validate && (
                    <div
                        className="modal fade show"
                        style={{display: 'block',background: 'rgba(0, 0, 0, 0.8)'}}
                        aria-labelledby="validationModal"
                        aria-modal="true"
                        role="dialog" >
                        <div className="modal-dialog modal-dialog-centered " role="document">
                            <div className="modal-content dark rounded-4" style={{backgroundColor:"#e6e0f3", color:"black"}}>
                                <div className="modal-header d-flex justify-content-center">
                                    <div className="logo">
                                        {valid ?
                                        (
                                            <LuCheckCircle style={{ fontSize: "4rem", color: "green" }} /> 
                                        ) 
                                        :
                                        (
                                            <VscError style={{ fontSize: "4rem", color: "red" }} />
                                        )
                                        }
                                    </div>
                                </div>
                                <div className="modal-body d-flex justify-content-center fs-4 mb-2">
                                    {valid ?
                                    (
                                        <p>The blockchain is valid</p>
                                    ) 
                                    :
                                    (
                                        <p>There's a problem in blockchain validity</p>
                                    )
                                    }
                                </div>
                                <div className="modal-footer d-flex justify-content-center pt-0 pb-0 mb-3">
                                    {valid ?
                                    (
                                        <button type="button" className="btn btn-primary" onClick={handleCloseModal}>
                                        Okay
                                        </button>
                                    )
                                    :
                                    (
                                        <button type="button" className="btn btn-danger" onClick={()=>restoreBlockchain()}>
                                        Restore
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

export default Validation;