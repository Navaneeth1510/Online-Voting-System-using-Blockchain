import './Result.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Pie } from 'react-chartjs-2';

// Import chart.js components
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

// Register components
ChartJS.register(ArcElement, Tooltip, Legend);

function Result() {
    const data = {
        labels: ['Red', 'Blue', 'Yellow'], // Labels for the chart
        datasets: [
            {
                label: 'Votes',
                data: [300, 50, 100], // Values for each label
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colors for the segments
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Hover effect colors
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom', // Position of the legend
            },
            tooltip: {
                enabled: true, // Enable tooltips
            },
        },
    };
    return (
        <>
            <div className="header m-3" style={{ height: "4vh" }}>
                <h1>Results</h1>
            </div>
            <div className="content d-flex justify-content-center mt-5" style={{ height: "95vh" }}>
                <div id="carouselExample" className="carousel slide shadow-sm p-5 rounded-4 border" style={{ backgroundColor: '#e4dcf8', width: "80%", height: "80vh" }}>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="Consti name ms-4">
                                <h2 style={{ textDecoration: "underline" }}>Constituency 1</h2>
                            </div>
                            <div className="row pe-5" style={{ height: "40vh" }}>
                                <div className="col-6 p-3 d-flex justify-content-center">
                                    <table className="border border-3 border-dark fs-4 text-center p-2" style={{ backgroundColor: "white" }} >
                                        <tr className="border-bottom border-3 border-dark p-2" style={{ backgroundColor: '#C0EBA6' }}>
                                            <th className="border-end border-3 border-dark p-2">Candidate</th>
                                            <th className="bborder-end border-3 border-dark p-2">Candi image</th>
                                            <th className="border border-dark p-2">Votes</th>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="col-6 d-flex justify-content-center">
                                    <div className="mt-4" style={{width:"35vh", heigth:"auto"}}>
                                        <Pie data={data} options={options} />
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center ">
                                        <div className="">        
                                            <p className="fs-4">Voting Percentage: 10%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer ms-4">
                                <h3>Winner is: </h3>
                                <h4>Candidate Name</h4>
                            </div>
                        </div>
                        <div className="carousel-item">
                        <div className="Consti name ms-4">
                                <h2 style={{ textDecoration: "underline" }}>Constituency 1</h2>
                            </div>
                            <div className="row pe-5" style={{ height: "40vh" }}>
                                <div className="col-6 p-3 d-flex justify-content-center">
                                    <table className="border border-3 border-dark fs-4 text-center p-2" style={{ backgroundColor: "white" }} >
                                        <tr className="border-bottom border-3 border-dark p-2" style={{ backgroundColor: '#C0EBA6' }}>
                                            <th className="border-end border-3 border-dark p-2">Candidate</th>
                                            <th className="bborder-end border-3 border-dark p-2">Candi image</th>
                                            <th className="border border-dark p-2">Votes</th>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="col-6 d-flex justify-content-center">
                                    <div className="mt-4" style={{width:"35vh", heigth:"auto"}}>
                                        <Pie data={data} options={options} />
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center ">
                                        <div className="">        
                                            <p className="fs-4">Voting Percentage: 10%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer ms-4">
                                <h3>Winner is: </h3>
                                <h4>Candidate Name</h4>
                            </div>
                        </div>
                        <div className="carousel-item" style={{ height: "75vh" }}>
                        <div className="Consti name ms-4">
                                <h2 style={{ textDecoration: "underline" }}>Constituency 1</h2>
                            </div>
                            <div className="row pe-5" style={{ height: "40vh" }}>
                                <div className="col-6 p-3 d-flex justify-content-center">
                                    <table className="border border-3 border-dark fs-5 text-center p-2" style={{ backgroundColor: "white" }} >
                                        <tr className="border-bottom border-3 border-dark p-2" style={{ backgroundColor: '#C0EBA6' }}>
                                            <th className="border-end border-3 border-dark p-2">Candidate</th>
                                            <th className="bborder-end border-3 border-dark p-2">Candi image</th>
                                            <th className="border border-dark p-2">Votes</th>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="col-6 d-flex justify-content-center">
                                    <div className="mt-4" style={{width:"35vh", heigth:"auto"}}>
                                        <Pie data={data} options={options} />
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center ">
                                        <div className="">        
                                            <p className="fs-4">Voting Percentage: 99.99%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer ms-4">
                                <h3>Winner is: </h3>
                                <table className="text-center">
                                    <tr className="p-3 fs-4">
                                        <td className="border-2 border-dark p-2"><img src="src/assets/e-voting-final.png" alt="img" style={{width:"6rem"}}/></td>
                                        <td className="border-2 border-dark p-2"><img src="src/assets/e-voting-final.png" alt="img" style={{width:"6rem"}} /></td>
                                        <td className="border-2 border-dark p-2">Candidate Name</td>
                                        <td className="border-2 border-dark p-2">Party Name</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev ms-0 cc" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
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
    )
}

export default Result;