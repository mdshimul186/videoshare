import {
  TOGGLE_FREE_BUTTON,
  TOGGLE_PRO_BUTTON,
  TOGGLE_ENTERPRISE_BUTTON,
} from "../actions/subscriptionPlansAction";

const subscriptionPlansReducer = (
  state = { freeButton: true, proButton: false, enterpriseButton: false },
  action
) => {
  switch (action.type) {
    case TOGGLE_FREE_BUTTON:
      return {
        ...state,
        freeButton: true,
        proButton: false,
        enterpriseButton: false,
      };
    case TOGGLE_PRO_BUTTON:
      return {
        ...state,
        freeButton: false,
        proButton: true,
        enterpriseButton: false,
      };
    case TOGGLE_ENTERPRISE_BUTTON:
      return {
        ...state,
        freeButton: false,
        proButton: false,
        enterpriseButton: true,
      };
    default:
      return { ...state };
  }
};

export default subscriptionPlansReducer;
