import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../service/auth.service";
import photo from "../photos/c.jpg";
import "./login.css";

export default function UserLogin() {
  const navigate = useNavigate();
  const form = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    AuthService.login(username, password).then(
      () => {
        localStorage.setItem("isLoggedIn", true);
        navigate("/dashboard");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div>
      {<img src={photo} className="card-img-top rounded-3 " alt="..." style={{width:"1700px",height:"780px"}}/>}
      <div
        className="fullscreen-image"
        style={{ backgroundImage: `url(${photo})` }}
      ></div>

      
      <div className="login">
        <h2 className="text-center name">
          <b>Login in Magnetic Brains</b>
        </h2>

        <form onSubmit={handleLogin} ref={form}>
         
          <div className="mb-4">
            <label htmlFor="username" className="form-label">
              Email ID
            </label>
            <input
              type="email"
              id="username"
              placeholder="Enter your email"
              value={username}
              onChange={onChangeUsername}
              className="form-control"
              required
            />
          </div>

          
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={onChangePassword}
              className="form-control"
              required
            />
          </div>

         
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-success btn-block"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

         
          {message && (
            <div className="alert alert-danger text-center mt-3">{message}</div>
          )}
        </form>

       
        <div className="text-center mt-4">
          <p className="text-muted">
            Don’t have an account?{" "}
            <Link to="/Register" className="text-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
