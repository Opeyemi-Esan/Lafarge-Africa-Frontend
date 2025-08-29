import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Login} from './Components/Login';
import {SignUp} from './Components/SignUp';
import {Home} from './Components/Home';
import {Navbar} from './Navbar';
import {Footer} from './Footer';
import {DashBoard} from './Components/DashBoard';
import {UserList} from './Components/UserList';
import { UpdateUser } from './Components/UpdateUser';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/users" element={<UserList />} /> 
          <Route path="/updateuser" element={<UpdateUser />} /> 
        </Routes>
        <Footer /> 
      </BrowserRouter>
    </div>
  )
}

export default App
