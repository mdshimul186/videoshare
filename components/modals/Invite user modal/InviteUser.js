import React, { useEffect, useState } from "react";
import style from "./inviteuser.module.css";
import Modal from "react-modal";
import { useSelector } from "react-redux";

const InviteUser = ({

    isOpen,
    setClosed,
    loaderParentElement,
    sendFunction,
    onChangeFname,
    onChangeLname,
    onChangeEmail,
    onChangeJobRole,
    onChangeTrxId,
    onChangeNewPassword,
    onChangeConfirmPassword,
    onChangeBranding,
    onChangeAccess,
    selectScript,
    selectTemplate,
    fnameValue,
    lnameValue,
    emailValue,
    jobRoleValue,
    trxIdValue,
    passwordValue,
    confirmPasswordValue,
    brandingValue,
    scriptValue,
    templateValue,
    accessValue
}) => {
    const email = useSelector((state) => state.auth.userData.EMAIL);
    useEffect(() => {
        console.log(email);
    }, []);

    const [isFnameClicked, setFnameClicked] = useState(false);
    const [isLnameClicked, setLnameClicked] = useState(false);
    const [isEmailClicked, setEmailClicked] = useState(false);
    const [isJobRoleClicked, setJobRoleClicked] = useState(false);
    const [isBrandingClicked, setBrandingClicked] = useState(false);
    const [isTrxIdClicked, setTrxIdClicked] = useState(false);


    const [isNewPasswordClicked, setNewPasswordClicked] = useState(false);
    const [isConfirmPasswordClicked, setConfirmPasswordClicked] = useState(false);


    return (
        <div>
            <Modal
                appElement={document.getElementById(`${loaderParentElement}`)}
                isOpen={isOpen}
                onRequestClose={setClosed}
                className={style.Modal}
                contentLabel="Videoshare - invite user"
            >
                <div>
                    <button
                        onClick={() => setClosed(true)}
                        className={style.closeButton}
                    ></button>
                    <div className={style.content}>
                        <p className={style.heading}>
                            Invite User
						</p>
                        <p className={style.subHeading}>Type in the email address of the user you'd like to invite, then <br></br> select their role.</p>

                        <div className={style.mainBody}>
                            <div className={style.leftColumn}>




                                <div className={style.inviteUserContent}>
                                    <p className={isFnameClicked ? style.inviteInputLabelactive : style.inviteInputLabel}>
                                        FIRST NAME
                                    </p>
                                    <div className={style.inviteInputBox}>
                                        <input
                                            onBlur={() => setFnameClicked(false)}
                                            onChange={onChangeFname}
                                            onClick={() => setFnameClicked(true)}
                                            className={isFnameClicked ? style.inviteInputActive : style.inviteInput}
                                            placeholder={"John"}
                                            value={fnameValue}
                                        ></input>
                                    </div>
                                </div>

                                <div className={style.inviteUserContent}>
                                    <p className={isLnameClicked ? style.inviteInputLabelactive : style.inviteInputLabel}>
                                        LAST NAME
                                    </p>
                                    <div className={style.inviteInputBox}>
                                        <input
                                            onBlur={() => setLnameClicked(false)}
                                            onChange={onChangeLname}
                                            onClick={() => setLnameClicked(true)}
                                            className={isLnameClicked ? style.inviteInputActive : style.inviteInput}
                                            placeholder={"Doe"}
                                            value={lnameValue}
                                        ></input>
                                    </div>
                                </div>

                                <div className={style.inviteUserContent}>
                                    <p className={isEmailClicked ? style.inviteInputLabelactive : style.inviteInputLabel}>
                                        EMAIL
                                    </p>
                                    <div className={style.inviteInputBox}>
                                        <input
                                            onBlur={() => setEmailClicked(false)}
                                            onChange={onChangeEmail}
                                            onClick={() => setEmailClicked(true)}
                                            className={isEmailClicked ? style.inviteInputActive : style.inviteInput}
                                            placeholder={"youremail@example.com"}
                                            value={emailValue}
                                            type="email"
                                        ></input>
                                    </div>
                                </div>

                                <div className={style.inviteUserContent}>
                                    <p className={isJobRoleClicked ? style.inviteInputLabelactive : style.inviteInputLabel}>
                                        JOB ROLE
                                    </p>
                                    <div className={style.inviteInputBox}>
                                        <input
                                            onBlur={() => setJobRoleClicked(false)}
                                            onChange={onChangeJobRole}
                                            onClick={() => setJobRoleClicked(true)}
                                            className={isJobRoleClicked ? style.inviteInputActive : style.inviteInput}
                                            placeholder={""}
                                            value={jobRoleValue}
                                        ></input>
                                    </div>
                                </div>

                                <div className={style.inviteUserContent}>
                                    <p className={isNewPasswordClicked ? style.inviteInputLabelactive : style.inviteInputLabel}>
                                        NEW PASSWORD
                                    </p>
                                    <div className={style.inviteInputBox}>
                                        <input
                                            onBlur={() => setNewPasswordClicked(false)}
                                            onChange={onChangeNewPassword}
                                            onClick={() => setNewPasswordClicked(true)}
                                            className={isNewPasswordClicked ? style.inviteInputActive : style.inviteInput}
                                            placeholder={""}
                                            value={passwordValue}
                                            type="password"
                                        ></input>
                                    </div>
                                </div>

                                <div className={style.inviteUserContent}>
                                    <p className={isConfirmPasswordClicked ? style.inviteInputLabelactive : style.inviteInputLabel}>
                                        CONFIRM PASSWORD
                                    </p>
                                    <div className={style.inviteInputBox}>
                                        <input
                                            onBlur={() => setConfirmPasswordClicked(false)}
                                            onChange={onChangeConfirmPassword}
                                            onClick={() => setConfirmPasswordClicked(true)}
                                            className={isConfirmPasswordClicked ? style.inviteInputActive : style.inviteInput}
                                            placeholder={""}
                                            value={confirmPasswordValue}
                                            type="password"
                                        ></input>
                                    </div>
                                </div>






                                {/* 
                                <p>First Name</p>
                                <input value={fnameValue} type="text" onChange={onChangeFname}></input> */}
                                {/* <p>Last Name</p>
                                <input value={lnameValue} type="text" onChange={onChangeLname}></input> */}
                                {/* <p>Email</p>
                                <input value={emailValue} type="email" onChange={onChangeEmail}></input> */}
                                {/* <p>Job Role</p>
                                <input value={jobRoleValue} type="text" onChange={onChangeJobRole}></input> */}
                               
                                {/* <p>New Password</p>
                                <input value={passwordValue} type="password" onChange={onChangeNewPassword}></input>
                                <p>Confirm Password</p>
                                <input value={confirmPasswordValue} type="password" onChange={onChangeConfirmPassword}></input> */}
                            </div>

                            <div className={style.rightColumn}>


                                <div className={style.inviteUserContent}>
                                    <p className={isBrandingClicked ? style.inviteInputLabelactive : style.inviteInputLabel}>
                                        SELECT BRANDING
                                    </p>
                                    <div className={style.inviteInputBox}>
                                        {/* <input
                                            onBlur={() => setBrandingClicked(false)}
                                            onChange={onChangeConfirmPassword}
                                            onClick={() => setBrandingClicked(true)}
                                            className={isBrandingClicked ? style.inviteInputActive : style.inviteInput}
                                            placeholder={""}
                                            value={confirmPasswordValue}

                                        ></input> */}
                                        <select 
                                            className={isBrandingClicked ? style.inviteInputActiveR : style.inviteInputR} 
                                            value={brandingValue} 
                                            onChange={onChangeBranding} 
                                            name="branding" 
                                            id="branding"
                                            onBlur={() => setBrandingClicked(false)}
                                            onClick={() => setBrandingClicked(true)}
                                        >
                                            <option value="branding1">Branding 1</option>
                                            <option value="branding2">Branding 2</option>
                                            <option value="branding3">Branding 3</option>
                                            <option value="branding4">Branding 4</option>
                                        </select>
                                    </div>
                                </div>





                                {/* <label for="branding">Select Branding</label><br></br>

                                <select value={brandingValue} onChange={onChangeBranding} name="branding" id="branding">
                                    <option value="branding1">Branding 1</option>
                                    <option value="branding2">Branding 2</option>
                                    <option value="branding3">Branding 3</option>
                                    <option value="branding4">Branding 4</option>
                                </select> */}



                                <div className={style.inviteUserContent}>
                                    <div className={style.inviteInputBox}>
                                        <p onClick={selectScript} className={scriptValue ? style.activeScript : style.script} >
                                            SCRIPT
                                        </p>
                                    </div>
                                </div>

                                <div className={style.inviteUserContent}>
                                    <div className={style.inviteInputBox}>
                                        <p onClick={selectTemplate} className={templateValue ? style.activeScript : style.script} >
                                            TEMPLATE
                                        </p>
                                    </div>
                                </div>

                                {/* <p style={scriptValue ? { color: "red" } : { color: "black" }} onClick={selectScript}>Script</p>
                                <p style={templateValue ? { color: "red" } : { color: "black" }} onClick={selectTemplate}>Template</p> */}


                                <form className={style.RadioForm} onChange={onChangeAccess}>
                                    <div className={style.RadioFormRow}>
                                        <input className={style.radioInput} checked={accessValue === 'full'} type="radio" id="full" name="access" value="full"></input>
                                        <label className={style.radioInputLabel} htmlFor="full">Full access</label><br></br>
                                    </div>
                                    <div className={style.RadioFormRow}>
                                        <input className={style.radioInput} checked={accessValue === 'limited'} type="radio" id="limited" name="access" value="limited"></input>
                                        <label className={style.radioInputLabel} htmlFor="limited">Limited access</label><br></br>
                                    </div>

                                </form>


                                <div className={style.inviteUserContent}>
                                    <p className={isTrxIdClicked ? style.inviteInputLabelactive : style.inviteInputLabel}>
                                        TRANSACTION ID
                                    </p>
                                    <div className={style.inviteInputBox}>
                                        <input
                                            onBlur={() => setTrxIdClicked(false)}
                                            onChange={onChangeTrxId}
                                            onClick={() => setTrxIdClicked(true)}
                                            className={isTrxIdClicked ? style.inviteInputActiveR : style.inviteInputR}
                                            placeholder={"Enter Trx ID"}
                                            value={trxIdValue}
                                        ></input>
                                    </div>
                                </div>

                                {/* <p>Transaction ID</p>
                                <input value={trxIdValue} type="text" onChange={onChangeTrxId}></input> */}

                                <button className={style.inviteButton} onClick={sendFunction}>INVITE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default InviteUser;
