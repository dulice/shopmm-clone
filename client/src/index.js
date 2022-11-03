import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./features/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import productApi from "./api/productApi";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navigation/Navigation";
import { BrowserRouter } from "react-router-dom"; 
import PerfectScrollbar from "react-perfect-scrollbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApiProvider api={productApi}>
      <Provider store={store}>
        <ToastContainer position="top-center" autoClose={3000} />
        <BrowserRouter>
          <Navigation />
          <PerfectScrollbar>
            <App />
            <Footer />
          </PerfectScrollbar>
        </BrowserRouter>
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
