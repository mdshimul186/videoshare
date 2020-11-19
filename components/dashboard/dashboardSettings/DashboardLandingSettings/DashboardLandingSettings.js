import React, { useState, useEffect } from "react";
import styles from "./DashboardLandingSettings.module.css";
import Select, { components } from "react-select";
import { ChromePicker } from "react-color";
import axios from "axios";
import { useSelector } from "react-redux";
import { SpinnerComponent } from "react-element-spinner";

/**
 * @date 2020-09-09
 * @description this is the dashboard landing settings when you click the settings on the sidebar
 * @returns {any}
 */
// eslint-disable-next-line no-undef
const { API_LINK } = process.env;
const DashboardLandingSettings = () => {
	const [isLoading, setLoading] = useState(true);
	const currentState = useSelector((state) => state);
	const { userData } = currentState.auth;
	const getLandingDataLink = "/settings/getLandingData";
	const createLandingDataLink = "/settings/createLandingData";
	const [picture, setPicture] = useState(null);
	const [imgData, setImgData] = useState(null);
	const [colorPicker, setColorPicker] = useState(false);
	const [colorPickerColor, setColorPickerColor] = useState("#DDE2FF");
	const [landingPageUrl, setLandingPageUrl] = useState("https://");
	const [heading, setHeading] = useState("");
	const [textBody, setTextBody] = useState("");
	const [isCta, setCta] = useState(true);
	const [ctaTitle, setCtaTitle] = useState("");
	const [ctaLink, setCtaLink] = useState("https://");
	const [ctaStatus, setCtaStatus] = useState(false);
	const newScriptOptions = [
		{ value: "Curved", label: "Curved" },
		{ value: "Template", label: "Template" },
		{ value: "Summary", label: "Summary" },
	];
	const fixedLandingPageUrl = landingPageUrl
		.replace("https://", "")
		.replace(".videoshare.co", "");
	const [selectedOption, setSelectedOption] = useState(newScriptOptions[0]);
	const [selectedBackgroundStyle, setSelectedBackgroundStyle] = useState(
		newScriptOptions[0]
	);

	useEffect(() => {
		axios
			.post(API_LINK + getLandingDataLink, { USERID: userData.USERID })
			.then(async (res) => {
				try {
					const data = await res.data[0];
					if (data.BACKGROUNDCOLOR != null) {
						setColorPickerColor(data.BACKGROUNDCOLOR);
					} else {
						setColorPickerColor("#DDE2FF");
					}
					setLandingPageUrl(data.URL || "https://");
					setImgData(data.LOGO || "energizerLogo.png");
					setHeading(data.HEADING);
					setTextBody(data.BODY);
					setCtaLink(data.CALLTOACTIONLINK);
					setCtaTitle(data.CALLTOACTIONTITLE);
					setColorPickerColor(data.BACKGROUNDCOLOR);
					setTextBody(data.BODY);
					setCtaStatus(data.CALLTOACTIONSTATUS);
					setSelectedOption({
						value: data.BACKGROUNDSTYLE,
						label: data.BACKGROUNDSTYLE,
					});
					setLoading(false);
				} catch (err) {
					console.log(err);
					setLoading(false);
					axios
						.post(API_LINK + createLandingDataLink, { USERID: userData.USERID })
						.then(async (res) => {
							console.log(res);
						})
						.catch((err) => console.log(err));
				}
			});
	}, []);

	const handleSelectValue = (selectedOption) => {
		const finalSelectedOption = selectedOption;
		console.log(finalSelectedOption);
		setSelectedBackgroundStyle(finalSelectedOption);
		setSelectedOption(finalSelectedOption);
	};
	const handleColorPickerShow = () => {
		setColorPicker(true);
	};
	const handleColorPickerOnChange = (color) => {
		setColorPickerColor(color.hex.toUpperCase());
	};

	const onChangePicture = (e) => {
		if (e.target.files[0]) {
			// const image = e.target.files[0];
			// console.log(image);
			// setPicture(e.target.files[0]);
			setPicture(e.target.files[0]);
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				setImgData(reader.result);
			});
			reader.readAsDataURL(e.target.files[0]);
		}
	};
	const popover = {
		position: "absolute",
		zIndex: "2",
		marginTop: "47px",
		marginLeft: "-225px",
	};
	const cover = {
		position: "fixed",
		top: "0px",
		right: "0px",
		bottom: "0px",
		left: "0px",
	};
	const inputStyles = {
		input: {
			border: "none",
			outline: "none",
		},
	};

	const customStyles = {
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isFocused ? "#0182FE" : "",
			color: state.isFocused ? "#FFFFFF" : "#9FA2B4",
			fontFamily: "Mulish",
			fontStyle: "normal",
			fontWeight: "600",
			fontSize: "14px",
			lineHeight: "20px",
			letterSpacing: "0.2px",
		}),
		control: () => ({
			// none of react-select's styles are passed to <Control />
			borderTopLeftRadius: "4px",
			borderTopRightRadius: "4px",
			width: "165px",
			marginTop: 0,
			height: "44px",
			background: "#FCFDFE",
			border: "1px solid #F0F1F7",
			boxSizing: "border-box",
			borderRadius: " 8px",
			cursor: "pointer",
		}),
		singleValue: (provided, state) => {
			const opacity = state.isDisabled ? 0.5 : 1;
			const transition = "opacity 300ms";
			const marginTop = "18px";
			const position = "block";
			const marginLeft = "8px";
			const fontFamily = "Mulish";
			const fontStyle = "normal";
			const fontWeight = "normal";
			const fontSize = "14px";
			const lineHeight = "20px";
			const letterSpacing = "0.3px";
			const color = "#4B506D";

			return {
				...provided,
				transition,
				opacity,
				marginTop,
				position,
				marginLeft,
				fontFamily,
				fontStyle,
				fontWeight,
				color,
				lineHeight,
				fontSize,
				letterSpacing,
			};
		},
		indicatorSeparator: (provided) => {
			const display = "none";
			const margin = 0;
			return { ...provided, display, margin };
		},
		dropdownIndicator: (provided) => {
			const margin = 0;
			return { ...provided, margin };
		},
		indicatorsContainer: (provided) => {
			const margin = 0;
			const marginTop = 0;
			return { ...provided, margin, marginTop };
		},
		menu: (provided, state) => {
			const width = "165px";
			const marginTop = "-10px";
			return { ...provided, width, marginTop };
		},
	};
	const SelectIcon = () => {
		return (
			<img
				src="/pagedropdown.svg"
				alt="pagedropdown"
				className={styles.dropdownIndicatorIcon}
			/>
		);
	};
	const getData = () => {
		const data = {
			landingUrl: landingPageUrl,
			backgroundStyle: selectedOption.value,
			backgroundStyleColor: colorPickerColor,
			heading: heading,
			textBody: textBody,
			callToActionTitle: ctaTitle,
			callToActionLink: ctaLink,
			callToActionStatus: isCta,
		};
		console.log(data);
		return data;
	};

	const UploadChanges = () => {
		const data = getData();
		const fd = new FormData();
		fd.append("file", picture);
		fd.append("USERID", userData.USERID);
		for (let key in data) {
			fd.append(key, data[key]);
		}
		axios
			.post(API_LINK + "/settings/landing", fd)
			.then((res) => {
				if (res.data === "OK") {
					alert("Success!");
				} else if (res.data === "Duplicate url") {
					alert("Duplicate url!");
				} else {
					alert("error");
				}
			})
			.catch((err) => console.log(err));
	};

	const DropdownIndicator = (props) => {
		return (
			<components.DropdownIndicator {...props}>
				<SelectIcon />
			</components.DropdownIndicator>
		);
	};
	const handleUrlChange = (e) => {
		setLandingPageUrl(
			("https://" + e.target.value + ".videoshare.co").toLowerCase()
		);
	};

	return (
		<div className={styles.LandingMainDiv}>
			<SpinnerComponent
				loading={isLoading}
				position="global"
				className={styles.superiorSpinner}
			/>
			{isLoading ? (
				""
			) : (
				<>
					<div className={styles.DashboardSettingsContainer}>
						<div>
							<div className={styles.landingPagesHeader}>
								<p className={styles.DashboardSettingsMainText}>
									Landing Pages
								</p>
								<div className={styles.helpGroup}>
									<img src="questionmark.svg" alt="questionmark" />
									<p className={styles.helpText}>Help</p>
								</div>
							</div>

							<div>
								<svg
									className={styles.backgroundImage}
									viewBox="0 0 737 383"
									fill={colorPickerColor}
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M383.278 383C100.109 383 0 161.536 0 153.512L0.000648302 0H737V161.536C737 161.536 638.795 383 383.278 383Z"
										fill={colorPickerColor}
										fillOpacity="0.54"
									/>
								</svg>
								<div className={styles.actualLandingPageWrapper}>
									<input
										autoComplete="false"
										className={styles.landingPagesUrl}
										type="text"
										placeholder={"https://"}
										value={landingPageUrl}
										defaultValue={landingPageUrl}
										disabled={true}
									/>
									<div className={styles.logoContainer}>
										<img
											className={styles.logoImage}
											src={imgData || "energizerLogo.png"}
										/>
									</div>
									<div className={styles.videoContainer}>
										<video poster="landingVideoPlaceHolder.png" />
									</div>
									<p className={styles.landingSettingsHeader}>
										{heading || "What is the video title"}
									</p>
									<p className={styles.landingSettingsDescription}>
										{textBody ||
											`Etiam ut purus mattis mauris sodales aliquam. Vivamus elementum
							semper nisi. Proin sapien ipsum, porta a, auctor quis, euismod ut,
							mi. Proin sapien ipsum.`}
									</p>
									{/*eslint-disable-next-line react/jsx-no-target-blank*/}
									<a target="_blank" href={ctaLink}>
										<button className={styles.bookAMeetingBTN}>
											{ctaTitle || "Book a meeting"}
										</button>
									</a>
									<div
										className={styles.landingpagecontentfooter}
										id="landingpagecontentfooter"
									>
										<img alt="videoshare logo" src="videosharefooter.svg" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.landingPageEditor}>
						<p className={styles.landingPageEditorHeading}>
							Landing Page Editor
						</p>
						<div className={styles.landingPageEditorSeparator}></div>
						<div className={styles.logoBtnGroup}>
							<label className={styles.brandingUploadLogoBtnPlus}>
								<input
									accept="image/*"
									style={{ display: "none" }}
									onChange={onChangePicture}
									type="file"
								/>
								<div className={styles.logoBtn}>
									<p>Logo</p>
									<img
										className={styles.logoCheck}
										alt="check"
										src="check.svg"
									/>
								</div>
							</label>
						</div>
						<div id="urlGroup">
							<p className={styles.urlText}>URL</p>
							<div className={styles.urlGroup}>
								<p className={styles.websiteProtocol}>https://</p>
								<input
									className={styles.urlInput}
									type="text"
									placeholder="company"
									value={fixedLandingPageUrl}
									onChange={handleUrlChange}
								/>
								<p className={styles.mainUrl}>.videoshare.co</p>
							</div>
							<div
								className={`${styles.landingPageEditorSeparator} ${styles.mt40}`}
							></div>
						</div>
						<div id="backgroundGroup" className={styles.backgroundGroup}>
							<p className={styles.backgroundTextHeading}>background</p>
							<div className={styles.backgroundControlGroup}>
								<Select
									onChange={handleSelectValue}
									components={{ DropdownIndicator }}
									className="react-select-container"
									classNamePrefix="react-select"
									styles={customStyles}
									isSearchable={false}
									options={newScriptOptions}
									defaultValue={selectedOption || newScriptOptions[0]}
								/>
								<input
									style={{ backgroundColor: colorPickerColor }}
									className={styles.backgroundGroupColorInput}
									placeholder="#DDE2FF"
									value={colorPickerColor}
									onClick={() => handleColorPickerShow()}
									onChange={handleColorPickerOnChange}
								/>
								<div className={styles.colorPickerContainer}>
									{colorPicker ? (
										<div style={popover} onBlur={() => setColorPicker(false)}>
											<div
												style={cover}
												onClick={() => setColorPicker(false)}
											></div>
											<ChromePicker
												color={colorPickerColor}
												onChange={handleColorPickerOnChange}
												styles={inputStyles}
											/>
										</div>
									) : null}
								</div>
							</div>
						</div>
						<div id="headingGroup" className={styles.headingGroup}>
							<p className={styles.headingGroupHead}>Heading</p>
							<input
								className={styles.headingGroupInput}
								placeholder="Input text"
								onChange={(e) => setHeading(e.target.value)}
								defaultValue={heading}
							/>
						</div>
						<div id="textGroup" className={styles.textGroup}>
							<p className={styles.textGroupHeading}>Text</p>
							<textarea
								onChange={(e) => setTextBody(e.target.value)}
								className={styles.textGroupTextArea}
								placeholder="body"
								defaultValue={textBody}
							/>
						</div>
						<div id="ctaGroup" className={styles.ctaGroup}>
							<p className={styles.ctaGroupTextHeader}>CTA</p>
							<div className={styles.ctainputGroup}>
								<button className={styles.ctaToggle}>
									{ctaStatus ? "On" : "OFF"}
									<img src="inactive.svg" alt="close"></img>
								</button>
								<input
									className={styles.bookAMeetingText}
									placeholder="book a meeting"
									defaultValue={ctaTitle}
									onChange={(e) => setCtaTitle(e.target.value)}
								/>
							</div>
							<input
								autoComplete="off"
								onChange={(e) => setCtaLink(e.target.value)}
								className={styles.ctaLink}
								value={ctaLink}
							/>
						</div>
						<div className={`${styles.landingPageEditorSeparator}`}></div>
						<div className={styles.landingPageEditorBottomGroup}>
							<button
								onClick={() => UploadChanges("test")}
								className={styles.saveLandingBtn}
							>
								Save
							</button>
							<div className={styles.landingPageEditorBottomSubGroup}>
								<p className={styles.removeVideoshareBranding}>
									Remove Video Share Branding
								</p>
								<img
									alt="checkbuttonwithbluebackground"
									className={styles.checkwithbg}
									src="checkwithbg.svg"
								/>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default DashboardLandingSettings;
