import { Route, Routes, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './Login Page/Login';
import MainPage from './Main Page/MainPage';
import Constituency from './ConstituencyPage/Constituency';
import AdminOTP from './Otp-adminpage/AdminOTP';
import Admin from './Admin/Admin';
import AdminSide from './Admin-side/AdminPanel';
import PrivateRoute from './PrivateRoute';
import Voting from './Voting-Page/Voting';
import Validation from './Validation/Validation';
import AdminMainPage from './AdminWelcome/AdminMainPage';
import VoterMainPage from './VoterWelcome/VoterMainPage';
import ScheduleElection from './Schedule_election/schedule_election';
import Statistics from './Statistics/Statistics';
import Result from './Result/Result';
import Votes from './Votes/Votes';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {

    const[startTime, setStart] = useState(null);
    const[endTime, setEnd] = useState(null);
    const [isElectionActive, setIsElectionActive] = useState(false);
    const [wasElectionActive, setWasElectionActive] = useState(() => {
        const local = localStorage.getItem("WasElectionActive");
        return local ? JSON.parse(local) : false;
    });

    useEffect(() => {
        const fetchTiming = async () => {
            try {
                const response = await fetch('http://localhost:5000/time/');
                const data = await response.json();
                const currentTime = new Date();
                currentTime.setHours(currentTime.getHours() + 5);
                currentTime.setMinutes(currentTime.getMinutes() + 30);
                const c = currentTime.toISOString();
                const startTim = data.startTime; 
                const endTim = data.endTime;
    
                setStart(startTim);
                setEnd(endTim);
    
                const isActive = c >= startTim && c <= endTim;
                console.log('election? : '+isActive+" and "+wasElectionActive)
                if (isActive && !wasElectionActive) {
                    console.log('Election started, resetting voters...');
                    try {
                        await fetch('http://127.0.0.1:5000/voter/reset');
                        console.log('Voters reset done');
                        setWasElectionActive(true);
                    } catch (error) {
                        console.error('Could not reset voters:', error);
                    }
                } else if (!isActive && wasElectionActive) {
                    console.log('Election ended');
                    setWasElectionActive(false);
                }
    
                setIsElectionActive(isActive);
            } catch (error) {
                console.error("Failed to fetch timings:", error);
            }
        };
    
        fetchTiming();
        const intervalId = setInterval(fetchTiming, 1000);
    
        return () => clearInterval(intervalId); 
    }, [wasElectionActive]); 
    

    function isWithinTiming(start, end) {
        const currentTime = new Date();
        currentTime.setHours(currentTime.getHours() + 5);
        currentTime.setMinutes(currentTime.getMinutes() + 30);
        const c = currentTime.toISOString();
        const startT = new Date(start);
        const endT = new Date(end);
        console.log('in within function')
        console.log(start)
        console.log(end)
        console.log(c)
        const isWithin = c >= start && c <= end;    
        console.log(isWithin)    
        return isWithin;
    }


    //load from localstorage
    const [voterData, setVoterData] = useState(() => {
        const local = localStorage.getItem("voterData");
        return local ? JSON.parse(local) : null;
    });

    const [adminData, setAdminData] = useState(() => {
        const local = localStorage.getItem("adminData");
        return local ? JSON.parse(local) : null;
    });

    const [constData, setConstData] = useState(() => {
        const local = localStorage.getItem("constData");
        return local ? JSON.parse(local) : null;
    });

    const [candiData, setCandiData] = useState(() => {
        const local = localStorage.getItem("candiData");
        return local ? JSON.parse(local) : null;
    });

    //load to localstorage
    useEffect(() => {
        localStorage.setItem("voterData", JSON.stringify(voterData));
    }, [voterData]);

    useEffect(() => {
        localStorage.setItem("WasElectionActive", wasElectionActive);
    }, [wasElectionActive]);

    useEffect(() => {
        localStorage.setItem("adminData", JSON.stringify(adminData));
    }, [adminData]);

    useEffect(() => {
        localStorage.setItem("constData", JSON.stringify(constData));
    }, [constData]);

    useEffect(() => {
        localStorage.setItem("candiData", JSON.stringify(candiData));
    }, [candiData]);

    const voter = {
        voterData: voterData,
        constData: constData,
        setVoterData: setVoterData,
        setConstData: setConstData,
    };
    const admin = {
        adminData: adminData,
        setAdminData: setAdminData,
    };
    const candidates = {
        candiData: candiData,
        setCandiData: setCandiData,
    };




    return (
        <Routes>
            {/*can access all these routes directly*/}
            {/*timing shd be checked. only if the current time is bw the start and end time mainpage and loginpage can be accessed else goes to results only */}
            <Route path='/' element={<MainPage start={startTime} end={endTime}/>
            } />

            <Route path='/login' element={
                <Login voter={voter} admin={admin} />
            } />

            <Route path='/results' element={
                !isElectionActive
                    ? <Result />
                    : <Navigate to="/" />
            } />

            {/* can access these roytes only on a condition check. wither admin has logged in or voter has logged in  */}

            {/* Voter routes */}
            <Route path='/constituency' element={
                    <PrivateRoute isAllowed={!!voterData}>
                        <Constituency voter={voter} candi={candidates} />
                    </PrivateRoute>
            } />
            <Route path='/voter-details' element={
                    <PrivateRoute isAllowed={!!voterData}>
                        <VoterMainPage voter={voter}  start={startTime} end={endTime}/>
                    </PrivateRoute>
            } />
            <Route path='/voting' element={
                isWithinTiming(startTime, endTime)==true?
                    <PrivateRoute isAllowed={!!voterData}>
                        <Voting voter={voter} candi={candidates} start={startTime} end={endTime} />
                    </PrivateRoute>
                :
                <Navigate to='/results'/>
            } />


            {/* Admin routes */}
            <Route path='/otp-authentication' element={
                <PrivateRoute isAllowed={!!adminData}>
                    <AdminOTP admin={admin} />
                </PrivateRoute>
            } />
            <Route path='/admin-welcome' element={
                <PrivateRoute isAllowed={!!adminData}>
                    <AdminMainPage admin={admin} />
                </PrivateRoute>
            } />
            <Route path='/admin' element={
                <PrivateRoute isAllowed={!!adminData}>
                    <Admin admin={admin} />
                </PrivateRoute>
            } />
            <Route path='/side-admin' element={
                <PrivateRoute isAllowed={!!adminData}>
                    <AdminSide admin={admin} />
                </PrivateRoute>
            } />
            <Route path='/validation' element={
                <PrivateRoute isAllowed={!!adminData}>
                    <Validation admin={admin} />
                </PrivateRoute>
            } />
            <Route path='/votes' element={
                <PrivateRoute isAllowed={!!adminData}>
                    <Votes admin={admin} />
                </PrivateRoute>
            } />
            <Route path='/statistics' element={
                <PrivateRoute isAllowed={!!adminData}>
                    <Statistics admin={admin} />
                </PrivateRoute>
            } />

            <Route path='/schedule-election' element={
                <PrivateRoute isAllowed={!!adminData}>
                    <ScheduleElection admin={admin} />
                </PrivateRoute>
            } />


            {/* any other link will go back to main page*/}
            <Route path="*" element={
                isElectionActive && isWithinTiming(startTime, endTime)?
                <Navigate to="/" />
                :
                <Navigate to='/results'/>
            } />
            <Route path="" element={
                isElectionActive && isWithinTiming(startTime, endTime)?
                <Navigate to="/" />
                :
                <Navigate to='/results'/>
            } />
        </Routes>
    );
}

export default App;
