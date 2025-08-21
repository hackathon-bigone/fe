import React, { useState, useEffect } from "react";
import * as B from "../../styles/StyledBottom";
import CommentList from "./CommentList";
import axios from "axios";

const BottomSheet = ({ isOpen, onClose, comments, type, targetId }) => {
  const apiUrl = type === "recipe" ? `http://43.203.179.188/recipe/${targetId}/comments` : `http://43.203.179.188/groupbuys/${targetId}/comments`;

  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [feedComments, setFeedComments] = useState(comments || []);
  const [replyTo, setReplyTo] = useState(null);

  const isActive = input.length > 0;

  const handleReply = (comment) => {
    setReplyTo(comment);
    setInput(`@${comment.authorName} `);
    setIsValid(true);
  };

  useEffect(() => {
    setFeedComments(comments || []);
  }, [comments]);

  const post = async () => {
    if (!isValid) return;
    const token = localStorage.getItem("access_token");

    const mentionPattern = replyTo ? new RegExp(`^@${replyTo.authorName}\\s`) : null;
    const contentToSend = mentionPattern ? input.replace(mentionPattern, "") : input;

    const payload = { content: contentToSend };
    if (replyTo) payload.parentId = replyTo.topCommentId;

    const response = await axios.post(apiUrl, payload, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });

    if (payload.parentId) {
      setFeedComments((prev) => prev.map((c) => (c.commentId === payload.parentId ? { ...c, children: [...(c.children || []), response.data] } : c)));
    } else {
      setFeedComments((prev) => [...prev, response.data]);
    }

    setInput("");
    setIsValid(false);
    setReplyTo(null);
  };

  return (
    <B.Overlay isOpen={isOpen} onClick={onClose}>
      <B.BottomSheet isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <B.CommentInform>
          <div id="roundBar" />
          댓글
        </B.CommentInform>

        <CommentList feedComments={feedComments} onReply={handleReply} />

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
            <B.Circle isActive={isActive} onClick={post} disabled={!isValid}></B.Circle>
            <img id="arrow" src={`${process.env.PUBLIC_URL}/images/${isActive ? "UpArrow_w.svg" : "UpArrow.svg"}`} alt="arrow" />
          </B.CommentInput>
        </B.CommentBar>
      </B.BottomSheet>
    </B.Overlay>
  );
};

export default BottomSheet;
