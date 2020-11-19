import React from "react";
import Modal from "react-modal";
import style from "./ThemesModal.module.css";

const ThemeModal = ({
  themeModalIsOpen,
  themeCloseModal,
  themeParentElement,
}) => {
  return (
    <div>
      <Modal
        appElement={document.getElementById(`${themeParentElement}`)}
        isOpen={themeModalIsOpen}
        onRequestClose={themeCloseModal}
        className={style.Modal}
        contentLabel="Themes Modal"
      >
        <div>
          <button
            onClick={themeCloseModal}
            className={style.closeButton}
          ></button>
          <div className={style.content}>
            <p className={style.themeDescription}>Choose a theme</p>
            <div className={style.themeList}>
              <div className={style.theme1}>Default</div>
              <div className={style.theme2}>Theme 2</div>
              <div className={style.theme3}>Theme 3</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ThemeModal;
