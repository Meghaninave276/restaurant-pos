import React from "react";
import { useLocation } from "react-router-dom";

export default function Order() {
  const { state } = useLocation();

  return (
    <div>
      <h2>Order Summary</h2>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
