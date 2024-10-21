import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderLogout from '../Header_Logout/Header_Logout';
import { useNavigate } from 'react-router-dom';
function VoterDetails({ voter, admin }) {
    return (
        <>  
            <div className='row mb-0'>
                <HeaderLogout props={voter} user={voter.voterData}/>
            </div>
            
        </>
    );
}

export default VoterDetails;
