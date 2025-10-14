import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/select-table" />} />

        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<Employ />}>
          <Route path="select-table" element={<SelectTable />} />
          <Route path="customer-info" element={<CustomerInfo />} />
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
