import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../firebase/config";
import { getAuth, sendPasswordResetEmail, updatePassword } from "firebase/auth";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const forgotHandler = () => {
    sendPasswordResetEmail(getAuth(), email)
      .then(() => {
        setShowModal(true);
      })
      .catch((error) => alert(error.message));
  };

  const resetPassword = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    updatePassword(user, newPassword)
      .then(() => {
        alert("Password updated successfully");
        setShowModal(false);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h3 className="text-center mb-4">Forgot Password</h3>
              <p className="text-center text-muted">
                Please enter your email address. We'll send you a password reset
                link.
              </p>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                <div className="d-grid">
                  <button
                    type="button"
                    onClick={forgotHandler}
                    className="btn btn-primary"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reset Password</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter your new password"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-primary" onClick={resetPassword}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
