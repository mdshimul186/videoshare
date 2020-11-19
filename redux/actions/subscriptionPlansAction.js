//action types
export const TOGGLE_FREE_BUTTON = "TOGGLE_FREE_BUTTON";
export const TOGGLE_PRO_BUTTON = "TOGGLE_PRO_BUTTON";
export const TOGGLE_ENTERPRISE_BUTTON = "TOGGLE_ENTERPRISE_BUTTON";

//Action Creator
export const toggleFreeButton = () => ({
	type: TOGGLE_FREE_BUTTON,
});
export const toggleProButton = () => ({
	type: TOGGLE_PRO_BUTTON,
});
export const toggleEnterpriseButton = () => ({
	type: TOGGLE_ENTERPRISE_BUTTON,
});
