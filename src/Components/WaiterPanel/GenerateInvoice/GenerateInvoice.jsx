import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./GenerateInvoice.css";

export default function GenerateInvoice() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const invoiceRef = useRef();

  // ✅ Load order from localStorage
  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("modifyOrder"));
    if (savedOrder) setOrder(savedOrder);
  }, []);

  // ✅ Generate PDF
  const handlePrint = async () => {
    if (!invoiceRef.current) return;

    const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice_${order.customerInfo?.customerName || "Order"}.pdf`);
  };

  if (!order) return <p>Loading invoice...</p>;

  return (
    <div className="invoice-page">
      <div className="invoice-card" ref={invoiceRef}>
        <h2>🧾 Invoice</h2>
        <div className="invoice-info">
          <p><b>Customer:</b> {order.customerInfo?.customerName}</p>
          <p><b>Phone:</b> {order.customerInfo?.phone}</p>
          <p><b>Table:</b> {order.customerInfo?.tableNo}</p>
          <p><b>Date:</b> {new Date(order.time).toLocaleString()}</p>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item, idx) => (
              <tr key={idx}>
                <td>{item.food_name}</td>
                <td>{item.qty}</td>
                <td>₹{item.price}</td>
                <td>₹{item.price * item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoice-total">
          <strong>Grand Total: ₹{order.total}</strong>
        </div>

        <p className="thank-you">🙏 Thank you for dining with us!</p>
      </div>

      <div className="invoice-actions">
        <button className="print-btn" onClick={handlePrint}>🖨️ Print / Save PDF</button>
        <button className="back-btn" onClick={() => navigate(-1)}>↩ Back</button>
      </div>
    </div>
  );
}
