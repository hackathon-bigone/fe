import React from "react";
import * as B from "../../styles/StyledBottom";
import Comment from "./Comment";

const CommentList = ({ feedComments, onReply }) => {
  return (
    <B.CommentList>
      {feedComments.map((item) => (
        <Comment
          key={item.commentId}
          commentId={item.commentId}
          username={item.authorName}
          date={item.createdAt}
          comment={item.content}
          children={item.children}
          onReply={onReply}
          parentId={null}
          topCommentId={item.commentId}
        />
      ))}
    </B.CommentList>
  );
};

export default CommentList;
