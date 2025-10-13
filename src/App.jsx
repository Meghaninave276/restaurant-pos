import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EmployeeDashboard from "./Components/AdminPanel/EmployeeFlow/EmployeeDashboard";

import CustomerInfo from "./Components/AdminPanel/CustomerInfo/CustomerInfo";
import Screen from "./Screens/Screen";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/select-table" />} />
        <Route path="/dashboard" element={<EmployeeDashboard />}>
          <Route path="select-table" element={<SelectTable />} />
          <Route path="customer-info" element={<CustomerInfo />} />
          <Route path="/" element={<Screen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
