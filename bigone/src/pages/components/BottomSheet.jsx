import React, { useRef, useState } from "react";
import * as B from "../../styles/StyledBottom";
import CommentList from "./CommentList";
import Comment from "./Comment";

const BottomSheet = ({ isOpen, onClose, children }) => {
  const [input, setInput] = useState("");
  const isActive = input.length > 0;
  const [isValid, setIsValid] = useState(false);
  const [feedComments, setFeedComments] = useState([]);

  const post = () => {
    if (!isValid) return;
    setFeedComments([...feedComments, input]);
    setInput("");
    setIsValid(false);
  };

  //   const textareaRef = useRef(null);

  //   const handleChange = (e) => {
  //     const textarea = textareaRef.current;
  //     setInput(e.target.value);

  //     textarea.style.height = "50px";
  //     textarea.style.height = `${textarea.scrollHeight}px`;
  //   };

  return (
    <B.Overlay isOpen={isOpen} onClick={onClose}>
      <B.BottomSheet isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <CommentList>
          <Comment></Comment>
        </CommentList>
        <B.CommentBar>
          <B.Profile>
            <img id="circle" src={`${process.env.PUBLIC_URL}/images/Circle.svg`} alt="circle" />
            <img id="cat" src={`${process.env.PUBLIC_URL}/images/Profile.png`} alt="cat" />
          </B.Profile>
          <B.CommentInput>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) => {
                e.target.value.length > 0 ? setIsValid(true) : setIsValid(false);
              }}
            />
            {/* <textarea type="text" value={input} row={1} onChange={(e) => setInput(e.target.value)} /> */}
            {/* <textarea type="text" ref={textareaRef} value={input} onChange={handleChange} row={1} /> */}
            <B.Circle isActive={isActive} onClick={post} disabled={isValid ? false : true}></B.Circle>
            <img id="arrow" src={`${process.env.PUBLIC_URL}/images/${isActive ? "UpArrow_w.svg" : "UpArrow.svg"}`} alt="arrow" />
          </B.CommentInput>
        </B.CommentBar>
      </B.BottomSheet>
    </B.Overlay>
  );
};

export default BottomSheet;
