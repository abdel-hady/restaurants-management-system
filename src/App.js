import React, { useState, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/login";
import ForgetPassword from "./Pages/forgetPassword";
import ResetPassword from "./Pages/resetPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword/>} />
        <Route path="/resturant_api/public/api/admin/changepassword/:token" element={<ResetPassword/>} />
      </Routes>
    </Router>
  );
}

export default App;
