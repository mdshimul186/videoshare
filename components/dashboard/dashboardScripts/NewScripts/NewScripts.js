import NewScriptMain from "../NewScriptMain/NewScriptMain";
import { components } from "react-select";
import NewSummaryMain from "../NewSummaryMain/NewSummaryMain";
import NewTemplateMain from "../NewTemplateMain/NewTemplateMain";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./NewScripts.module.css";
import { connect } from "react-redux";
import { toggleNewScriptButton } from "./actions/scriptsAction";
import Header from "../../dashboardHeader/Header";
import DottedStyles from "../SelectButtonStyles/DottedStyles";
import ButtonStyles from "../SelectButtonStyles/ButtonStyles";
// added speech recognition from this library https://www.npmjs.com/package/react-speech-recognition
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// const handleScriptButton = (props) => {
// 	props.toggleNewScriptButton();
// };

const mapDispatchToProps = (dispatch) => {
  return {
    toggleNewScriptButton: () => dispatch(toggleNewScriptButton()),
  };
};

const NewScripts = (props) => {
  const currentState = useSelector((state) => state);
  // eslint-disable-next-line react/prop-types
  const { setSelectedComponent } = props;

  // eslint-disable-next-line no-unused-vars
  const { userData } = currentState.auth;
  //initialize speech recognition
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isRecording, setRecording] = useState(false);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return alert("this features are not supported by your browser");
  }

  const handleRecording = () => {
    setRecording(true);
    console.log("recording");
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopRecording = () => {
    setRecording(false);
    console.log("stopped recording");
    SpeechRecognition.stopListening();
  };

  const handleResetTranscript = () => {
    resetTranscript();
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const handleSelectValue = (selectedOption) => {
    const finalSelectedOption = selectedOption.value;
    setSelectedOption(finalSelectedOption);
  };
  const newScriptOptions = [
    { value: "Draft", label: "Draft" },
    { value: "Template", label: "Template" },
    { value: "Summary", label: "Summary" },
  ];

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props} className="allScriptSelect">
        <SelectIcon />
      </components.DropdownIndicator>
    );
  };
  const SelectIcon = () => {
    return <img src="/tripledot.svg" alt="tripledot" />;
  };
  if (selectedOption === "Summary") {
    return (
      <div id="Summary">
        <div className={styles.dashboardScriptsSummary}>
          <Header />
          <div className={styles.newScriptWrapper}>
            <NewSummaryMain
              handleSelectValue={handleSelectValue}
              DropdownIndicator={DropdownIndicator}
              customStyles={DottedStyles}
              newScriptOptions={newScriptOptions}
              selectedOption={selectedOption}
            />
          </div>
        </div>
      </div>
    );
  }
  if (selectedOption === "Template") {
    return (
      <div id="Template">
        <div className={styles.dashboardScriptsContent}>
          <Header />
          <div
            onClick={() => setSelectedComponent(null)}
            className={styles.backToScriptDashboardWrapper}
          >
            <img
              className={styles.blueLeftArrow}
              src="blueLeftArrow.svg"
              alt="arrow"
            />
            <p className={styles.backToScriptDashboardText}>
              Back to script dashboard
            </p>
          </div>
          <div className={styles.newScriptWrapper}>
            <NewTemplateMain
              handleSelectValue={handleSelectValue}
              DropdownIndicator={DropdownIndicator}
              customStyles={DottedStyles}
              newScriptOptions={newScriptOptions}
              selectedOption={selectedOption}
            />
          </div>
        </div>
      </div>
    );
  }
  if (selectedOption === "Draft") {
    return (
      <div className={styles.dashboardScriptsContent}>
        <Header />
        <div
          onClick={() => setSelectedComponent(null)}
          className={styles.backToScriptDashboardWrapper}
        >
          <img
            className={styles.blueLeftArrow}
            src="blueLeftArrow.svg"
            alt="arrow"
          />
          <p className={styles.backToScriptDashboardText}>
            Back to script dashboard
          </p>
        </div>
        <div className={styles.newScriptWrapper}>
          <NewScriptMain
            // REACT SPEECH
            isRecording={isRecording}
            stopRecording={stopRecording}
            handleRecording={handleRecording}
            handleResetTranscript={handleResetTranscript}
            transcript={transcript}
            // END REACT SPEECH
            handleSelectValue={handleSelectValue}
            customStyles={ButtonStyles}
            newScriptOptions={newScriptOptions}
            selectedOption={selectedOption}
          />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.dashboardScriptsContent}>
      <Header />
      <div
        onClick={() => setSelectedComponent(null)}
        className={styles.backToScriptDashboardWrapper}
      >
        <img
          className={styles.blueLeftArrow}
          src="blueLeftArrow.svg"
          alt="arrow"
        />
        <p className={styles.backToScriptDashboardText}>
          Back to script dashboard
        </p>
      </div>
      <div className={styles.newScriptWrapper}>
        <NewScriptMain
          // REACT SPEECH
          isRecording={isRecording}
          stopRecording={stopRecording}
          handleRecording={handleRecording}
          handleResetTranscript={handleResetTranscript}
          transcript={transcript}
          // END REACT SPEECH
          handleSelectValue={handleSelectValue}
          customStyles={ButtonStyles}
          newScriptOptions={newScriptOptions}
          selectedOption={selectedOption}
        />
      </div>
    </div>
  );
};
export default connect(null, mapDispatchToProps)(NewScripts);
