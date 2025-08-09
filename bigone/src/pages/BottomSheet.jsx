import React, { use, useRef, useState } from "react";
import * as B from "../styles/StyledBottom";

const BottomSheet = ({ isOpen, onClose, children }) => {
  return (
    <B.Overlay isOpen={isOpen} onClick={onClose}>
      <B.BottomSheet isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        {children}
      </B.BottomSheet>
    </B.Overlay>
  );
};

export default BottomSheet;
