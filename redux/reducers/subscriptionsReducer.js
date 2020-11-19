import {
  TOGGLE_CHOOSE_PLAN,
  TOGGLE_NAV_PAYMENT,
} from "../actions/subscriptionsAction";

const subscriptionsReducer = (
  state = { navChoosePlan: true, navPayment: false, navInvoice: false },
  action
) => {
  switch (action.type) {
    case TOGGLE_CHOOSE_PLAN:
      return {
        ...state,
        navChoosePlan: true,
        navPayment: false,
        navInvoice: false,
      };
    case TOGGLE_NAV_PAYMENT:
      return {
        ...state,
        navChoosePlan: false,
        navPayment: true,
        navInvoice: false,
      };
    case "TOGGLE_INVOICE":
      return {
        ...state,
        navChoosePlan: false,
        navPayment: false,
        navInvoice: true,
      };
    default:
      return { ...state };
  }
};

export default subscriptionsReducer;
