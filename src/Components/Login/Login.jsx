import React, { useState } from "react";
import "./Login.css";
import "remixicon/fonts/remixicon.css";

export default function Login() {
  const [role, setRole] = useState(""); // Manager / Employee
  const [email, setEmail] = useState("");
  const [empCode, setEmpCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy login logic (for demo)
    if (role === "manager" && email === "manager@urbanspice.com" && password === "admin123") {
      alert("Manager login successful!");
      setError("");
    } else if (role === "employee" && empCode === "EMP001" && password === "waiter123") {
      alert("Employee login successful!");
      setError("");
    } else {
      setError("Invalid credentials or role selection.");
    }
  };

  return (
    <div className="container">
      {/* === Top-right role selector === */}
      <div className="user">
        <label htmlFor="employee">
          <i className="ri-user-line"></i>
        </label>

        <select
          name="employee"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>
      </div>

      {/* === Left Image === */}
      <div className="box image-box">
        <img
          src="https://i.pinimg.com/1200x/38/ff/f2/38fff2e22ade43bf0dc566adf7699bc1.jpg"
          alt="Login Illustration"
        />
      </div>

      {/* === Right Form === */}
      <div className="box form-box">
        {role === "" ? (
          <>
            <h2>Welcome</h2>
            <p className="subtitle">Please select your role to continue.</p>
          </>
        ) : (
          <>
            <h2>{role === "manager" ? "Manager Login" : "Employee Login"}</h2>
            <p className="subtitle">Please enter your credentials below.</p>

            <form onSubmit={handleSubmit}>
              {role === "manager" && (
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter manager email"
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
                    placeholder="Enter employee code"
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="error">{error}</p>}

              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
