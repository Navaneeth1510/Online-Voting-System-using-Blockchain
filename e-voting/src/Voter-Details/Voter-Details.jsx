import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderLogout from '../Header_Logout/Header_Logout';
import { useNavigate } from 'react-router-dom';
function VoterDetails({ props }) {
    return (
        <>  
            <div className='row mb-0'>
                <HeaderLogout props={props} user={props.voterData}/>
            </div>
            
        </>
    );
}

export default VoterDetails;
