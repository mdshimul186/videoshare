import React, { useState } from "react";
import RegisterStyles from "./styles/register.module.css";
import axios from "axios";
import Router from "next/router";
import regeneratorRuntime from "regenerator-runtime";
let REGISTER_API_LINK = `${process.env.API_LINK}/register`;

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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
		if (email != "" && password != "") {
			try {
				const data = { email: email, password: password };
				const response = await axios.post(REGISTER_API_LINK, data);
				console.log(response);
				if (response.status == 200) {
					alert(response.data);
					Router.push("/login");
				} else if (response.status == 409) {
					alert(response.data);
				}
			} catch (err) {
				if (err.response.status == 409) {
					alert(err.response.data);
				} else {
					alert("An error has occured!");
				}
			}
		} else {
			alert("Please enter on all fields!");
		}
	};
	return (
		<div className={RegisterStyles.registerForm}>
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
