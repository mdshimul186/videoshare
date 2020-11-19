import React, { Component } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import axios from "axios";

const configureAxiosHeader = () => {
	const token = Cookies.get("token");
	axios.defaults.headers.common = {
		Authorization: "Bearer " + token,
	};
};

const withAuth = (AuthComponent) => {
	return class Authenticated extends Component {
		static async getInitialProps(ctx) {
			// Ensures material-ui renders the correct css prefixes server-side
			let userAgent;
			// eslint-disable-next-line no-undef
			if (process.browser) {
				// eslint-disable-next-line prefer-destructuring
				userAgent = navigator.userAgent;
			} else {
				userAgent = ctx.req.headers["user-agent"];
			}

			// Check if Page has a `getInitialProps`; if so, call it.
			const pageProps =
				AuthComponent.getInitialProps &&
				(await AuthComponent.getInitialProps(ctx));
			// Return props.
			return { ...pageProps, userAgent };
		}

		constructor(props) {
			super(props);
			this.state = {
				isLoading: true,
				userData: [],
			};
		}

		componentDidMount() {
			this.setState({ isLoading: true });
			configureAxiosHeader();
			axios
				// eslint-disable-next-line no-undef
				.post(process.env.API_LINK + "/verify", {})
				.then((res) => {
					if (res.status === 200) {
						//do some change state
						this.setState({ userData: res.data });
						this.setState({ isLoading: false });
					}
				})
				.catch((err) => {
					Cookies.remove("token");
					console.log(err.message);
					Router.push("/login");
				});
		}

		render() {
			return (
				<div>
					{this.state.isLoading ? (
						<div>LOADING....</div>
					) : (
						<AuthComponent {...this.props} userData={this.state.userData} />
					)}
				</div>
			);
		}
	};
};
export default withAuth;
