// import React from 'react';
import React, { useState } from "react";
import "./forgetPassword.css";
import { Link } from "react-router-dom";
// import Logo from 'logo-chef.jfif'
import { useQuery, useMutation, gql } from "@apollo/client";

const RESET = gql`
  mutation ($email: String!) {
    resetemail(email: $email)
  }
`;

const ForgetPassword = () => {
  const [resetPassword, { data, loading, error }] = useMutation(RESET);
  const [formData, setformData] = useState({
    email: "",
  });
  if (error) console.log(error);
  if (loading) console.log("loading...");
  if (data) console.log(data);
  const themeDark = () => {
    document.body.classList.toggle("dark-theme");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.email)
    resetPassword({
      variables: {
        email: formData.email
      },
    });
  };
  return (
    <>
      <div className="forget-password">
        <div className="bg-defualt"></div>
        <div className="logo-form">
          <div className="logo" onClick={themeDark}>
            <img className="logo-chef" src="icons/chef.png" alt="logo-chef" />
            <div>Pizza</div>
          </div>
          <div className="form-icon">
              <form onSubmit={handleSubmit}>
                <h1>Forget password</h1>
                <span className="welcome">
                  Enter your email below, and we'll send you a link to
                  reset your password.
                </span>
                <label>Email</label>
                <input
                  type="email"
                  onChange={(e) => {
                    setformData({
                      ...formData,
                      email: e.target.value,
                    });
                  }}
                  placeholder="Email"
                />
                <span className="error">error</span>

                <button className="button">send</button>
                <Link to="/login" className="link">
                  Back to login
                </Link>
              </form>
            
          </div>
          <div className="copy-right">Pizza &copy; 2022</div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
