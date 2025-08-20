import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as B from "../../styles/StyledBottom";
import CommentList from "./CommentList";
import axios from "axios";

const BottomSheet = ({ isOpen, onClose, comments }) => {
  const [input, setInput] = useState("");
  const isActive = input.length > 0;
  const [isValid, setIsValid] = useState(false);
  const [feedComments, setFeedComments] = useState(comments || []);
  const { user_id: groupbuy_id } = useParams();

  useEffect(() => {
    // comment prop이 바뀔 때 feedComments 상태 업데이트
    setFeedComments(comments || []);
  }, [comments]);

  const post = async () => {
    if (!isValid) return;
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        `http://43.203.179.188/groupbuys/${groupbuy_id}/comments`,
        { content: input },
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }
      );
      setFeedComments((prev) => [...prev, response.data]);
      setInput("");
      setIsValid(false);
    } catch (error) {
      console.error("댓글 작성 실패", error);
    }
  };

  return (
    <B.Overlay isOpen={isOpen} onClick={onClose}>
      <B.BottomSheet isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <B.CommentInform>
          <div id="roundBar" />
          댓글
        </B.CommentInform>
        <CommentList feedComments={feedComments}></CommentList>
        <B.CommentBar>
          <B.Profile>
            <img id="circle" src={`${process.env.PUBLIC_URL}/images/Circle.svg`} alt="circle" />
            <img id="cat" src={`${process.env.PUBLIC_URL}/images/Profile.png`} alt="cat" />
          </B.Profile>
          <B.CommentInput>
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setIsValid(e.target.value.trim().length > 0);
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
