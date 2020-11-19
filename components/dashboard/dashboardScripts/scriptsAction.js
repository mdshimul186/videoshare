//action types
export const TOGGLE_NEW_SCRIPT_BUTTON = "TOGGLE_NEW_SCRIPT_BUTTON";
export const DASHBOARD_FETCH_SCRIPT = "DASHBOARD_FETCH_SCRIPT";
export const TOGGLE_LOADING_TO_TRUE = "TOGGLE_LOADING_TO_TRUE";
export const TOGGLE_LOADING_TO_FALSE = "TOGGLE_LOADING_TO_FALSE";
export const TOGGLE_CURRENT_DASHBOARD_SCRIPT_PAGE =
  "TOGGLE_CURRENT_DASHBOARD_SCRIPT_PAGE";
export const CHANGE_TOTAL_SCRIPTS = "CHANGE_TOTAL_SCRIPTS";
export const CHANGE_SCRIPTS_PER_PAGE = "CHANGE_SCRIPTS_PER_PAGE";
export const CHANGE_MIN_PAGE = "CHANGE_MIN_PAGE";

//Action Creator
export const toggleNewScriptButton = () => ({
  type: TOGGLE_NEW_SCRIPT_BUTTON,
});
export const dashboardFetchScript = (data) => ({
  type: DASHBOARD_FETCH_SCRIPT,
  payload: data,
});
export const toggleLoadingToTrue = () => ({
  type: TOGGLE_LOADING_TO_TRUE,
});
export const toggleLoadingToFalse = () => ({
  type: TOGGLE_LOADING_TO_FALSE,
});
export const toggleCurrentDashboardScriptPage = (data) => ({
  type: TOGGLE_CURRENT_DASHBOARD_SCRIPT_PAGE,
  payload: data,
});
export const changeTotalScripts = (data) => ({
  type: CHANGE_TOTAL_SCRIPTS,
  payload: data,
});
export const changeScriptsPerPage = (data) => ({
  type: CHANGE_SCRIPTS_PER_PAGE,
  payload: data,
});
export const changeMinPage = (data) => ({
  type: CHANGE_MIN_PAGE,
  payload: data,
});
