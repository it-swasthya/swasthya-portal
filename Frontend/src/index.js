import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from 'react-redux';
import store from './Redux/store/Store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
  <Provider store={store}>
  <ToastContainer style={{zIndex:'100000'}}/>
    <App />
    </Provider>
  </StrictMode>
  
);

