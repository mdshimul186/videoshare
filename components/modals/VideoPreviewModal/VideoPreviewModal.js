import React from "react";
import Modal from "react-modal";
import style from "./VideoPreviewModal.module.css";

const VideoPreviewModal = ({
  vpmModalIsOpen,
  vpmCloseModal,
  vpmParentElement,
}) => {
  return (
    <div>
      <Modal
        appElement={document.getElementById(vpmParentElement)}
        isOpen={vpmModalIsOpen}
        onRequestClose={vpmCloseModal}
        className={style.Modal}
        contentLabel="Video Preview Modal"
      >
        <div className={style.content}>
          <button
            onClick={vpmCloseModal}
            className={style.closeButton}
          ></button>
          <p>Video goes here</p>
        </div>
      </Modal>
    </div>
  );
};

export default VideoPreviewModal;
