import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../../slices/resslice";
import "./Profile.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function Profile() {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.restaurant);
  const [userProfile, setUserProfile] = useState(null);

  // Fetch users if not already fetched
  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  // Set the logged-in user's profile
  useEffect(() => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    if (!loggedInUserId) return;

    if (users.length > 0) {
      const user = users.find((u) => u.id.toString() === loggedInUserId);
      setUserProfile(user || null);
    }
  }, [users]);

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!userProfile) return <p>No profile found.</p>;

  // Prepare chart data
  const chartData = [
    { name: "Total Sales", value: Number(userProfile.totalSales || 0) },
    { name: "Total Orders", value: Number(userProfile.totalOrders || 0) },
  ];

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img
          src={userProfile.image || "https://i.pravatar.cc/150"}
          alt={userProfile.name}
          className="profile-avatar"
        />
        <h2>{userProfile.name}</h2>
        {userProfile.email && <p><strong>Email:</strong> {userProfile.email}</p>}
        <p><strong>Role:</strong> {userProfile.role}</p>
        {userProfile.code && <p><strong>Employee Code:</strong> {userProfile.code}</p>}
        {userProfile.contact && <p><strong>Contact:</strong> {userProfile.contact}</p>}
        {userProfile.salary && <p><strong>Salary:</strong> ₹{userProfile.salary}</p>}

        {/* Chart for Sales and Orders */}
        <div style={{ width: "100%", height: 300, marginTop: 20 }}>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
