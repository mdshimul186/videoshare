/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import style from "./RecordVoice.module.css";
// import { ReactMic } from "react-mic";
import dynamic from "next/dynamic";
if (process.browser) {
	console.log("window.innerHeight", window.innerHeight);
	// import { ReactMic } from "react-mic";
}

const ReactMic = dynamic(
	() => import("react-mic").then((mod) => mod.ReactMic),
	{ ssr: false }
);

const RecordVoice = ({
	handleRecording,
	handleResetTranscript,
	transcript,
	isRecording,
	start,
	reset,
	pause,
	seconds,
	minutes,
	hours,
	stopRecording,
}) => {
	const [recordingMic, setRecordingMic] = useState(false);
	const recordMic = () => {
		if (isRecording == false) {
			handleRecording();
			setRecordingMic(true);
			start();
		}
	};
	const stopRecordMic = () => {
		if (isRecording == true) {
			stopRecording();
			setRecordingMic(false);
			pause();
		}
	};
	console.log(transcript);

	return (
		<div className={style.Container}>
			<div className={style.Content}>
				<p className={style.startSpeakingText}>Start Speaking</p>
				<p className={style.recordTime}>{`${hours
					.toString()
					.padStart(2, "0")}:${minutes
					.toString()
					.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</p>
				<div className={style.voiceWaveWrapper}>
					<ReactMic
						record={recordingMic}
						strokeColor="#FFFFFF"
						backgroundColor="#6b7587"
						className={style.wave}
					/>
				</div>
				<div className={style.buttonWrapper}>
					{isRecording ? (
						<button onClick={stopRecordMic} className={style.stopButton} />
					) : (
						<button onClick={recordMic} className={style.recordButton} />
					)}
				</div>
			</div>
		</div>
	);
};

export default RecordVoice;
