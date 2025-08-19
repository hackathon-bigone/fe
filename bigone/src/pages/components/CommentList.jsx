import React, { useRef, useState } from "react";
import * as B from "../../styles/StyledBottom";
import Comment from "./Comment";

const CommentList = ({ feedComments }) => {
  return (
    <B.CommentList>
      {feedComments.map((item) => (
        <Comment key={item.commentId} username={item.authorName} date={item.createdAt} comment={item.content} />
      ))}
    </B.CommentList>
  );
};

export default CommentList;
