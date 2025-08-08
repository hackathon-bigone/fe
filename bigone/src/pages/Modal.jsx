import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as P from "../styles/StyledPurW.jsx";

const Modal = ({ isOpen, onClose, onConfirm, title, content }) => {
  if (!isOpen) return null;

  return (
    <P.Modal>
      <div className="modal-overlay">
        <div className="modal-wrapper">
          <div className="modal-text">{title}</div>
          <div className="modal-detail">{content}</div>
          <div className="modal-btn-wrapper">
            <div className="modal-close" onClick={onClose}>
              취소
            </div>
            <div className="modal-ok" onClick={onConfirm}>
              확인
            </div>
          </div>
        </div>
      </div>
    </P.Modal>
  );
};

export default Modal;
