// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRole }) {
  const isAuth = localStorage.getItem("auth") === "true";
  const userRole = localStorage.getItem("role");

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && userRole !== allowedRole) {
    // 🚫 Block if user tries to access wrong panel
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
