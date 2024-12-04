import './Result.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaArrowLeft } from 'react-icons/fa';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

// Import chart.js components
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Result() {
    const [results, setResults] = useState([]);
    const [time, setTime] = useState(null);
    const [times, setTimes] = useState({ startD: null, startT: null, endD: null, endT: null });
    const [flag, setFlag] = useState(0);
    const [votingPercentages, setVotingPercentages] = useState({});
    const navigate = useNavigate();
    const [vp, setVP] = useState(0);


    useEffect(() => {
        async function fetchResults() {
            try {
                if (flag === 0) {
                    const response = await fetch('http://localhost:5000/candi/');
                    const times = await fetch('http://localhost:5000/time/');
                    if (response.ok && times.ok) {
                        const res = await response.json();
                        const resp = await times.json();
                        setResults(res);
                        setTime(resp);
                        setFlag(1);
                    } else {
                        console.error('Failed to fetch results');
                    }
                }
            } catch (error) {
                console.error('Error fetching results:', error.message);
            }
        }
        fetchResults();
    }, [flag]);

    useEffect(() => {
        if (time) {
            console.log("Time object:", time);
            console.log('Processing time...');
            processTime();
        }
    }, [time]);

    function processTime() {
        if (time) {
            const startD = time.startTime.split("T")[0];
            const startT = time.startTime.split("T")[1].split(".")[0];
            const endD = time.endTime.split("T")[0];
            const endT = time.endTime.split("T")[1].split(".")[0];

            setTimes({ startD, startT, endD, endT });
        }
    }

    function goback() {
        navigate(-1);
    }

    useEffect(() => {
        async function fetchAllVotingPercentages() {
            const percentages = {};
            for (const constituency of results) {
                try {
                    const response = await fetch(
                        `http://localhost:5000/blockchain/voting_percentage/${constituency.constituencyID}`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        percentages[constituency.constituencyID] = data.voting_percentage;
                    }
                } catch (error) {
                    console.error(
                        `Error fetching voting percentage for constituency ${constituency.constituencyID}:`,
                        error.message
                    );
                }
            }
            setVotingPercentages(percentages);
        }

        if (results.length > 0) {
            fetchAllVotingPercentages();
        }
    }, [results]);

    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
            new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
    }, [times]);

    return (
        <>
            <div className="icon button" style={{ height: '1vh' }}>
                <FaArrowLeft className="m-2" style={{ fontSize: '1.3rem' }} onClick={goback} />
            </div>
            <div className="header m-3 d-flex text-center justify-content-center align-items-center" style={{ height: '4vh' }}>
                <div className="w-50">
                    {(times.startD && times.startT && times.endD && times.endT) ?
                        (
                            <button
                                type="button"
                                className="btn btnn fs-1 fw-bold w-50"
                                data-bs-toggle="tooltip"
                                data-bs-html="true"
                                data-bs-placement="right"
                                data-bs-title={`<h4><u>Election Details</u></h4><p>Start Date: ${times.startD} <br>Start Time: ${times.startT}<br>End Date: ${times.endD} <br>  End Time: ${times.endT}</p>`}
                            >
                                Results
                            </button>
                        )
                        :
                        (
                            <button type="button" className="btnn btn fs-1 fw-bold">
                                Results
                            </button>
                        )
                    }
                </div>
            </div>
            <div className="content d-flex justify-content-center" style={{ height: '110vh' }}>
                <div
                    id="carouselExample"
                    className="carousel slide shadow-sm p-3 rounded-4"
                    style={{ backgroundColor: '#e4dcf8', width: '80%', height: '87vh' }}
                >
                    <div className="carousel-inner" style={{ padding: "0" }}>
                        <div className="carousel-item active" style={{ height: '83vh' }}>
                            <div className="d-flex justify-content-center align-items-center text-center h-100">
                                <div className="w-75">
                                    <h1 style={{ color: '#5522D0' }}>The wait is over !!</h1>
                                    <h3>
                                        To view the results, kindly navigate to your constituency page by
                                        clicking the previous or the next buttons.
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {results.map((constituency) => {
                            const labels = constituency.candidates.map((candidate) => candidate.candidateName);
                            const data = constituency.candidates.map((candidate) => candidate.votes);
                            // const votingp = fetchVotingPercentage(constituency.constituencyID) || "Calculating...";

                            const pieChartData = {
                                labels,
                                datasets: [
                                    {
                                        label: 'Votes',
                                        data,
                                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                                    },
                                ],
                            };

                            const pieChartOptions = {
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'right',
                                    },
                                },
                            };

                            const winner = constituency.candidates.reduce((max, candidate) =>
                                candidate.votes > max.votes ? candidate : max
                            );

                            return (
                                <div className="carousel-item" style={{ height: '83vh' }} key={constituency.constituencyID}>
                                    <div className="Consti name ms-4">
                                        <button type="button" className="btnn fs-2 ms-2 border-0" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title={constituency.details} style={{ color: '#5522D0', backgroundColor: '#e4dcf8' }}>
                                            {constituency.constituencyName}
                                        </button>
                                    </div>
                                    <div className="row pe-5">
                                        <div className="col-6 p-3 d-flex flex-column justify-content-center align-items-center">
                                            <table
                                                className="border border-3 border-dark fs-6 text-center p-2"
                                                style={{ backgroundColor: '#f1ecd8' }}
                                            >
                                                <thead>
                                                    <tr
                                                        className="border-bottom border-3 border-dark p-2"
                                                        style={{ backgroundColor: '#C0EBA6' }}
                                                    >
                                                        <th className="border-end border-3 border-dark p-2">Party</th>
                                                        <th className="border-end border-3 border-dark p-2">Candidate</th>
                                                        <th className="border-end border-3 border-dark p-2">Name</th>
                                                        <th className="border border-dark p-2">Votes</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {constituency.candidates.map((candidate) => (
                                                        <tr className="border-3 border-dark" key={candidate.candidateID}>
                                                            <td className="border-end border-3 border-dark">
                                                                <img src={`src/assets/Party/${candidate.partyPic}`} alt="Party" style={{ width: '45px' }} />
                                                            </td>
                                                            <td className="border-end border-3 border-dark p-1">
                                                                <img
                                                                    src={`src/assets/Candidates/${candidate.candidatePic}`}
                                                                    alt="Candidate"
                                                                    style={{ width: '45px' }}
                                                                />
                                                            </td>
                                                            <td className="border-end border-3 border-dark p-1">{candidate.candidateName}</td>
                                                            <td className="border border-dark p-1">{candidate.votes}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <div className="mt-3" style={{ width: '60%', height: "25vh" }}>
                                                <Pie data={pieChartData} options={pieChartOptions} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div>
                                                <h2>Winner :</h2>
                                            </div>
                                            <div className="d-flex justify-content-center mt-4 p-0">
                                                <div className="w-75 d-flex justify-content-center align-items-center">
                                                    <img
                                                        className="border border-5 border-dark"
                                                        src={`src/assets/Party/${winner.partyPic}`}
                                                        alt="Winner Party"
                                                        style={{ width: '40%' }}
                                                    />
                                                    <img
                                                        className="border border-5 border-dark ms-4"
                                                        src={`src/assets/Candidates/${winner.candidatePic}`}
                                                        alt="Winner Candidate"
                                                        style={{ width: '40%' }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column justify-content-center align-items-center mt-4">
                                                <div>
                                                    <h4>Name: {winner.candidateName}</h4>
                                                    <h4>Party: {winner.partyName}</h4>
                                                    <h4>ID: {winner.candidateID}</h4>
                                                    <h4>Votes: {winner.votes}</h4>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <h3 className="border-top border-dark ps-3 pe-3 pt-3 mt-3">
                                                    Voting Percentage: {votingPercentages[constituency.constituencyID]}%
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button className="carousel-control-prev ms-0 cc d-flex justift-content-center align-items-center" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="me-5"><FontAwesomeIcon icon={faAngleLeft} style={{ fontSize: "2rem", color: "green" }} /></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next cc" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="ms-5"><FontAwesomeIcon icon={faAngleRight} style={{ fontSize: "2rem", color: "green" }} /></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Result;
