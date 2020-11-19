const ButtonStyles = {
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
		marginTop: "0",
	}),
	control: () => ({
		// none of react-select's styles are passed to <Control />
		borderTopLeftRadius: "4px",
		borderTopRightRadius: "4px",
		width: "126px",
		marginLeft: "5px",
		height: "40px",
		background: "#0182fe",
		border: "1px solid #F0F1F7",
		boxSizing: "border-box",
		borderRadius: " 8px",
		cursor: "pointer",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	}),
	placeholder: () => ({
		fontFamily: "Mulish",
		fontStyle: "normal",
		fontWeight: "600",
		fontSize: "14px",
		lineHeight: "20px",
		textAlign: "center",
		letterSpacing: "0.2px",
		color: "#ffffff",
		width: "126px",
		height: "40px",
		outline: "none",
		border: "none",
		cursor: "pointer",
		marginTop: "20px",
	}),
	valueContainer: () => ({
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	}),
	menu: (provided) => {
		const marginTop = "0";
		const width = "126px";
		return { ...provided, marginTop, width };
	},
	singleValue: (provided, state) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = "opacity 300ms";
		const position = "block";
		const marginTop = "20px";
		const fontFamily = "Mulish";
		const fontStyle = "normal";
		const fontWeight = "600";
		const fontSize = "14px";
		const lineHeight = "20px";
		const letterSpacing = "0.3px";
		const color = "white";
		const display = "flex";
		const justifyContent = "center";
		const alignItems = "center";
		const textAlign = "center";

		return {
			...provided,
			display,
			textAlign,
			justifyContent,
			alignItems,
			transition,
			opacity,
			marginTop,
			position,
			fontFamily,
			fontStyle,
			fontWeight,
			color,
			lineHeight,
			fontSize,
			letterSpacing,
		};
	},
};
export default ButtonStyles;
