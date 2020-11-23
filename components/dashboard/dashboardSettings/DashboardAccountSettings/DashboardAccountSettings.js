import styles from "./DashboardAccountSettings.module.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ConfirmPasswordModal from "../../../modals/ConfirmPasswordModal/ConfirmPasswordModal";
import axios from "axios";
import Router from "next/router";
import { SpinnerComponent } from "react-element-spinner";

/**
 * @date 2020-09-09
 * @description this is the dashboard account settings when you click the settings on the sidebar
 * @returns {any}
 */
const DashboardAccountSettings = () => {
  const currentState = useSelector((state) => state);
  const { userData } = currentState.auth;
  const dispatch = useDispatch();

  const [isPassModal, setPassModal] = useState(true);

  const [isFnameClicked, setFnameClicked] = useState(false);
  const [isLnameClicked, setLnameClicked] = useState(false);
  const [isEmailClicked, setEmailClicked] = useState(false);
  const [isJobRoleClicked, setJobRoleClicked] = useState(false);

  const [isPrevPasswordClicked, setPrevPasswordClicked] = useState(false);
  const [isNewPasswordClicked, setNewPasswordClicked] = useState(false);
  const [isConfirmPasswordClicked, setConfirmPasswordClicked] = useState(false);

  const [firstNameValue, setFirstNameValue] = useState(
    userData.firstName || ""
  );
  const [lastNameValue, setLastNameValue] = useState(userData.lastName || "");
  const [emailValue, setEmailValue] = useState(userData.email || "");
  const [jobRoleValue, setJobRoleValue] = useState(userData.jobRole || "");
  const [isSaveActive, setSaveActive] = useState(false);
  const [isDiscardActive, setDiscardActive] = useState(true);

  const [isPassNeeded, setPassNeeded] = useState(false);

  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [numAttempts, setAttempts] = useState(3);

  const [prevPass, setPrevPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [isLoading, setLoading] = useState(false);

  const [confirmTextBox, setConfirmTextBox] = useState("");
  const onPrevPasswordClick = () => {
    setPrevPasswordClicked(true);
  };

  const onNewPasswordClick = () => {
    setNewPasswordClicked(true);
  };

  const onConfirmPasswordClick = () => {
    setConfirmPasswordClicked(true);
  };

  const onPrevPasswordBlur = () => {
    setPrevPasswordClicked(false);
  };

  const onNewPasswordBlur = () => {
    setNewPasswordClicked(false);
  };

  const onConfirmPasswordBlur = () => {
    setConfirmPasswordClicked(false);
  };

  const handleChangePasswordClick = () => {
    console.log("change password is clicked make changes in here");
    setLoading(true);

    axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/editPassword", {
        email: userData.email,
        currentpassword: prevPass,
        newpassword: newPass,
        confirmpassword: confirmPass,
      })
      .then((response) => {
        if (response.status === 200) {
          alert(response.data.message);
          setPrevPass("");
          setNewPass("");
          setConfirmPass("");
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        err && err.response && alert(err.response.data.error);
      });
  };

  const [isUploadActive, setUploadActive] = useState(false);
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      // const image = e.target.files[0];
      // console.log(image);
      // setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      /** IMAGE DATA */
      // console.log(imgData);
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const activateUpload = () => {
    setUploadActive(true);
  };

  const handleDiscardButton = () => {
    console.log("discarded");
    setFirstNameValue(userData.firstName);
    setLastNameValue(userData.lastName);
    setEmailValue(userData.email);
    setJobRoleValue(userData.jobRole || "");
    setSaveActive(false);
  };

  const handleAccountSettingsChange = (e) => {
    console.log("something changed");
    setDiscardActive(false);
    setSaveActive(true);
  };
  const handleFirstNameChange = (e) => {
    setFirstNameValue(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastNameValue(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };
  const handleJobRoleChange = (e) => {
    setJobRoleValue(e.target.value);
  };

  const handleFirstNameClick = (e) => {
    setFnameClicked(true);
  };
  const handleLastNameClick = () => {
    setLnameClicked(true);
  };
  const handleEmailClick = () => {
    setEmailClicked(true);
  };
  const handleJobRoleClick = () => {
    setJobRoleClicked(true);
  };
  const handleFirstNameBlur = (e) => {
    setFnameClicked(false);
  };
  const handleLastNameBlur = (e) => {
    setLnameClicked(false);
  };
  const handleEmailBlur = (e) => {
    setEmailClicked(false);
  };
  const handleJobRoleBlur = (e) => {
    setJobRoleClicked(false);
  };

  const onPrevInputChange = (e) => {
    setPrevPass(e.target.value);
  };
  const onNewInputChange = (e) => {
    setNewPass(e.target.value);
  };
  const onConfirmInputChange = (e) => {
    setConfirmPass(e.target.value);
  };

  const onConfirmTextBox = (e) => {
    setConfirmTextBox(e.target.value);
  };
  const handleSendFunction = () => {
    if (numAttempts == 0) {
      Router.push("/logout");
    }
    const endpoint = "/confirmpwd";
    const data = {
      email: userData.email,
      password: confirmTextBox,
    };

    setLoading(true);
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + endpoint, data)
      .then((response) => {
        if (response.data.success) {
          //insert data
          const editAccountSettingsEndpoint = "/editaccountsettings";
          let dataToInsert = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            jobRole: jobRoleValue,
          };

          axios
            .post(
              process.env.NEXT_PUBLIC_API_URL + editAccountSettingsEndpoint,
              dataToInsert
            )
            .then((response) => {
              const data = response.data;
              const status = response.status;
              if (status == 200) {
                alert("Saved Sucessfully!");
                setLoading(false);
                setPassModal(false);
                // Router.reload("/dashboard");
                // manipulate state instead
                dispatch({ type: "EDIT_USER_DATA", payload: data });
              }
            })
            .catch((err) => {
              setLoading(false);
              err.response && alert(err.response.data.error);
            });
        } else {
          setAttempts(numAttempts - 1);
          alert(`invalid password (attempts remaining:${numAttempts})`);
          setLoading(false);
        }
      })
      .catch((err) => {
        err && err.response;
        setAttempts(numAttempts - 1);
        alert(`invalid password (attempts remaining:${numAttempts})`);
        setLoading(false);
      });
    console.log("send");
  };

  const handleSaveAccountSettings = (e) => {
    setPassNeeded(true);
    if (isSaveActive) {
      if (isPassNeeded) {
        setPassModal(true);
      }
    }
  };

  const handleUploadNewPhoto = () => {
    return alert("comming soon");
    setLoading(true);
    console.log("upload clicked");
    const data = new FormData();
    data.append("file", picture);
    data.append("USERID", userData.USERID);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/editImage`, data, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        alert(response.data.message);
        setLoading(false);
        const link = response.data.newImageLink;
        dispatch({ type: "EDIT_USER_IMAGE", payload: link });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.accountSettings}>
      <SpinnerComponent loading={isLoading} position="global" />
      {isPassNeeded ? (
        <ConfirmPasswordModal
          isOpen={isPassModal}
          setClosed={() => setPassModal(false)}
          loaderParentElement={"dashboardSettings"}
          sendFunction={handleSendFunction}
          onConfirmTextBox={onConfirmTextBox}
        />
      ) : (
        ""
      )}
      <p className={styles.accountSettingsText}>Account settings</p>
      <form onChange={handleAccountSettingsChange}>
        <div className={styles.rowInAccountSettings}>
          <div className={styles.rowInAccountSettingsContent}>
            <p
              className={
                isFnameClicked
                  ? styles.rowInAccountSettingsInputLabelactive
                  : styles.rowInAccountSettingsInputLabel
              }
            >
              FIRST NAME
            </p>
            <div className={styles.accountSettingsInputBox}>
              <input
                onBlur={handleFirstNameBlur}
                onChange={handleFirstNameChange}
                onClick={handleFirstNameClick}
                className={
                  isFnameClicked
                    ? styles.accountSettingsInputActive
                    : styles.accountSettingsInput
                }
                placeholder={userData.firstName || "John"}
                value={firstNameValue}
              ></input>
            </div>
          </div>
          <div className={styles.rowInAccountSettingsContent}>
            <p
              className={
                isLnameClicked
                  ? styles.rowInAccountSettingsInputLabelactive
                  : styles.rowInAccountSettingsInputLabel
              }
            >
              LAST NAME
            </p>
            <div className={styles.accountSettingsInputBox}>
              <input
                onBlur={handleLastNameBlur}
                onChange={handleLastNameChange}
                onClick={handleLastNameClick}
                className={
                  isLnameClicked
                    ? styles.accountSettingsInputActive
                    : styles.accountSettingsInput
                }
                placeholder={userData.lastName || "Smith"}
                value={lastNameValue}
              ></input>
            </div>
          </div>
        </div>
        <div
          className={`${styles.rowInAccountSettings} ${styles.rowInAccountSettingsMarginTop}`}
        >
          <div className={styles.rowInAccountSettingsContent}>
            <p
              className={
                isEmailClicked
                  ? styles.rowInAccountSettingsInputLabelactive
                  : styles.rowInAccountSettingsInputLabel
              }
            >
              Email Address
            </p>
            <div className={styles.accountSettingsInputBox}>
              <input
                onBlur={handleEmailBlur}
                onChange={handleEmailChange}
                onClick={handleEmailClick}
                className={
                  isEmailClicked
                    ? styles.accountSettingsInputActive
                    : styles.accountSettingsInput
                }
                placeholder={userData.email || "name@business.com"}
                value={emailValue}
              ></input>
            </div>
          </div>
          <div className={styles.rowInAccountSettingsContent}>
            <p
              className={
                isJobRoleClicked
                  ? styles.rowInAccountSettingsInputLabelactive
                  : styles.rowInAccountSettingsInputLabel
              }
            >
              Job Role
            </p>
            <div className={styles.accountSettingsInputBox}>
              <input
                onBlur={handleJobRoleBlur}
                onChange={handleJobRoleChange}
                onClick={handleJobRoleClick}
                className={
                  isJobRoleClicked
                    ? styles.accountSettingsInputActive
                    : styles.accountSettingsInput
                }
                placeholder={userData.jobRole || "Director of Marketing"}
                value={jobRoleValue}
              ></input>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.accountSettingsButtonWrapper}>
        <button
          className={
            isDiscardActive
              ? styles.discardChangesBTN
              : styles.discardChangesBTNACTIVE
          }
          onClick={handleDiscardButton}
          disabled={isDiscardActive}
        >
          Discard changes
        </button>
        <button
          onClick={handleSaveAccountSettings}
          disabled={!isSaveActive}
          className={isSaveActive ? styles.saveBTNActive : styles.saveBTN}
        >
          Save
        </button>
      </div>

      <div className={styles.divider}></div>
      <div className={styles.dashboardCurrentPhotoWrapper}>
        <p className={styles.dashboardCurrentPhotoLabel}>Current photo</p>
        <div
          className={styles.dashboardCurrentPhotoRow}
          onChange={activateUpload}
        >
          <img
            className={styles.dashboardCurrentPhoto}
            src={imgData || userData.PICTURE}
            alt="avatar"
          ></img>
          <p className={styles.dashboardCurrentPhotoReminder}>
            Max Photo size 1 MB.
          </p>
          <label className={styles.dashboardCurrentPhotoButton}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              onChange={onChangePicture}
              type="file"
            ></input>

            <p className={styles.dashboardCurrentPhotoButtonText}>
              Choose File
            </p>
          </label>
          <label
            onClick={handleUploadNewPhoto}
            className={styles.dashboardCurrentPhotoButton}
            disabled={!isUploadActive}
            style={
              isUploadActive
                ? { borderColor: "#0182fe", color: "#0182fe" }
                : { borderColor: "#9fa2b4", color: "#9fa2b4" }
            }
          >
            <p className={styles.dashboardCurrentPhotoButtonText}>
              Upload new photo
            </p>
          </label>
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.securitySection}>
        <p className={styles.securityLabel}>Security</p>
        <div className={styles.flexRowWrapper}>
          <div className={styles.previousPasswordWrapper}>
            <p
              className={
                isPrevPasswordClicked
                  ? styles.accountSettingsPasswordInputLabelactive
                  : styles.previousPasswordLabel
              }
            >
              PREVIOUS PASSWORD
            </p>
            <div className={styles.accountSettingsInputBox}>
              <input
                onClick={onPrevPasswordClick}
                onBlur={onPrevPasswordBlur}
                onChange={onPrevInputChange}
                autoComplete="new-password"
                type="password"
                className={
                  isPrevPasswordClicked
                    ? styles.PasswordInputactive
                    : styles.previousPasswordInput
                }
                placeholder="Enter your previous password"
                value={prevPass}
              />
            </div>
          </div>
          <div className={styles.newPasswordWrapper}>
            <p
              className={
                isNewPasswordClicked
                  ? styles.accountSettingsPasswordInputLabelactive
                  : styles.newPasswordLabel
              }
            >
              NEW PASSWORD
            </p>
            <div className={styles.accountSettingsInputBox}>
              <input
                onClick={onNewPasswordClick}
                onBlur={onNewPasswordBlur}
                onChange={onNewInputChange}
                type="password"
                className={
                  isNewPasswordClicked
                    ? styles.PasswordInputactive
                    : styles.previousPasswordInput
                }
                placeholder="Enter your new password"
                value={newPass}
              />
            </div>
          </div>
        </div>
        <div className={styles.confirmPasswordWrapper}>
          <p
            className={
              isConfirmPasswordClicked
                ? styles.accountSettingsPasswordInputLabelactive
                : styles.confirmPasswordLabel
            }
          >
            CONFIRM NEW PASSWORD
          </p>
          <div className={styles.accountSettingsInputBox}>
            <input
              onClick={onConfirmPasswordClick}
              onBlur={onConfirmPasswordBlur}
              onChange={onConfirmInputChange}
              type="password"
              className={
                isConfirmPasswordClicked
                  ? styles.PasswordInputactive
                  : styles.previousPasswordInput
              }
              placeholder="Re-enter your new password"
              value={confirmPass}
            />
          </div>
        </div>
        <div className={styles.securityBottomButtonsWrapper}>
          <button className={styles.twoFactorButton}>
            Setup two factor authentication
          </button>
          <button
            onClick={handleChangePasswordClick}
            className={styles.changePasswordButton}
          >
            Change password
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardAccountSettings;
