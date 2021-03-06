import React, { useState } from "react";
import { SpinnerComponent } from "react-element-spinner";
import { connect, useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import DeleteUser from '../../../modals/DeleteUser/DeleteUser';
import EditUser from '../../../modals/EditUser/EditUser';
import style from "./AllUsersTable.module.css";

const mapStateToProps = (state) => {
  return { users: state.users };
};

const usersOption = [
  { value: "edit", label: "Edit" },
  { value: "delete", label: "Delete" },
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#0182FE" : "",
    color:
      state.value === "delete"
        ? "#EB5757"
        : state.isFocused
          ? "#FFFFFF"
          : "#9FA2B4",
    fontFamily: "Mulish",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.2px",
    marginTop: "0",
    textAlign:"left"
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",

    cursor: "pointer",
  }),
  placeholder: () => ({
    fontFamily: "Mulish",
  }),
  valueContainer: () => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  }),
  menu: (provided) => {
    const marginTop = "-10px";
    const marginLeft = "-130px";
    const width = "126px";
    return { ...provided, marginTop, width, marginLeft };
  },
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;

    return {
      ...provided,
      display,
      textAlign,
      justifyContent,
      alignItems,
      transition,
      opacity,
      marginTop,
      position,
      fontFamily,
      fontStyle,
      fontWeight,
      color,
      lineHeight,
      fontSize,
      letterSpacing,
    };
  },
};



const AllUsersTable = ({ usersToRender }) => {

  const dispatch = useDispatch()
  const {auth} = useSelector(state=>state)
  const [isLoading, setLoading] = useState(false);
  const [isModal, setIsModal] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)


  const [selectedUser, setSelectedUser] = useState({})
  const [selectedUserForDelete, setSelectedUserForDelete] = useState({})



  let handleOption = (e, user) => {

    //console.log(userid);
    //alert(e.value,userid);
    if (e.value === 'delete') {
      
      setIsDeleteModal(true)
      setSelectedUserForDelete(user)

    }else if(e.value === 'edit'){
      setIsModal(true)
      setSelectedUser(user)
          
    }


  };
  const users = usersToRender;

  const AllUsersList =
    users &&
    users.map((user) => {
      return (
        <React.Fragment key={user._id}>
        
          <div className={`flex-row ${style.AllUsersTable}`}>
            <div className={style.userinfo}>
            {
              auth.userData && auth.userData.role === 'admin' &&
              (
                <img className={style.userAvatar} src={user.profilePicture ? user.profilePicture : "videoman.png"}></img>
              )
            }
              <p className={style.userName}>{user.firstName} {user.lastName}</p>
            </div>
            <p className={`${style.role} ${style.userRole}	`}>{user.jobRole ? user.jobRole : "N/A"}</p>
            <p className={`${style.branding} ${style.userBranding}`}>
              {user.accessType.fullAccess ? "Full aceess" : 
              user.accessType.branding1 ? "Branding 1" : 
              user.accessType.branding2 ? "Branding 2" : 
              user.accessType.branding3 ? "Branding 3" : 
              user.accessType.branding4 ? "Branding 4" : 
              "N/A"
              }
            </p>
            <div className={style.action}>
              <Select
                components={{
                  IndicatorSeparator: () => null,
                  DropdownIndicator: () => true,
                }}
                onChange={(e) => handleOption(e, user)}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={customStyles}
                isSearchable={false}
                options={usersOption}
                value={null}
                placeholder={<img src="/verticalThreedots.svg"></img>}
              />
            </div>
          </div>
          <div className="divider script-divider"></div>
        </React.Fragment>
      );
    });
  if (users.loading) {
    return <p className={style.LoadingText}>Users are loading</p>;
  } else if (users.length === 0) {
    return <p className={style.NoScriptText}>You have no users yet!.</p>;
  } else {
    return <div>
    <SpinnerComponent loading={isLoading} position="global" />
    <EditUser
          isOpen={isModal}
          setClosed={() => {
            setSelectedUser({})
            setIsModal(false)
            }}
          loaderParentElement={"user"}
          selectedUser={selectedUser}
        />
    <DeleteUser
          isOpen={isDeleteModal}
          setClosed={() => {
            setSelectedUserForDelete({})
            setIsDeleteModal(false)
            }}
          loaderParentElement={"user"}
          selectedUser={selectedUserForDelete}
        />
    {AllUsersList}</div>;
  }
};

export default connect(mapStateToProps)(AllUsersTable);
