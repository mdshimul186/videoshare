import React from "react";
import { connect } from "react-redux";
import style from "./SubscriptionChoosePlan.module.css";
import {
  toggleFreeButton,
  toggleProButton,
  toggleEnterpriseButton,
} from "./actions/subscriptionPlansAction";

/**
 * @description maps states and put it as props for us to access states from redux
 * @param {state} state.subscriptionPlans
 * @returns {subscriptionPlans}
 */
const mapStateToProps = (state) => {
  return { subscriptionPlans: state.subscriptionPlans };
};
const mapDispatchToProps = (dispatch) => {
  return {
    //set default here if the user is not yet using enterprise or pro
    /**
     * @description just makes the state true for the free plan
     * @param {any} {type:"TOGGLE_FREE_BUTTON"}
     * @returns {true}
     */
    toggleFree: () => dispatch(toggleFreeButton()),
    togglePro: () => dispatch(toggleProButton()),
    toggleEnterprise: () => dispatch(toggleEnterpriseButton()),
  };
};

//onclick handlers for buttons
/**
 * @description this is called when I handle the click for the free subscription
 * just changes state from false to true
 * @date 2020-09-09
 * @returns {true}
 */
const subFreeHandleClick = (props) => {
  props.toggleFree();
};
/**
 * @description this is called when I handle the click for the pro subscription
 * just changes state from false to true
 * @date 2020-09-09
 * @returns {true}
 */
const subProHandleClick = (props) => {
  props.togglePro();
};
/**
 * @description this is called when I handle the click for the enterprise subscription
 * just changes state from false to true
 * @date 2020-09-09
 * @returns {true}
 */
const subEnterpriseHandleClick = (props) => {
  alert("redirect or popup modal here");
};

/**
 * @description a button for the free subscription plan this is also connected to subFreeHandleClick when clicked
 * @param {any} props.text this will be the text on the button
 * @param {any} props.design this will be the css name
 * @returns {any}
 */
const SubFreeBTN = (props) => {
  return (
    <div className={style.SubButtonWrapper}>
      <button
        onClick={() => subFreeHandleClick(props)}
        className={props.design}
      >
        {props.text}
      </button>
    </div>
  );
};
/**
 * @description a button for the pro subscription plan this is also connected to subProHandleClick when clicked
 * @param {any} props.text this will be the text on the button
 * @param {any} props.design this will be the css name
 * @returns {any}
 */
const SubProBTN = (props) => {
  return (
    <div className={style.SubButtonWrapper}>
      <button onClick={() => subProHandleClick(props)} className={props.design}>
        {props.text}
      </button>
    </div>
  );
};
/**
 * @description a button for the enterprise subscription plan this is also connected to subEnterpriseHandleClick when clicked
 * @param {any} props.text this will be the text on the button
 * @param {any} props.design this will be the css name
 * @returns {any}
 */
const SubEnterpriseBTN = (props) => {
  return (
    <div className={style.SubButtonWrapper}>
      <button onClick={subEnterpriseHandleClick} className={props.design}>
        {props.text}
      </button>
    </div>
  );
};

/**
 * @description this is the main component where you can see all the content whenever the choose plan is active in subscriptions
 * @param {any} props gets the state for the buttons
 * @param {any} props.freeButton state for free button
 * @param {any} props.proButton state for pro button
 * @param {any} props.enterpriseButton state for enterprise
 */
const SubscriptionChoosePlan = (props) => {
  const { toggleFree, toggleEnterprise, togglePro } = props;
  const { freeButton, proButton, enterpriseButton } = props.subscriptionPlans;
  return (
    <div className={style.subscriptionSubContainerWrapper}>
      {/* Column1 */}
      <div
        className={`${style.subscriptionSubCol} ${
          freeButton ? style.subscriptionSubColActive : ""
        }`}
      >
        <img
          className={style.subscriptionImage}
          alt="Starter Icon"
          src="/subscriptionStarterImage.svg"
        />
        <p className={style.subscriptionIntroText}>Starter</p>
        <p className={style.subscriptionPriceText}>Free</p>
        <div className={style.subscriptionOffers}>
          <div
            className={`${style.subscriptionCheckAndText} ${style.subscriptionPtagmarginbottom16}`}
          >
            <img alt="check" src="/subscriptionCheck.svg" />
            <p className={style.subsOfferP}>2 agents</p>
          </div>
          <div
            className={`${style.subscriptionCheckAndText} ${style.subscriptionPtagmarginbottom16}`}
          >
            <img alt="check" src="/subscriptionCheck.svg" />
            <p className={style.subsOfferP}>Up to 100 tickets / month</p>
          </div>
          <div
            className={`${style.subscriptionCheckAndText} ${style.subscriptionPtagmarginbottom16}`}
          >
            <img alt="check" src="/subscriptionCheck.svg" />
            <p className={style.subsOfferP}>Low priority support</p>
          </div>
          <div
            className={`${style.subscriptionCheckAndText} ${style.subscriptionPtagmarginbottom16}`}
          >
            <img alt="check" src="/subscriptionDisabledCheck.svg" />
            <p className={`${style.subsOfferP} ${style.subscriptionPDisabled}`}>
              Onboarding specialist
            </p>
          </div>
          <div
            className={`${style.subscriptionCheckAndText} ${style.subscriptionPtagmarginbottom16}`}
          >
            <img alt="check" src="/subscriptionDisabledCheck.svg" />
            <p className={`${style.subsOfferP} ${style.subscriptionPDisabled}`}>
              Two factor authentification
            </p>
          </div>
        </div>
        {freeButton ? (
          <SubFreeBTN
            text="Current Plan"
            design={style.subscribeButtonInactive}
            toggleFree={toggleFree}
          />
        ) : (
          <SubFreeBTN
            text="Select Plan"
            design={style.subscribeButtonActive}
            toggleFree={toggleFree}
          />
        )}
      </div>
      {/* Column 2 */}
      <div
        className={`${style.subscriptionSubCol} ${
          proButton ? style.subscriptionSubColActive : ""
        }`}
      >
        <img
          className={style.subscriptionImage}
          alt="Pro Icon"
          src="/subscriptionProImage.svg"
        />
        <p className={style.subscriptionIntroText}>Pro</p>
        <div className={style.subscriptionPricePermonthWrapper}>
          <p className={style.subscriptionPriceText}>$100</p>
          <p className={style.subscriptionPriceTextPerMonth}> / month</p>
        </div>
        <div className={style.subscriptionOffers}>
          <div
            className={`${style.subscriptionCheckAndText} ${style.subscriptionPtagmarginbottom16}`}
          >
            <img alt="check" src="/subscriptionCheck.svg" />
            <p className={style.subsOfferP}>10 agents</p>
          </div>
          <div
            className={`${style.subscriptionCheckAndText} ${style.subscriptionPtagmarginbottom16}`}
          >
            <img alt="check" src="/subscriptionCheck.svg" />
            <p className={style.subsOfferP}>Up to 1000 tickets / month</p>
          </div>
          <div
            className={`${style.subscriptionCheckAndText} ${style.subscriptionPtagmarginbottom16}`}
          >
            <img alt="check" src="/subscriptionCheck.svg" />
            <p className={style.subsOfferP}>Basic support</p>
          </div>
          <div
            className={`${style.subscriptionCheckAndText} ${style.subscriptionPtagmarginbottom16}`}
          >
            <img alt="check" src="/subscriptionCheck.svg" />
            <p className={style.subsOfferP}>Onboarding specialist</p>
          </div>
          <div
            className={`${style.subscriptionCheckAndText} ${style.subscriptionPtagmarginbottom16}`}
          >
            <img alt="check" src="/subscriptionDisabledCheck.svg" />
            <p className={`${style.subsOfferP} ${style.subscriptionPDisabled}`}>
              Two factor authentification
            </p>
          </div>
        </div>
        {/* deactivate button if not selected */}
        {proButton ? (
          <SubProBTN
            text="Current Plan"
            design={style.subscribeButtonInactive}
            togglePro={togglePro}
          />
        ) : (
          <SubProBTN
            text="Select Plan"
            design={style.subscribeButtonActive}
            togglePro={togglePro}
          />
        )}
      </div>
      {/* Column 3 */}
      <div
        className={`${style.subscriptionSubCol} ${
          enterpriseButton ? style.subscriptionSubColActive : ""
        }`}
      >
        <img
          className={style.subscriptionImage}
          alt="Enterprise Icon"
          src="/subscriptionEnterpriseImage.svg"
        />
        <p className={style.subscriptionIntroText}>Enterprise</p>
        <p className={style.subscriptionPriceText}>Contact us</p>
        <div className={style.subscriptionOffers}>
          <div
            className={`${style.subscriptionCheckAndText} ${style.subscriptionPtagmarginbottom16}`}
          >
            <img alt="check" src="/subscriptionCheck.svg" />
            <p className={style.subsOfferP}>Custom number of agents</p>
          </div>
          <div
            className={`${style.subscriptionCheckAndText} ${style.subscriptionPtagmarginbottom16}`}
          >
            <img alt="check" src="/subscriptionCheck.svg" />
            <p className={style.subsOfferP}>Unlimited tickets</p>
          </div>
          <div
            className={`${style.subscriptionCheckAndText} ${style.subscriptionPtagmarginbottom16}`}
          >
            <img alt="check" src="/subscriptionCheck.svg" />
            <p className={style.subsOfferP}>Priority support</p>
          </div>
          <div
            className={`${style.subscriptionCheckAndText} ${style.subscriptionPtagmarginbottom16}`}
          >
            <img alt="check" src="/subscriptionCheck.svg" />
            <p className={style.subsOfferP}>Onboarding specialist</p>
          </div>
          <div
            className={`${style.subscriptionCheckAndText} ${style.subscriptionPtagmarginbottom16}`}
          >
            <img alt="check" src="/subscriptionCheck.svg" />
            <p className={style.subsOfferP}>Two factor authentification</p>
          </div>
        </div>
        {/* deactivate button if not selected */}
        {enterpriseButton ? (
          <SubEnterpriseBTN
            text="Contact Us"
            design={style.subscribeButtonInactive}
          />
        ) : (
          <SubEnterpriseBTN
            text="Contact Us"
            design={style.subscribeButtonActive}
          />
        )}
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionChoosePlan);
