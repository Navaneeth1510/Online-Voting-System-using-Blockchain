import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderLogout from '../Header_Logout/Header_Logout';
import { BiReset } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import './Voting.css';
import Confetti from "react-confetti";
import { LuCheckCircle } from "react-icons/lu";
import { MdErrorOutline } from "react-icons/md";


function Voting({ voter, candi, start, end}) {
    const navigate = useNavigate();

    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    const[success, setSuccess] = useState(false);
    const[filled, setFilled] = useState(false);
    const[empty, setEmpty] = useState(false);
    const[spinner, setSpinner] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [partyLogo, setPartyLogo] = useState("src/assets/Voting-img.png");
    const [results, setResult] = useState(false);

    useEffect(() => {
        if (selectedCandidate) {
            console.log("Selected candidate:", selectedCandidate);
            const img = `src/assets/Party/${selectedCandidate.partyPic}`;
            setPartyLogo(img);
        } else {
            setPartyLogo("src/assets/Voting-img.png");
        }
    }, [selectedCandidate]);

    useEffect(() => {
        function resultsOut() {
            const currentTime = new Date();
            currentTime.setHours(currentTime.getHours() + 5);
            currentTime.setMinutes(currentTime.getMinutes() + 30);
            const c = currentTime.toISOString();
            if (c < start || c > end) {
                console.log(start)
                console.log(end)
                console.log(c)
                setResult(true);
                console.log(true);
            } else {
                setResult(false);
                console.log(false);
            }
        }

        const intervalId = setInterval(() => {
            resultsOut();
        }, 1000); 

        return () => clearInterval(intervalId);
    }, [start, end]);

    async function handleSelection(candidate) {
        setSelectedCandidate(candidate);
    }

    async function resetVote() {
        setSelectedCandidate(null);
    }

    async function vote() {
        if (selectedCandidate !== null) {
            setSpinner(true);
            const voteData = {
                candidate_id: selectedCandidate.candidateID,
                constituency_id: voter.voterData.ConstituencyID,
                timestamp: new Date().toISOString(),
            };
            console.log("Validating the blockchain...");
            
            try {
                const validateResponse = await fetch(`http://localhost:5000/blockchain/validate`);
                const validateData = await validateResponse.json();
                
                if (validateData.is_valid === true) {  
                    try {
                        const mineResponse = await fetch('http://localhost:5000/blockchain/mine_block', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(voteData),
                        });
                        
                        if (!mineResponse.ok) {
                            throw new Error('Couldn’t cast the vote');
                        }
                        
                        const data = await mineResponse.json();
                        console.log(data);
                        setSuccess(data.status === 'true');
                        setFilled(true);                        
                    } catch (error) {
                        setSuccess(false);
                        console.error('Error casting vote:', error.message);
                    }
                } 
                else {
                    console.log(validateData.is_valid)
                    setSuccess(validateData.is_valid === 'true');
                }
            } 
            catch (error) {
                setSuccess(false);
                console.error('Error validating blockchain:', error.message);
            } 
        } else {
            setSpinner(true);
            setEmpty(false);
            setTimeout(() => {
                setEmpty(true);
                setSpinner(false);
            }, 1500);
        }
    }
    

    async function done(){
        try{
            const voterId = voter.voterData.voterID;
            const password = voter.voterData.Password;
            console.log(voterId);
            console.log(password);
            const response = await fetch(`http://localhost:5000/voter/update/${voterId}/${password}`);
            if (!response.ok) {
                setError(true);
                throw new Error('Voter not found');
            }
            const data = await response.json();
            console.log(data);
            voter.setVoterData(data);
            navigate('/voter-details');
        } catch (error) {
            console.error('Error:', error.message);
        }        
    }

    function handleCloseModal(){
        setEmpty(false);
    }

    function close(){
        setFilled(false);
    }

    return (
        <>
            <div className="header">
                <HeaderLogout props={voter} user={voter.voterData} />
            </div>
            <div className="container-fluid voting" style={{ height: "100vh" }}>
                <div className="row" style={{ height: "100vh" }}>
                    <div className="col-5 vote">
                        <div className="row" style={{ height: "50vh" }}>
                            <div className="col-1"></div>
                            <div className="col-10 mt-1">
                                <div className="card border-0">
                                    <div className="image img-fluid center" style={{ textAlign: "center", alignItems: "center" }}>
                                        <img src="src/assets/nami.png" className="img-fluid center" style={{ width: "25%", height: "auto" }} alt="Voter" />
                                    </div>
                                    <div className="card-body border border-dark rounded-5 fs-6" style={{ backgroundColor: '#e4dcf8'}}>
                                        <div className="details">
                                            <div className="row">
                                                <div className="col-3 fw-bold">
                                                    <p>Voter ID</p>
                                                    <p>Name</p>
                                                    <p>Email</p>
                                                    <p>Date of Birth</p>
                                                    <p>Address</p>
                                                </div>
                                                <div className="col-1 fw-bold">
                                                    <p>:</p>
                                                    <p>:</p>
                                                    <p>:</p>
                                                    <p>:</p>
                                                    <p>:</p>
                                                </div>
                                                <div className="col-8">
                                                    <p>{voter.voterData.voterID}</p>
                                                    <p>{voter.voterData.Name}</p>
                                                    <p>{voter.voterData.Email}</p>
                                                    <p>{voter.voterData.DOB}</p>
                                                    <p>{voter.voterData.Address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2"></div>
                        </div>
                        <div className="row shadow-sm rounded-2 m-2 mt-4" style={{ backgroundColor: "#E2F0D9" }}>
                            <div className="d-flex justify-content-between align-items-center" style={{ height: "0%" }}>
                                <p className="fs-4 fw-bold mt-3 ms-2">Your vote:</p>
                                <button className="btn btn-lg d-flex align-items-center me-0" onClick={() => resetVote()}>
                                    <BiReset className="me-2" />
                                </button>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="col-4 d-flex border-end border-dark justify-content-center mb-5">
                                    <img className='border border-black border-4' src={partyLogo} alt="Party Logo" style={{ width: "75%", height: "auto" }} />
                                </div>
                                <div className="col-8 " style={{ height: "100%" }}>
                                    {selectedCandidate ? (
                                        <div className="text-center mt-4">
                                            <p><strong>Candidate Name:</strong> {selectedCandidate.candidateName}</p>
                                            <p><strong>Party Name:</strong> {selectedCandidate.partyName}</p>
                                            <p><strong>Candidate ID:</strong> {selectedCandidate.candidateID}</p>
                                        </div>
                                    ) : (
                                        <div className="d-flex mt-5 justify-content-center">
                                            <p className="fs-5">Your vote will be displayed here</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-7 pb-2 evm-body">
                        <div className="evm mt-2 ms-5 me-5 border rounded-5 border-0 shadow-sm" style={{ backgroundColor: "#E2F0D9" }}>
                            <div className="head text-center d-flex justify-content-center align-items-center" style={{ height: "8vh" }}>
                                <p className='fs-1 mt-4'>ELECTION COMMISION</p>
                            </div>
                            <div className="details m-3">
                                <table className="border border-dark text-center" style={{ backgroundColor: '#e4dcf8' }}>
                                    <thead className="border border-dark">
                                        <tr className='text-center fs-5 fw-bold' style={{ width: "100%" }}>
                                            <td className="border border-dark" style={{ width: "20%" }}>Party Logo </td>
                                            <td className="border border-dark" style={{ width: "20%" }}>Candidate Image</td>
                                            <td className="border border-dark" style={{ width: "20%" }}>Party Name</td>
                                            <td className="border border-dark" style={{ width: "20%" }}>Candidate Name</td>
                                            <td className="border border-dark" style={{ width: "20%" }}>Candidate ID</td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {candi.candiData.map((candidate) => (
                                            <tr key={candidate.candidateID} className="border-bottom border-dark" style={{ height: "10vh" }}>
                                                <td className="border border-dark fs">
                                                    <img className="m-1" src={`src/assets/Party/${candidate.partyPic}`} alt={`${candidate.partyPic}`} style={{ width: "50%" }} />
                                                </td>
                                                <td className="border border-dark fs">
                                                    <img src={`src/assets/Party/${candidate.candidadatePic}`} alt={`${candidate.candidateName}`} style={{ width: "50%" }} />
                                                </td>
                                                <td className="border border-dark fs">{candidate.partyName}</td>
                                                <td className="border border-dark fs">{candidate.candidateName}</td>
                                                <td className="border border-dark">
                                                    <input
                                                        className="form-check-input radiobtn border border-dark"
                                                        type="radio"
                                                        id={candidate.candidateID}
                                                        name="candidate"
                                                        value={candidate.candidateID}
                                                        checked={selectedCandidate?.candidateID === candidate.candidateID}
                                                        onChange={() => handleSelection(candidate)}
                                                    />
                                                    <label htmlFor={candidate.candidateID} className="custom-radio rounded-5 mt-1"></label>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="foot row" style={{ height: "8vh" }}>
                                <div className="col-4"></div>
                                <div className="col-4 d-flex justify-content-center">
                                    {!spinner ?
                                    (
                                        <>
                                        {!results ?
                                            (
                                                <button className="btn text-center" onClick={()=>vote()} style={{ width: "50%", height:"75%", backgroundColor: "#5522D0", color: "white" }}>
                                                    Vote
                                                </button>
                                            )
                                            :
                                            (
                                                <button className="btn" style={{ width: "70%", height:"75%", backgroundColor: "#5522D0", color: "white" }} disabled="true">
                                                    Election ended
                                                </button>
                                            )
                                        }
                                        </>
                                    )    
                                    :
                                    (
                                        <button className="btn text-center d-flex justify-content-center align-items-center"  disabled  style={{ width: "50%", height:"75%", backgroundColor: "#5522D0", color: "white" }}>
                                            <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                            <span role="status">&nbsp;&nbsp;Voting...</span>
                                        </button>
                                    )
                                    }                           
                                </div>
                                <div className="col-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {empty && (
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
                                        <MdErrorOutline style={{ fontSize: "4rem", color: "red" }} />
                                    </div>
                                </div>
                                <div className="modal-body d-flex justify-content-center fs-4 mb-2">
                                    <p>No candidate selected</p>
                                </div>
                                <div className="modal-footer d-flex justify-content-center pt-0 pb-0 mb-3">
                                    <button type="button" className="btn btn-danger" onClick={handleCloseModal}>
                                        Okay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {filled &&  (          
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
                                        <p>Suceesfully casted the vote<br/>
                                            Thank you {voter.voterData.Name} !
                                        </p>
                                    ):
                                    (
                                        <p>Couldn't cast your vote !<br />
                                            Please recast your vote
                                        </p>
                                    )
                                    }
                                </div>
                                <div className="modal-footer d-flex justify-content-center pt-0 pb-0 mb-3">
                                    {success?
                                    (
                                        <button type="button" className="btn" onClick={()=>done()} style={{ backgroundColor: "#5522D0", color: "white" }}>
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
                {filled && success && (
                    <Confetti
                        style={{ zIndex: 1200 }}
                        width={windowDimensions.width}
                        height={windowDimensions.height}
                        numberOfPieces={300}
                        recycle={false}
                        gravity={0.5}
                    />
                )}
            </div>
        </>
    );
}

export default Voting;
