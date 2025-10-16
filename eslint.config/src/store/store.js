import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from '../slices/resslice'

const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
  },
});

export default store;
