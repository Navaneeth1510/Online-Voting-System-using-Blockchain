import { Route, Routes, Navigate } from 'react-router-dom';
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

function App() {

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
            <Route path='/' element={<MainPage />} />
            <Route path='/login' element={<Login voter={voter} admin={admin} />} />

            {/* can access these roytes only on a condition check. wither admin has logged in or voter has logged in  */}

            {/* Voter routes */}
            <Route path='/constituency' element={
                <PrivateRoute isAllowed={!!voterData}>
                    <Constituency voter={voter} candi={candidates} />
                </PrivateRoute>
            } />
            <Route path='/voter-details' element={
                <PrivateRoute isAllowed={!!voterData}>
                    <VoterMainPage voter={voter} />
                </PrivateRoute>
            } />
            <Route path='/voting' element={
                <PrivateRoute isAllowed={!!voterData}>
                    <Voting voter={voter} candi={candidates} />
                </PrivateRoute>
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
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default App;
