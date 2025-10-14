// import './App.css'
// // import Home from './Components/Home/Home'
// // import LoginPage from './Components/Login/Login'
// import Login from './Components/Login/Login'
// // import Dashboard from './Components/Dashboard/Dashboard'
// import { Routes, Route, useNavigate, Link } from 'react-router-dom';
// import HeroSection from './Components/heroSection/HeroSection'
// import SelectTable from './Components/Admin Panel/ EmployeeFlow/SelectTable/SelectTable';
// import CustomerInfo from './Components/Admin Panel/ EmployeeFlow/CustomerInfo/CustomerInfo';
// import EmployeeDashboard from './Components/Admin Panel/ EmployeeFlow/EmployeeDashboard';


// function App() {


//   return (
// <>

// <SelectTable />
//     <Routes>
//       {/* <Route path="/" element={<HeroSection />} />
//       <Route path="/login" element={<Login />} /> */}

//     <Route path="/customer/:tableId" element={<CustomerInfo />} />

//     </Routes>



// </>

//   )
// }

// export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HeroSection from './Components/heroSection/HeroSection'
import Login from './Components/Login/Login'

import EmployeeDashboard from "./Components/Waiter Panel/ EmployeeFlow/EmployeeDashboard";

import SelectTable from "./Components/Waiter Panel/SelectTable/SelectTable";
import CustomerInfo from "./Components/Waiter Panel/CustomerInfo/CustomerInfo";
import TakeOrder from "./Components/Waiter Panel/TakeOrder/TakeOrder";
import UpdateStatus from './Components/Waiter Panel/UpdateStatus/UpdateStatus';
import GenerateInvoice from './Components/Waiter Panel/GenerateInvoice/GenerateInvoice';
import History from './Components/Waiter Panel/History/History';
import ModifyOrder from "./Components/Waiter Panel/ModifyOrder/ModifyOrder";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* 🏠 Home Page */}
        <Route path="/" element={<HeroSection />} />

        {/* 🔐 Login Page */}
        <Route path="/login" element={<Login />} />

        {/* 🧑‍🍳 Waiter Dashboard Layout */}
        <Route path="/dashboard" element={<EmployeeDashboard />}>
          {/* ✅ Default page when opening dashboard */}
          <Route index element={<SelectTable />} />

          {/* 📋 Sidebar Menu Routes */}
          <Route path="select-table" element={<SelectTable />} />
          <Route path="customer-info" element={<CustomerInfo />} />
          <Route path="take-order" element={<TakeOrder />} />
          <Route path="update-order" element={<UpdateStatus />} />
          <Route path="Modify-Order" element={<ModifyOrder />} />
          <Route path="invoice" element={<GenerateInvoice />} />
          <Route path="history" element={<History />} />
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>

        {/* 🚫 Unknown route → Redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
