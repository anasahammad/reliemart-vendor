import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./reducers/userReducer";
import { cartReducer } from "./Cart";
import { wishlistReducer } from "./Wishlist";

// Retrieve user and vendor data from localStorage
const userInfoFromStorage = localStorage.getItem("vendorAccount")
  ? JSON.parse(localStorage.getItem("vendorAccount"))
  : null;


// Define the initial state
const initialState = {
  user: { userInfo: userInfoFromStorage },
  
};

// Configure the store with all reducers and initial state
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    
  },
  preloadedState: initialState, // Set the initial state
});

export default store;
