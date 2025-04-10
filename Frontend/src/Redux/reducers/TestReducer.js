import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import secureLocalStorage from "react-secure-storage"
const getInitialCart = () => {
  const stored = secureLocalStorage.getItem("addedTests");
  return stored ? JSON.parse(stored) : [];
};
const saveToLocalStorage = (cart) => {
  secureLocalStorage.setItem("addedTests", JSON.stringify(cart));
};

export const getAllTest = createAsyncThunk("auth/getTest", async () => {
  try {
    const response = await fetch('http://localhost:5000/api/getTests/getAllTest', {
      method: "GET",
    });
    return response.json();
  } catch (err) {
    console.log(err)
  }
});

const testSlice = createSlice({
  name: "tests",
  initialState: {
    cart: getInitialCart(),
    allTests:[],
    loading: true,

  },
  reducers: {
    addTestToCart: (state, action) => {
      const exists = state.cart.some(test => test.test_id === action.payload.id);
      if (!exists) {
        state.cart.push(action.payload);
        toast.success("Item Added to Cart" , {autoClose:500})
        saveToLocalStorage(state.cart);
      }
    },
    removeTestFromCart: (state, action) => {
      state.cart = state.cart.filter(test => test.test_id !== action.payload);
      toast.error("Item Removed from Cart" , {autoClose:500})

      saveToLocalStorage(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      toast.info("Cart Cleared" , {autoClose:500})
      secureLocalStorage.removeItem("addedTests");
    },
  },
  extraReducers(builder){
    builder
    .addCase(getAllTest.pending, (state) => {
      state.loading = true;
    })
    .addCase(getAllTest.fulfilled, (state, action) => {
      state.allTests = action.payload;
      state.loading = false;
    })
    .addCase(getAllTest.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const {
  addTestToCart,
  removeTestFromCart,
  clearCart,
} = testSlice.actions;

export const selectCartItems = (state) => state.tests.cart;
export const allTestsName = (state)=>state.tests.allTests
export const  testloading = (state)=>state.tests.loading;
export const selectTotalPrice = (state) =>state.tests.cart.reduce((sum, test) => sum + parseFloat(test.test_price || 0), 0).toFixed(2);

export default testSlice.reducer;
