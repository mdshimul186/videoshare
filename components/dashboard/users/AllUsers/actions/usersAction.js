//action types

export const DASHBOARD_FETCH_USERS = "DASHBOARD_FETCH_USERS";
export const TOGGLE_LOADING_TO_TRUE = "TOGGLE_LOADING_TO_TRUE";
export const TOGGLE_LOADING_TO_FALSE = "TOGGLE_LOADING_TO_FALSE";
export const TOGGLE_CURRENT_DASHBOARD_USERS_PAGE =
  "TOGGLE_CURRENT_DASHBOARD_USERS_PAGE";
export const CHANGE_TOTAL_USERS = "CHANGE_TOTAL_USERS";
export const CHANGE_USERS_PER_PAGE = "CHANGE_USERS_PER_PAGE";
export const CHANGE_MIN_PAGE = "CHANGE_MIN_PAGE";

//Action Creator

export const dashboardFetchUsers = (data) => ({
  type: DASHBOARD_FETCH_USERS,
  payload: data,
});
export const toggleLoadingToTrue = () => ({
  type: TOGGLE_LOADING_TO_TRUE,
});
export const toggleLoadingToFalse = () => ({
  type: TOGGLE_LOADING_TO_FALSE,
});
export const toggleCurrentDashboardUsersPage = (data) => ({
  type: TOGGLE_CURRENT_DASHBOARD_USERS_PAGE,
  payload: data,
});
export const changeTotalUsers = (data) => ({
  type: CHANGE_TOTAL_USERS,
  payload: data,
});
export const changeUsersPerPage = (data) => ({
  type: CHANGE_USERS_PER_PAGE,
  payload: data,
});
export const changeMinPage = (data) => ({
  type: CHANGE_MIN_PAGE,
  payload: data,
});
