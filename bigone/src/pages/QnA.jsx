import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as Q from "../styles/StyledQnA.jsx";

const QnA = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/my`);
  };

  const goWrite = () => {
    navigate(`/my/question/write`);
  };

  const goDetail = () => {
    navigate(`/my/question/detail`);
  };

  return (
    <Q.Container>
      <Q.Header>
        <Q.Icons>
          <img id="back" src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" style={{ cursor: "pointer" }} onClick={goBack} />
          <Q.Title>Q&A</Q.Title>
        </Q.Icons>
        <Q.Icons>
          <img id="pencil" src={`${process.env.PUBLIC_URL}/images/pencil_w.svg`} alt="pencil" style={{ cursor: "pointer" }} onClick={goWrite} />
        </Q.Icons>
      </Q.Header>

      <Q.Content>
        <Q.Wrapper>
          <Q.D_Inform_black>문의 내역</Q.D_Inform_black>
          <Q.D_Inform_gray>2건</Q.D_Inform_gray>
        </Q.Wrapper>

        <Q.QnAWrapper onClick={goDetail}>
          <Q.QnATitle>
            <Q.QMark>Q</Q.QMark>게시물 수정 오류
          </Q.QnATitle>
          <Q.QnAContent>안녕하세요, 순삭 앱을 애용하고 있는 유저입니다. 다름이 아니라 제가 8월 23일에 작성한 레시피 게시물 •••</Q.QnAContent>
          <Q.Wrapper style={{ gap: "10px" }}>
            <Q.Date>8월 1일</Q.Date>
            <Q.Divider />
            <Q.D_State>답변완료</Q.D_State>
          </Q.Wrapper>
        </Q.QnAWrapper>
      </Q.Content>
    </Q.Container>
  );
};

export default QnA;
