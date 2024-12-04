import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import HeaderLogout from '../Header_Logout/Header_Logout';

function AdminMainPage({ admin }) {
    const navigate = useNavigate();

    function goToAdminPage() {
        navigate('/Admin');
    }

    const { Name, adminID, Email, DOB, Address } = admin.adminData || {};

    return (
        <div className="min-vh-100 bg-light">
            <div className="header">
                <HeaderLogout props={admin} user={admin.adminData} />
            </div>

            <div className="container py-5">
                <div className="row justify-content-center">

                    <div className="col-12 col-md-12 col-lg-10">
                        <h2 className="mb-4" style={{ color: '#6f42c1' }}>
                            Welcome, <br />{Name}
                        </h2>

                        <div className="position-relative">
                            <div className="card border-2 rounded-5 border-purple " style={{ backgroundColor: '#e6e0f3', borderWidth: '2px' }}>
                                <div className="card-body p-5">
                                    <div className="position-absolute" style={{ top: '-60px', right: '-60px' }}>
                                        <img
                                            src={`src/assets/Candidates/${admin.adminData.AdminPic}`}
                                            className="rounded-circle border border-dark"
                                            style={{ width: '130px', height: '130px' }}
                                            alt={`src/assets/Candidates/${admin.adminData.AdminPic}`}
                                        />
                                    </div>

                                    <h2 className="display-6 fw-bold text-center mb-4" style={{ color: '#6f42c1' }}>
                                        Admin ID: {adminID}
                                    </h2>


                                    <hr className="border-2 border-purple mb-4" />

                                    <ul className="list-unstyled fs-5">
                                        <li className="mb-2"><strong>Name:</strong> {Name}</li>
                                        <li className="mb-2"><strong>Email:</strong> {Email}</li>
                                        <li className="mb-2"><strong>Date of Birth:</strong> {DOB}</li>
                                        <li className="mb-2"><strong>Address:</strong> {Address}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                            <button
                                className="btn btn-purple text-white"
                                style={{ backgroundColor: '#6f42c1', borderColor: '#6f42c1', width: '15%' }}
                                onClick={goToAdminPage}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminMainPage;