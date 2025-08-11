import * as B from "../../styles/StyledBottom";

const Comment = (username, date, comment) => {
  return (
    <B.Comment>
      <div id="profile-wrapper">
        <img id="circle" src={`${process.env.PUBLIC_URL}/images/Circle.svg`} alt="circle" />
        <img id="cat" src={`${process.env.PUBLIC_URL}/images/Profile.png`} alt="cat" />
      </div>
      <div>
        <span id="username">{username}</span>
        <span id="date">{date}</span>
      </div>
      <div id="comment">{comment}</div>
    </B.Comment>
  );
};

export default Comment;
