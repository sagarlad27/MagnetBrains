import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../redux/axiosInstance";
import swal from "sweetalert";
import photo from "../photos/c.jpg";
import "./login.css";

export default function Register() {
  const navigate = useNavigate();
  const { instance } = useAxiosInstance();
  const form = useRef();

  // State Management
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Input Handlers
  const onChangeName = (e) => setName(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const onChangeConfirmPassword = (e) => setConfirmpassword(e.target.value);

  // Registration Handler
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (password !== confirmpassword) {
      setLoading(false);
      setMessage("Passwords do not match");
      return;
    }

    // Validation for Email & Password
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Invalid email address");
      setLoading(false);
      return;
    }

    const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})/;
    if (!passwordRegex.test(password)) {
      setMessage(
        "Password must include at least one digit, one lowercase letter, one of #@$*, and be 5-20 characters long."
      );
      setLoading(false);
      return;
    }

    // API Payload
    const payload = {
      name: name,
      email: email,
      password: password,
    };

    instance
      .post("/api/user/register", payload)
      .then((response) => {
        console.log(response.data);
        swal(`${email} added successfully! Redirecting to Login...`);
        navigate("/login");
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        if (resMessage === "could not execute statement")
          setMessage("Email already exists. Please login.");
        else setMessage(resMessage);
      });
  };

  return (
    <div>
      {<img src={photo} className="card-img-top rounded-3 " alt="..." style={{width:"1700px",height:"780px"}}/>}
      <div
        className="fullscreen-image"
        style={{ backgroundImage: `url(${photo})` }}
      ></div>

      {/* Registration Form */}
      <div className="register">
        <h2 className="text-center name">
          <b>To Be a part of Magnet Brains Family</b>
        </h2>

        <form onSubmit={handleRegister} ref={form}>
          {/* Name Field */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={onChangeName}
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={onChangeEmail}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={onChangePassword}
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Re-enter your password"
              value={confirmpassword}
              onChange={onChangeConfirmPassword}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-success btn-block"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          {/* Error Message */}
          {message && (
            <div className="alert alert-danger mt-3 text-center">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
}
