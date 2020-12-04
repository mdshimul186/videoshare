/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useState } from "react";
import { SpinnerComponent } from "react-element-spinner";
import { connect, useDispatch, useSelector } from "react-redux";
import AddMasterUserModal from '../../../modals/Addmasteruser/AddMasterUser';
import InviteUser from '../../../modals/Inviteusermodal/InviteUser';
import Header from "../../dashboardHeader/Header";
import AllUsersTable from "../AllUsersTable/AllUsersTable";
import Pagination from "../Pagination/Pagination";
import {
  changeMinPage,
  changeUsersPerPage, toggleCurrentDashboardUsersPage
} from "./actions/usersAction";
import styles from "./AllUsers.module.css";


const mapStateToProps = (state) => {
  return { users: state.users };
};

const mapDispatchToProps = (dispatch) => {
  return {
    /**
     * @param {number} number page number
     * @return {void}
     * @description changeMinPage means changing the indicator number below (1-8 of 19) the number 1 is the minpage
     * it also has formula minPage+usersPerPage
     * the minPage will be incremented depending on how many users per page there is
     */
    toggleCurrentDashboardUsersPage: (number) =>
      dispatch(toggleCurrentDashboardUsersPage(number)),
    changeMinPage: (data) => dispatch(changeMinPage(data)),
    changeUsersPerPage: (data) => dispatch(changeUsersPerPage(data)),
  };
};
/**
 * @description This is the Allusers component which displays all the users when user on dashboard sidebar is clicked
 * @param {number} minPage minimum number of page to be set
 * @param {Array} usersToRender all users to be seen here on the page
 * @param {number} pageNumber current page number
 * @param {boolean} nextPageButtonState next page button state keeps track of the next button if it is available to be clicked or no
 * @param {boolean} prevPageButtonState prev page button state keeps track of the next button if it is available to be clicked or no
 * @param {number} usersPerPage number of users per page
 */

const ALLUsers = (props) => {
  const {
    minPage,
    usersToRender,
    maxUsersPerPage,
    pageNumber,
    prevPageButtonState,
    nextPageButtonState,
    usersPerPage,
  } = props;

  let dispatch = useDispatch()
  const {auth} = useSelector(state=>state)


  const [isModal, setIsModal] = useState(false)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [isLoading, setLoading] = useState(false);

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [jobRole, setJobRole] = useState('')
  const [trxId, setTrxId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [branding, setBranding] = useState('branding1')
  const [script, setScript] = useState(false)
  const [template, setTemplate] = useState(false)
  const [access, setAccess] = useState('limited')





  const handleInviteUser=()=>{
    let newUser={
      firstName:fname,
      lastName:lname,
      email,
      jobRole,
      trxId,
      password,
      confirmPassword,
      branding,
      script,
      template,
      fullAccess:access === 'full' ? true:false
    }

   // console.log(newUser);
    setLoading(true)
    // eslint-disable-next-line no-undef
    axios.post(process.env.NEXT_PUBLIC_API_URL+"/master/inviteuser",newUser)
    .then(res=>{
      if(res.status === 201){
        alert(res.data.message)
        dispatch({
          type:"ADD_NEW_USER",
          payload:res.data.user
        })
        setIsInviteModalOpen(false)
        setFname("")
        setLname("")
        setEmail("")
        setJobRole("")
        setScript(false)
        setTemplate(false)
        
        setPassword("")
        setConfirmPassword("")
        setLoading(false)
      }
    })
    .catch(err=>{
      //setPassword("")
      //setConfirmPassword("")
      setLoading(false)
      err && err.response && alert(err.response.data.error)
    })
    
  }

  const handleModal=()=>{
      if(auth.userData.role === 'admin'){
        setIsModal(!isModal)
      }else if(auth.userData.role === 'master'){
        setIsInviteModalOpen(!isInviteModalOpen)
      }
  }

  //initialize an empty array for us to store fetched data from the database
  const usersPerPageArr = [];

  //generates numbers for the number of pages dropdown at the bottom of the ui
  for (let i = 1; i <= maxUsersPerPage; i++) {
    usersPerPageArr.push(i);
  }

  /**
   * @description this function is responsible for reseting the page back to page 1
   * whenever a change in the scriptsPerPage was fired.
   * @param {void} props properties of main component it is in.
   * @param {event} event passed from the component that was called.
   */
  const handleUsersPerPage = (props, event) => {
    props.changeUsersPerPage(event.target.value);
    props.toggleCurrentDashboardUsersPage(1);
    props.changeMinPage(1);
  };
  /**
   *
   * @param {number} number accepts page number
   */
  const handleNextPageButton = (number) => {
    props.toggleCurrentDashboardUsersPage(number + 1);

    props.changeMinPage(Number(minPage) + Number(usersPerPage));
  };
  const handlePrevPageButton = (number) => {
    props.toggleCurrentDashboardUsersPage(number - 1);

    props.changeMinPage(Number(minPage) - Number(usersPerPage));
  };

  const UsersOptions = () => {
    let tempUsersOptions = [];
    {
      usersPerPageArr.map(function (n) {
        tempUsersOptions.push(
          <option className={styles.DropdownOptions} key={n} value={n}>
            {n}
          </option>
        );
      });
    }
    return tempUsersOptions;
  };

  return (
    <div id="user" className={styles.dashboardUsersContent}>
      <Header />
      <SpinnerComponent loading={isLoading} position="global" /> 

      <AddMasterUserModal
          isOpen={isModal}
          setClosed={() => setIsModal(false)}
          loaderParentElement={"user"}
        />


      <InviteUser
          isOpen={isInviteModalOpen}
          setClosed={() => setIsInviteModalOpen(false)}
          loaderParentElement={"user"}
          sendFunction={()=>handleInviteUser()}
          onChangeFname={(e)=>setFname(e.target.value)}
          onChangeLname={(e)=>setLname(e.target.value)}
          onChangeEmail={(e)=>setEmail(e.target.value)}
          onChangeJobRole={(e)=>setJobRole(e.target.value)}
          onChangeTrxId={(e)=>setTrxId(e.target.value)}
          onChangeNewPassword={(e)=>setPassword(e.target.value)}
          onChangeConfirmPassword={(e)=>setConfirmPassword(e.target.value)}
          onChangeBranding={(e)=>setBranding(e.target.value)}
          selectScript={()=>setScript(!script)}
          selectTemplate={()=>setTemplate(!template)}
          onChangeAccess={(e)=>setAccess(e.target.value)}
          fnameValue={fname}
          lnameValue={lname}
          emailValue={email}
          jobRoleValue={jobRole}
          trxIdValue={trxId}
          passwordValue={password}
          confirmPasswordValue={confirmPassword}
          brandingValue={branding}
          scriptValue={script}
          templateValue={template}
          accessValue={access}
        />




      <div className={styles.contentUsers}>
        <div className={styles.allUsersWrapper}>
          <p className={styles.allUsers}>Users</p>
          <div className={styles.inputWithSearchGroup}>
            <img
              className={styles.searchIcon}
              alt="search"
              src="/scriptsearch.svg"
            ></img>
            <input
              className={styles.usersSearchInput}
              placeholder="Search User"
            ></input>
          </div>
          <button onClick={()=>handleModal()} className={styles.newUserButton}>New User</button>
        </div>
        {/* table goes here */}
        <div className={styles.usersTableContainer}>
          <div className={styles.userTable}>
            <div className={`flex-row ${styles.AllUsersTable}`}>
              <p className={styles.AllUsersTableName}>Full name</p>
              <p className={styles.AllUsersTableRole}>Job Role</p>
              <p className={styles.AllUsersTableBranding}>Branding</p>
              <p className={styles.AllUsersTableAction}></p>
            </div>
            <div className={`${styles.divider} ${styles.usersDivider}`}></div>
            <AllUsersTable usersToRender={usersToRender} />
          </div>
        </div>
        <div className={`flex-row ${styles.AllUsersPaginationContainer}`}>
          <div className={styles.rowsPerPage}>
            <p className={styles.rowsPerPageText}>Rows per page:</p>
            <select
              className={styles.DropdownWrapper}
              name="select"
              onChange={(event) => {
                handleUsersPerPage(props, event);
              }}
              defaultValue={usersPerPage}
              value={usersPerPage}
            >
              <UsersOptions />
            </select>
          </div>
          <div className={styles.paginator}>
            <Pagination />
            <button
              className={styles.prevUsersButton}
              disabled={!prevPageButtonState}
              onClick={() => handlePrevPageButton(pageNumber)}
            ></button>
            <button
              className={styles.nextUsersButton}
              disabled={!nextPageButtonState}
              onClick={() => handleNextPageButton(pageNumber)}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ALLUsers);
