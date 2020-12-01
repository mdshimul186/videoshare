import React, { useEffect } from "react";
import style from "./ConfirmPasswordModal.module.css";
import Modal from "react-modal";
import { useSelector } from "react-redux";

const ConfirmPasswordModal = ({
	// eslint-disable-next-line react/prop-types
	isOpen,
	// eslint-disable-next-line react/prop-types
	setClosed,
	// eslint-disable-next-line react/prop-types
	loaderParentElement,
	// eslint-disable-next-line react/prop-types
	sendFunction,
	// eslint-disable-next-line react/prop-types
	onConfirmTextBox,
}) => {
	const email = useSelector((state) => state.auth.userData.EMAIL);
	useEffect(() => {
		console.log(email);
	}, []);
	return (
		<div>
			<Modal
				appElement={document.getElementById(`${loaderParentElement}`)}
				isOpen={isOpen}
				onRequestClose={setClosed}
				className={style.Modal}
				contentLabel="Videoshare - confirm password"
			>
				<div>
					<button
						onClick={() => setClosed(true)}
						className={style.closeButton}
					></button>
					<div className={style.content}>
						<p className={style.themeDescription}>
							Confirm password to continue
						</p>
						<p>Password</p>
						<p>Forgot Password?</p>
						<input type="password" onChange={onConfirmTextBox}></input>
						<button onClick={sendFunction}>Confirm password</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default ConfirmPasswordModal;
