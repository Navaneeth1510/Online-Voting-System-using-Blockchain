import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Side from "../Side_panel/Side";

function FaceDetection({ voter }) {

    const navigate = useNavigate();

    const [imageSrc, setImageSrc] = useState("");
    const imageUrl = voter.voterData.VoterPic;
    const [capturedImage, setCapturedImage] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        if (imageUrl) {
            fetchImage(imageUrl);
        }
    }, [imageUrl]);

    const fetchImage = async (url) => {
        try {
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

    function reset(){
        setCapturedImage(null);
        startCamera();
    }

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            videoRef.current.onplaying = () => setVideoReady(true);
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };

    useEffect(() => {
        startCamera();

        return () => {
            const stream = videoRef.current?.srcObject;
            const tracks = stream?.getTracks();
            tracks?.forEach((track) => track.stop());
        };
    }, []);

    const captureImage = () => {
        console.log('inside')
        const canvas = canvasRef.current;
        const video = videoRef.current;

        if (videoReady) {
            console.log('inside func'); // This should now be printed
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL("image/png");

            // Update the capturedImage state asynchronously
            setCapturedImage(imageData);

            // Stop the video stream
            const stream = video.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
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
                                    <img src={imageSrc} alt="" style={{ width: "80%" }} />
                                </div>
                                <div className="col-1 d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
                                    <div className="border border-1 border-dark" style={{ height: "80%" }} />
                                </div>
                                <div className="col-3 border border-4 border-dark d-flex flex-column jutify-content-center align-items-center" style={{ width: "30%", height: "100%" }}>
                                    {capturedImage ?
                                        (
                                            <div className="d-flex mt-4 justify-content-center align-items-center">
                                                <img src={capturedImage} style={{ width: "100%", height: "100%" }}></img>
                                            </div>
                                        )
                                        :
                                        (
                                            <>
                                                <canvas ref={canvasRef} style={{ width: "0%" }} />
                                                <video ref={videoRef} autoPlay style={{ width: "100%", height: "100%" }} />
                                            </>
                                        )}
                                </div>
                            </div>
                            <div className="row mt-5 justify-content-center d-flex align-items-center">
                                <div className="d-flex justify-content-center align-items-center">
                                    <button type="button" onClick={() => captureImage()} className="btn video-feed" style={{ backgroundColor: "#5522D0", color: "white" }} disabled={capturedImage != null}>
                                        Capture
                                    </button>
                                    {capturedImage!=null &&
                                        <button type="button" onClick={() => reset()} className="btn ms-5 btn-success video-feed" style={{  color: "white" }}>
                                            Reset
                                        </button>
                                    }
                                </div>
                            </div>
                            {capturedImage != null &&
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
            </div>
        </>
    );
}

export default FaceDetection;