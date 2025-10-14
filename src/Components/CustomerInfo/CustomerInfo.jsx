import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function CustomerInfo() {
  const location = useLocation();
  const navigate = useNavigate();

  const table = location.state?.table || "Not Selected";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      alert("Please fill all required fields.");
      return;
    }

    console.log("Customer Info:", { ...form, table });

    // Navigate to next page (Order) with state
    navigate("/dashboard/order", { state: { ...form, table } });
  };

  return (
    <div>
      <h2>Customer Info</h2>
      <p>Table Selected: {table}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Next ➡️</button>
      </form>
    </div>
  );
}
