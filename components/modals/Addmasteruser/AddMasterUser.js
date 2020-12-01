import React, { useEffect } from "react";
import style from "./addMasterUser.module.css";
import Modal from "react-modal";
import { useSelector } from "react-redux";

const AddMasterUserModal = ({

	isOpen,

	setClosed,

	loaderParentElement,

	sendFunction,

	onChangeFname,
	onChangeLname,
	onChangeEmail,
	onChangeNewPassword,
	onChangeConfirmPassword,
	fnameValue,
	lnameValue,
	emailValue,
	passwordValue,
	confirmPasswordValue
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
							Add master user
						</p>
						<p>First Name</p>
						<input value={fnameValue} type="text" onChange={onChangeFname}></input>
						<p>Last Name</p>
						<input value={lnameValue} type="text" onChange={onChangeLname}></input>
						<p>Email</p>
						<input value={emailValue} type="email" onChange={onChangeEmail}></input>
						<p>New Password</p>
						<input value={passwordValue} type="password" onChange={onChangeNewPassword}></input>
						<p>Confirm Password</p>
						<input value={confirmPasswordValue} type="password" onChange={onChangeConfirmPassword}></input>
						<button onClick={sendFunction}>Add</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default AddMasterUserModal;
