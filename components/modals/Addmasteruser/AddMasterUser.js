/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */

import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { SpinnerComponent } from "react-element-spinner";
import Modal from "react-modal";
import { useDispatch } from 'react-redux';
import shortid from 'shortid';
import style from "./addMasterUser.module.css";




const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 52,
        height: 26,
        padding: 0,
        borderRadius: 57,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(26px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#52d869',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 30 / 2,
        border: `1px solid  #9FA2B4`,
        backgroundColor: " #9FA2B4",
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});





const AddMasterUserModal = ({
    isOpen,
    setClosed,
    loaderParentElement,
}) => {
  
    const dispatch = useDispatch()


      const [fname, setFname] = useState('')
      const [lname, setLname] = useState('')
      const [email, setEmail] = useState('')
      const [service, setService] = useState('')
      const [organization, setOrganization] = useState('')
      const [contact, setContact] = useState('')
      const [password, setPassword] = useState('')
      const [inviteCount, setInviteCount] = useState(0)

      const [genPass, setGenPass] = useState(false)
      const [passChangeNextTime, setPassChangeNextTime] = useState(false)


    const [inputType, setInputType] = useState("password");
    const [isLoading, setLoading] = useState(false);

   




    const [isFnameClicked, setFnameClicked] = useState(false);
    const [isLnameClicked, setLnameClicked] = useState(false);
    const [isEmailClicked, setEmailClicked] = useState(false);
    const [isOrganizationClicked, setOrganizationClicked] = useState(false);
    const [isServiceClicked, setServiceClicked] = useState(false);
    const [isContactClicked, setContactClicked] = useState(false);
    const [isInviteCountClicked, setInviteCountClicked] = useState(false);
    


    const [image, setImage] = useState('');


    const [isPasswordClicked, setPasswordClicked] = useState(false);
   

    useEffect(() => {
        genPass ?
        setPassword(shortid.generate()):
        setPassword("")
    }, [genPass]);


    const handleSubmit =()=>{
        if(!fname){
            return alert("Firstname is required")
        }
        if(!lname){
            return alert("Lastname is required")
        }
        if(!email){
            return alert("Email is required")
        }
        if(password.length < 8){
            return alert("Password shaould be more then 8 character")
        }
        setLoading(true)
        let formData = new FormData()
        formData.append("firstName",fname)
        formData.append("lastName",lname)
        formData.append("email",email)
        formData.append("password",password)
        formData.append("organization",organization)
        formData.append("contact",contact)
        formData.append("service",service)
        formData.append("inviteCount",inviteCount)
        formData.append("profileimage",image)

        axios.post(process.env.NEXT_PUBLIC_API_URL+"/admin/createmasteruser",formData)
    .then(res=>{
      if(res.status === 201){
        alert(res.data.message)
        dispatch({
          type:"ADD_NEW_USER",
          payload:res.data.user
        })
        setClosed(true)
        setFname("")
        setLname("")
        setEmail("")
        setImage("")
        setPassword("")
        setOrganization("")
        setService("")
        setContact("")
        setInviteCount(0)
        setLoading(false)
        setGenPass(false)
        setPassChangeNextTime(false)
      }
    })
    .catch(err=>{
      setPassword("")
      setLoading(false)
      err && err.response && alert(err.response.data.error)
    })
    }
    return (
        <div>
        <SpinnerComponent loading={isLoading} position="global" /> 
            <Modal
                appElement={document.getElementById(`${loaderParentElement}`)}
                isOpen={isOpen}
                onRequestClose={setClosed}
                className={style.Modal}
                contentLabel="Videoshare - confirm password"
            >
                <div>
                    <button
                        onClick={() => setClosed(true)}
                        className={style.closeButton}
                    ></button>
                    <div className={style.content}>
                        <p className={style.title}>
                            Add New User
						</p>
                        <p className={style.subTitle}>
                            Type in the email address of the user you'd like to invite, then select their role.
						</p>
                        <div className={style.mainBody}>
                            <div className={style.leftColumn}>




                                <div className={style.inviteUserContent}>
                                    <p className={isFnameClicked ? style.inviteInputLabelactive : style.inviteInputLabel}>
                                        FIRST NAME
                                    </p>
                                    <div className={style.inviteInputBox}>
                                        <input
                                            onBlur={() => setFnameClicked(false)}
                                            onChange={(e)=>setFname(e.target.value)}
                                            onClick={() => setFnameClicked(true)}
                                            className={isFnameClicked ? style.inviteInputActive : style.inviteInput}
                                            placeholder={"John"}
                                            value={fname}
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
                                            onChange={(e)=>setEmail(e.target.value)}
                                            onClick={() => setEmailClicked(true)}
                                            className={isEmailClicked ? style.inviteInputActive : style.inviteInput}
                                            placeholder={"youremail@example.com"}
                                            value={email}
                                            type="email"
                                        ></input>
                                    </div>
                                </div>

                                <div className={style.inviteUserContent}>
                                    <p className={isOrganizationClicked ? style.inviteInputLabelactive : style.inviteInputLabel}>
                                        ORGANIZATION
                                    </p>
                                    <div className={style.inviteInputBox}>
                                        <input
                                            onBlur={() => setOrganizationClicked(false)}
                                            onChange={(e)=>setOrganization(e.target.value)}
                                            onClick={() => setOrganizationClicked(true)}
                                            className={isOrganizationClicked ? style.inviteInputActive : style.inviteInput}
                                            placeholder={"Nike"}
                                            value={organization}

                                        ></input>
                                    </div>
                                </div>

                                <div className={style.inviteUserSwitchContent}>
                                    <FormControlLabel
                                        control={<IOSSwitch checked={genPass} onChange={(e)=>setGenPass(e.target.checked)} name="genPass" />}
                                        label={<p className={style.swithLabel}>Automatically generate a password</p>}
                                    />
                                </div>


                                <div className={style.inviteUserContent}>
                                    <p className={ isPasswordClicked ? style.inviteInputLabelactive : style.inviteInputLabel}>
                                        MASTER PASSWORD
                                    </p>
                                    <div className={style.loginPasswordPasswrap}>
                                        <span
                                            className={style.eyeButton}
                                            alt="eye-btn"
                                            onClick={() => {
                                                inputType === 'password' ? setInputType("text") :
                                                    inputType === 'text' ? setInputType("password") : null
                                            }}
                                        />
                                        <input
                                            type={inputType}
                                            onClick={()=>setPasswordClicked(true)}
                                            onBlur={()=>setPasswordClicked(false)}
                                            className={isPasswordClicked ? style.inviteInputActive : style.inviteInput}
                                            placeholder="Must have at least 8 character"
                                            onChange={(e)=>setPassword(e.target.value)}
                                            value={password}
                                        ></input>
                                    </div>
                                </div>

                                <div className={style.inviteUserSwitchContent}>
                                        <FormControlLabel
                                            control={<IOSSwitch checked={passChangeNextTime} onChange={(e)=>setPassChangeNextTime(e.target.checked)} name="passChange" />}
                                            label={<p className={style.swithLabel}>Ask for a password change at the next sign-in</p>}
                                        />
                                </div>

                                <div className={style.inviteUserContent}>
                                    <p className={isInviteCountClicked ? style.inviteInputLabelactive : style.inviteInputLabel}>
                                        Invitation Limit
                                    </p>
                                    <div className={style.inviteInputBox}>
                                        <input
                                            onBlur={() => setInviteCountClicked(false)}
                                            onChange={(e)=>setInviteCount(e.target.value)}
                                            onClick={() => setInviteCountClicked(true)}
                                            className={isInviteCountClicked ? style.inviteInputActive : style.inviteInput}
                                            value={inviteCount}
                                            type="number"
                                            
                                        ></input>
                                    </div>
                                </div>


                            </div>

                            <div className={style.rightColumn}>



                                <div className={style.inviteUserContent}>
                                    <p className={isLnameClicked ? style.inviteInputLabelactive : style.inviteInputLabel}>
                                        LAST NAME
                                    </p>
                                    <div className={style.inviteInputBox}>
                                        <input
                                            onBlur={() => setLnameClicked(false)}
                                            onChange={(e)=>setLname(e.target.value)}
                                            onClick={() => setLnameClicked(true)}
                                            className={isLnameClicked ? style.inviteInputActive : style.inviteInput}
                                            placeholder={"Doe"}
                                            value={lname}
                                        ></input>
                                    </div>
                                </div>


                                <div className={style.inviteUserContent}>
                                    <p className={isServiceClicked ? style.inviteInputLabelactive : style.inviteInputLabel}>
                                        SERVICE
                                    </p>
                                    <div className={style.inviteInputBox}>
                                        <input
                                            onBlur={() => setServiceClicked(false)}
                                            onChange={(e)=>setService(e.target.value)}
                                            onClick={() => setServiceClicked(true)}
                                            className={isServiceClicked ? style.inviteInputActive : style.inviteInput}
                                            placeholder={"Marketing"}
                                            value={service}

                                        ></input>
                                    </div>
                                </div>


                                <div className={style.inviteUserContent}>
                                    <p className={isContactClicked ? style.inviteInputLabelactive : style.inviteInputLabel}>
                                        CONTACT NUMBER
                                    </p>
                                    <div className={style.inviteInputBox}>
                                        <input
                                            onBlur={() => setContactClicked(false)}
                                            onChange={(e)=>setContact(e.target.value)}
                                            onClick={() => setContactClicked(true)}
                                            className={isContactClicked ? style.inviteInputActive : style.inviteInput}
                                            placeholder={""}
                                            value={contact}

                                        ></input>
                                    </div>
                                </div>


                                <div className={style.inviteUserImageContent}>
                                <label htmlFor='avatarimage'>
                                   <div style={
                                       image ? {backgroundImage:`url(${URL.createObjectURL(image)})`}:null
                                   } className={style.imageContainer}>
                                       <img src='/camera.png'></img>
                                   </div>
                                   </label>
                                   <input onChange={(e) => setImage(e.target.files[0])} type="file" accept='image/*' id='avatarimage' hidden></input>
                                </div>

                                   <div className={style.buttonGroup}>
                                   <button  onClick={() => setClosed(true)} className={style.cancleButton}>Cancle</button>
                                   <button className={style.inviteButton} onClick={()=>handleSubmit()}>ADD NEW USER</button>
                                   </div>
                                
                            </div>
                        </div>


                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AddMasterUserModal
