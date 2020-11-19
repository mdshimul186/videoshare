import React from "react";
import style from "./SubscriptionPayment.module.css";

const PlanPicture = (props) => {
  return (
    <img alt={props.altText} src={props.src} className={props.imageStyle} />
  );
};

const PlanName = (props) => {
  return (
    <div className={style.subscriptionPaymentPlanWrapper}>
      <p className={style.subscriptionPlanName}>{props.PlanName}</p>
      <p className={style.subscriptionPlanPrice}>{props.PlanPrice}</p>
    </div>
  );
};

const ChangePlan = () => {
  return (
    <div>
      <button className={style.paymentChangePlanButton}>Change Plan</button>
    </div>
  );
};

const SubscriptionRequests = (props) => {
  return (
    <div>
      <p className={style.subscriptionRequestLabel}>{props.RequestLabel}</p>
      <p className={style.subscriptionRequestNumber}>{props.RequestNumber}</p>
    </div>
  );
};

/**
 * @description payment component
 * @returns {any}
 */
const SubscriptionPayment = () => {
  return (
    <div className={style.SubscriptionPayment}>
      <div className={style.subscriptionStatus}>
        <PlanPicture
          altText="starter"
          src="subscriptionStarterImage.svg"
          imageStyle="subscriptionStatusImage"
        />
        <PlanName PlanName="Starter" PlanPrice="Free" />
        <ChangePlan />
      </div>
      <div className={style.subscriptionRequests}>
        <div className={style.totalRequestWrapper}>
          <SubscriptionRequests
            RequestLabel="TOTAL REQUESTS (LAST 30 DAYS)"
            RequestNumber="0"
          />
        </div>
        <div className={style.expectedRequestWrapper}>
          <SubscriptionRequests
            RequestLabel="EXPECTED REQUEST / MONTH"
            RequestNumber="0"
          />
        </div>
      </div>
      <div className={style.subscriptionDivider}></div>
      <div className={style.paymentDetailsGroup}>
        <p className={style.paymentDetailsText}>Payment details</p>
        <div
          className={`${style.subscriptionRow} ${style.paymentDetailsCardTopMargin}`}
        >
          <div className={style.subPaymentInputGroup}>
            <p className={style.paymentInputGroupText}>CARD NUMBER</p>
            <input
              className={style.paymentInput}
              type="password"
              placeholder="xxxx xxxx xxxx xxxx"
            />
          </div>
          <div className={style.subPaymentInputGroup}>
            <p className={style.paymentInputGroupText}>CARDHOLDER NAME</p>
            <input
              className={style.paymentInput}
              placeholder="Your name on card"
            />
          </div>
        </div>
        <div
          className={`${style.subscriptionRow} ${style.paymentInputGroupsTopMargin}`}
        >
          <div className={style.paymentInputGroupSmall}>
            <p className={style.paymentInputGroupText}>EXPIRY DATE</p>
            <input className={style.paymentInputSmall} placeholder="mm / yy" />
          </div>
          <div className={style.paymentInputGroupSmall}>
            <p className={style.paymentInputGroupText}>CVV / CVC</p>
            <input className={style.paymentInputSmall} placeholder="***" />
          </div>
        </div>
        <button className={style.paymentSaveCreditBtn}>Save credit card</button>
      </div>
    </div>
  );
};
export default SubscriptionPayment;
