import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resmenu, resuser } from "../../slices/resslice";
import "./Dashboard.css";

export default function Dashboardcard() {
  const dispatch = useDispatch();
  const { res, isLoading, error } = useSelector((state) => state.menu);

  // State to track the selected category and search query
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(resmenu());
    dispatch(resuser());
  }, [dispatch]);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter button click
  const handleFilterClick = () => {
    // No additional filtering logic needed here, it's done on the fly
  };

  // Filter the menu items based on the selected category and search query
  const filteredMenu = res.filter((item) => {
    // Filter by category
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
    // Filter by search query (case-insensitive)
    const searchMatch = item.food_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="dashboard-container">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="main-content">
        <div className="search">
          <div className="s">
            <input
              type="text"
              placeholder="Search food"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button onClick={handleFilterClick}>Filter</button>
          </div>
        </div>

        {/* Categories */}
        <div className="categories">
          {["All", "Pizza", "Non-Veg", "Drinks", "Burger", "Chinese", "Paneer", "Dessert", "Starter", "Cucumber", "Biryani"].map((cat, i) => (
            <button
              key={i}
              className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Cards */}
        <div className="menu-grid">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((r, index) => (
              <div key={index} className="menu-card">
                <img src={r.image1} alt={r.food_name} className="menu-img" />
                <h3 className="menu-title">{r.food_name}</h3>
                <p className="menu-desc">{r.description}</p>
                <div className="menu-price">${r.price}</div>
                <button className="order-btn">View More</button>
              </div>
            ))
          ) : (
            <p>No items found matching your search.</p>
          )}
        </div>
      </main>

      {/* Invoice */}
    </div>
  );
}
