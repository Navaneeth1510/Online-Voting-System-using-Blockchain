import Header from "../Header/Header"
import Side from "../Side_panel/Side"
import './Login.css'
import { useState } from 'react';



function Login() {

    const [VoterID, setnewVID] = useState("");
    const [VoterPass, setnewVP] = useState("");

    const [AdminID, setnewAID] = useState("");
    const [AdminPass, setnewAP] = useState("");

    return (
      <>
        <div className="row"  style={{height:"100vh"}}>
            <div className="col-4">
                <Side/>
            </div>
            <div className="col-8">
                <div className="row">
                    <div className="col-1">
                    </div>
                    <div className="col-10" style={{height:"100vh"}}>
                    <div className="h-50 border-bottom border-2 border-dark">
                            <div className="h-25 pt-4">
                                <h1 className="fs-1" style={{color:'#5522D0'}}>Voter</h1>
                            </div>
                            <div className="rounded-4 border border-3 border-dark" style={{background:"#E2F0D9", height:"60%"}}>
                                <div className="d-flex p-5 h-75">
                                    <div className="w-50">
                                        <label htmlFor="Email Id" className="fs-4 mb-3">Voter ID</label><br/>
                                        <input 
                                            type="text" 
                                            className="w-75 border border-2 border-dark"  
                                            style={{backgroundColor:'#e4dcf8'}}
                                            value={VoterID}
                                            onChange={e=>{
                                                setnewVID(e.target.value)
                                              }}
                                        />
                                    </div>
                                    <div className="w-50">
                                        <label htmlFor="Password" className="fs-4 mb-3">Password</label><br/>
                                        <input 
                                            type="text" 
                                            className="w-75 border border-2 border-dark"  
                                            style={{backgroundColor:'#e4dcf8'}}
                                            value={VoterPass}
                                            onChange={e=>{
                                                setnewVP(e.target.value)
                                              }}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-5 align-middle">
                                    <div className="col-1"></div>
                                    <div className="col-10 position-relative align-middle">
                                        <button className="position-absolute end-0 text-white fs-5 w-25 rounded text-white"  style={{backgroundColor:'#5522D0'}}>Login</button>
                                    </div>
                                    <div className="col-1"></div>
                                </div>
                            </div>
                        </div>
                        <div className="h-50">
                            <div className="h-25 pt-4">
                                <h1 className="fs-1" style={{color:'#5522D0'}}>Admin</h1>
                            </div>
                            <div className="rounded-4 border border-3 border-dark" style={{background:"#E2F0D9", height:"60%"}}>
                                <div className="d-flex p-5 h-75">
                                    <div className="w-50">
                                        <label htmlFor="Email Id" className="fs-4 mb-3">Unique ID</label><br/>
                                        <input 
                                            type="text" 
                                            className="w-75 border border-2 border-dark"  
                                            style={{backgroundColor:'#e4dcf8'}}
                                            value={AdminID}
                                            onChange={e=>{
                                                setnewAID(e.target.value)
                                              }}
                                        />
                                    </div>
                                    <div className="w-50">
                                        <label htmlFor="Password" className="fs-4 mb-3">Password</label><br/>
                                        <input 
                                            type="text" 
                                            className="w-75 border border-2 border-dark"  
                                            style={{backgroundColor:'#e4dcf8'}}
                                            value={AdminPass}
                                            onChange={e=>{
                                                setnewAP(e.target.value)
                                              }}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-5 align-middle">
                                    <div className="col-1"></div>
                                    <div className="col-10 position-relative align-middle">
                                        <button className="position-absolute end-0 text-white fs-5 w-25 rounded text-white"  style={{backgroundColor:'#5522D0'}}>Login</button>
                                    </div>
                                    <div className="col-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1">                        
                    </div>
                </div>
            </div>
        </div>
      </>
    )
  }
  
  export default Login