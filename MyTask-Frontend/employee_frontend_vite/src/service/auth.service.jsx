import axios from "axios";
import useAxiosInstance from "../redux/axiosInstance";

const API_URL = "http://localhost:5000";

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}


const login = async (username, password) => {
 
    const { instance }=useAxiosInstance();

  const payload={
    "email":username,
    "password":password
  }

  const response = await instance
    .post("/api/user/login", payload, config);
  if (response.status===200) {
    
    localStorage.setItem("name", response.data.name);
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("role",response.data.role);
    localStorage.setItem("userId",response.data.user_id);
   
    
  }
  return response.data;
};


export default {
  login,
  
};