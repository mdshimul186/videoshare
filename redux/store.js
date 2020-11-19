import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
const init = {};
const middleware = [Thunk];
const store = createStore(
  rootReducer,
  init,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
