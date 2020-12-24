/* eslint-disable react/prop-types */
import React, { useState,useEffect } from "react";
import styles from "./NewScriptMain.module.css";
import Select from "react-select";
//https://www.npmjs.com/package/react-timer-hook
import { useStopwatch } from "react-timer-hook";
import RecordVoice from "../RecordVoice/RecordVoice";
import NewScriptBigEditor from "../NewScriptBigEditor/NewScriptBigEditor";
import NewScriptSmallEditor from "../NewScriptSmallEditor/NewScriptSmallEditor";
import regeneratorRuntime from "regenerator-runtime";
import axios from 'axios'
import { SpinnerComponent } from "react-element-spinner";
import {useDispatch,useSelector} from 'react-redux'


const NewScriptMain = ({selectedScript}) => {
 

const {scriptData} = useSelector(state=>state.scripts)

  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [note, setNote] = useState('')
  const [isLoading, setLoading] = useState(false);

  const [id, setId] = useState(null)



  const handleScriptEditorChange = (e) => {
		
		setNote(e.target.getContent())
  };
  

  const handleSave=(type)=>{
    setLoading(true)
    let data= {
      title,
      description,
      category:"script",
      status:type,
      note
    }

    if(id){
      axios.post(process.env.NEXT_PUBLIC_API_URL+'/script/editscript/'+id,data)
      .then(res=>{
        dispatch({
          type:"ADD_EDITED_SCRIPT",
          payload:res.data.script
        })
        setId(null)
        setNote("")
        setTitle("")
        setDescription("")
        setLoading(false)
      })
      .catch(err=>{
        setLoading(false)
      })
    }else{
      axios.post(process.env.NEXT_PUBLIC_API_URL+'/script/createscript',data)
      .then(res=>{
        dispatch({
          type:"ADD_NEW_SCRIPT",
          payload:res.data.script
        })
        setId(null)
        setNote("")
        setTitle("")
        setDescription("")
        setLoading(false)
      })
      .catch(err=>{
        setLoading(false)
      })
    }
    
  }

  // const options = [
	// 	{ value: 'seles', label: 'Seles template' },
	// 	{ value: 'welcome', label: 'Welcome template' },
	// 	{ value: 'newsletter', label: 'News letter' }
  //   ]

    const [options, setOptions] = useState([])
    
    useEffect(() => {
      if(selectedScript && selectedScript.category === 'script'){
        setId(selectedScript._id)
        setTitle(selectedScript.title)
        setDescription(selectedScript.description)
        setNote(selectedScript.note)
      }
      
    }, [selectedScript])


    useEffect(() => {
      if(scriptData){
        let temp = [...scriptData]
        let filtered = temp.filter(data=>data.category === 'script')
        setOptions(filtered)
      }
    }, [scriptData])

    const handleSelect=(id)=>{
      if(id === 'default'){
        setTitle('')
        setDescription('')
        setNote('')
        setId(null)
      }else{
        let temp = [...options]
        let index = temp.findIndex(data=>data._id === id)
        let selectedTemp = temp[index]
        setTitle(selectedTemp.title)
        setDescription(selectedTemp.description)
        setNote(selectedTemp.note)
        setId(null)
      }
      
    }
   

  return (
    <div className={styles.newScript} id="#newScript">
    <SpinnerComponent loading={isLoading} position="global" />
      <div className={styles.newScriptMain}>
        <div className={`flex-row ${styles.newScriptTitleGroup}`}>
          <p className={styles.newScriptTitle}>New Draft</p>
          {/* <Select
            onChange={handleSelectValue}
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: () => null,
            }}
            className="react-select-container"
            classNamePrefix="react-select"
            styles={customStyles}
            isSearchable={false}
            options={newScriptOptions}
            value={selectedOption}
            defaultValue={selectedOption}
            placeholder="New Script"
          /> */}
        </div>
        <div className={`flex-row ${styles.newScriptGroup}`}>
          <div className={styles.scriptTitleInputGroup}>
            <input
              className={styles.scriptTitleInput}
              placeholder="Script title"
              onChange={(e)=>setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div style={{marginLeft:"36px"}} className={styles.scriptTitleInputGroup}>
            <input
              className={styles.scriptTitleInput}
              placeholder="Script description"
              onChange={(e)=>setDescription(e.target.value)}
              value={description}
            />
          </div>
          <div className={styles.importButton} >
          {/* <Select placeholder="import template" options={options} /> */}
          <select className={styles.selectScript} onChange={(e)=>handleSelect(e.target.value)}>
          <option value='default'>Import Script</option>
          {
            options.map((op,index)=>{
              return(
                <option value={op._id} key={index}>{op.title}</option>
              )
            })
          }
            
          </select>
          </div>
         
          {/* <label className={styles.importButton}>
            Import
            <input
              accept=".txt"
              style={{ display: "none" }}
              type="file"
              onChange={handleTextFile}
            />
            <img style={{marginLeft:"5px"}} src="check.svg"></img>
          </label> */}
          {/* <img
            onClick={handleRecordMic}
            className={styles.scriptRecord}
            alt="mic record"
            src="/mic.svg"
          />
          <img
            className={styles.scriptVerticalLine}
            alt="scriptVerticalLine"
            src="/vertical.svg"
          /> */}
          {/* <div className={styles.recordDuration}>
             set state inside here 
            <p
              className={styles.scriptRecordDurationText}
            >{`${hours
              .toString()
              .padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</p>
          </div> */}
          {/* <button
            className={styles.resetButton}
            onClick={() => handleResetAll()}
          >
            Reset
          </button> */}
          {/* <p className={styles.saveAsDraft}>Save as Draft</p> */}
        </div>
         
          <NewScriptBigEditor
            handleNewScriptEditorChange={handleScriptEditorChange}
            notevalue={note}
          />
        
      </div>
      <div className={styles.recordAndDraftWrapper}>
        <p onClick={()=>handleSave("draft")} className={styles.saveAsDraft}>Save as draft</p>
        <button onClick={()=>handleSave("saved")} className={styles.newScriptSave}>Save</button>
      </div>
    </div>
  );
};
export default NewScriptMain;
