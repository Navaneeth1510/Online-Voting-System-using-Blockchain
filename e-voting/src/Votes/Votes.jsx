import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HeaderLogout from "../Header_Logout/Header_Logout";
import AdminSide from "../Admin-side/AdminPanel";

function Votes({ admin }) {
    const [candidates, setCandidates] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5005/candidate_timestamps")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP error! Status code:" + `${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setCandidates(Array.isArray(data) ? data : []);
            })
            .catch((error) => console.error("Error fetching candidate data:", error));
    }, []);

    const backToHome = () => {
        navigate("/admin");
    };

    return (
        <div>
            {/* Header with Logout Button */}
            <HeaderLogout props={admin} user={admin.adminData} />

            <Row>
                <Col md={8}>
                    {/* Back to Home Button */}
                    <div className="d-flex justify-content-start mb-3">
                        <div className="col-9">
                            <button
                                className="btn btn-lg d-flex align-items-center"
                                onClick={backToHome}
                            >
                                <FaHome className="me-2" />
                            </button>
                        </div>
                    </div>

                    {/* Voting Percentage Table */}
                    <Row className="justify-content-center">
                        <Col md={10} className="d-flex flex-column align-items-start">
                            <h2 className="display-6 fw-bold" style={{ color: "#6f42c1" }}>
                                Voter Information
                            </h2>

                            <div
                                className="border border-3 rounded-4 p-3"
                                style={{ backgroundColor: "#C0EBA6", width: "100%" }}
                            >
                                <Table
                                    className="table-bordered border-secondary bg-white p-2"
                                    striped
                                    hover
                                    responsive
                                >
                                    <thead>
                                        <tr>
                                            <th className="text-center h5 fw-bold">Candidate ID</th>
                                            <th className="text-center h5 fw-bold">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {candidates.length > 0 ? (
                                            candidates.map((candidate, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">
                                                        {candidate.candidate_id}
                                                    </td>
                                                    <td className="text-center">{candidate.timestamp}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2" className="text-center">
                                                    No data available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Col>

                {/* Admin Side Section */}
                <Col md={4}>
                    <AdminSide admin={admin} />
                </Col>
            </Row>
        </div>
    );
}

export default Votes;