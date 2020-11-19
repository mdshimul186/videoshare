import subscriptionsReducer from "./subscriptionsReducer";
import subscriptionPlansReducer from "./subscriptionPlansReducer";
import scriptsReducer from "./scriptsReducer";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  subscriptions: subscriptionsReducer,
  subscriptionPlans: subscriptionPlansReducer,
  scripts: scriptsReducer,
  auth: authReducer,
  users: usersReducer,
});

export default rootReducer;
