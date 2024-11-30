import './Result.css';
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
    Legend
} from 'chart.js';



// Register components
ChartJS.register(ArcElement, Tooltip, Legend);

function Result() {

    
    const navigate = useNavigate();
    
    const data = {
        labels: ['Red', 'Blue', 'Yellow'], // Labels for the chart
        datasets: [
            {
                label: 'Votes',
                data: [200, 50, 100], // Values for each label
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

    
    function goback(){
        navigate(-1);
    }

    return (

        <>
            <div className="icon button" style={{height:"1vh"}}>
                <FaArrowLeft className="m-2" style={{ fontSize: "1.3rem"}} onClick={()=>goback()}/>
            </div>
            <div className="header m-3 d-flex text-center justify-content-center align-items-center mt-4" style={{ height: "4vh" }}>
                <h1>Results</h1>
            </div>
            <div className="content d-flex justify-content-center mt-4" style={{ height: "98vh" }}>
                <div id="carouselExample" className="carousel slide shadow-sm p-5 rounded-4 border" style={{ backgroundColor: '#e4dcf8', width: "80%", height: "83vh" }}>
                    <div className="carousel-inner">
                        <div className="carousel-item active" style={{ height: "73vh" }}>
                            <div className="d-flex justify-content-center align-items-center text-center h-100">
                                <div className="w-75">
                                    <h1 style={{color:"#5522D0"}}>The wait is over !!</h1>
                                    <h3>
                                        To view the results, kindly navigate to your constituency page by 
                                        clicking the previous or the next buttons.
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="carousel-item" style={{ height: "78vh" }}>
                            <div className="Consti name ms-4">
                                <h2 style={{ textDecoration: "underline" }}>Constituency 1</h2>
                            </div>
                            <div className="row pe-5">
                                <div className="col-6 p-3 d-flex flex-column justify-content-center align-items-center">
                                    <table className="border border-3 border-dark fs-6 text-center p-2" style={{ backgroundColor: "white" }} >
                                        <tr className="border-bottom border-3 border-dark p-2" style={{ backgroundColor: '#C0EBA6' }}>
                                            <th className="border-end border-3 border-dark p-2">Party</th>
                                            <th className="border-end border-3 border-dark p-2">Candidate</th>
                                            <th className="bborder-end border-3 border-dark p-2">Name</th>
                                            <th className="border border-dark p-2">Votes</th>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                img
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                img
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                img
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                img
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                img
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                    </table>
                                    <div className="mt-4" style={{width:"45%"}}>
                                        <Pie data={data} options={options} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="">
                                        <h2>Winner : </h2>
                                    </div>
                                    <div className="d-flex justify-content-center mt-4">
                                        <div className="w-75 p-0 d-flex justify-content-center align-items-center">
                                            <img className="border border-5 border-dark" src="src/assets/e-voting-final.png" alt="img" style={{width:"45%"}}/>
                                            <img className="ms-4 border border-5 border-dark" src="src/assets/e-voting-final.png" alt="img" style={{width:"45%"}}/>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center align-items-center mt-4">
                                        <div className="">
                                            <h4>Name:</h4>
                                            <h4>Party:</h4>
                                            <h4>ID:</h4>
                                            <h4>Votes:</h4>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <h3 className="border-top border-dark ps-3 pe-3 pt-3 mt-3">Voting Percentage : 99.99%</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item" style={{ height: "78vh" }}>
                            <div className="Consti name ms-4">
                                <h2 style={{ textDecoration: "underline" }}>Constituency 2</h2>
                            </div>
                            <div className="row pe-5">
                                <div className="col-6 p-3 d-flex flex-column justify-content-center align-items-center">
                                    <table className="border border-3 border-dark fs-6 text-center p-2" style={{ backgroundColor: "white" }} >
                                        <tr className="border-bottom border-3 border-dark p-2" style={{ backgroundColor: '#C0EBA6' }}>
                                            <th className="border-end border-3 border-dark p-2">Party</th>
                                            <th className="border-end border-3 border-dark p-2">Candidate</th>
                                            <th className="bborder-end border-3 border-dark p-2">Name</th>
                                            <th className="border border-dark p-2">Votes</th>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                img
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                img
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                img
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                img
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                img
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                    </table>
                                    <div className="mt-4" style={{width:"45%"}}>
                                        <Pie data={data} options={options} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="">
                                        <h2>Winner : </h2>
                                    </div>
                                    <div className="d-flex justify-content-center mt-4">
                                        <div className="w-75 p-0 d-flex justify-content-center align-items-center">
                                            <img className="border border-5 border-dark" src="src/assets/e-voting-final.png" alt="img" style={{width:"45%"}}/>
                                            <img className="ms-4 border border-5 border-dark" src="src/assets/e-voting-final.png" alt="img" style={{width:"45%"}}/>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center align-items-center mt-4">
                                        <div className="">
                                            <h4>Name:</h4>
                                            <h4>Party:</h4>
                                            <h4>ID:</h4>
                                            <h4>Votes:</h4>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <h3 className="border-top border-dark ps-3 pe-3 pt-3 mt-3">Voting Percentage : 99.99%</h3>
                                    </div>
                                </div>
                            </div>
                        </div><div className="carousel-item" style={{ height: "78vh" }}>
                            <div className="Consti name ms-4">
                                <h2 style={{ textDecoration: "underline" }}>Constituency 3</h2>
                            </div>
                            <div className="row pe-5">
                                <div className="col-6 p-3 d-flex flex-column justify-content-center align-items-center">
                                    <table className="border border-3 border-dark fs-6 text-center p-2" style={{ backgroundColor: "white" }} >
                                        <tr className="border-bottom border-3 border-dark p-2" style={{ backgroundColor: '#C0EBA6' }}>
                                            <th className="border-end border-3 border-dark p-2">Party</th>
                                            <th className="border-end border-3 border-dark p-2">Candidate</th>
                                            <th className="bborder-end border-3 border-dark p-2">Name</th>
                                            <th className="border border-dark p-2">Votes</th>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                img
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                img
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                img
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                img
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="border-3 border-dark">
                                            <td className="border-end border-3 border-dark" >
                                                img
                                            </td><td className="border-end border-3 border-dark" >
                                                img
                                            </td>
                                            <td className="border-end border-3 border-dark" >
                                                Name
                                            </td>
                                            <td className="border border-dark">
                                                0
                                            </td>
                                        </tr>
                                    </table>
                                    <div className="mt-4" style={{width:"45%"}}>
                                        <Pie data={data} options={options} />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="">
                                        <h2>Winner : </h2>
                                    </div>
                                    <div className="d-flex justify-content-center mt-4">
                                        <div className="w-75 p-0 d-flex justify-content-center align-items-center">
                                            <img className="border border-5 border-dark" src="src/assets/e-voting-final.png" alt="img" style={{width:"45%"}}/>
                                            <img className="ms-4 border border-5 border-dark" src="src/assets/e-voting-final.png" alt="img" style={{width:"45%"}}/>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center align-items-center mt-4">
                                        <div className="">
                                            <h4>Name:</h4>
                                            <h4>Party:</h4>
                                            <h4>ID:</h4>
                                            <h4>Votes:</h4>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <h3 className="border-top border-dark ps-3 pe-3 pt-3 mt-3">Voting Percentage : 99.99%</h3>
                                    </div>
                                </div>
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