import React, { useEffect, useState } from "react";
import "./resetPassword.css";
import { Link , useNavigate} from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";
import Swal from 'sweetalert2'

const RESET = gql`
  mutation ($id: ID!, $password: String!) {
    changepassword(id: $id, password: $password){
      message
    }
  }
`;
const ResetPassword = () => {
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate()
    const [passwordType, setPasswordType] = useState("password");
    const [wait, setWait] = useState(false);
    const [formData, setformData] = useState({
        password: "",
        password_confirmation: "",
    });
    const [resetUser, { data ,loading, error}] = useMutation(RESET);
    const [errors, setError] = useState({
      status: false,
      msg: "",
    })
    if(data){
      console.log(data.changepassword.message)
    }
    if(error){
      console.log(error.graphQLErrors[0].extensions.validation.password);
    }
    const themeDark = () => {
      document.body.classList.toggle("dark-theme");
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      resetUser({
        variables: {
          id:1,
          password: formData.password,
        },
      }).catch((err) => {
             err.graphQLErrors.map((error) => {
          return error.message;
        });})
    }

    const togglePassword = (e) => {
      e.preventDefault();
      if (passwordType === "password") {
        setPasswordType("text");
        return;
      }
      setPasswordType("password");
    };

    useEffect(() => {
      if (error){
          if (error.graphQLErrors[0].extensions.validation.password) {
            setError({
                status: true,
                msg: Object.values(error.graphQLErrors[0].extensions.validation.password).map((ele) => {
                  return ele }),
             });
          }
      }
      if(data){
        Swal.fire({
          icon: 'success',
          title: data.changepassword.message,
          // timer: 2000
        })
        navigate("/login")
      }
    }, [error,data]);
  return (
    <div className="reset-password">
      <div className="bg-defualt"></div>
      <div className="logo-form">
        <div className="logo" onClick={themeDark}>
          <img className="logo-chef" src="icons/chef.png" alt="logo-chef" />
          <div>Pizza</div>
        </div>
        <div className="form-icon">
          <form onSubmit={handleSubmit}>
            <p> Reset password</p>
            <span className="welcome">Strong password include numbers, letters, and punctuation marks.</span>
            <label>New password</label>
            <div className="password-eye">
              <input
                id="password"
                name='password'
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

            <label>Confirm Password</label>
            <div className="password-eye">
              <input
                id='password_confirmation'
                name='password_confirmation'
                type={passwordType}
                onChange={(e) => {
                  setformData({
                    ...formData,
                    password_confirmation: e.target.value,
                  });
                if (formData.password === e.target.value) {
                    setError({status: true,msg: ""})
                    setWait(false)   
                  }
                  else{
                    setError({ status: true, msg: "Password and Confirm Password Doesn't Match" });
                    setWait(true)
                  } 
                  } }
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
            {errors.status ? <span className="error">{errors.msg}</span> : "" }

            {wait ? <button className="button" disabled>Reset password</button> :
            <button className="button" >Reset password</   button>}
          </form>
        </div>
        <div className="copy-right">Pizza &copy; {currentYear}</div>
      </div>
    </div>
  );
};

export default ResetPassword;