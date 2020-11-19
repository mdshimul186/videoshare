import React, { useEffect } from "react";
import styles from "./header.module.css";
import { useSelector } from "react-redux";

const Header = (props) => {
	const currentState = useSelector((state) => state);

	const { userData } = currentState.auth;

	const { MainText } = props;
	return (
		<div className={styles.dashboardHeader}>
			<p className={styles.settingText}>{MainText}</p>
			<img
				className={styles.dashboardSearch}
				src="/dashboardSearch.svg"
				alt="search"
			></img>
			<img
				className={styles.dashboardNotification}
				src="/dashboardNotificationBell.svg"
				alt="notification"
			></img>
			<p className={styles.dashboardDivider}></p>
			<div className={styles.dashboardUserWrapper}>
				<p
					className={styles.dashboardUsername}
				>{`${userData.FIRSTNAME} ${userData.LASTNAME}`}</p>
				<img
					className={styles.dashboardAvatar}
					src={userData.PICTURE || "/dashboardAvatar.svg"}
					alt="avatar"
				></img>
			</div>
		</div>
	);
};
export default Header;
