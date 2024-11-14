import { useState, useContext } from 'react'
import './App.css'
import './bootstrap.min.css'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import AllProjects from './pages/AllProjects'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { logContext } from './contextapi/AuthContext'


function App() {

  const { logStatus } = useContext(logContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/projects' element={logStatus ? <AllProjects /> : <Auth />} />
        <Route path='/dash' element={logStatus ? <Dashboard /> : <Auth />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
