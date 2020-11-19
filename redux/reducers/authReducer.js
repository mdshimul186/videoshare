// import {
// 	TOGGLE_CHOOSE_PLAN,
// 	TOGGLE_NAV_PAYMENT,
// } from "../actions/subscriptionsAction";

const authReducer = (
	state = {
		userData: {},
		isLoggedIn: false,
	},
	action
) => {
	switch (action.type) {
		case "INSERT_USER_DATA":
			return {
				...state,
				userData: action.payload,
			};
		case "TOGGLE_LOGIN_STATE":
			if (state.isLoggedIn === false) {
				return {
					...state,
					isLoggedIn: true,
				};
			} else if (state.isLoggedIn === true) {
				return {
					...state,
					isLoggedIn: false,
				};
			}
		case "EDIT_USER_IMAGE":
			//refreshprops by re - assigning userData
			Object.assign(state.userData, action.payload);
			console.log(state);
			return {
				...state,
				userData: {
					...state.userData,
					PICTURE: action.payload,
				},
			};

		case "EDIT_USER_DATA":
			//refreshprops by re - assigning userData
			Object.assign(state.userData, action.payload);
			console.log(state);
			return {
				...state,
				userData: {
					...state.userData,
					FIRSTNAME: action.payload.firstname,
					LASTNAME: action.payload.lastname,
					EMAIL: action.payload.email,
					JOBROLE: action.payload.jobrole,
				},
			};
		default:
			return { ...state };
	}
};

export default authReducer;
