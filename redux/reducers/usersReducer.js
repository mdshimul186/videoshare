import {
  DASHBOARD_FETCH_USERS,
  TOGGLE_LOADING_TO_TRUE,
  TOGGLE_LOADING_TO_FALSE,
  TOGGLE_CURRENT_DASHBOARD_USERS_PAGE,
  CHANGE_TOTAL_USERS,
  CHANGE_USERS_PER_PAGE,
  CHANGE_MIN_PAGE,
} from "../actions/usersAction";

const usersReducer = (
  state = {
    usersData: [],
    loading: false,
    currentPage: 1,
    usersPerPage: 8,
    maxUsersPerPage: 8,
    totalUsers: 0,
    minPage: 1,
  },
  action
) => {
  switch (action.type) {
    case DASHBOARD_FETCH_USERS:
      return {
        ...state,
        usersData: action.payload,
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
    case TOGGLE_CURRENT_DASHBOARD_USERS_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case CHANGE_TOTAL_USERS:
      return {
        ...state,
        totalUsers: action.payload,
      };
    case CHANGE_USERS_PER_PAGE:
      return {
        ...state,
        usersPerPage: action.payload,
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

export default usersReducer;
