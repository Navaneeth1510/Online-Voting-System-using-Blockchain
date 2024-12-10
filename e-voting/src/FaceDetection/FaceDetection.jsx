import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FaHome, FaEye, FaEyeSlash } from 'react-icons/fa';
import { LuCheckCircle } from "react-icons/lu";
import { VscError } from "react-icons/vsc";
import * as faceapi from 'face-api.js';
import Side from "../Side_panel/Side";

function FaceDetection({ voter }) {
    const navigate = useNavigate();

    const [imageSrc, setImageSrc] = useState("");
    const imageUrl = voter.voterData.VoterPic;
    const [capturedImage, setCapturedImage] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [videoReady, setVideoReady] = useState(false);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [matchResult, setMatchResult] = useState(null);
    const [noface, setnoface] = useState(false);

    // Load face-api.js models
    useEffect(() => {
        const loadModels = async () => {
            try {
                const modelPath = '/models'; // Ensure models are located at /public/models
                await Promise.all([
                    faceapi.nets.ssdMobilenetv1.loadFromUri(modelPath),
                    faceapi.nets.faceLandmark68Net.loadFromUri(modelPath),
                    faceapi.nets.faceRecognitionNet.loadFromUri(modelPath),
                ]);
                setModelsLoaded(true);
                console.log("Face-api.js models loaded successfully.");
            } catch (error) {
                console.error("Error loading models:", error);
            }
        };
        loadModels();
    }, []);

    // Fetch image from the provided URL
    useEffect(() => {
        if (imageUrl) {
            fetchImage(imageUrl);
        }
    }, [imageUrl]);

    function reset(){
        setCapturedImage(null);
        setMatchResult(null);
        startCamera();
    }

    function redokay(){
        setMatchResult(null);
        setCapturedImage(null);
        startCamera();
    }

    function okay(){
        navigate('/constituency');
    }
    const fetchImage = async (url) => {
        try {
            console.log("Fetching image from URL:", url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch the image");
            }
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            setImageSrc(objectUrl);
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    };

    async function startCamera () {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            videoRef.current.onplaying = () => setVideoReady(true);
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };

    // Initialize the camera
    useEffect(() => {
        startCamera();

        return () => {
            const stream = videoRef.current?.srcObject;
            const tracks = stream?.getTracks();
            tracks?.forEach((track) => track.stop());
        };
    }, []);

    // Capture image from the video feed
    const captureImage = async () => {
        if (!modelsLoaded) {
            console.error("Models are not loaded yet");
            return;
        }

        console.log('inside')
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (videoReady) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL("image/png");

            setCapturedImage(imageData);

            const stream = video.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());

            await compareFaces(imageData);
        }
    };

    // Compare the captured face with the database face
    const compareFaces = async (capturedImage) => {
        if (!modelsLoaded) {

            console.error("Models are not loaded yet");
            return;
        }

        try {
            // Load and process the database image
            const dbImage = await faceapi.fetchImage(imageSrc);
            const dbDetection = await faceapi.detectSingleFace(dbImage).withFaceLandmarks().withFaceDescriptor();
            if (!dbDetection) {
                setnoface(true);
                console.error("No face detected in the database image.");
                return;
            }

            const dbDescriptor = dbDetection.descriptor;

            // Load and process the captured image
            const capturedImg = await faceapi.fetchImage(capturedImage);
            const capturedDetection = await faceapi.detectSingleFace(capturedImg).withFaceLandmarks().withFaceDescriptor();
            if (!capturedDetection) {
                setnoface(true);
                reset();
                console.error("No face detected in the captured image.");
                return;
            }

            const capturedDescriptor = capturedDetection.descriptor;

            // Compare descriptors
            const distance = faceapi.euclideanDistance(dbDescriptor, capturedDescriptor);
            const isMatch = distance < 0.4;
            setMatchResult(isMatch ? "true" : "false");
        } catch (error) {
            console.error("Error during face comparison:", error);
        }
    };

    return (
        <>
            <div className='row otp-page' style={{ height: "100vh" }}>
                <div className="col-4">
                    <Side />
                </div>
                <div className="col-8">
                    <div className="row mt-5">
                        <div className="col-6 shadow-sm card border rounded-5 ms-4 ps-5 pt-5 pb-5 w-75" style={{ height: "80vh" }}>
                            <h1 className="mb-4" style={{ color: '#5522D0' }}>Face Detection</h1>
                            <div className="row justify-content-center d-flex align-items-center">
                                <div className="col-3 border-4 border border-dark d-flex flex-column jutify-content-center align-items-center" style={{ width: "30%", height: "100%" }}>
                                    <img src={imageSrc} alt="Database Face" style={{ width: "80%" }} />
                                </div>
                                <div className="col-1 d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
                                    <div className="border border-1 border-dark" style={{ height: "80%" }} />
                                </div>
                                <div className="col-3 border border-4 border-dark d-flex flex-column jutify-content-center align-items-center" style={{ width: "30%", height: "100%" }}>
                                    {capturedImage ? (
                                        <div className="d-flex mt-4 justify-content-center align-items-center">
                                            <img src={capturedImage} style={{ width: "100%", height: "100%" }}></img>
                                        </div>
                                    ) : (
                                        <>
                                                <canvas ref={canvasRef} style={{ width: "0%" }} />
                                                <video ref={videoRef} autoPlay style={{ width: "100%", height: "100%" }} />
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="row mt-5 justify-content-center d-flex align-items-center">
                                <div className="d-flex justify-content-center align-items-center">
                                    <button type="button" onClick={() => captureImage()} className="btn video-feed" style={{ backgroundColor: "#5522D0", color: "white" }} disabled={!modelsLoaded || capturedImage != null}>
                                        Capture
                                    </button>
                                    {capturedImage!=null &&
                                        <button type="button" onClick={() => reset()} className="btn ms-5 btn-success video-feed" style={{  color: "white" }}>
                                            Reset
                                        </button>
                                    }
                                </div>
                            </div>
                            {(capturedImage != null && matchResult == null)&&
                                <div className="row mt-5 justify-content-center d-flex align-items-center">
                                    <div className="d-flex justify-content-center align-items-center flex-column">
                                        <FontAwesomeIcon icon={faSpinner} spin style={{fontSize:"1.5rem"}}/>
                                        <div className="">
                                            Processing the image
                                        </div>
                                        <div className="">
                                            This might take some time
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {(noface && !matchResult) &&(
                    <div className="modal fade show d-block" style={{ background: 'rgba(0, 0, 0, 0.8)' }} aria-labelledby="validationModal" aria-modal="true" role="dialog" >
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content dark rounded-4" style={{ backgroundColor: "#e6e0f3", color: "black" }}>
                                <div className="modal-header d-flex justify-content-center">
                                    <div className="logo">
                                        <VscError style={{ fontSize: "4rem", color: "red" }} />
                                    </div>
                                </div>
                                <div className="modal-body d-flex justify-content-center fs-4 mb-2">
                                    <p>No face detected!</p>
                                </div>
                                <div className="modal-footer d-flex justify-content-center pt-0 pb-0 mb-3">
                                    <button type="button" className="btn btn-danger" onClick={() => setnoface(false)} >
                                        Okay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {(!noface && matchResult) && (
                    <div
                        className="modal fade show d-block" // Ensure modal is visible
                        style={{ background: 'rgba(0, 0, 0, 0.8)' }}
                        aria-labelledby="validationModal"
                        aria-modal="true"
                        role="dialog"
                    >
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content dark rounded-4" style={{ backgroundColor: "#e6e0f3", color: "black" }}>
                                <div className="modal-header d-flex justify-content-center">
                                    {matchResult=="true" ?
                                        (
                                            <div className="logo">
                                                <LuCheckCircle style={{ fontSize: "4rem", color: "green" }} />
                                            </div>
                                        )
                                        :
                                        (
                                            <div className="logo">
                                                <VscError style={{ fontSize: "4rem", color: "red" }} />                                           
                                            </div>
                                        )
                                    }                                    
                                </div>
                                <div className="modal-body d-flex justify-content-center fs-4 mb-2">
                                    {matchResult=="true" ?
                                        (
                                            <div className="logo">
                                                <p>Face Matched Successfully!</p>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className="logo">
                                                <p>Face Did Not Match!</p>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="modal-footer d-flex justify-content-center pt-0 pb-0 mb-3">
                                {matchResult=="true" ?
                                        (
                                            <button type="button" className="btn" onClick={() => okay()} style={{ backgroundColor: "#5522D0", color: "white" }}>
                                                Okay
                                            </button>
                                        )
                                        :
                                        (
                                            <button type="button" className="btn btn-danger" onClick={() => redokay()}>
                                                Okay
                                            </button>
                                        )
                                    }                 
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        </>
    );
}

export default FaceDetection;