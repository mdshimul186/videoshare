import React, { useState } from "react";
import ComponentStyle from "./components.module.css";

/**
 * @author Al Francis Gabriel Bolima
 * @description this do nothing, I just initialized it because the file needs a export default
 */

const Components = () => {
  return (
    <div>
      <h1>Components</h1>
    </div>
  );
};

/**
 * @author Al Francis Gabriel Bolima
 * @description this reusable component is used to hold email wrapper as well as input box
 */
const EmailGroup = () => {
  return (
    <div className={ComponentStyle.loginEmailWrapper}>
      <p className={ComponentStyle.loginEmailLabel}>EMAIL</p>
      <input
        type="email"
        className={ComponentStyle.loginEmailInput}
        placeholder="Email Address"
      ></input>
    </div>
  );
};

/**
 * @author Al Francis Gabriel Bolima
 * @description this reusable component is used as a button
 * @date 2020-09-09
 * @param {any} props - pass in props
 * @param {any} props.buttonLabel - specific props to get the label value
 * @returns {any}
 */
const CustomBtn = (props) => {
  return (
    <div className={ComponentStyle.buttonWrapper}>
      <button className={ComponentStyle.loginBtnSubmit}>
        {props.buttonLabel}
      </button>
    </div>
  );
};

/**
 * @description this class is for password group
 * states hasinputType and the onclick property of it will toggle the selected text
 * into text/password
 */
const PasswordGroup = () => {
  const [inputType, setInputType] = useState("password");
  const passwordToggle = () => {
    if (inputType === "password") {
      setInputType("text");
    } else if (inputType === "text") {
      setInputType("password");
    }
  };
  return (
    <div className={ComponentStyle.loginPasswordWrapper}>
      <div className={ComponentStyle.loginPasswordTextWrapper}>
        <p className={ComponentStyle.loginPasswordLabel}>Password</p>
        <p className={ComponentStyle.loginForgotPassword}>
          <a href="#/">Forgot password?</a>
        </p>
      </div>
      <div className={ComponentStyle.loginPasswordPasswrap}>
        <span
          className={ComponentStyle.eyeButton}
          alt="eye-btn"
          onClick={passwordToggle}
        />
        <input
          type={inputType}
          className={ComponentStyle.loginPasswordInput}
          placeholder="Password"
        ></input>
      </div>
    </div>
  );
};

export { EmailGroup, PasswordGroup, CustomBtn };

export default Components;
