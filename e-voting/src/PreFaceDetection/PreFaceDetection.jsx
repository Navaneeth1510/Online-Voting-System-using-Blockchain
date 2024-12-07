import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Side from "../Side_panel/Side"

function PreFaceDetection(){

    const navigate = useNavigate();
    function okay(){
        navigate('/face-detection');
    }

    return(
        <>
            <div className='row otp-page' style={{ height: "100vh" }}>
                <div className="col-4">
                    <Side />
                </div>
                <div className="col-8">
                    <div className="row mt-5">
                        <div className="col-6 shadow-sm card border rounded-5 ms-4 ps-5 pt-5 pb-5 w-75" style={{height:"75vh"}}>
                            <h1 className="mb-4" style={{ color: '#5522D0' }}>Instructions</h1>
                            <p className="ms-4 fs-6">To ensure accurate and successful face detection, please follow these guidelines:</p>
                            <div className="row justify-content-center d-flex align-items-center">
                                <div className="col-1"></div>
                                <div className="col-11">
                                    <ul className="instruction-list">
                                        <li>Ensure you are in a well-lit area to avoid shadows or overexposure.</li>
                                        <li>Remove any accessories that might cover your face, such as sunglasses, hats, or masks.</li>
                                        <li>Position your face in front of the camera so it is directly aligned with the center.</li>
                                        <li>Maintain a neutral expression and keep your eyes open.</li>
                                        <li>Ensure your face is neither too close nor too far from the camera.</li>
                                        <li>Keep your shoulders visible, but ensure your face occupies the majority of the frame.</li>
                                        <li>Hold still during the detection process to avoid blurriness.</li>
                                        <li>Avoid tilting or rotating your head to either side.</li>
                                        <li>Use a camera with good resolution for better accuracy.</li>
                                        <li>Ensure the camera lens is clean and free from obstructions.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="okay d-flex justify-content-end align-items-end">
                                <div className="">
                                    <button type="button" onClick={()=>okay()} className="btn me-5 w-75" style={{ backgroundColor: "#5522D0", color: "white" }}>
                                        Okay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PreFaceDetection;