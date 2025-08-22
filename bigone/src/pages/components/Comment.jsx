import React, { useState } from "react";
import * as B from "../../styles/StyledBottom";

const Comment = ({ commentId, username, date, comment, children, onReply, parentId, topCommentId }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleReplyClick = () => {
    if (onReply) {
      onReply({
        commentId,
        authorName: username,
        parentId: parentId === null ? commentId : parentId,
        topCommentId,
      });
    }
  };

  return (
    <B.Comment style={{ display: "block" }}>
      <div id="profile-wrapper" style={{ display: "flex", alignItems: "center" }}>
        <img id="circle" src={`${process.env.PUBLIC_URL}/images/Circle.svg`} alt="circle" />
        <img id="cat" src={`${process.env.PUBLIC_URL}/images/Profile.png`} alt="cat" />
      </div>

      <div id="comment-wrapper">
        <div id="username-date" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span id="username">{username}</span>
          <span id="date">{date}</span>
          {parentId === null && <img src={`${process.env.PUBLIC_URL}/images/comment_w.svg`} alt="답글 달기" style={{ marginLeft: "auto", cursor: "pointer" }} onClick={handleReplyClick} />}
        </div>

        <div id="comment" style={{ marginTop: "4px" }}>
          {comment}
        </div>

        {children && children.length > 0 && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="line" />
            <div className="button" onClick={toggleOpen}>
              {isOpen ? "답글 숨기기" : "답글 펼치기"}
            </div>
          </div>
        )}

        {children && children.length > 0 && isOpen && (
          <div
            className="comment-children"
            style={{
              marginLeft: 28,
              marginTop: 8,
              paddingLeft: 12,
            }}
          >
            {children.map((child) => (
              <Comment
                key={child.commentId}
                commentId={child.commentId}
                username={child.authorName}
                date={child.createdAt}
                comment={child.content}
                children={child.children}
                onReply={onReply}
                parentId={child.parentId}
                topCommentId={topCommentId}
              />
            ))}
          </div>
        )}
      </div>
    </B.Comment>
  );
};

export default Comment;
