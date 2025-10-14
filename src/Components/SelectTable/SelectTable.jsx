import React from "react";
import { useNavigate } from "react-router-dom";

export default function SelectTable() {
  const navigate = useNavigate();

  const handleSelect = (tableNumber) => {
    // Pass table info to CustomerInfo
    navigate("/dashboard/customer-info", { state: { table: tableNumber } });
  };

  return (
    <div>
      <h2>Select a Table</h2>
      <button onClick={() => handleSelect(1)}>Table 1</button>
      <button onClick={() => handleSelect(2)}>Table 2</button>
      <button onClick={() => handleSelect(3)}>Table 3</button>
    </div>
  );
}
