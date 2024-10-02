import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderLogout from '../Header_Logout/Header_Logout';
import { useNavigate } from 'react-router-dom';
function VoterDetails({ voter, constituency, setVoterData, setConstData }) {
    return (
        <>  
            <div className='row mb-0'>
                <HeaderLogout setVoterData={setVoterData} setConstData={setConstData}/>
            </div>
            
        </>
    );
}

export default VoterDetails;
