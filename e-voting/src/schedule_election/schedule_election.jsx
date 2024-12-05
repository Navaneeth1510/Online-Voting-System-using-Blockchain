import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import HeaderLogout from '../Header_Logout/Header_Logout';
import AdminSide from '../Admin-side/AdminPanel';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { LuCheckCircle } from "react-icons/lu";
import { MdErrorOutline } from "react-icons/md";

function ScheduleElection({ admin }) {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [filled, setFilled] = useState(false);
    const[success, setSuccess] = useState(true);
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setFilled(true);
        const startDateTime = new Date(`${date}T${startTime}`);
        const endDateTime = new Date(`${date}T${endTime}`);
        const now = new Date();

        if (!date || !startTime || !endTime) {
            setError("All fields are required!");
            setSuccess(false);
            return;
        }
        else if (startDateTime <= now) {
            setError("Start time must be in the future!");
            setSuccess(false);
            return;
        }
        else if (endDateTime <= startDateTime) {
            setError("End time must be after the start time!");
            setSuccess(false);
            return;
        }
        else{
            const timing = {
                "startTime":startDateTime,
                "endTime":endDateTime,
            }
            try {
                const validateResponse = await fetch('http://localhost:5000/time/schedule', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',  
                    },
                    body: JSON.stringify(timing),
                });               
                if(validateResponse.ok){
                    setSuccess(true);
                }
                else{
                    setError("Couldnt store the schedule.")
                    setSuccess(false);
                }
                
            }
            catch (error) {
                setSuccess(false);
                console.error('Error validating blockchain:', error.message);
            }
        }
    };
    function close(){
        setFilled(false);
    }
    function backtoHome() {
        navigate('/admin');
    }

    return (
        <div>
            <HeaderLogout props={admin} user={admin.adminData} />
            <Row>
                <Col md={8}>
                    <div className="col-9">
                        <button className="btn btn-lg d-flex align-items-center" onClick={() => backtoHome()} >
                            <FaHome className="me-2" />
                        </button>
                    </div>
                    <Row>
                        <Col md={3}>

                        </Col>
                        <Col md={6}>
                            <div className="form-container border border-dark rounded-5 mt-5" style={{ padding: '40px', backgroundColor: "#E2F0D9" }}>
                                <h3>Schedule an election</h3>
                                <Form>

                                    <Form.Group controlId="formDate">
                                        <Form.Label>Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formStartTime">
                                        <Form.Label>Start Time</Form.Label>
                                        <Form.Control
                                            type="time"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEndTime">
                                        <Form.Label>End Time</Form.Label>
                                        <Form.Control
                                            type="time"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <div className="d-flex justify-content-center">
                                        <button type="button" className="btn mt-4 mb-0" style={{ backgroundColor: '#6f42c1', color: 'white', width: "30%" }} onClick={(e)=>handleSubmit(e)}>
                                            Schedule
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                        <Col md={3}>
                        </Col>

                    </Row>

                </Col>
                <Col md={4}>
                    <AdminSide admin={admin} />
                </Col>
            </Row>
            {filled &&(        
                <div
                    className="modal fade show"
                    style={{display: 'block', background: 'rgba(0, 0, 0, 0.8)'}}
                    aria-labelledby="validationModal"
                    aria-modal="true"
                    role="dialog"
                >
                    <div className="modal-dialog modal-dialog-centered " role="document">
                        <div className="modal-content dark rounded-4" style={{backgroundColor:"#e6e0f3", color:"black"}}>
                            <div className="modal-header d-flex justify-content-center">
                                <div className="logo">
                                    {success?
                                    (
                                        <LuCheckCircle style={{ fontSize: "4rem", color: "green" }} />                                           
                                    ):
                                    (
                                        <MdErrorOutline style={{ fontSize: "4rem", color: "red" }} />
                                    )
                                    }                                        
                                </div>
                            </div>
                            <div className="modal-body d-flex justify-content-center fs-4 mb-2 text-center">
                                {success?
                                (
                                    <p>Scheduled</p>
                                ):
                                (
                                    <p>{error}</p>
                                )
                                }
                            </div>
                            <div className="modal-footer d-flex justify-content-center pt-0 pb-0 mb-3">
                                {success?
                                (
                                    <button type="button" className="btn" onClick={()=>backtoHome()} style={{ backgroundColor: "#5522D0", color: "white" }}>
                                    Great
                                    </button>
                                ):
                                (
                                    <button type="button" className="btn btn-danger" onClick={()=>close()}>
                                    Okay
                                    </button>
                                )
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScheduleElection;