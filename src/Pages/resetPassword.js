import React, { useEffect, useState } from "react";
import "./resetPassword.css";
import { Link , useNavigate} from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";

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
  // const [wait, setWait] = useState(false);
  const [formData, setformData] = useState({
      password: "",
      password_confirmation: "",
  });
  const [resetUser, { data ,loading, error}] = useMutation(RESET);
  // const [errors, setError] = useState({
  //   status: false,
  //   msg: "",
  // })
  if(data){
    console.log(data.changepassword.message)
  }
  if(error){
    console.log(error.graphQLErrors[0].extensions.validation.password)
  }
  const themeDark = () => {
    document.body.classList.toggle("dark-theme");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // setError({
    //   status: false,
    //   msg: "",
    // })
  

      resetUser({
        variables: {
          id:1,
          password: formData.password,
        },
      }).then(res=>{
        console.log(res)
      })
      .catch(err=>{
       console.log(err.graphQLErrors[0].extensions.validation.password)
     })
    
    
    // if (formData.password && formData.password_confirmation) {
    //   if (formData.password === formData.password_confirmation) {
    //     // *******post
    //     //console.log(res)
    //     // if (res.data && res.data.status === "success") {
    //       setError({ status: true, msg: "Password Reset Successfully. Redirecting to Login Page..."})
    //       setTimeout(() => {
    //         navigate("/login")
    //       }, 2000)
    //     //}
    //     // if (res.error && res.error.data.status === "failed") {
    //     //   setError({ status: true, msg: res.error.data.message })
    //     // }
    //   } else {
    //     setError({ status: true, msg: "Password and Confirm Password Doesn't Match" })
    //   }
    // } else {
    //   setError({ status: true, msg: "All Fields are Required"})
    // }
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
    if (error){
        if (error.graphQLErrors[0].extensions.validation) {
          // setError(() => {
          //   return {
          //     status: true,
          //     msg: error.graphQLErrors[0].extensions.validation,
          //   };
          // });
          // setWait(false)
        }
    }
    if(data){
      // console.log(data.changepassword.message)
      // setError(() => {
      //   return {
      //     status: true,
      //     msg: data.changepassword.message
      //   };
      // });
      // setWait(false)
      // Swal.fire({
      //   position: 'top-end',
      //   icon: 'success',
      //   title: 'Your work has been saved',
      //   showConfirmButton: false,
      //   timer: 1500
      // })
      // setTimeout(() => {
      //     navigate("/login")
      // }, 2000)
    }
  }, [error]);
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
                  // if (formData.password !== formData.password_confirmation) {
                  //   setError({ status: true, msg: "Password and Confirm Password Doesn't Match" });
                  //   setWait(true);
                  // }else{
                  //   setWait(false);
                  // }
                  setformData({
                    ...formData,
                    password_confirmation: e.target.value,
                  });
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
            {/* {errors.status ? <span className="error">{errors.msg}</span> : "" } */}

            {/* {wait ? <button className="button" disabled>Reset password</button> :
                    <button className="button" enabled>Reset password</button>} */}
                    <button className="button" enabled>Reset password</button>
          </form>
        </div>
        <div className="copy-right">Pizza &copy; {currentYear}</div>
      </div>
    </div>
  );
};

export default ResetPassword;