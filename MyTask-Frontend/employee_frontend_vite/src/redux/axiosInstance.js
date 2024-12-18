import axios from 'axios';
//import { useSelector } from 'react-redux';

function useAxiosInstance() {
  //const token = useSelector((state) => state.auth.token);
  const token = localStorage.getItem("token");
  //alert("JWT :"+token);

  const instance = axios.create({
    baseURL: 'http://localhost:5000',
  });

  instance.interceptors.request.use((config) => {
     if (token)
     {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return { instance };
}

export default useAxiosInstance;
