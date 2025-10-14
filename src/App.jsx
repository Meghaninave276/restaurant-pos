import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SelectTable from './Components/AdminPanel/SelectTable/SelectTable';
import CustomerInfo from './Components/AdminPanel/CustomerInfo/CustomerInfo';
import EmployeeDashboard from './Components/AdminPanel/EmployeeDashboard/EmployeeDashboard';
import HeroSection from "./Components/HeroSection/HeroSection";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/select-table" element={<SelectTable />} />
        <Route path="/dashboards/customer-info" element={<CustomerInfo />} />
        <Route path="/dashboards/order" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}
