import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch menu from API
export const fetchMenu = createAsyncThunk("restaurant/fetchMenu", async () => {
  const res = await axios.get("http://localhost:3000/menu");
  return res.data;
});

// Fetch users from API
export const fetchUsers = createAsyncThunk("restaurant/fetchUsers", async () => {
  const res = await axios.get("http://localhost:3000/users");
  return res.data;
});

// Load saved orders from localStorage
const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    menu: [],
    users: [],
    currentUser: null,
    orders: savedOrders,
    isLoading: false,
    error: null,
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
    removeOrder: (state, action) => {
      state.orders.splice(action.payload, 1);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },
    updateOrderStatus: (state, action) => {
      const { index, newStatus } = action.payload;
      if (state.orders[index]) {
        state.orders[index].status = newStatus;
        localStorage.setItem("orders", JSON.stringify(state.orders));
      }
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addMenuItem: (state, action) => {
      state.menu.push(action.payload);
    },
    updateMenuItem: (state, action) => {
      const index = state.menu.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state.menu[index] = action.payload;
    },
    deleteMenuItem: (state, action) => {
      state.menu = state.menu.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => { state.isLoading = true; })
      .addCase(fetchMenu.fulfilled, (state, action) => { state.menu = action.payload; state.isLoading = false; })
      .addCase(fetchMenu.rejected, (state, action) => { state.error = action.error.message; state.isLoading = false; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.users = action.payload; });
  },
});

export const {
  addOrder,
  removeOrder,
  updateOrderStatus,
  setCurrentUser,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
