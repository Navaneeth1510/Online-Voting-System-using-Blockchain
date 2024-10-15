import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderLogout from '../Header_Logout/Header_Logout';
import { useNavigate } from 'react-router-dom';
import './Constituency.css'
function Constituency({ voter, constituency, setVoterData, setConstData }) {
    const uri = constituency.constituencyPic;
    const navigate = useNavigate();
    function nextbutton(){
        navigate('/voter-details');
    }
    return (
        <>  
            <div className='row mb-0 h-100'>
                <HeaderLogout setVoterData={setVoterData} setConstData={setConstData}/>
            </div>
            <div className='row overflow-hidden const'  style={{height:"92.5vh"}}>
                <div className='col-4 border-end border-dark align-items-center justify-content-center' style={{background:"#e4dcf8"}}>
                    <div className="row h-25"></div>
                    <div className="row h-50">
                        <img src={`src/assets/${uri}`} alt="no image found" className='img-fluid center'/>
                    </div>
                    <div className="row h-25"></div>
                </div>
                <div className='col-8'>
                    <div className="row" style={{height:"20vh"}}>
                        <h1 className="mt-5 ms-5 fs-1" style={{color:"#5522D0"}}>{constituency.Name}</h1>
                    </div>

                    <div className="row" style={{height:"75vh"}}>
                        <div className='row m-5'>
                            <div className='col-1'></div>
                            <div className='col-10'>
                                <h3>{constituency.Details}</h3>
                            </div>
                            <div className='col-1'></div>
                        </div>
                        <div className='row'>
                            <button onClick={()=> nextbutton()} className="mt-5 me-5 fixed-end ms-auto float-end" style={{background:"#5522D0", color:"white", width:"15%", height:"20%"}}>Next</button>
                        </div>
                    </div>

                    {/* <div className="row" >
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default Constituency;
