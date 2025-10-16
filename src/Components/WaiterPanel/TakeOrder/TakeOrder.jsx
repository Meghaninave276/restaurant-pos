import React, { useState, useEffect } from "react";
import { Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu, addOrder } from "../../../slices/resslice";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TakeOrder.css";

export default function TakeOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menu, isLoading } = useSelector((state) => state.restaurant);

  const [activeCategory, setActiveCategory] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customerInfo, setCustomerInfo] = useState(null);

  // Load menu and customer info
  useEffect(() => {
    dispatch(fetchMenu());
    const savedCustomer = JSON.parse(localStorage.getItem("customerInfo"));
    if (savedCustomer) setCustomerInfo(savedCustomer);
  }, [dispatch]);

  // Update customer info on storage change
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCustomer = JSON.parse(localStorage.getItem("customerInfo"));
      setCustomerInfo(updatedCustomer);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Dynamically get categories
  const categories = Array.from(new Set(menu.map((item) => item.category)));
  const formattedMenu = categories.reduce((acc, cat) => {
    acc[cat] = menu.filter((item) => item.category === cat);
    return acc;
  }, {});

  // Set default active category
  useEffect(() => {
    if (!activeCategory && categories.length > 0) setActiveCategory(categories[0]);
  }, [categories, activeCategory]);

  // Filter menu by search or category
  const filteredData = searchTerm
    ? categories.reduce((acc, cat) => {
        const filtered = formattedMenu[cat]?.filter((item) =>
          item.food_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filtered.length > 0) acc[cat] = filtered;
        return acc;
      }, {})
    : { [activeCategory]: formattedMenu[activeCategory] || [] };

  // Add/update/remove items in order
  const handleAdd = (item) => {
    const existing = orderItems.find((i) => i.food_name === item.food_name);
    if (existing) {
      setOrderItems(orderItems.map((i) =>
        i.food_name === item.food_name ? { ...i, qty: i.qty + 1 } : i
      ));
    } else {
      setOrderItems([...orderItems, { ...item, qty: 1 }]);
    }
  };

  const updateQty = (name, change) => {
    setOrderItems(prev =>
      prev
        .map(item => item.food_name === name ? { ...item, qty: Math.max(1, item.qty + change) } : item)
        .filter(item => item.qty > 0)
    );
  };

  const removeItem = (name) => {
    setOrderItems(orderItems.filter(i => i.food_name !== name));
  };

  const total = orderItems.reduce((acc, i) => acc + i.price * i.qty, 0);

  // Place order
  const handlePlaceOrder = () => {
    if (!customerInfo) return alert("Please add customer info first!");
    if (orderItems.length === 0) return alert("Add at least one item!");

    const orderData = {
      customerInfo,
      orderItems,
      total,
      tableId: customerInfo.tableNo,
      status: "Pending",
      time: new Date().toLocaleString(),
    };

    dispatch(addOrder(orderData));
    alert(`🧾 Order placed successfully for ${customerInfo.customerName}!`);
    setOrderItems([]);
    navigate("/dashboard/update-order");
  };

  if (isLoading) return <h4 className="text-center mt-5">Loading menu...</h4>;

  return (
    <div className="royal-menu-wrapper">
      <Container fluid>
        <div className="takeorder-title">
          <h2>🍽️ Take New Order</h2>
          <p>Search dishes, add items, and place customer orders easily.</p>
        </div>

        {/* Category Tabs + Search */}
        <div className="category-search-container">
          <Nav variant="tabs" className="royal-tabs">
            {categories.map((cat) => (
              <Nav.Item key={cat}>
                <Nav.Link
                  active={activeCategory === cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setSearchTerm("");
                  }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          <input
            type="text"
            placeholder="🔍 Search dishes..."
            className="menu-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Menu Layout */}
        <div className="menu-layout">
          <div className="menu-section">
            {Object.keys(filteredData).map((cat) => (
              <div key={cat} className="category-section">
                {searchTerm && <h5 className="found-category">🍛 {cat.charAt(0).toUpperCase() + cat.slice(1)}</h5>}
                {filteredData[cat].length === 0 ? (
                  <p className="text-muted text-center">No dishes found...</p>
                ) : (
                  filteredData[cat].map((item) => (
                    <div key={item.id} className="menu-card fade-in">
                      <img src={item.image1} alt={item.food_name} className="menu-img" />
                      <div className="menu-text">
                        <h5 className="menu-name">{item.food_name}</h5>
                        <p className="menu-desc">{item.description}</p>
                      </div>
                      <div className="menu-action">
                        <span className="menu-price">₹{item.price}</span>
                        <Button variant="warning" className="add-btn" onClick={() => handleAdd(item)}>
                          <i className="ri-add-circle-line me-1"></i>Add
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="order-summary-card">
            <h4>🧾 Order Summary</h4>
            {customerInfo ? (
              <div className="summary-customer">
                <p><strong>Customer:</strong> {customerInfo.customerName}</p>
                <p><strong>Table:</strong> {customerInfo.tableNo}</p>
                <p><strong>Phone:</strong> {customerInfo.phone}</p>
                {customerInfo.specialRequest && <p><strong>Note:</strong> {customerInfo.specialRequest}</p>}
                <hr />
              </div>
            ) : <p className="text-muted">No customer info yet.</p>}

            {orderItems.length === 0 ? (
              <p className="text-muted">No items added yet.</p>
            ) : orderItems.map((item) => (
              <div key={item.food_name} className="summary-item">
                <div className="summary-left">
                  <strong>{item.food_name}</strong>
                  <div className="summary-controls">
                    <Button size="sm" variant="outline-warning" onClick={() => updateQty(item.food_name, -1)}>-</Button>
                    <span className="mx-2">{item.qty}</span>
                    <Button size="sm" variant="outline-warning" onClick={() => updateQty(item.food_name, 1)}>+</Button>
                  </div>
                </div>
                <div className="summary-right">
                  <span>₹{item.price * item.qty}</span>
                  <Button size="sm" variant="outline-danger" onClick={() => removeItem(item.food_name)}>
                    <i className="ri-delete-bin-line"></i>
                  </Button>
                </div>
              </div>
            ))}

            <hr />
            <h5>Total: ₹{total}</h5>
            <Button
              variant="warning"
              className="w-100 mt-2 place-btn"
              disabled={orderItems.length === 0 || !customerInfo}
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
