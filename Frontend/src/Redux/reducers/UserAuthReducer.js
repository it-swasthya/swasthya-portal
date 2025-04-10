import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const INTIAL_STATE = {
  isLogin: false,
  loading: false,
  error: null,
  success: false,
};

export const register = createAsyncThunk("auth/register", async (payload) => {
  console.log(payload)
  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify((payload)),
    });

    return response.json();
  } catch (err) {
    console.log(err)
  }
});
export const login = createAsyncThunk("auth/login", async (payload) => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify( payload ),
  });
  return response.json();
});

// export const getLoginUser = createAsyncThunk(
//   "auth/getAuth",
//   async (payload) => {
//     const response = await fetch("http://localhost:5000/api/auth/getAuth", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       credentials: "include",
//     });
//     return response.json();
//   }
// );

export const logOutUser = createAsyncThunk("auth/logOut", async (payload) => {
  const response = await fetch("http://localhost:5000/api/auth/logout", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });
  return response.json();
});

const userAuthSlice = createSlice({
  name: "auth",
  initialState: INTIAL_STATE,
  reducers: {
    getLoginUser(state, action){
      // if(Cookies.get('userToken')){
      //   state.isLogin=true
      // }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        toast.error(
          "Something Went Wrong Or May Be This Email Already exist..... Try Again", {autoClose:500}
        );
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action)
        toast.success( "Resgister Successfully! . please login" , {autoClose:500});
      })
      .addCase(login.rejected, (state, action) => {
        toast.error("Invalid Data" , {autoClose:500});
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLogin = true;; 
        toast.success("Login Successfully", {autoClose:500});
      })
      // .addCase(getLoginUser.fulfilled, (state, action) => {
      //   console.log(action.payload)
      //   if (action.payload) {
      //       state.isLogin = true;
      //     state.loading = false;
      //   }
      // })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isLogin = false;
        // Cooki/es.remove("userToken")
        toast.success("Logout Successfully",  {autoClose:500});
      });
  },
});
export  const {getLoginUser} = userAuthSlice.actions
export const userAuthReducer = userAuthSlice.reducer;
export const isLoggedIn = (state) => state.userAuthReducer.isLogin;
export const success = (state) => state.userAuthReducer.success;
export const loading = (state) => state.userAuthReducer.loading;
