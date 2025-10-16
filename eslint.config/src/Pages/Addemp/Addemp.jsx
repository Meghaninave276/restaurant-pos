import React, { useState } from "react";
import axios from "axios";

export default function AddEmp() {
  const [emp, setEmp] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    salary: "",
    totalSales: "",
    totalOrders: "",
    code: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmp({ ...emp, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmp = { ...emp, role: "employee" };

    try {
      await axios.post("http://localhost:3000/users", newEmp);
      setSuccess("✅ Employee added successfully!");
      setError("");
      setEmp({
        name: "",
        email: "",
        password: "",
        contact: "",
        salary: "",
        totalSales: "",
        totalOrders: "",
        code: ""
      });
    } catch (err) {
      setError("❌ Failed to add employee.");
      setSuccess("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>➕ Add New Employee</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <input type="text" name="name" placeholder="Name" value={emp.name} onChange={handleChange} required /><br /><br />
        <input type="email" name="email" placeholder="Email" value={emp.email} onChange={handleChange} required /><br /><br />
        <input type="text" name="code" placeholder="Employee Code" value={emp.code} onChange={handleChange} required /><br /><br />
        <input type="password" name="password" placeholder="Password" value={emp.password} onChange={handleChange} required /><br /><br />
        <input type="text" name="contact" placeholder="Contact" value={emp.contact} onChange={handleChange} required /><br /><br />
        <input type="number" name="salary" placeholder="Salary" value={emp.salary} onChange={handleChange} required /><br /><br />
        <input type="number" name="totalSales" placeholder="Total Sales" value={emp.totalSales} onChange={handleChange} required /><br /><br />
        <input type="number" name="totalOrders" placeholder="Total Orders" value={emp.totalOrders} onChange={handleChange} required /><br /><br />

        <button type="submit">Add Employee</button>
      </form>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
