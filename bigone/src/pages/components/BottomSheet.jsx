import React, { useRef, useState, useEffect } from "react";
import * as B from "../../styles/StyledBottom";
import CommentList from "./CommentList";

// 테스트 용
const sampleComments = [
  {
    id: 1,
    username: "솜비보벳따우",
    date: "8월 16일",
    comment: "혹시 인당 가격이 얼마 정도 될까요?",
  },
  {
    id: 2,
    username: "월곡동 찜찜박사",
    date: "8월 16일",
    comment: "1300원 정도 될 것 같습니다~!",
  },
  {
    id: 3,
    username: "레몬나르크빛감귤의즈",
    date: "8월 13일",
    comment: "쿠팡 상품 링크도 같이 올려주실 수 있나요~?",
  },
  {
    id: 4,
    username: "월곡동 찜찜박사",
    date: "8월 14일",
    comment: "오픈채팅 들어오시면 공지사항에 바로 보입니다!!",
  },
];

const BottomSheet = ({ isOpen, onClose, comments }) => {
  const [input, setInput] = useState("");
  const isActive = input.length > 0;
  const [isValid, setIsValid] = useState(false);
  const [feedComments, setFeedComments] = useState(comments || []);

  useEffect(() => {
    // comment prop이 바뀔 때 feedComments 상태 업데이트
    setFeedComments(comments || []);
  }, [comments]);
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const formatted = `${month}월 ${date}일`;

  const post = () => {
    if (!isValid) return;
    const newComment = {
      id: feedComments.length + 1,
      username: "username",
      date: formatted,
      comment: input,
    };
    setFeedComments([...feedComments, newComment]);
    setInput("");
    setIsValid(false);
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
