import React, { useEffect, useState } from "react";
import "./resetPassword.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import swal from "sweetalert";
import { RESET } from "./GraphQl/graphql";
import LoadingButton from "../Component/button";

const ResetPassword = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [resetUser, { loading }] = useMutation(RESET);
  const [load, setLoading] = useState();
  const [passwordType, setPasswordType] = useState("password");
  const [formData, setformData] = useState({
    password: "",
    password_confirmation: "",
  });
  const [errors, setError] = useState({
    msg: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.password_confirmation === formData.password ||
      formData.password === ""
    ) {
      resetUser({
        variables: {
          id: 1,
          password: formData.password,
        },
      })
        .then((res) => {
          swal({
            title: "Success!",
            text: res.data.changepassword.message,
            icon: "success",
            button: "OK",
          });
          navigate("/login");
        })
        .catch((err) => {
          if (err.graphQLErrors[0].extensions.validation.password) {
            setError({
              msg: Object.values(
                err.graphQLErrors[0].extensions.validation.password
              ).map((ele) => {
                return ele;
              }),
            });
          }
        });
    } else {
      setError({
        msg: "Password confirmation doesn't match the password",
      });
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

  useEffect(() => {
    if (localStorage.getItem("mode"))
      document.body.classList.add(localStorage.getItem("mode"));
    if (loading) {
      setLoading(LoadingButton);
    } else {
      setLoading(<button className="button">Reset password</button>);
    }
  }, [loading]);
  return (
    <div className="reset-password">
      <div className="bg-defualt"></div>
      <div className="logo-form">
        <div className="logo">
          <img className="logo-chef" src="/icons/chef.png" alt="logo-chef" />
          <div>Pizza</div>
        </div>
        <div className="form-icon">
          <form onSubmit={handleSubmit}>
            <p> Reset password</p>
            <span className="welcome">
              Strong password include numbers, letters, and punctuation marks.
            </span>
            <label>New password</label>
            <div className="password-eye">
              <input
                id="password"
                name="password"
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
            <span className="error">{errors.msg}</span>
            <label>Confirm Password</label>
            <div className="password-eye">
              <input
                id="password_confirmation"
                name="password_confirmation"
                type={passwordType}
                onChange={(e) => {
                  setformData({
                    ...formData,
                    password_confirmation: e.target.value,
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
            {load}
          </form>
        </div>
        <div className="copy-right">Pizza &copy; {currentYear}</div>
      </div>
    </div>
  );
};

export default ResetPassword;
