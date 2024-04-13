import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import {auth} from "../firebase/config"
import {createUserWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import jwt from "jsonwebtoken"

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError,setPasswordError] = useState("")
  const navigate = useNavigate()

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword)
    setPasswordError(validatePassword(newPassword))
  };
  const validatePassword = (password) => {
    if(password.length < 8){
      return "Parol kamida 8 belgidan ko'p bo'lishi kerak";
    }
    if(!/[A-Z]/.test(password)){
      return "Parolda kamida bitta bosh harf bo'lishi kerak!"
    }
    if(!/\d/.test(password)){
      return "Parolda kamida bitta raqam bo'lishi kerak!"
    }
    return null
  }

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    // passwordni tekshirish
    const passwordError = validatePassword(password)
    if(passwordError){
      return
    }
// user yaratish
    console.log(email,password);
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
      // const token = jwt.sign({email: email, password: password},"secret123")
      localStorage.setItem("token",userCredential._tokenResponse.idToken)
      toast.success("Muvaffaqqiyatli Ro'yxatdan o'tdingiz")
      navigate("/")
    })
    .catch((error) => {
      if(error.code === "auth/email-already-in-use"){
        toast.error("Email already in use")
      }else if(error.code ==="auth/network-request-failed"){
        toast.error("Network error!")
      }
      else{
        toast.error(error.message)
      }
    });
  };

  const passwordType = showPassword ? "text" : "password";

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h3 className="text-center mb-4">Register</h3>
              <hr />
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaLock />
                  </span>
                  <input
                    type={passwordType}
                    className={`form-control ${passwordError && "is-invalid"}`}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {passwordError && (
                  <div className="">
                    <span style={{color:"red"}}>{passwordError}</span>
                  </div>
                )}
              </div>
              <div className="d-grid">
                <button className="btn btn-primary" onClick={handleRegister}>
                  Register
                </button>
              </div>
              <div className="d-grid">
                <p className="text-center mt-3">
                  Already have an account? <a href="/login" className="text-decoration-none">Login</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
