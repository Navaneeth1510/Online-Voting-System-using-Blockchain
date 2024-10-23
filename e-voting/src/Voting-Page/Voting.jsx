import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderLogout from '../Header_Logout/Header_Logout';
import { BiReset } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import './Voting.css';
import { LuCheckCircle } from "react-icons/lu";
import { MdErrorOutline } from "react-icons/md";


function Voting({ voter, candi }) {
    const navigate = useNavigate();

    const[success, setSuccess] = useState(false);
    const[filled, setFilled] = useState(false);
    const[empty, setEmpty] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [partyLogo, setPartyLogo] = useState("src/assets/Voting-img.png");

    useEffect(() => {
        if (selectedCandidate) {
            console.log("Selected candidate:", selectedCandidate);
            const img = `src/assets/Party/${selectedCandidate.partyPic}`;
            setPartyLogo(img);
        } else {
            setPartyLogo("src/assets/Voting-img.png");
        }
    }, [selectedCandidate]);

    async function handleSelection(candidate) {
        setSelectedCandidate(candidate);
    }

    async function resetVote() {
        setSelectedCandidate(null);
    }

    async function vote(){
        if(selectedCandidate!==null){
            const voteData = {
                candidate_id: selectedCandidate.candidateID,
                constituency_id: voter.voterData.ConstituencyID,  
                timestamp: new Date().toISOString(),
            };
            console.log("validating the blockchain");
            try {
                const response = await fetch('http://localhost:5000/blockchain/mine_block', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(voteData),
                });
                if (!response.ok) {
                    throw new Error('couldnt cast the vote');
                }
                const data = await response.json();
                console.log(data);
                if(data['status']==='true')
                    setSuccess(true);
                else    
                    setSuccess(false);
                setFilled(true);
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
        else{
            setEmpty(true);
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
                            <div className="col-10 mt-3">
                                <div className="card border-0">
                                    <div className="image img-fluid center" style={{ textAlign: "center", alignItems: "center" }}>
                                        <img src="src/assets/nami.png" className="img-fluid center" style={{ width: "25%", height: "auto" }} alt="Voter" />
                                    </div>
                                    <div className="card-body border border-dark rounded-5 fs-6" style={{ backgroundColor: '#e4dcf8' }}>
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
                                <div className="col-5"></div>
                                <div className="col-2">
                                    <button className="btn mt-1 text-center" onClick={()=>vote()} style={{ width: "100%", backgroundColor: "#5522D0", color: "white" }}>Vote</button>
                                </div>
                                <div className="col-5"></div>
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
                                <div className="modal-body d-flex justify-content-center fs-4 mb-2">
                                    {success?
                                    (
                                        <p>Suceesfully casted the vote</p>
                                    ):
                                    (
                                        <p>Something went wrong !</p>
                                    )
                                    }
                                </div>
                                <div className="modal-footer d-flex justify-content-center pt-0 pb-0 mb-3">
                                    {success?
                                    (
                                        <button type="button" className="btn btn-primary" onClick={()=>done()}>
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
        </>
    );
}

export default Voting;
