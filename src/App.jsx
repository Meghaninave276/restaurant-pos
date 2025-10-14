import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// ✅ Import components
import HeroSection from "./Components/HeroSection/HeroSection";
import EmployeeDashboard from "./Components/AdminPanel/EmployeeDashboard/EmployeeDashboard";
import SelectTable from "./Components/AdminPanel/SelectTable/SelectTable";
import CustomerInfo from "./Components/AdminPanel/CustomerInfo/CustomerInfo";
import Order from "./Components/AdminPanel/Order/Order";

 function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<HeroSection />} />

        {/* Dashboard Routes */}
        <Route path="/dashboards" element={<EmployeeDashboard />}>
          <Route path="select-table" element={<SelectTable />} />
          <Route path="customer-info" element={<CustomerInfo />} />
          <Route path="order" element={<Order />} />
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
   
  );
}
export default App;