import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Header_Logout.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoIosLogOut } from "react-icons/io";

function HeaderLogout({props, user}) {
    const navigate = useNavigate();
    const[showModal,setShowModal] = useState(false);
    function display(){
        setShowModal(true);
    }
    function cancel(){
        setShowModal(false);
    }
    function logout(){
        if(user.isAdmin==undefined){
            props.setVoterData(null);
            props.setConstData(null);
        }
        else{
            props.setAdminData(null);
        }
        navigate('/');
    }
    return (
        <>
            <div className="row hl shadow-sm align-items-center " style={{ height: '100%' }}>
                <div className="col-4 d-flex align-items-center">
                    <img src="src/assets/e-voting-header.png" onClick={()=>logout() } className="img-fluid ms-3 p-2" style={{width:"25%"}}/>
                </div>
                <div className="col-5"></div>
                <div className="col-3 d-flex align-items-center justify-content-end d-flex">
                    <button type="button" onClick={() => display()} className="btn btn-danger me-2 ms-auto" style={{ color: "white"}}>
                        Logout <IoIosLogOut style={{ fontSize: "1.5rem", color: "white" }} />
                    </button>
                </div>
            </div>

            {showModal && (
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
                                    <IoIosLogOut style={{ fontSize: "4rem", color: "red" }} />
                                </div>
                            </div>
                            <div className="modal-body d-flex justify-content-center fs-4 mb-2">
                                <p>Are you sure you want to logout ?</p>
                            </div>
                            <div className="modal-footer d-flex justify-content-evenly pt-0 pb-0 mb-3">
                                <button type="button" className="btn btn-secondary" onClick={()=>cancel()}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={()=>logout()}>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default HeaderLogout;
