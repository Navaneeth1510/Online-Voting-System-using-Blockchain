import { Route, Routes } from 'react-router-dom'
import Login from './Login Page/Login'
import Header from './Header/Header'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/header' element={<Header />}/>
    </Routes>
  )
}

export default App
