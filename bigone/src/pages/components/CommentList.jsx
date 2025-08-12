import React, { useRef, useState } from "react";
import * as B from "../../styles/StyledBottom";
import Comment from "./Comment";

const CommentList = ({ feedComments, userName }) => {
  return (
    <B.CommentList>
      {feedComments.map((item) => (
        <Comment key={item.id} username={item.username} date={item.date} comment={item.comment} />
      ))}
    </B.CommentList>
  );
};

export default CommentList;
