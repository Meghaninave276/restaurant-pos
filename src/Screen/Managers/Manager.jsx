import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Addmenu from "../../Pages/Addmenu/Addmenu";
import Orders from "../../Pages/Orders/Orders";
import Emp from "../../Pages/Emp/Emp";
import Reports from "../../Pages/Reports/Reports";
import Profile from "../../Pages/Profile/Profile";  // <-- Import Profile
import TopDishes from "../../Pages/Topdishes/Topdishes";
import "./Manager.css";

export default function Managers() {
  return (
  <div className="managers-container">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Addmenu />} />
          <Route path="orders" element={<Orders />} />
          <Route path="employees" element={<Emp />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<h1>Settings Page</h1>} />
          <Route path="profile" element={<Profile />} />
          <Route path="Topdishes" element={<TopDishes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
