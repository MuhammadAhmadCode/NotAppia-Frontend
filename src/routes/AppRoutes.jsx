import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Notes from '../pages/Notes'
import ProtectedRoute from '../components/ProtectedRoute'
import Register from '../pages/Register'
import Login from "../pages/Login"


const AppRoutes = () => {
          
  return (
<Router>
    <Routes>
        <Route path='/user/register' element={<Register/>} />
        <Route path='/user/login' element={<Login/>} />

        <Route path='/' element={<ProtectedRoute>
          <Notes/>
          </ProtectedRoute>} />

    </Routes>
</Router>
  )
}

export default AppRoutes