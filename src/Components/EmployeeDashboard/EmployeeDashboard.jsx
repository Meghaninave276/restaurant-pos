import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function EmployeeDashboard() {
  return (
    <div>
      <header style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <h1>Employee Dashboard</h1>
        <nav>
          <Link to="select-table" style={{ marginRight: "10px" }}>
            Select Table
          </Link>
          <Link to="customer-info">Customer Info</Link>
        </nav>
      </header>

      <main style={{ padding: "20px" }}>
        {/* Nested routes will render here */}
        <Outlet />
      </main>
    </div>
  );
}
