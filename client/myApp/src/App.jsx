import React from 'react'
import Home from './Components/Home'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Welcome from './Components/Welcome'
import {BrowserRouter,Route,Routes} from 'react-router-dom'

function App() {
  return (
   <BrowserRouter>
      <Home />
      <Routes>
        <Route exact path='/' />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/user' element={<Welcome />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
