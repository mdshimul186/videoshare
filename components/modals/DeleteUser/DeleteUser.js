/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */

import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import React, { useState } from "react";
import { SpinnerComponent } from "react-element-spinner";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import style from "./deleteUser.module.css";



const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 52,
        height: 26,
        padding: 0,
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
            border: '1px solid #52d869',
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





const DeleteUser = ({

    isOpen,
    setClosed,
    loaderParentElement,
    selectedUser
}) => {
    const {userData} = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    const [isLoading, setLoading] = useState(false);


    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [organization, setOrganization] = useState('')
    const [service, setService] = useState('')
    const [contact, setContact] = useState('')
 

    const [state, setState] =useState(false);

   
    const [isFnameClicked, setFnameClicked] = useState(false);
    const [isLnameClicked, setLnameClicked] = useState(false);
    const [isEmailClicked, setEmailClicked] = useState(false);
    const [isOrganizationClicked, setOrganizationClicked] = useState(false);
    const [isServiceClicked, setServiceClicked] = useState(false);
    const [isContactClicked, setContactClicked] = useState(false);
    



    const handleDeleteMaster = (userid) => {
        setLoading(true)
        axios.delete(process.env.NEXT_PUBLIC_API_URL + "/admin/deletemasteruser/" + userid)
          .then(res => {
            if (res.data.success) {
              alert(res.data.message)
              dispatch({
                type: "DELETE_USER",
                payload: userid
              })
              setLoading(false)
              setClosed(true)
            }
          })
          .catch(err => {
            setLoading(false)
            err && err.response && alert(err.response.data.error)
          })
      }
    
    
      const handleDeleteUser = (userid) => {
        setLoading(true)
        axios.delete(process.env.NEXT_PUBLIC_API_URL + "/master/deleteuser/" + userid)
          .then(res => {
            if (res.data.success) {
              alert(res.data.message)
              dispatch({
                type: "DELETE_USER",
                payload: userid
              })
              setLoading(false)
              setClosed(true)
            }
          })
          .catch(err => {
            setLoading(false)
            err && err.response && alert(err.response.data.error)
          })
      }
    
      let handleOption = () => {
        if (userData.role === 'admin') {
            handleDeleteMaster(selectedUser._id)
    
        }else if(userData.role === 'master'){
            handleDeleteUser(selectedUser._id)
              
        }
    
      };

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

                        <div className={style.userInfo}>
                            <div className={style.userData}>
                                <div className={style.userImage}>
                                    <div className={style.imageContainer}>
                                        <img src='/camera.png'></img>
                                    </div>
                                </div>
                                <div className={style.userInfoData}>
                                    <p className={style.userName}>{selectedUser.firstName} {selectedUser.lastName}</p>
                                    <p className={style.lowerText}>Last sign-in: About 3 hours ago<br></br>
                                    Created: Jun 17, 2021
                                    </p>
                                </div>
                            </div>
                            <div className={style.totalVideos}>
                                <p className={style.secTitle}>TOTAL VIDEOS</p>
                                <p className={style.count}>80</p>
                            </div>
                            <div className={style.storage}>
                                <p className={style.secTitle}>VIDEO STORAGE</p>
                                <p className={style.count}>0.68 GB</p>
                                <p className={style.lowerText}>4.53% of storage used</p>
                            </div>
                        </div>


                        <div style={{marginTop:"30px"}} className={style.divider}></div>

                        <div className={style.resetSection}>
                            <p className={style.rowTitle}>TRANSFER DATA</p>

                            <div className={style.deleteUserSwitchContent}>
                                        <FormControlLabel
                                            control={<IOSSwitch checked={state} onChange={(e)=>setState(e.target.checked)} name="checkedB" />}
                                            label={<p className={style.swithLabel}>Transfer ownership of this user’s data to another user (for examle, a manager)</p>}
                                        />
                                    </div>
                          
                        </div>


                        <div className={style.renameSec}>
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
                                                disabled={!state}
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
                                                disabled={!state}
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
                                                disabled={!state}
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
                                                disabled={!state}
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
                                                disabled={!state}
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
                                                disabled={!state}
                                            ></input>
                                        </div>
                                    </div>


                                    

                                </div>
                            </div>

                        </div>

                        <div style={{marginTop:"40px",marginBottom:"10px"}} className={style.divider}></div>

                        <div className={style.lowerButton}>
        
                                <button onClick={() => setClosed(true)} className={style.cancleButton}>Cancle</button>
                                <button className={style.deleteButton} onClick={()=>handleOption()}>DELETE</button>
                   
                        </div>





                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DeleteUser
