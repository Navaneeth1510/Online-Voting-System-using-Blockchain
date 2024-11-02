import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import HeaderLogout from '../Header_Logout/Header_Logout';
import AdminSide from '../Admin-side/AdminPanel';

function Statistics({ admin }) {
    const [votingPercentage, setVotingPercentage] = useState([]);
    const navigate = useNavigate();

    const constituencyNames = {
        1: 'Uttarahalli',
        2: 'Jayanagar',
        3: 'Basavanagudi',
        4: 'Padmanabhanagar',
        5: 'Chickpet',
        6: 'Rajajinagar',
        7: 'Hebbal',
        8: 'Shivajinagar',
        9: 'Malleshwaram',
        10: 'Yeshwanthpur'
    };

    useEffect(() => {
        fetch('http://localhost:5005/voting_percentage')
            .then(response => response.json())
            .then(data => {
                const percentages = data && data.voting_percentage ? data.voting_percentage : {};
                const results = Array.from({ length: 10 }, (_, index) => {
                    const constituencyID = index + 1;
                    return {
                        constituencyID,
                        constituencyName: constituencyNames[constituencyID],
                        percentage: percentages[constituencyID] || 0
                    };
                });
                setVotingPercentage(results);
            })
            .catch(error => console.error('Error fetching voting data:', error));
    }, []);

    const backtoHome = () => {
        navigate('/admin');
    };

    return (
        <div>
            <HeaderLogout props={admin} user={admin.adminData} />
            <Row>
                <Col md={8}>
                    <div className="d-flex justify-content-start mb-3">
                        <div className="col-9">
                            <button className="btn btn-lg d-flex align-items-center" onClick={backtoHome}>
                                <FaHome className="me-2" />
                            </button>
                        </div>
                    </div>
                    <Row className="justify-content-center">
                        <Col md={10} className="d-flex flex-column align-items-start">
                            <h2 className="display-6 fw-bold" style={{ color: '#6f42c1' }}>
                                Voting Percentages
                            </h2>
                        
                            <div className="border border-3 rounded-4 p-3" style={{ backgroundColor: '#C0EBA6', width: '100%' }}>
                                <Table className="table-bordered border-secondary bg-white p-2" striped hover responsive>
                                    <thead>
                                        <tr>
                                            <th className="text-center h5 fw-bold">Constituency ID</th>
                                            <th className="text-center h5 fw-bold">Constituency Name</th>
                                            <th className="text-center h5 fw-bold">Voting Percentage (%)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {votingPercentage.map(({ constituencyID, constituencyName, percentage }) => (
                                            <tr key={constituencyID}>
                                                <td className="text-center">{constituencyID}</td>
                                                <td className="text-center">{constituencyName}</td>
                                                <td className="text-center">{percentage.toFixed(2)}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md={4}>
                    <AdminSide admin={admin} />
                </Col>
            </Row>
        </div>
    );
}

export default Statistics;