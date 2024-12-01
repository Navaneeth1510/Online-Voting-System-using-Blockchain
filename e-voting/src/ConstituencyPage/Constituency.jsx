import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderLogout from '../Header_Logout/Header_Logout';
import { useNavigate } from 'react-router-dom';
import './Constituency.css'
function Constituency({ voter, candi }) {
    const uri = voter.constData.constituencyPic;
    console.log(uri);
    const navigate = useNavigate();
    async function nextbutton(){
        try {
            const id = voter.voterData.ConstituencyID;
            console.log(`http://localhost:5000/candi/${voter.voterData.ConstituencyID}`);
            const response = await fetch(`http://localhost:5000/candi/${voter.voterData.ConstituencyID}`);
            if (!response.ok) {
                throw new Error('Candidates not found');
            }
            const data = await response.json();
            candi.setCandiData(data);
            navigate('/voter-details');
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
    return (
        <>  
            <div className='row mb-0 h-100'>
                <HeaderLogout props={voter} user={voter.voterData}/>
            </div>
            <div className='row overflow-hidden const'  style={{height:"auto"}}>
                <div className='col-4 border-end border-dark align-items-center justify-content-center' style={{background:"#e4dcf8"}}>
                    <div className="row h-25"></div>
                    <div className="row h-50">
                        <img src={`src/assets/${uri}`} alt="no image found" className='img-fluid center'/>
                    </div>
                    <div className="row h-25"></div>
                </div>
                <div className='col-8'>
                    <div className="row" style={{height:"20vh"}}>
                        <h1 className="mt-5 ms-5 fs-1" style={{color:"#5522D0"}}>{voter.constData.Name}</h1>
                    </div>

                    <div className="row" style={{height:"75vh"}}>
                        <div className='row m-5'>
                            <div className='col-1'></div>
                            <div className='col-10'>
                                <h4>{voter.constData.Details}</h4>
                            </div>
                            <div className='col-1'></div>
                        </div>
                        <div className='row mb-0 text-center' style={{height:"20vh"}}>
                            <button className="btn mt-1 h-25 text-center mt-5 me-5 ms-auto float-end d-flex justify-content-center align-items-center" onClick={()=>nextbutton()} style={{background:"#5522D0", color:"white", width:"15%", height:"20%"}}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Constituency;
