import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import HeaderLogout from '../Header_Logout/Header_Logout';
import { MdErrorOutline } from "react-icons/md";

function VoterMainPage({ voter }) {
    const navigate = useNavigate();
    const [agreed, setAgreed] = useState(false);
    const [restrict, setRestrict] = useState(false);  // Changed to setRestrict for clarity
    const [showModal, setShowModal] = useState(false); 
    const status = voter.status;

    function goToVotingPage() {
        const status = voter.voterData["Status"];
        console.log(status);
        if (agreed && status===1) {  
            setRestrict(true);
        }
        else if (agreed && status==0){
            navigate('/voting');
        } 
        else {
            setShowModal(true);  // Show terms & conditions modal
        }
    }

    function handleCloseModal() {
        setShowModal(false);  // Close the terms & conditions modal
        setRestrict(false);   // Close the restrict modal
    }

    const { Name, voterID, Email, DOB, Address } = voter.voterData || {};

    return (
        <div className="min-vh-100 bg-light">
            <div className="header">
                <HeaderLogout props={voter} user={voter.voterData} />
            </div>

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-12 col-lg-10">
                        <h2 className="mb-4" style={{ color: '#6f42c1' }}>
                            Welcome, <br /><p className='fs-1'>{Name}</p>
                        </h2>

                        <div className="position-relative">
                            <div className="card border-2 border-purple" style={{ backgroundColor: '#e6e0f3', borderWidth: '2px' }}>
                                <div className="card-body p-5">
                                    <div className="position-absolute" style={{ top: '-60px', right: '-60px' }}>
                                        <img
                                            src="/src/assets/nami.png"
                                            className="rounded-circle"
                                            style={{ width: '130px', height: '130px' }}
                                            alt="Voter"
                                        />
                                    </div>

                                    <h2 className="display-6 fw-bold text-center mb-5 mt-0" style={{ color: '#6f42c1' }}>
                                        Voter ID: {voterID}
                                    </h2>

                                    <hr className="border-2 border-purple mb-4" style={{ borderColor: '#6f42c1' }} />

                                    <ul className="list-unstyled fs-5">
                                        <li className="mb-2"><strong>Name:</strong> {Name}</li>
                                        <li className="mb-2"><strong>Email:</strong> {Email}</li>
                                        <li className="mb-2"><strong>Date of Birth:</strong> {new Date(DOB).toLocaleDateString()}</li>
                                        <li className="mb-2"><strong>Address:</strong> {Address}</li>
                                        <li className="mb-2"><strong>Status: </strong>
                                            {voter.voterData["Status"]==0 ?
                                                (
                                                    <span>Not yet voted.</span>
                                                )
                                                :
                                                (
                                                    <span>Already voted.</span>
                                                )
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        id="agree"
                                        checked={agreed}
                                        onChange={(e) => {
                                            setAgreed(e.target.checked);
                                            setShowModal(false);  // Reset modal visibility when checkbox is checked
                                        }}
                                        className="form-check-input"
                                        style={{ borderColor: '#6f42c1' }}
                                    />
                                    <label htmlFor="agree" className="form-check-label">
                                        I agree to terms and conditions
                                    </label>
                                </div>

                                <button
                                    className="btn btn-primary"
                                    style={{ backgroundColor: '#6f42c1', borderColor: '#6f42c1', width: '15%' }}
                                    onClick={goToVotingPage}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for terms & conditions */}
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
                                    <MdErrorOutline style={{ fontSize: "4rem", color: "red" }} />
                                </div>
                            </div>
                            <div className="modal-body d-flex justify-content-center fs-4 mb-2">
                                <p>You must agree to the terms & conditions</p>
                            </div>
                            <div className="modal-footer d-flex justify-content-center pt-0 pb-0 mb-3">
                                <button type="button" className="btn btn-danger" onClick={handleCloseModal}>
                                    Okay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for restrict (already voted) */}
            {restrict && (
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
                                    <MdErrorOutline style={{ fontSize: "4rem", color: "red" }} />
                                </div>
                            </div>
                            <div className="modal-body d-flex justify-content-center fs-4 mb-2">
                                <p>You have already cast your vote</p>
                            </div>
                            <div className="modal-footer d-flex justify-content-center pt-0 pb-0 mb-3">
                                <button type="button" className="btn btn-danger" onClick={handleCloseModal}>
                                    Okay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VoterMainPage;
