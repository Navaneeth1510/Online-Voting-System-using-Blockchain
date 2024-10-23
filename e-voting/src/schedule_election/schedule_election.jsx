import React, { useState } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import HeaderLogout from '../Header_Logout/Header_Logout';
import AdminSide from '../Admin-side/AdminPanel';

const ScheduleElection = ({admin}) => {
    // State variables for form inputs
    // const [uniqueId, setUniqueId] = useState('');
    // const [password, setPassword] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log({ uniqueId, password, date, startTime, endTime });
        // You can further process or validate the data here.
    };

    return (
        <div>
           <HeaderLogout props={admin} user={admin.adminData} />
            <Container fluid>
                <Row>
                    <Col md={8}
                    
                    >
                    <Row>
                        <Col md={3}>

                        </Col>
                        <Col md={6}>
                        <div className="form-container border border-dark rounded-5 mt-5" style={{ padding: '40px', backgroundColor: "#E2F0D9"}}>
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
                                <Button variant="primary" type="submit" className="mt-3 ">
                                    Schedule
                                </Button>
                                </div>
                                

                            </Form>
                        </div>
                        </Col>
                        <Col md={3}>
                        </Col>

                    </Row>
                       
                    </Col>
                    <Col md={4}>
                    <AdminSide  admin={admin}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ScheduleElection;