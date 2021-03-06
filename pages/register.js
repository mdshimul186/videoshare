import React, { useState } from "react";
import RegisterStyles from "./styles/register.module.css";
import axios from "axios";
import Router from "next/router";
import regeneratorRuntime from "regenerator-runtime";
import { SpinnerComponent } from "react-element-spinner";


let REGISTER_API_LINK = `${process.env.NEXT_PUBLIC_API_URL}/user/register`;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setLoading] = useState(false);

  const [inputType, setInputType] = useState("password");


  const passwordToggle = () => {
    if (inputType === "password") {
      setInputType("text");
    } else if (inputType === "text") {
      setInputType("password");
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const data = { email: email, password: password };

    axios
      .post(REGISTER_API_LINK, data)
      .then((res) => {
        if (res.status == 201) {
          alert(res.data.message);
          setLoading(false)
          Router.push("/login");
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
        err && err.response && alert(err.response.data.error);
      });
  };
  return (
    <div className={RegisterStyles.registerForm}>
    <SpinnerComponent loading={isLoading} position="global" />
      <div className={RegisterStyles.flexContent}>
        <img
          className={RegisterStyles.videoshareLogo}
          alt="videoshare logo"
          src="logo.svg"
        ></img>
        <span>
          <p className={RegisterStyles.welcome}>Welcome!</p>
          <p className={RegisterStyles.registerDescription}>
            No credit card required.
          </p>
          <div className={RegisterStyles.formWrapper}>
            <div className={RegisterStyles.loginEmailWrapper}>
              <p className={RegisterStyles.loginEmailLabel}>EMAIL</p>
              <input
                onChange={handleEmailChange}
                type="email"
                className={RegisterStyles.loginEmailInput}
                placeholder="Email Address"
              ></input>
            </div>
            <div className={RegisterStyles.loginPasswordWrapper}>
              <div className={RegisterStyles.loginPasswordTextWrapper}>
                <p className={RegisterStyles.loginPasswordLabel}>Password</p>
                <p className={RegisterStyles.loginForgotPassword}>
                  <a href="#/">Forgot password?</a>
                </p>
              </div>
              <div className={RegisterStyles.loginPasswordPasswrap}>
                <span
                  className={RegisterStyles.eyeButton}
                  alt="eye-btn"
                  onClick={passwordToggle}
                />
                <input
                  onChange={handlePasswordChange}
                  type={inputType}
                  className={RegisterStyles.loginPasswordInput}
                  placeholder="Password"
                ></input>
              </div>
            </div>
            <div className={RegisterStyles.buttonWrapper}>
              <button
                onClick={handleSubmit}
                className={RegisterStyles.loginBtnSubmit}
              >
                Get started
              </button>
            </div>
          </div>
          <p className={RegisterStyles.alreadyHaveAccount}>
            Already have an account? <a href="/login">Log In</a>
          </p>
        </span>
      </div>
    </div>
  );
};

export default Register;
