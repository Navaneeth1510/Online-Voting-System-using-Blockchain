import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
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

    // Initialize the camera
    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
                videoRef.current.onplaying = () => setVideoReady(true);
            } catch (error) {
                console.error("Error accessing camera:", error);
            }
        };

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

        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (videoReady) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL("image/png");

            setCapturedImage(imageData);
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
                console.error("No face detected in the database image.");
                return;
            }

            const dbDescriptor = dbDetection.descriptor;

            // Load and process the captured image
            const capturedImg = await faceapi.fetchImage(capturedImage);
            const capturedDetection = await faceapi.detectSingleFace(capturedImg).withFaceLandmarks().withFaceDescriptor();
            if (!capturedDetection) {
                console.error("No face detected in the captured image.");
                return;
            }

            const capturedDescriptor = capturedDetection.descriptor;

            // Compare descriptors
            const distance = faceapi.euclideanDistance(dbDescriptor, capturedDescriptor);
            const isMatch = distance < 0.6; // Threshold for face similarity
            setMatchResult(isMatch ? "Match Found" : "No Match");
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
                        <div className="col-6 shadow-sm card border rounded-5 ms-4 ps-5 pt-5 pb-5 w-75" style={{ height: "90vh" }}>
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
                                        <img src={capturedImage} alt="Captured Face" style={{ width: "100%", height: "100%" }} />
                                    ) : (
                                        <>
                                            <canvas ref={canvasRef} style={{ width: "0%" }} />
                                            <video ref={videoRef} autoPlay style={{ width: "100%", height: "100%" }} />
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="row mt-5 justify-content-center d-flex align-items-center">
                                <button
                                    type="button"
                                    onClick={captureImage}
                                    className="btn video-feed"
                                    style={{ backgroundColor: "#5522D0", color: "white" }}
                                    disabled={!modelsLoaded || capturedImage != null}
                                >
                                    Capture
                                </button>
                            </div>
                            {matchResult && (
                                <div className="row mt-3 justify-content-center d-flex align-items-center">
                                    <p>{matchResult}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FaceDetection;