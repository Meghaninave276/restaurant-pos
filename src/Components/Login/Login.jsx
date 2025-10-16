import React, { useState, useEffect } from "react";
import "./Login.css";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../slices/resslice";
import imgo1 from "../../assets/img/login-img/login-img2.png";

export default function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [empCode, setEmpCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, isLoading, error: apiError } = useSelector(
    (state) => state.restaurant
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const matchedUser = users.find((user) => {
      if (role === "manager") {
        return (
          user.role === "manager" &&
          user.email === email &&
          user.password === password
        );
      } else if (role === "employee") {
        return (
          user.role === "employee" &&
          user.code === empCode &&
          user.password === password
        );
      }
      return false;
    });

 if (matchedUser) {
  alert(`✅ ${role.toUpperCase()} Login Successful!`);
  setError("");

  // 🔐 Save Auth Flags
  localStorage.setItem("auth", "true");
  localStorage.setItem("role", matchedUser.role);
  localStorage.setItem("loggedInUserId", matchedUser.id.toString());
  localStorage.setItem("loggedInUserRole", matchedUser.role);

  if (matchedUser.role === "manager") {
    navigate("/manager");
  } else {
    navigate("/dashboard");
  }
} else {
      setError("❌ Invalid credentials or wrong role selected.");
    }
  };

  return (
    <div className="single-login-page">
      <div className="login-card">
        <div className="branding-content">
          <img src={imgo1} alt="Logo" className="branding-logo" />
          <p className="branding-tagline">Experience Royal Dining at its Finest</p>
        </div>

        {/* Role selection */}
        <div className="role-selection-group">
          <i className="ri-user-settings-line role-icon"></i>
          <select
            className="role-select-dropdown"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setError("");
              setEmail("");
              setEmpCode("");
              setPassword("");
            }}
          >
            <option value="">Select Role</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        {role && (
          <form onSubmit={handleSubmit} className="login-form">
            {role === "manager" && (
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="manager@urbanspice.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}

            {role === "employee" && (
              <div className="input-group">
                <label>Employee Code</label>
                <input
                  type="text"
                  placeholder="e.g. EMP001"
                  value={empCode}
                  onChange={(e) => setEmpCode(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            {apiError && <p className="error-message">API Error: {apiError}</p>}

            <button type="submit" className="login-submit-btn">
              <i className="ri-login-box-line btn-icon"></i> Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
