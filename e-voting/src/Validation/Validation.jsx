import React from 'react';
import HeaderLogout from '../Header_Logout/Header_Logout';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'
import AdminSide from '../Admin-side/AdminPanel';

function Validation({admin}) {
    const navigate = useNavigate();

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
                            <button  className="btn" style={{ backgroundColor: '#6f42c1', color: 'white', width:"10%" }}>
                                Validate
                            </button>
                        </div>
                    </div>

                   
                    <div className="col-4">
                        <AdminSide  admin={admin}/>
                    </div>
                </div>
        </>
    );
}

export default Validation;