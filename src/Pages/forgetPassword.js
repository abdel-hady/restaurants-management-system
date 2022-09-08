// import React from 'react';
import React, { useState, useEffect } from "react";
import "./forgetPassword.css";
import { Link } from "react-router-dom";
// import Logo from 'logo-chef.jfif'
import { useQuery, useMutation, gql } from "@apollo/client";
import swal from 'sweetalert'
import LoadingButton from '../Component/button';

const FORGET = gql`
  mutation ($email: String!) {
    resetemail(email: $email)
  }
`;

const ForgetPassword = () => {
  const [message, setmessage] = useState();
  const [resetPassword, { loading }] = useMutation(FORGET);
  const [formData, setformData] = useState({
    email: "",
  });
  const [load, setLoading] = useState();
  const [error, seterror] = useState();
  // if (loading) console.log("loading...");
  const themeDark = () => {
    document.body.classList.toggle("dark-theme");
  };
  useEffect(() => {
    if (loading) {
      setLoading(
        LoadingButton
      )
    }else{
      setLoading(
        <button className="button">Send</button>
      )
    }
  }, [loading]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.email);
    resetPassword({
      variables: {
        email: formData.email,
      },
    })
      .then((res) => {
        swal({
          title: "Success!",
          text: res.data.resetemail,
          icon: "success",
          button: "OK",
      });
      })
      .catch((err) => {
        seterror(
          err.graphQLErrors[0].extensions.validation.email.map(
            (error, index) => {
              return (
                <span className="error" key={index}>
                  {error}
                </span>
              );
            }
          )
        );
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
              <h1>Reset password</h1>
              <span className="welcome">
                Enter your email below, and we'll send you a link to reset your
                password.
              </span>
              <label>Email</label>
              <input
                type="text"
                onChange={(e) => {
                  setformData({
                    ...formData,
                    email: e.target.value,
                  });
                }}
                placeholder="Email"
              />
              {error}
              {load}
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
