import { useSelector } from "react-redux";
import "./Orders.css";

export default function Orders() {
  const { orders } = useSelector((state) => state.restaurant);

  return (
    <div className="container py-4">
      <h1>Manager Panel - Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="list-group">
          {orders.map((order) => (
            <div key={order.time} className="list-group-item mb-3">
              <h5>Order ID: {order.time}</h5>
              <p>Customer: {order.customerInfo?.customerName}</p>
              <p>Table: {order.customerInfo?.tableNo}</p>
              <ul>
                {order.orderItems.map((item, idx) => (
                  <li key={idx}>
                    {item.food_name} x {item.qty} - ₹{item.price * item.qty}
                  </li>
                ))}
              </ul>
              <p>Total: ₹{order.total}</p>
              <p>Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
