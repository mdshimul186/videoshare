const DottedStyles = {
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
		zIndex: "99",
	}),
	control: () => ({
		// none of react-select's styles are passed to <Control />
		borderTopLeftRadius: "4px",
		borderTopRightRadius: "4px",
		width: "5px",
		marginTop: 0,
	}),
	singleValue: (provided) => {
		const transition = "opacity 300ms";
		const display = "none";
		const margin = 0;

		return { ...provided, transition, display, margin };
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
		return { ...provided, margin };
	},
	menu: (provided) => {
		const width = "130px";
		const marginTop = "25px";
		return { ...provided, width, marginTop };
	},
	placeholder: (provided) => {
		const display = "none";
		return { ...provided, display };
	},
};

export default DottedStyles;
