import React from 'react';
import HeaderLogout from '../Header_Logout/Header_Logout';
import AdminSide from '../Admin-side/AdminPanel'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css'

function AdminPage({ props }) {
    return (
        <div className="container-fluid p-0">
            <HeaderLogout props={props} />
            <div className="row admin-row" style={{ height: '100vh' }}>
                <div className="col-8">
                    <div className="row" style={{ height: '100vh' }}>
                        <div className="col-3"></div>
                        <div className="col-2 mt-5">
                            <div className="row h-75 mt-5">
                                <button className="control btn btn-lg text-white h-25 mt-5" style={{ backgroundColor: '#436fb5', width: '100%'}}>
                                    ELECTION CONTROL
                                </button>
                                <button className="control btn btn-lg btn-block text-white h-25" style={{ backgroundColor: '#436fb5', width: '100%'}}>
                                    STATISTICS
                                </button>
                            </div>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-2 mt-5">
                            <div className="row h-75 mt-5">
                                <button className="control btn btn-lg btn-block text-white h-25 mt-5" style={{ backgroundColor: '#436fb5', width: '100%'}}>
                                    VALIDATION
                                </button>
                                <button className="control btn btn-lg btn-block text-white h-25" style={{ backgroundColor: '#436fb5', width: '100%'}}>
                                    VOTES
                                </button>
                            </div>
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>                
                <div className="col-4">
                    <AdminSide props={props} />
                </div>
            </div>
        </div>
    );
}

export default AdminPage;