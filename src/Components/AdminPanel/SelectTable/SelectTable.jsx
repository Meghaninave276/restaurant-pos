import React from "react";
import { useNavigate } from "react-router-dom";

export default function SelectTable() {
  const navigate = useNavigate();

  const handleSelect = (tableNumber) => {
    navigate("/dashboards/customer-info", { state: { table: tableNumber } });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Select a Table</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
        <button onClick={() => handleSelect(1)}>Table 1</button>
        <button onClick={() => handleSelect(2)}>Table 2</button>
        <button onClick={() => handleSelect(3)}>Table 3</button>
      </div>
    </div>
  );
}
