import React, { useEffect, useState } from "react";
import LoginStyles from "./styles/login.module.css";
import { EmailGroup, PasswordGroup, CustomBtn } from "../components/Components";
import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";
import { SpinnerComponent } from "react-element-spinner";
import regeneratorRuntime from "regenerator-runtime";
import GoogleLogin from "react-google-login";

const apiLink = process.env.NEXT_PUBLIC_API_URL;
let LOGIN_API_LINK = `${process.env.NEXT_PUBLIC_API_URL}/user/login`;

/**
 * @author Al Francis Gabriel Bolima
 * @description this is the main login form it has 3 sub components (EmailGroup, PasswordGroup, CustomBtn) which can be found in Components.js
 */
const Login = () => {
  const [googleLink, setGoogleLink] = useState("");
  const [token, setToken] = useState(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmitLogin = async () => {
    setLoading(true);

    const data = {
      email: email,
      password: password,
    };
    axios
      .post(LOGIN_API_LINK, data)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          alert("sucessful login");
          Cookies.set("videoshare_token", res.data.token);
          setToken(res.data.token);
          Router.push("/dashboard");
        } else {
          alert("failed login");
          setLoading(false);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("failed login");
        setLoading(false);
      });
  };

  const handeEmailOnChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value);
  };
  const onEnterKeyPressed = (e) => {
    if (e.key == "Enter") {
      handleSubmitLogin();
    }
  };

  // const handleGoogleButton = () => {
  //   const popupwindow = (url, title, w, h) => {
  //     var y = window.outerHeight / 2 + window.screenY - h / 2;
  //     var x = window.outerWidth / 2 + window.screenX - w / 2;
  //     return window.open(
  //       url,
  //       title,
  //       "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" +
  //         w +
  //         ", height=" +
  //         h +
  //         ", top=" +
  //         y +
  //         ", left=" +
  //         x
  //     );
  //   };
  //   if (typeof window !== "undefined") {
  //     const mywindow = popupwindow(googleLink, "google auth", 600, 600);
  //     var timer = setInterval(function () {
  //       if (mywindow.closed) {
  //         clearInterval(timer);
  //         window.location.reload({ forcedReload: true });
  //       }
  //     }, 1000);
  //   }
  // };

  const responseGoogleFail = () => {
    alert("something went wrong");
  };

  const responseGoogle = (authResult) => {
    setLoading(true);
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/user/auth/google", {
        tokenId: authResult.tokenId,
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          alert("sucessful login");
          Cookies.set("videoshare_token", res.data.token);
          setToken(res.data.token);
          Router.push("/dashboard");
        } else {
          alert("failed login");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("failed login");
        setLoading(false);
      });
  };

  useEffect(() => {
    const token = Cookies.get("videoshare_token");
    setToken(token);
    axios.defaults.headers.common = {
      Authorization: token,
    };
    if (token != undefined) {
      axios
        .post(apiLink + "/user/verify")
        .then((response) => {
          if (response.status === 200) {
            Router.push("/dashboard");
          }
        })
        .catch((err) => console.log(err));
    }
    // axios
    //   .post(apiLink + "/googleauthlink")
    //   .then((response) => setGoogleLink(response.data.url))
    //   .catch((err) => console.log(err));
  }, []);
  return (
    <div className={LoginStyles.loginForm}>
      <SpinnerComponent loading={isLoading} position="global" />
      <div className={LoginStyles.flexContent}>
        <img
          className={LoginStyles.videoshareLogo}
          alt="videoshare logo"
          src="logo.svg"
        ></img>
        <span>
          <p className={LoginStyles.welcomeBack}>Welcome Back</p>
          <p className={LoginStyles.loginDescription}>
            Enter your email and password below.
          </p>
          <div onChange={handeEmailOnChange}>
            <EmailGroup />
          </div>
          <div onChange={handlePasswordOnChange} onKeyDown={onEnterKeyPressed}>
            <PasswordGroup />
          </div>
          <div onClick={async () => await handleSubmitLogin()}>
            <CustomBtn buttonLabel="Log In" />
          </div>
          <p className={LoginStyles.orPTag}>or</p>
          <div className={LoginStyles.socialWrap}>
            <button className={LoginStyles.btnApple}>
              <img
                className={LoginStyles.appleIcon}
                alt="apple icon"
                src="apple-logo.svg"
              ></img>
              Apple
            </button>
            {/* <a className={LoginStyles.btnGoogle} onClick={handleGoogleButton}>
              <img
                className={LoginStyles.googleIcon}
                alt="google icon"
                src="google-logo.svg"
              ></img>
              Google
            </a> */}
            <GoogleLogin
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogleFail}
              cookiePolicy={"single_host_origin"}
            />
            ,
          </div>
          <p className={LoginStyles.registerMessage}>
            Don't have an account?{" "}
            <a className={LoginStyles.registerLink} href="/register">
              Sign Up
            </a>
          </p>
        </span>
      </div>
    </div>
  );
};

export default Login;
