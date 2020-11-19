import React from "react";
import Head from "next/head";
import Router from "next/router";

const Home = () => {
	const handleLoginRoute = () => {
		Router.push("/login");
	};
	const handleRegisterRoute = () => {
		Router.push("/register");
	};
	return (
		<div>
			<Head>
				<title>React VideoShare</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="indexBody">
				<img className="indexHeroImage" src="logoWhite.svg" />
				<div className="indexContent">
					<h3>Welcome to Videoshare App!</h3>
					<h4>
						This is the website version of videoshare where you can
						monitor,share, and customize various functionalities of videoshare.
					</h4>
				</div>
				<div className="indexButtonsWrapper">
					<button onClick={handleLoginRoute}>Login</button>
					<button onClick={handleRegisterRoute}>Register</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
