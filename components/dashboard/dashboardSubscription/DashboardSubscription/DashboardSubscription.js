import React from "react";
import style from "./DashboardSubscription.module.css";
import { connect } from "react-redux";
import SubscriptionChoosePlan from "../SubscriptionChoosePlan/SubscriptionChoosePlan";
import SubscriptionPayment from "../SubscriptionPayment/SubscriptionPayment";
import SubscriptionInvoice from "../SubscriptionInvoice/SubscriptionInvoice";
import Header from "../../dashboardHeader/Header";
import {
  toggleChoosePlan,
  toggleNavPayment,
  toggleInvoice,
} from "./actions/subscriptionsAction";

/**
 * @description this will map the state from redux store into the component as props for us to access things
 * @param {any} state
 * @param {any} state.subscriptions
 * @returns { subscriptions }
 */
const mapStateToProps = (state) => {
  return { subscriptions: state.subscriptions };
};
const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * @description this will handle the click if choose plan button was fired
     * @returns {any}
     */
    toggleChoosePlan: () => dispatch(toggleChoosePlan()),
    /**
     * @description this will handle the click if payment button was fired
     * @returns {any}
     */

    toggleNavPayment: () => dispatch(toggleNavPayment()),
    /**
     * @description this will handle the click if invoice button was fired
     * @returns {any}
     */
    toggleInvoice: () => dispatch(toggleInvoice()),
  };
};

/**
 * @description this is the main component DashboardSubscription it got 2 buttons
 * if navChoosePlan from props.subscriptions was clicked then SubscriptionChoosePlan component will be opened
 * else if navPayment is clicked then SubscriptionPayment component will open
 * @param {any} props
 * @returns {any}
 */
const DashboardSubscription = (props) => {
  const { navChoosePlan, navPayment, navInvoice } = props.subscriptions;
  return (
    <div className={style.dashboardSubscription}>
      <div className={style.dashboardContent}>
        <Header />

        <div className={style.dashboardSubscriptionsButtonsWrapper}>
          <button
            className={
              navChoosePlan
                ? `${style.subscriptionButtonActiveStyle} ${style.subscriptionButtonStyle} ${style.choosePlanButtonSize}`
                : `${style.choosePlanButtonSize} ${style.subscriptionButtonStyle}`
            }
            onClick={() => props.toggleChoosePlan()}
          >
            CHOOSE PLAN
          </button>
          <button
            className={
              navPayment
                ? `${style.subscriptionButtonActiveStyle} ${style.paymentButtonSize} ${style.subscriptionButtonStyle} ${style.paymentButtonMarginLeft}`
                : `${style.paymentButtonSize} ${style.subscriptionButtonStyle} ${style.paymentButtonMarginLeft}`
            }
            onClick={() => props.toggleNavPayment()}
          >
            PAYMENT
          </button>
          <button
            className={
              navInvoice
                ? `${style.subscriptionButtonActiveStyle} ${style.paymentButtonSize} ${style.subscriptionButtonStyle} ${style.paymentButtonMarginLeft}`
                : `${style.paymentButtonSize} ${style.subscriptionButtonStyle} ${style.paymentButtonMarginLeft}`
            }
            onClick={() => props.toggleInvoice()}
          >
            Invoice
          </button>
        </div>
        {/* choose plan goes here or payment */}
        {navChoosePlan && <SubscriptionChoosePlan />}
        {navPayment && <SubscriptionPayment />}
        {navInvoice && <SubscriptionInvoice />}
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardSubscription);
