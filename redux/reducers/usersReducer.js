import {
  CHANGE_MIN_PAGE, CHANGE_TOTAL_USERS,
  CHANGE_USERS_PER_PAGE, DASHBOARD_FETCH_USERS,


  TOGGLE_CURRENT_DASHBOARD_USERS_PAGE, TOGGLE_LOADING_TO_FALSE, TOGGLE_LOADING_TO_TRUE
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
      case "ADD_NEW_USER":
      return {
        ...state,
        usersData: [action.payload,...state.usersData],
      };
      case "DELETE_USER":

      let allData = [...state.usersData]
        let index = allData.findIndex(u=>u._id === action.payload)
        allData.splice(index,1)
        
      return {
        ...state,
        usersData: allData,
      };
      case "EDIT_USER":

      let allDatas = [...state.usersData]
        let index2 = allDatas.findIndex(u=>u._id == action.payload._id)
        allDatas[index2] = action.payload
        
      return {
        ...state,
        usersData: allDatas,
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
