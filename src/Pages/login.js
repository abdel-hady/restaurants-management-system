import React, { useEffect, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../Component/button";
import LOGIN from "../GraphQl/graphql";
const Login = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [loginUser, { client, loading }] = useMutation(LOGIN);
  const [passwordType, setPasswordType] = useState("password");
  const [checked, setChecked] = React.useState(false);
  const [load, setLoading] = useState();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [errors, seterrors] = useState({
    email: "",
    password: "",
  });

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
    }).then(res=>{
      sessionStorage.setItem(
        "access_token",
        res.data.login.token_info.access_token
      );
      sessionStorage.setItem(
        "refresh_token",
        res.data.login.token_info.refresh_token
      );
      client.resetStore();
      navigate("/home");
    }).catch((err) => {
        if (err.graphQLErrors[0].extensions.validation) {
          if (err.graphQLErrors[0].extensions.validation.password) {
            seterrors((prevValue) => {
              return {
                ...prevValue,
                password: err.graphQLErrors[0].extensions.validation.password,
              };
            });
          } else {
            seterrors((prevValue) => {
              return { ...prevValue, password: [] };
            });
          }
          if (err.graphQLErrors[0].extensions.validation.email) {
            seterrors((prevValue) => {
              return {
                ...prevValue,
                email: Object.values(
                  err.graphQLErrors[0].extensions.validation.email
                ).map((ele, index) => {
                  return (
                    <span className="error" key={index}>
                      {ele}
                    </span>
                  );
                }),
              };
            });
          } else {
            seterrors((prevValue) => {
              return { ...prevValue, email: <span></span> };
            });
          }
        } else if (err.message) {
          seterrors((prevValue) => {
            return { ...prevValue, email: <span className="error">{err.message}</span> };
          });
        }
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
    if (localStorage.getItem("mode"))
      document.body.classList.add(localStorage.getItem("mode"));
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (localStorage.getItem("user")) {
      email.value = JSON.parse(localStorage.getItem("user")).email;
      password.value = JSON.parse(localStorage.getItem("user")).password;
      setformData({ email: email.value, password: password.value });
    }

    if (loading) {
      setLoading(LoadingButton);
    } else {
      setLoading(<button className="button">Sing In</button>);
    }

  }, [loading]);
  return (
    <div className="sign-in">
      <div className="bg-defualt"></div>
      <div className="logo-form">
        <div className="logo">
          <img className="logo-chef" src="/icons/chef.png" alt="logo-chef" />
          <div>Pizza</div>
        </div>
        <div className="form-icon">
          <form onSubmit={handleSubmit}>
            <p>Sign In</p>
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
            {errors.email}
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
                    src="/icons/eye-crossed.png"
                    className="eye"
                    alt="Phone"
                  />
                ) : (
                  <img
                    src="/icons/eye.png"
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
            {load}
          </form>
        </div>
        <div className="copy-right">Pizza &copy; {currentYear}</div>
      </div>
    </div>
  );
};

export default Login;
