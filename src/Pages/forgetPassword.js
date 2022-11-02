import React, { useState, useEffect } from "react";
import "./forgetPassword.css";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import swal from "sweetalert";
import LoadingButton from "../Component/button";
import { FORGET } from "../GraphQl/graphql";
import { useTranslation } from "react-i18next";

const ForgetPassword = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [load, setLoading] = useState();
  const [error, seterror] = useState();
  const [resetPassword, { loading }] = useMutation(FORGET);
  const [formData, setformData] = useState({
    email: "",
  });
  useEffect(() => {
    if (localStorage.getItem("mode"))
      document.body.classList.add(localStorage.getItem("mode"));
    if (loading) {
      setLoading(<LoadingButton/>);
    } else {
      setLoading(<button className="button">{t("send")}</button>);
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
          <div className="logo">
            <img className="logo-chef" src="/icons/chef.png" alt="logo-chef" />
            <div>Pizza</div>
          </div>
          <div className="form-icon">
            <form onSubmit={handleSubmit}>
              <p>{t("forget_password")}</p>
              <span className="welcome">
               {t("enter_email")}
              </span>
              <label>{t("email")}</label>
              <input
                type="text"
                onChange={(e) => {
                  setformData({
                    ...formData,
                    email: e.target.value,
                  });
                }}
                placeholder={t("email")}
              />
              {error}
              {load}
              <Link to="/login" className="link">
                {t("back_to_login")}
              </Link>
            </form>
          </div>
          <div className="copy-right">{t("pizza")} &copy; {currentYear}</div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
