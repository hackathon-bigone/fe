import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as I from "../styles/StyledInform.jsx";

const Inform = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/my`);
  };

  const goDetail = () => {
    navigate(`/my/inform/detail`);
  };

  return (
    <I.Container>
      <I.Header>
        <I.Icons>
          <img id="back" src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" style={{ cursor: "pointer" }} onClick={goBack} />
          <I.Title>공지사항</I.Title>
        </I.Icons>
      </I.Header>
      <I.Content>
        <I.InformWrapper onClick={goDetail}>
          <I.InformTitle>v.1.2.1 버전 업데이트 안내</I.InformTitle>
          <I.InformContent>안녕하세요, 순삭입니다. 더욱 쾌적하고 안정적인 서비스 지원을 위해 다음과 같이•••</I.InformContent>
          <I.Date>8월 1일</I.Date>
        </I.InformWrapper>
        <I.InformWrapper>
          <I.InformTitle>개인정보 처리 방침 개정</I.InformTitle>
          <I.InformContent>안녕하세요, 순삭입니다. 순삭의 개인정보 처리 방침이 개정될 예정이니 서비스 •••</I.InformContent>
          <I.Date>2024년 12월 1일</I.Date>
        </I.InformWrapper>
      </I.Content>
    </I.Container>
  );
};

export default Inform;
