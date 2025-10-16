import { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Utensils,
  BarChart2,
  Star,
  UserCheck,
  Settings,
  LogOut,
  MessageCircle,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const menuItems = [
  { label: "Menu Items", icon: <Utensils size={20} />, path: "/manager" },
  { label: "Orders", icon: <ClipboardList size={20} />, path: "/manager/orders" },
  { label: "Employees", icon: <Users size={20} />, path: "/manager/employees" },
  { label: "Reports", icon: <BarChart2 size={20} />, path: "/manager/reports" },
   { label: "Top Dishes", icon: <Star size={20} />, path: "/manager/topdishes" },

  { label: "Profile", icon: <UserCheck size={20} />, path: "/manager/profile" },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ must be inside component
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // ✅ logout handler inside component
  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""} ${darkMode ? "dark" : ""}`}>
      {/* Top Logo and Toggle */}
      <div className="sidebar-top">
        <div className="logo">{!collapsed && "LogoName"}</div>
        <button onClick={() => setCollapsed(!collapsed)} className="toggle-btn">
          ☰
        </button>
      </div>

      {/* Menu Items */}
      <div className="menu">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${isActive ? "active" : ""}`}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div className="bottom">
        <button className="menu-item" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          {!collapsed && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>

        <button className="menu-item logout" onClick={handleLogout}>
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
