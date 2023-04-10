/**
=========================================================
* Shopmm Admin Dashboard MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "assets/css/index.css";

// Soft UI Context Provider
import { ArgonControllerProvider } from "context";

// react-perfect-scrollbar component
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-toastify/dist/ReactToastify.css";

// react-perfect-scrollbar styles
import "react-perfect-scrollbar/dist/css/styles.css";
import { Provider } from "react-redux";
import store from 'features/Store';
import { ToastContainer } from "react-toastify";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

const container = document.getElementById("root");
const root = createRoot(container);

if(process.env.NODE_ENV === 'production') disableReactDevTools();

root.render(
  <Provider store={store} >
    <BrowserRouter>
      <ArgonControllerProvider>
        <ToastContainer position="top-center" />
        <PerfectScrollbar>
          <App />
        </PerfectScrollbar>
      </ArgonControllerProvider>
    </BrowserRouter>
  </Provider>
);
