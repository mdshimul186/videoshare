import React, { useEffect, useState } from "react";
import styles from "./DashboardBrandingSettings.module.css";
import { SpinnerComponent } from "react-element-spinner";
import { SketchPicker } from "react-color";
import { useSelector, useDispatch } from "react-redux";
import { EditableInput } from "react-color/lib/components/common";
import axios from "axios";

/**
 * @date 2020-09-09
 * @description this is the dashboard branding settings when you click the settings on the sidebar
 * @returns {any}
 */

const API_LINK = process.env.API_LINK;

const DashboardBrandingSettings = () => {
	const currentState = useSelector((state) => state);
	const { userData } = currentState.auth;

	const [isCompanyNameClicked, setCompanyNameClicked] = useState(false);

	const [hasImage, setHasImage] = useState(false);
	const [imgData, setImgData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	const [primaryColorHex, setPrimaryColorHex] = useState("#0182FE");
	const [secondaryColorHex, setSecondaryColorHex] = useState("#FFA000");
	const [textColorHex, setTextcolorHex] = useState("#000000");
	const [isBrandingTextBoxesChanged, setBrandingTextBoxesChanged] = useState(
		false
	);

	//form values
	const [companyName, setCompanyName] = useState("");
	const [primaryColorValue, setPrimaryColorValue] = useState("");
	const [secondaryColorValue, setSecondaryColorValue] = useState("");
	const [textColorValue, setTextColorValue] = useState("");

	//picture value to send
	const [picture, setPicture] = useState(null);

	useEffect(() => {
		setLoading(true);
		axios
			.post(API_LINK + "/getBrandingData", { USERID: userData.USERID })
			.then((res) => {
				console.log(res.data);
				setLoading(false);
				setCompanyName(res.data.COMPANYNAME);
				setPrimaryColorHex(res.data.PRIMARYCOLOR);
				setSecondaryColorHex(res.data.SECONDARYCOLOR);
				setTextcolorHex(res.data.TEXTCOLOR);
				setImgData(res.data.PICTURE);
				setPrimaryColorValue(primaryColorHex);
				setSecondaryColorValue(secondaryColorHex);
				setTextColorValue(textColorHex);
			})
			.catch((err) => {
				console.log(err);
			});
		axios
			.post(API_LINK + "/checkbranding", {
				USERID: userData.USERID,
			})
			.then((res) => {
				const resdata = res.data.message;
				if (resdata == "Not Exists!") {
					axios
						.post(API_LINK + "/createbranding", { USERID: userData.USERID })
						.then((res) => {
							console.log(res.data);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log("Branding exists!");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const EditableInputStyle = {
		input: {
			backgroundColor: "#F8F8F8",
			border:"1px solid #D4D4D4",
			/* grayscale / gray lightest */
			boxSizing: "border-box",
			borderRadius: "8px",
			width: "475px",
			height: "42px",
			/* Reg 14 (0.3 px) */

			fontFamily: "Mulish",
			fontStyle: "normal",
			fontWeight: "bold",
			fontSize: "14px",
			lineHeight: "20px",
			/* identical to box height, or 143% */

			lletterSpacing: "0.3px",
			opacity: "1",
			textIndent: " 16px",
			color: "black",
			outline: "none",
		},
	};

	const onChangePicture = (e) => {
		if (e.target.files[0]) {
			// const image = e.target.files[0];
			// console.log(image);
			// setPicture(e.target.files[0]);
			setHasImage(true);
			setPicture(e.target.files[0]);
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				setImgData(reader.result);
			});
			console.log(imgData);
			reader.readAsDataURL(e.target.files[0]);
		}
	};
	const handleBrandingPhotoSubmit = () => {
		if (hasImage) {
			setLoading(true);
			const data = new FormData();
			data.append("file", picture);
			data.append("USERID", userData.USERID);
			axios
				.post(API_LINK + "/editBrandingImage", data)
				.then((res) => {
					setLoading(false);
					alert("Uploaded");
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const handleBrandingTextBoxAndButtons = () => {
		console.log("form changed!");
		setBrandingTextBoxesChanged(true);
	};
	const handleBrandingSave = () => {
		console.log("clicked");
		setLoading(true);
		const values = {
			userID: userData.USERID,
			companyName: companyName,
			primaryColor: primaryColorValue,
			secondaryColor: secondaryColorValue,
			textColor: textColorValue,
		};
		console.log(values);
		//axios update branding values
		axios
			.post(API_LINK + "/updateBrandingData", values)
			.then((res) => {
				console.log(res.status);
				if (res.status == 200) {
					alert("Updated!");
				}
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};
	console.log(companyName);
	if (isLoading) {
		return (
			<div>
				<SpinnerComponent loading={isLoading} position="global" />
			</div>
		);
	}
	return (
		<div className={styles.DashboardSettingsContainer}>
			<p className={styles.DashboardSettingsText}>Branding</p>
			<div className={styles.DashboardBrandingSettingsContentWrapper}>
				<p className={styles.DashboardInputLabel}>COMPANY LOGO</p>
				<div className={styles.dashboardBrandingRow}>
					<img
						className={styles.dashboardBrandingThumbnail}
						src={imgData || "/dashboardBrandingThumbnail.svg"}
						alt="images"
					></img>
					<label className={styles.brandingUploadLogoBtnPlus}>
						<input
							accept="image/*"
							style={{ display: "none" }}
							onChange={onChangePicture}
							type="file"
						></input>
						<p>+</p>
					</label>

					{/* <button className={styles.brandingUploadLogoBtn}>Upload logo</button> */}
					{/*  */}
					<div
						className={styles.brandingUploadLogoBtn}
						onClick={handleBrandingPhotoSubmit}
					>
						<p className={styles.dashboardCurrentPhotoButtonText}>
							Upload new photo
						</p>
					</div>
					{/*  */}
				</div>
				<div
					className={styles.brandingTextBoxAndButtons}
					onChange={handleBrandingTextBoxAndButtons}
				>
					<div className={styles.dashboardBrandingRow}>
						<div className={styles.brandingInputGroup}>
							<div className={styles.dashboardBrandingCol}>
								<p className={styles.DashboardInputLabel}>COMPANY NAME</p>
								<input
									className={styles.brandingTextBoxesVisible}
									placeholder={"Video Share"}
									value={companyName}
									onChange={(e) => {
										setCompanyName(e.target.value);
									}}
								></input>
							</div>
						</div>
						<div className={styles.brandingInputGroup}>
							<div className={styles.dashboardBrandingCol}>
								<p className={styles.DashboardInputLabel}>PRIMARY COLOUR</p>
								<div className={styles.dashboardBrandingRow}>
									<EditableInput
										style={EditableInputStyle}
										value={primaryColorHex}
										onChange={(e) => {
											setPrimaryColorHex(e);
											setPrimaryColorValue(e);
										}}
									/>

									<button
										className={styles.textColourButton}
										style={{ backgroundColor: primaryColorHex }}
									>
										+
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className={`${styles.dashboardBrandingRow} ${styles.mt15}`}>
						<div className={styles.brandingInputGroup}>
							<div className={styles.dashboardBrandingCol}>
								<p className={styles.DashboardInputLabel}>COMPANY NAME</p>
								<input
									className={styles.brandingTextBoxesVisible}
									placeholder="Video Share"
								></input>
							</div>
						</div>
						<div className={styles.brandingInputGroup}>
							<div className={styles.dashboardBrandingCol}>
								<p className={styles.DashboardInputLabel}>SECONDARY COLOUR</p>
								<div className={styles.dashboardBrandingRow}>
									<EditableInput
										style={EditableInputStyle}
										value={secondaryColorHex}
										onChange={(e) => {
											setSecondaryColorHex(e);
											setSecondaryColorValue(e);
										}}
									/>

									<button
										className={styles.textColourButton}
										style={{ backgroundColor: secondaryColorHex }}
									>
										+
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className={`${styles.dashboardBrandingRow} ${styles.mt15}`}>
						<div className={styles.brandingInputGroup}>
							<div className={styles.dashboardBrandingCol}>
								<p className={styles.DashboardInputLabel}>SECONDARY COLOUR</p>
								<input
									className={styles.brandingTextBoxesVisible}
									placeholder="Person replying"
								></input>
							</div>
						</div>
						<div className={styles.brandingInputGroup}>
							<div className={styles.dashboardBrandingCol}>
								<p className={styles.DashboardInputLabel}>TEXT COLOUR</p>
								<div className={styles.dashboardBrandingRow}>
									{/* <input
										className={styles.brandingTextBoxesVisible}
										placeholder="#FFFFFF"
										value={textColorHex}
									></input> */}
									<EditableInput
										style={EditableInputStyle}
										value={textColorHex}
										onChange={(e) => {
											setTextcolorHex(e);
											setTextColorValue(e);
										}}
									/>

									<button
										className={styles.textColourButton}
										style={{ backgroundColor: textColorHex }}
									>
										+
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<button
					onClick={handleBrandingSave}
					className={
						isBrandingTextBoxesChanged
							? styles.brandingSettingsSaveBTNActive
							: styles.brandingSettingsSaveBTN
					}
				>
					Save
				</button>
			</div>
		</div>
	);
};

export default DashboardBrandingSettings;
