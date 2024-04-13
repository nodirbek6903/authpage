import React, { useState } from "react";
import {
  FaLock,
  FaEyeSlash,
  FaEye,
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import {auth} from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login successful");
        navigate("/");
      })
      .catch((error) => {
        if(error.code === "auth/invalid-credential" || error.code === "auth/user-not-found"){
          toast.error("Email yoki parolni noto'g'ri kiritdingiz!")
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
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-body">
                <h3 className="text-center mb-4">Login</h3>
                <hr />
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
                      onChange={handleEmailChange} required
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
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      required
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
                </div>
                <div className="mb-3 d-flex justify-content-between">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember Me
                    </label>
                  </div>
                  <div>
                    <a href="/forgotpassword" className="text-decoration-none">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary" onClick={handleLogin}>
                    Login
                  </button>
                </div>
                <hr />
                <div className="d-grid gap-2">
                  <div className="text-center">Or login with:</div>
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-danger me-2">
                      <FaGoogle />
                    </button>
                    <button className="btn btn-outline-dark me-2">
                      <FaGithub />
                    </button>
                    <button className="btn btn-outline-primary me-2">
                      <FaFacebook />
                    </button>
                    <button className="btn btn-outline-info">
                      <FaTwitter />
                    </button>
                  </div>
                </div>
                <div className="d-grid">
                  <p className="text-center mt-3">
                    Don't have an account?
                    <a href="/register" className="text-decoration-none">
                      Register
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
