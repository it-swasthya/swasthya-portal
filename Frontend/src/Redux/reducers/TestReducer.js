import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getInitialCart = () => {
  const stored = localStorage.getItem("addedTests");
  return stored ? JSON.parse(stored) : [];
};

const saveToLocalStorage = (cart) => {
  localStorage.setItem("addedTests", JSON.stringify(cart));
};

const testSlice = createSlice({
  name: "tests",
  initialState: {
    cart: getInitialCart(),
  },
  reducers: {
    addTestToCart: (state, action) => {
      const exists = state.cart.some(test => test.id === action.payload.id);
      if (!exists) {
        state.cart.push(action.payload);
        toast.success("Item Added to Cart" , {autoClose:500})
        saveToLocalStorage(state.cart);
      }
    },
    removeTestFromCart: (state, action) => {
      state.cart = state.cart.filter(test => test.id !== action.payload);
      toast.error("Item Removed from Cart" , {autoClose:500})

      saveToLocalStorage(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      toast.info("Cart Cleared" , {autoClose:500})
      localStorage.removeItem("addedTests");
    },
  },
});

export const {
  addTestToCart,
  removeTestFromCart,
  clearCart,
} = testSlice.actions;

export const selectCartItems = (state) => state.tests.cart;

export const selectTotalPrice = (state) =>
  state.tests.cart.reduce((sum, test) => sum + parseFloat(test.price || 0), 0).toFixed(2);

export default testSlice.reducer;
