import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom'; // Nhập Router từ react-router-dom
import "./index.css";
import App from "./App";

// Bao bọc ứng dụng bên trong Router để sử dụng được điều hướng và loading
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router> 
      <App />
    </Router>
  </React.StrictMode>
);
