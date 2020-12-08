import React,{useState,useEffect} from "react";
import Modal from "react-modal";
import style from "./pendinguser.module.css";
import axios from 'axios'
import { SpinnerComponent } from "react-element-spinner";

const PendingUser = ({
    isOpen,
    setClosed,
    loaderParentElement,
}) => {
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true)
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/getpendinguser`)
        .then(res=>{
            setUsers(res.data.user)
            setLoading(false)
        })
        .catch(err=>{
            setLoading(false)
            err && err.response && alert(err.response.data.error)
        })
    },[])

    const handleApprove=(id)=>{
        setLoading(true)
        axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/admin/approve/${id}`)
        .then(res=>{
            if(res.data.success){
                alert("approved successfully")
                let newList = [...users]
                let index = newList.findIndex(u=>u._id == id)
                newList.splice(index,1)
                setUsers(newList)
                setLoading(false)
            }
        })
        .catch(err=>{
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
        contentLabel="Pending User Modal"
        className={style.Modal}
      >
        <div className={style.content}>
          <button
            onClick={()=>setClosed(true)}
            className={style.closeButton}
          ></button>
          <p className={style.title}>Pending users list</p>
          <div className={style.content}>
          <div style={{borderBottom:"1px solid #666",marginBottom:"5px"}} className={style.singleList}><p>name</p><p>TransactionId</p> <p>Email</p><p>Action</p></div>
                {
                    users.length > 0 ? users.map((user,index)=>{
                        return(
                            <div className={style.singleList} key={index}>
                                <p>{user.firstName} {user.lastName}</p>
                                <p>{user.approval.trxId}</p>
                                <p>{user.email}</p>
                                <button onClick={()=>handleApprove(user._id)}>Approve</button>
                            </div>
                        )
                    }):
                    <p>No users found</p>
                }
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PendingUser;
