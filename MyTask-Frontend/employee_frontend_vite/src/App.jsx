// import { useState } from 'react'
// import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLogin from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Dashboard from './components/dashboard';
import Register from './components/Register';
import TaskDetails from './components/TaskDetails';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import UpdateEmployee from './components/UpdateEmployee';

function App() {

  return (
      
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<UserLogin />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<Dashboard />}/> 
            <Route path="/employeeList" element={<EmployeeList/>} />
            <Route path="/createEmployee" element={<CreateEmployee/>} /> 
            <Route path="/updateEmployee/:itemId" element={<UpdateEmployee/>} />   
            <Route path="/taskDetails/:id" element={<TaskDetails />} />  
        </Routes>
    </BrowserRouter>
    
  )
}



export default App