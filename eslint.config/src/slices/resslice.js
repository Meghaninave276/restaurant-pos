import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch menu items
export const fetchMenu = createAsyncThunk("restaurant/fetchMenu", async () => {
  const res = await axios.get("http://localhost:3000/menu");
  return res.data;
});

// Async thunk to fetch users (optional)
export const fetchUsers = createAsyncThunk("restaurant/fetchUsers", async () => {
  const res = await axios.get("http://localhost:3000/users");
  return res.data;
});

const resSlice = createSlice({
  name: "restaurant",
  initialState: {
    menu: [],
    users: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addMenuItem: (state, action) => {
      state.menu.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.menu = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export const { addMenuItem } = resSlice.actions;
export default resSlice.reducer;
