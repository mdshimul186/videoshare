import "../styles/globals.css";
import { Provider } from "react-redux";
import React from "react";
import { createWrapper } from "next-redux-wrapper";
import store from "../redux/store";
/**
 * @author Al Francis Gabriel Bolima
 * @description this stuff is the main page
 */
const MyApp = ({ Component, pageProps }) => {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
};

const makeStore = () => store;

export default createWrapper(makeStore).withRedux(MyApp);
