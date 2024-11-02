import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import HeaderLogout from '../Header_Logout/Header_Logout';
import AdminSide from '../Admin-side/AdminPanel';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function ScheduleElection({ admin }) {
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ uniqueId, password, date, startTime, endTime });
    };

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
                                <Form onSubmit={handleSubmit}>

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
                                        <button className="btn mt-4 mb-0" style={{ backgroundColor: '#6f42c1', color: 'white', width: "30%" }}>
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
        </div>
    );
};

export default ScheduleElection;