import React, { useState } from "react";
import * as B from "../../styles/StyledBottom";

const Comment = ({ username, date, comment, children }) => {
  const [isOpen, setIsOpen] = useState(true); // 기본은 펼쳐진 상태

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <B.Comment>
      <div id="profile-wrapper">
        <img id="circle" src={`${process.env.PUBLIC_URL}/images/Circle.svg`} alt="circle" />
        <img id="cat" src={`${process.env.PUBLIC_URL}/images/Profile.png`} alt="cat" />
      </div>
      <div id="comment-wrapper">
        <div id="username-date" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span id="username">{username}</span>
          <span id="date">{date}</span>
        </div>
        <div id="comment">{comment}</div>

        {/* children이 있으면 토글 버튼 표시 */}
        {children && children.length > 0 && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="line" />
            <div className="button" onClick={toggleOpen}>
              {isOpen ? "답글 숨기기" : "답글 펼치기"}
            </div>
          </div>
        )}

        {children && children.length > 0 && isOpen && (
          <div className="comment-children" style={{ marginLeft: 20, marginTop: 8 }}>
            {children.map((child) => (
              <Comment key={child.commentId} username={child.authorName} date={child.createdAt} comment={child.content} children={child.children} />
            ))}
          </div>
        )}
      </div>
    </B.Comment>
  );
};

export default Comment;
