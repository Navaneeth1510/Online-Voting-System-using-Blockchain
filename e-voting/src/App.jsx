import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Login from './Login Page/Login'
import Header from './Header/Header'
import MainPage from './Main Page/MainPage'
import Constituency from './ConstituencyPage/Constituency'
import VoterDetails from './Voter-Details/Voter-Details';

function App() {
  
  const [voterData, setVoterData] = useState(()=>{
    const local = localStorage.getItem("voterData")
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
    localStorage.setItem("constData", JSON.stringify(constData))
  },[constData])

  return (
    <Routes>
      <Route path='/' element={<MainPage />}/>
      <Route path='/login' element={<Login voterData={voterData} setVoterData={setVoterData} setConstData={setConstData}/>}/>
      <Route path='/header' element={<Header />}/>
      <Route path='/constituency' element={<Constituency voter={voterData} constituency={constData} setVoterData={setVoterData} setConstData={setConstData}/>}/>
      <Route path='/voter-details' element={<VoterDetails voter={voterData} const={constData}/>}/>
    </Routes>
  )
}

export default App
