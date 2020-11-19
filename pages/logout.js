import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import { SpinnerComponent } from "react-element-spinner";

const logout = () => {
	const [isLoading, setLoading] = useState(true);

	Cookies.remove("token");
	useEffect(() => {
		Router.push("/login");
		setLoading(false);
	});
	return (
		<div>
			<SpinnerComponent loading={isLoading} position="global" />
		</div>
	);
};

export default logout;
