import {
	TOGGLE_NEW_SCRIPT_BUTTON,
	DASHBOARD_FETCH_SCRIPT,
	TOGGLE_LOADING_TO_TRUE,
	TOGGLE_LOADING_TO_FALSE,
	TOGGLE_CURRENT_DASHBOARD_SCRIPT_PAGE,
	CHANGE_TOTAL_SCRIPTS,
	CHANGE_SCRIPTS_PER_PAGE,
	CHANGE_MIN_PAGE,
} from "../actions/scriptsAction";

const scriptsReducer = (
	state = {
		newScriptButton: false,
		scriptData: [],
		loading: false,
		currentPage: 1,
		scriptsPerPage: 8,
		maxScriptPerPage: 8,
		totalScripts: 0,
		minPage: 1,
	},
	action
) => {
	switch (action.type) {
		case TOGGLE_NEW_SCRIPT_BUTTON:
			if (state.newScriptButton === false) {
				return {
					...state,
					newScriptButton: true,
				};
			} else if (state.newScriptButton === true) {
				return {
					...state,
					newScriptButton: false,
				};
			} else {
				return state;
			}
		case DASHBOARD_FETCH_SCRIPT:
			return {
				...state,
				scriptData: action.payload,
			};
		case TOGGLE_LOADING_TO_TRUE:
			return {
				...state,
				loading: true,
			};
		case TOGGLE_LOADING_TO_FALSE:
			return {
				...state,
				loading: false,
			};
		case TOGGLE_CURRENT_DASHBOARD_SCRIPT_PAGE:
			return {
				...state,
				currentPage: action.payload,
			};
		case CHANGE_TOTAL_SCRIPTS:
			return {
				...state,
				totalScripts: action.payload,
			};
		case CHANGE_SCRIPTS_PER_PAGE:
			return {
				...state,
				scriptsPerPage: action.payload,
			};
		case CHANGE_MIN_PAGE:
			return {
				...state,
				minPage: action.payload,
			};
		default:
			return { ...state };
	}
};

export default scriptsReducer;
