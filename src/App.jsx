import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HeroSection from "./Components/heroSection/HeroSection";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

// 👑 Manager
import Managers from "./Screen/Managers/Manager";
import "./App.css";

// 👷 Employee (Waiter)
import EmployeeDashboard from "./Components/WaiterPanel/EmployeeFlow/EmployeeDashboard";
import SelectTable from "./Components/WaiterPanel/SelectTable/SelectTable";
import CustomerInfo from "./Components/WaiterPanel/CustomerInfo/CustomerInfo";
import TakeOrder from "./Components/WaiterPanel/TakeOrder/TakeOrder";
import UpdateStatus from "./Components/WaiterPanel/UpdateStatus/UpdateStatus";
import ModifyOrder from "./Components/WaiterPanel/ModifyOrder/ModifyOrder";
import GenerateInvoice from "./Components/WaiterPanel/GenerateInvoice/GenerateInvoice";

import Profile from "./Components/WaiterPanel/Profile/Profile";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🏠 Public */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<Login />} />

        {/* 👑 Manager - Protected */}
        <Route element={<ProtectedRoute allowedRole="manager" />}>
          <Route path="/manager/*" element={<Managers />} />
        </Route>

        {/* 👷 Employee (Waiter) - Protected */}
       


        <Route element={<ProtectedRoute allowedRole="employee" />}>
  <Route path="/dashboard" element={<EmployeeDashboard />}>
    <Route index element={<SelectTable />} />
    <Route path="select-table" element={<SelectTable />} />
    <Route path="customer-info" element={<CustomerInfo />} />
    <Route path="take-order" element={<TakeOrder />} />
    <Route path="update-order" element={<UpdateStatus />} />  
     <Route path="modify-order" element={<ModifyOrder />} />
            <Route path="invoice" element={<GenerateInvoice />} />
            <Route path="profile" element={<Profile />} />
 
  </Route>
</Route>

        {/* 🚫 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
