import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as P from "../styles/StyledPurW.jsx";

const PurWrite = () => {
  const navigate = useNavigate();

  const goMy = () => {
    navigate(`/my`);
  };

  const goHome = () => {
    navigate(`/home`);
  };

  const goRec = () => {
    navigate(`/recipe`);
  };

  const goRef = () => {
    navigate(`/refrigerator`);
  };

  return (
    <P.Container>
      <P.Header>
        <P.Icons>
          <img id="back" src={`${process.env.PUBLIC_URL}/images/back.svg`} alt="back" />
          <P.Title>공동구매 글쓰기</P.Title>
        </P.Icons>
        <img id="out" src={`${process.env.PUBLIC_URL}/images/Out.svg`} alt="out" />
      </P.Header>
      <P.Content>
        <P.InputWrapper>
          <P.InTitle>대표사진</P.InTitle>
          <P.InPic>
            <img id="plus" src={`${process.env.PUBLIC_URL}/images/Plus.svg`} alt="plus" />
            <p>게시물의 대표 사진을 업로드해 주세요.</p>
          </P.InPic>
        </P.InputWrapper>
        <P.InputWrapper>
          <P.InTitle>제목</P.InTitle>
          <P.Input></P.Input>
        </P.InputWrapper>
        <P.InputWrapper>
          <P.InTitle>모집인원</P.InTitle>
          <P.Input placeholder="0명"></P.Input>
        </P.InputWrapper>
        <P.InputWrapper>
          <P.InTitle>상세 설명</P.InTitle>
          <P.Textarea></P.Textarea>
        </P.InputWrapper>
      </P.Content>
    </P.Container>
  );
};

export default PurWrite;
