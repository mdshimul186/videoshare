import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./SubscriptionInvoice.module.css";

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

function SubscriptionInvoice() {
  const currentState = useSelector((state) => state);
  const { userData } = currentState.auth;

  const [firstNameValue, setFirstNameValue] = useState(
    userData.FIRSTNAME || ""
  );
  //left section
  const [lastNameValue, setLastNameValue] = useState(userData.LASTNAME || "");
  const [emailValue, setEmailValue] = useState(userData.EMAIL || "");
  const [userNameValue, setUserNameValue] = useState("");
  const [countryValue, setCountryValue] = useState("Bangladesh");
  const [CityValue, setCityValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [zipCodeValue, setZipCodeValue] = useState("");
  const [receiverEmailValue, setReceiverEmailValue] = useState("");

  const [isFnameClicked, setisFnameClicked] = useState(false);
  const [isLnameClicked, setisLnameClicked] = useState(false);
  const [isEmailClicked, setisEmailClicked] = useState(false);
  const [isUserNameClicked, setisUserNameClicked] = useState(false);
  const [isCountryClicked, setisCountryClicked] = useState(false);
  const [isCityClicked, setisCityClicked] = useState(false);
  const [isStateClicked, setisStateClicked] = useState(false);
  const [isZipCodeClicked, setisZipCodeClicked] = useState(false);
  const [isReceiverEmailClicked, setisReceiverEmailClicked] = useState(false);

  //right section
  const [cardNumberValue, setCardNumberValue] = useState("");
  const [CardHolderNameValue, setCardHolderNameValue] = useState("");
  const [expiryDateValue, setExpiryDateValue] = useState("");
  const [CVVorCVCValue, setCVVorCVCValue] = useState("");

  const [isCardNumberClicked, setisCardNumberClicked] = useState(false);
  const [isCardHolderNameClicked, setisCardHolderNameClicked] = useState(false);
  const [isExpiryDateClicked, setisExpiryDateClicked] = useState(false);
  const [isCVVorCVCClicked, setisCVVorCVCClicked] = useState(false);

  const handleInVoiceDetailsChange = () => {
    console.log("form is changing");
  };

  //rowInvoiceDetailsInputBox
  return (
    <div className={style.SubscriptionInvoiceModuleWrapper}>
      <div className={style.invoiceLeftSection}>
        <div className={style.leftContentWrapper}>
          <p className={style.invoiceDetailsText}>Details</p>
          <div className={style.leftContentDetails}>
            <form onChange={handleInVoiceDetailsChange}>
              {/* Row 1 */}
              <div className={style.rowInvoiceDetails}>
                <div className={style.rowInvoiceDetailsContent}>
                  <p
                    className={
                      isFnameClicked
                        ? style.rowInvoiceDetailsInputLabelactive
                        : style.rowInvoiceDetailsInputLabel
                    }
                  >
                    FIRST NAME
                  </p>
                  <div className={style.rowInvoiceDetailsInputBox}>
                    <input
                      onBlur={() => setisFnameClicked(false)}
                      onChange={(e) => setFirstNameValue(e.target.value)}
                      onClick={() => setisFnameClicked(true)}
                      className={
                        isFnameClicked
                          ? style.rowInvoiceDetailsInputActive
                          : style.rowInvoiceDetailsInput
                      }
                      placeholder={userData.FIRSTNAME || "John"}
                      value={firstNameValue}
                    ></input>
                  </div>
                </div>
                <div className={style.rowInvoiceDetailsContent}>
                  <p
                    className={
                      isLnameClicked
                        ? style.rowInvoiceDetailsInputLabelactive
                        : style.rowInvoiceDetailsInputLabel
                    }
                  >
                    LAST NAME
                  </p>
                  <div className={style.rowInvoiceDetailsInputBox}>
                    <input
                      onBlur={() => setisLnameClicked(false)}
                      onChange={(e) => setLastNameValue(e.target.value)}
                      onClick={() => setisLnameClicked(true)}
                      className={
                        isLnameClicked
                          ? style.rowInvoiceDetailsInputActive
                          : style.rowInvoiceDetailsInput
                      }
                      placeholder={userData.LASTNAME || "Smith"}
                      value={lastNameValue}
                    ></input>
                  </div>
                </div>
              </div>
              {/* Row 2 */}
              <div
                className={`${style.rowInvoiceDetails} ${style.rowInvoiceDetailsMarginTop}`}
              >
                <div className={style.rowInvoiceDetailsContent}>
                  <p
                    className={
                      isEmailClicked
                        ? style.rowInvoiceDetailsInputLabelactive
                        : style.rowInvoiceDetailsInputLabel
                    }
                  >
                    EMAIL ADDRESS
                  </p>
                  <div className={style.rowInvoiceDetailsInputBox}>
                    <input
                      onBlur={() => setisEmailClicked(false)}
                      onChange={(e) => setEmailValue(e.target.value)}
                      onClick={() => setisEmailClicked(true)}
                      className={
                        isEmailClicked
                          ? style.rowInvoiceDetailsInputActive
                          : style.rowInvoiceDetailsInput
                      }
                      placeholder={userData.EMAIL || "name@business.com"}
                      value={emailValue}
                    ></input>
                  </div>
                </div>
                <div className={style.rowInvoiceDetailsContent}>
                  <p
                    className={
                      isUserNameClicked
                        ? style.rowInvoiceDetailsInputLabelactive
                        : style.rowInvoiceDetailsInputLabel
                    }
                  >
                    User Name
                  </p>
                  <div className={style.rowInvoiceDetailsInputBox}>
                    <input
                      onBlur={() => setisUserNameClicked(false)}
                      onChange={(e) => setUserNameValue(e.target.value)}
                      onClick={() => setisUserNameClicked(true)}
                      className={
                        isUserNameClicked
                          ? style.rowInvoiceDetailsInputActive
                          : style.rowInvoiceDetailsInput
                      }
                      placeholder={"Username..."}
                      value={userNameValue}
                    ></input>
                  </div>
                </div>
              </div>
              {/* Row 3 */}
              <div
                className={`${style.rowInvoiceDetails} ${style.rowInvoiceDetailsMarginTop}`}
              >
                <div className={style.rowInvoiceDetailsContent}>
                  <p
                    className={
                      isCountryClicked
                        ? style.rowInvoiceDetailsInputLabelactive
                        : style.rowInvoiceDetailsInputLabel
                    }
                  >
                    Country
                  </p>
                  <div
                    className={`${style.rowInvoiceDetailsInputBox} ${style.slectCustomWidth}`}
                  >
                    <select
                      onBlur={() => setisCountryClicked(false)}
                      onChange={(e) => setCountryValue(e.target.value)}
                      onClick={() => setisCountryClicked(true)}
                      className={
                        isCountryClicked
                          ? style.rowInvoiceDetailsInputActive
                          : style.rowInvoiceDetailsInput
                      }
                      placeholder={userData.EMAIL || "name@business.com"}
                      value={countryValue}
                    >
                      <option
                        className={style.slectOptionCountry}
                        value="Bangladesh"
                      >
                        Bangladesh
                      </option>
                      <option
                        className={style.slectOptionCountry}
                        value="India"
                      >
                        India
                      </option>
                    </select>
                  </div>
                </div>
                <div className={style.rowInvoiceDetailsContent}>
                  <p
                    className={
                      isCityClicked
                        ? style.rowInvoiceDetailsInputLabelactive
                        : style.rowInvoiceDetailsInputLabel
                    }
                  >
                    City
                  </p>
                  <div className={style.rowInvoiceDetailsInputBox}>
                    <input
                      onBlur={() => setisCityClicked(false)}
                      onChange={(e) => setCityValue(e.target.value)}
                      onClick={() => setisCityClicked(true)}
                      className={
                        isCityClicked
                          ? style.rowInvoiceDetailsInputActive
                          : style.rowInvoiceDetailsInput
                      }
                      placeholder={"city"}
                      value={CityValue}
                    ></input>
                  </div>
                </div>
              </div>
              {/* Row 4 */}
              <div
                className={`${style.rowInvoiceDetails} ${style.rowInvoiceDetailsMarginTop}`}
              >
                <div className={style.rowInvoiceDetailsContent}>
                  <p
                    className={
                      isStateClicked
                        ? style.rowInvoiceDetailsInputLabelactive
                        : style.rowInvoiceDetailsInputLabel
                    }
                  >
                    State
                  </p>
                  <div className={style.rowInvoiceDetailsInputBox}>
                    <input
                      onBlur={() => setisStateClicked(false)}
                      onChange={(e) => setStateValue(e.target.value)}
                      onClick={() => setisStateClicked(true)}
                      className={
                        isStateClicked
                          ? style.rowInvoiceDetailsInputActive
                          : style.rowInvoiceDetailsInput
                      }
                      placeholder={"State"}
                      value={stateValue}
                    ></input>
                  </div>
                </div>
                <div className={style.rowInvoiceDetailsContent}>
                  <p
                    className={
                      isZipCodeClicked
                        ? style.rowInvoiceDetailsInputLabelactive
                        : style.rowInvoiceDetailsInputLabel
                    }
                  >
                    Zip Code
                  </p>
                  <div className={style.rowInvoiceDetailsInputBox}>
                    <input
                      onBlur={() => setisZipCodeClicked(false)}
                      onChange={(e) => setZipCodeValue(e.target.value)}
                      onClick={() => setisZipCodeClicked(true)}
                      className={
                        isZipCodeClicked
                          ? style.rowInvoiceDetailsInputActive
                          : style.rowInvoiceDetailsInput
                      }
                      placeholder={"Zip code"}
                      value={zipCodeValue}
                    ></input>
                  </div>
                </div>
              </div>
              {/* Deatils ended here */}

              {/* Select plan section */}
              <div
                className={`${style.rowInvoiceDetails} ${style.rowInvoiceDetailsMarginTop}`}
              >
                <div className={style.invoiceSelectPlanContent}>
                  <div className={style.invoiceSelectplanItems}>
                    <div className={style.invoicePlanInfo}>
                      <div className={style.subscriptionStatus}>
                        <PlanPicture
                          altText="Pro"
                          src="subscriptionStarterImage.svg"
                          imageStyle="subscriptionStatusImage"
                        />
                        <PlanName PlanName="Pro" PlanPrice="$100/month" />
                        {/* <ChangePlan /> */}
                      </div>
                    </div>
                    <button
                      className={`${style.invoicePalnButton} ${style.invoicePlanButtonSize}`}
                    >
                      starter
                    </button>
                    <button
                      className={`${style.invoicePalnButtonActive} ${style.invoicePlanButtonSize}`}
                    >
                      Pro
                    </button>
                    <button
                      className={`${style.invoicePalnButton} ${style.invoicePlanButtonSize}`}
                    >
                      Enterprise
                    </button>
                  </div>
                </div>
              </div>
              {/* Select plan section ends here */}

              {/* Receiver email */}

              <div
                className={`${style.rowInvoiceDetails} ${style.rowInvoiceDetailsMarginTop} ${style.rowInvoiceReceiverEmail}`}
              >
                <div className={style.rowInvoiceDetailsContent}>
                  <p
                    className={
                      isReceiverEmailClicked
                        ? style.rowInvoiceDetailsInputLabelactive
                        : style.rowInvoiceDetailsInputLabel
                    }
                  >
                    Receiver Email
                  </p>
                  <div
                    className={`${style.rowInvoiceDetailsInputBox} ${style.fullwidth}`}
                  >
                    <input
                      onBlur={() => setisReceiverEmailClicked(false)}
                      onChange={(e) => setReceiverEmailValue(e.target.value)}
                      onClick={() => setisReceiverEmailClicked(true)}
                      className={
                        isReceiverEmailClicked
                          ? style.rowInvoiceDetailsInputActive
                          : style.rowInvoiceDetailsInput
                      }
                      placeholder={"receivermail@gmail.com"}
                      value={receiverEmailValue}
                      type="email"
                    ></input>
                  </div>
                </div>
              </div>

              {/* end of receiver email */}
            </form>
          </div>
        </div>
      </div>

      {/* right section starts */}
      <div className={style.invoiceRightSection}>
        <div className={style.leftContentWrapper}>
          <p className={style.invoiceDetailsText}>Payment Details</p>
          <div className={style.leftContentDetails}>
            <form onChange={handleInVoiceDetailsChange}>
              {/* Row 1 */}
              <div className={style.rowInvoiceDetails}>
                <div className={style.rowInvoiceDetailsContent}>
                  <p
                    className={
                      isCardNumberClicked
                        ? style.rowInvoiceDetailsInputLabelactive
                        : style.rowInvoiceDetailsInputLabel
                    }
                  >
                    Card Number
                  </p>
                  <div className={style.rowInvoiceDetailsInputBox}>
                    <input
                      onBlur={() => setisCardNumberClicked(false)}
                      onChange={(e) => setCardNumberValue(e.target.value)}
                      onClick={() => setisCardNumberClicked(true)}
                      className={
                        isCardNumberClicked
                          ? style.rowInvoiceDetailsInputActive
                          : style.rowInvoiceDetailsInput
                      }
                      placeholder={"xxxx xxxx xxxx xxxx"}
                      value={cardNumberValue}
                    ></input>
                  </div>
                </div>
                <div className={style.rowInvoiceDetailsContent}>
                  <p
                    className={
                      isCardHolderNameClicked
                        ? style.rowInvoiceDetailsInputLabelactive
                        : style.rowInvoiceDetailsInputLabel
                    }
                  >
                    LAST NAME
                  </p>
                  <div className={style.rowInvoiceDetailsInputBox}>
                    <input
                      onBlur={() => setisCardHolderNameClicked(false)}
                      onChange={(e) => setCardHolderNameValue(e.target.value)}
                      onClick={() => setisCardHolderNameClicked(true)}
                      className={
                        isCardHolderNameClicked
                          ? style.rowInvoiceDetailsInputActive
                          : style.rowInvoiceDetailsInput
                      }
                      placeholder={"EX: John Smith"}
                      value={CardHolderNameValue}
                    ></input>
                  </div>
                </div>
              </div>
              {/* Row 2 */}
              <div
                className={`${style.rowInvoiceDetails} ${style.rowInvoiceDetailsMarginTop}`}
              >
                <div className={style.rowInvoiceDetailsContent}>
                  <p
                    className={
                      isExpiryDateClicked
                        ? style.rowInvoiceDetailsInputLabelactive
                        : style.rowInvoiceDetailsInputLabel
                    }
                  >
                    Expiry Date
                  </p>
                  <div className={style.rowInvoiceDetailsInputBox}>
                    <input
                      onBlur={() => setisExpiryDateClicked(false)}
                      onChange={(e) => setExpiryDateValue(e.target.value)}
                      onClick={() => setisExpiryDateClicked(true)}
                      className={
                        isExpiryDateClicked
                          ? style.rowInvoiceDetailsInputActive
                          : style.rowInvoiceDetailsInput
                      }
                      placeholder={"Day/Month"}
                      value={expiryDateValue}
                    ></input>
                  </div>
                </div>
                <div className={style.rowInvoiceDetailsContent}>
                  <p
                    className={
                      isCVVorCVCClicked
                        ? style.rowInvoiceDetailsInputLabelactive
                        : style.rowInvoiceDetailsInputLabel
                    }
                  >
                    CVV / CVC
                  </p>
                  <div className={style.rowInvoiceDetailsInputBox}>
                    <input
                      onBlur={() => setisCVVorCVCClicked(false)}
                      onChange={(e) => setCVVorCVCValue(e.target.value)}
                      onClick={() => setisCVVorCVCClicked(true)}
                      className={
                        isCVVorCVCClicked
                          ? style.rowInvoiceDetailsInputActive
                          : style.rowInvoiceDetailsInput
                      }
                      placeholder={"****"}
                      type="password"
                      value={CVVorCVCValue}
                    ></input>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionInvoice;
