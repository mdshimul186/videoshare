//action types
export const TOGGLE_CHOOSE_PLAN = "TOGGLE_CHOOSE_PLAN";
export const TOGGLE_NAV_PAYMENT = "TOGGLE_NAV_PAYMENT";
export const TOGGLE_INVOICE = "TOGGLE_INVOICE";

//Action Creator
export const toggleChoosePlan = () => ({
  type: TOGGLE_CHOOSE_PLAN,
});
export const toggleNavPayment = () => ({
  type: TOGGLE_NAV_PAYMENT,
});

export const toggleInvoice = () => ({
  type: TOGGLE_INVOICE,
});
