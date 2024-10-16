import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Login from './Login Page/Login'
import Header from './Header/Header'
import MainPage from './Main Page/MainPage'
import Constituency from './ConstituencyPage/Constituency'
import VoterDetails from './Voter-Details/Voter-Details';
import AdminOTP from './Otp-adminpage/AdminOTP';
import Admin from './Admin/Admin';
import AdminSide from './Admin-side/AdminPanel';
import Side from './Side_panel/Side';
import logout from './Header_Logout/Logout_trial';


function App() {
  
  const [voterData, setVoterData] = useState(()=>{
    const local = localStorage.getItem("voterData")
    if(local===null) return null
    return JSON.parse(local)
  });

  const [adminData, setAdminData] = useState(()=>{
    const local = localStorage.getItem("adminData")
    if(local===null) return null
    return JSON.parse(local)
  });

  const [constData, setConstData] = useState(()=>{
    const local = localStorage.getItem("constData")
    if(local===null) return []
    return JSON.parse(local)
  });

  useEffect(()=>{
    localStorage.setItem("voterData", JSON.stringify(voterData))
  },[voterData])

  useEffect(()=>{
    localStorage.setItem("adminData", JSON.stringify(adminData))
  },[adminData])

  useEffect(()=>{
    localStorage.setItem("constData", JSON.stringify(constData))
  },[constData])

  const props = {
    voterData:voterData,
    adminData:adminData,
    constData:constData,
    setAdminData:setAdminData,
    setVoterData:setVoterData,
    setConstData:setConstData,
  }
  return (
    <Routes>
      <Route path='/' element={<MainPage />}/>
      <Route path='/login' element={<Login props={props}/>}/>
      <Route path='/header' element={<Header />}/>
      <Route path='/side' element={<Side />}/>
      <Route path='/constituency' element={<Constituency props={props}/>}/>
      <Route path='/voter-details' element={<VoterDetails props={props}/>}/>
      <Route path='/otp-authentication' element={<AdminOTP props={props} />}/>
      <Route path='/side-admin' element={<AdminSide props={props} />}/>
      <Route path='/admin' element={<Admin props={props} />}/>
      <Route path='/logout' element={<logout props={props}/>}/>
    </Routes>
  )
}

export default App
