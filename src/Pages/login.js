import React, { useEffect, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
// import Logo from 'logo-chef.jfif'
import { useQuery, useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import LoadingButton from '../Component/button'
const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      token_info {
        access_token
        refresh_token
      }
    }
  }
`;
const Login = () => {
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();
  const [passwordType, setPasswordType] = useState("password");
  const [checked, setChecked] = React.useState(false);
  const [loginUser, { data, loading, error }] = useMutation(LOGIN);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [load, setLoading] = useState();
  const [errors, seterrors] = useState({
    email: "",
    password: "",
  });

  const themeDark = () => {
    document.body.classList.toggle("dark-theme");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    seterrors({
      email: "",
      password: "",
    });
    loginUser({
      variables: {
        email: formData.email,
        password: formData.password,
      },
    });
    if (checked) {
      localStorage.setItem("user", JSON.stringify(formData));
    }
  };
  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    if (localStorage.getItem("user")) {
      email.value = JSON.parse(localStorage.getItem("user")).email;
      password.value = JSON.parse(localStorage.getItem("user")).password;
      setformData({ email: email.value, password: password.value });
    }
    if (loading) {
      setLoading(
        LoadingButton
      )
    }else{
      setLoading(
        <button className="button">Sing In</button>
      )
    }
    if (data) {
      sessionStorage.setItem(
        "access_token",
        data.login.token_info.access_token
      );
      sessionStorage.setItem(
        "refresh_token",
        data.login.token_info.refresh_token
      );
      navigate("/home");
    }
    if (error)
      if (error.graphQLErrors[0].extensions.validation) {
        if (error.graphQLErrors[0].extensions.validation.password) {
          seterrors((prevValue) => {
            return {
              ...prevValue,
              password: error.graphQLErrors[0].extensions.validation.password,
            };
          });
        } else {
          seterrors((prevValue) => {
            return { ...prevValue, password: [] };
          });
        }
        if (error.graphQLErrors[0].extensions.validation.email) {
          seterrors((prevValue) => {
            return {
              ...prevValue,
              email: error.graphQLErrors[0].extensions.validation.email,
            };
          });
        } else {
          seterrors((prevValue) => {
            return { ...prevValue, email: "" };
          });
        }
      } else if (error.message) {
        seterrors((prevValue) => {
          return { ...prevValue, email: error.message };
        });
      }
  }, [error, data,loading]);
  return (
    <div className="sign-in">
      <div className="bg-defualt"></div>
      <div className="logo-form">
        <div className="logo" onClick={themeDark}>
          <img className="logo-chef" src="icons/chef.png" alt="logo-chef" />
          <div>Pizza</div>
        </div>
        <div className="form-icon">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <span className="welcome">Welcome to Pizza</span>
            <label>Email</label>
            <input
              id="email"
              type="text"
              onChange={(e) => {
                setformData({
                  ...formData,
                  email: e.target.value,
                });
              }}
              placeholder="Email"
            />
            {Array.isArray(errors.email) &&
              Object.values(errors.email).map((ele, index) => {
                return (
                  <span className="error" key={index}>
                    {ele}
                  </span>
                );
              })}
            {!Array.isArray(errors.email) && (
              <span className="error">{errors.email}</span>
            )}
            <label>Password</label>
            <div className="password-eye">
              <input
                id="password"
                type={passwordType}
                onChange={(e) => {
                  setformData({
                    ...formData,
                    password: e.target.value,
                  });
                }}
                placeholder="Password"
              />
              <button className="btneye" onClick={togglePassword}>
                {passwordType === "password" ? (
                  <img
                    src="icons/eye-crossed.png"
                    className="eye"
                    alt="Phone"
                  />
                ) : (
                  <img
                    src="icons/eye.png"
                    className="eye"
                    alt="Phone"
                    style={{ width: "20px" }}
                  />
                )}
              </button>
            </div>
            <span className="error">{errors.password}</span>
            <div className="check">
              <input
                id="check"
                type="checkbox"
                onChange={handleChange}
                value={checked}
              />
              <label htmlFor="check">Remember Me</label>
            </div>
            <div className="forget">
              <Link to="/forget-password" className="link">
                Forget password?
              </Link>
            </div>
            {/* <button className="button">Sing In</button> */}
            {load}
          </form>
        </div>
        <div className="copy-right">Pizza &copy; {currentYear}</div>
      </div>
    </div>
  );
};

export default Login;
