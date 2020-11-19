import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const TranscriptModal = ({ transcript, isRecording, handleResetTranscript, setFinalTranscript }) => {
	const [ isModalOpen, setModalOpen ] = useState(false);
	const openModal = () => {
		setModalOpen(true);
	};
	const closeModal = () => {
		setModalOpen(false);
	};
	const handleMoveToMain = () => {
		setFinalTranscript(transcript);
	};
	useEffect(
		() => {
			console.log(transcript);
			if (transcript != null && transcript != undefined && transcript != '') {
				if (isRecording === true) {
					closeModal();
				} else if (isRecording === false) {
					openModal();
				}
			} else {
				closeModal();
			}
		},
		[ isRecording ]
	);
	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)'
		}
	};
	return (
		<div>
			<Modal
				appElement={document.getElementById('#newScript')}
				isOpen={isModalOpen}
				style={customStyles}
				onRequestClose={closeModal}
			>
				<h2>Test</h2>
				<button onClick={closeModal}>Close</button>
				<button onClick={handleResetTranscript}>Reset Transcript</button>
				<button onClick={handleMoveToMain}>Move to main editor</button>
				<br />
				<textarea value={transcript} />
			</Modal>
		</div>
	);
};

export default TranscriptModal;
