/* eslint-disable react/prop-types */
import React, { useState } from "react";
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
import {useDispatch} from 'react-redux'


const NewScriptMain = ({
  // REACT SPEECH
  handleRecording,
  handleResetTranscript,
  transcript,
  // END REACT SPEECH
  handleSelectValue,
  customStyles,
  newScriptOptions,
  selectedOption,
  isRecording,
  stopRecording,
}) => {
  //STOPWATCH
  const { seconds, minutes, hours, start, reset, pause } = useStopwatch();
  //END STOPWATCH
  const [isRecordMicOpen, setRecordMicOpen] = useState(false);
  const [textFileData, setTextFileData] = useState(null);
  const handleRecordMic = () => {
    setRecordMicOpen(!isRecordMicOpen);
  };
  const handleResetAll = () => {
    //reset();
    //handleResetTranscript();
  };
  const handleTextFile = async (e) => {
    console.log("fires");
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      console.log(text);
      alert(text);
      setTextFileData(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [note, setNote] = useState('')
  const [isLoading, setLoading] = useState(false);



  const handleScriptEditorChange = (e) => {
		console.log("Content was updated:", e.target.getContent());
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
    axios.post(process.env.NEXT_PUBLIC_API_URL+'/script/createscript',data)
    .then(res=>{
      console.log(res.data.script)
      dispatch({
        type:"ADD_NEW_SCRIPT",
        payload:res.data.script
      })
      setNote("")
      setTitle("")
      setDescription("")
      setLoading(false)
    })
    .catch(err=>{
      setLoading(false)
      console.log(err)
    })
  }

  const options = [
		{ value: 'seles', label: 'Seles template' },
		{ value: 'welcome', label: 'Welcome template' },
		{ value: 'newsletter', label: 'News letter' }
	  ]

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
          <Select placeholder="import template" options={options} />
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
        {isRecordMicOpen ? (
          <RecordVoice
            handleRecording={handleRecording}
            handleResetTranscript={handleResetTranscript}
            transcript={transcript}
            isRecording={isRecording}
            start={start}
            pause={pause}
            reset={reset}
            seconds={seconds}
            minutes={minutes}
            hours={hours}
            stopRecording={stopRecording}
          />
        ) : (
          ""
        )}
        {isRecordMicOpen ? (
          <NewScriptSmallEditor
            reset={reset}
            isRecording={isRecording}
            transcript={transcript}
            textFileData={textFileData}
          />
        ) : (
          <NewScriptBigEditor
            isRecording={isRecording}
            transcript={transcript}
            notevalue={note}
            textFileData={textFileData}
            handleNewScriptEditorChange={handleScriptEditorChange}
          />
        )}
      </div>
      <div className={styles.recordAndDraftWrapper}>
        <p onClick={()=>handleSave("draft")} className={styles.saveAsDraft}>Save as draft</p>
        <button onClick={()=>handleSave("saved")} className={styles.newScriptSave}>Save</button>
      </div>
    </div>
  );
};
export default NewScriptMain;
